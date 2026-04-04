"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, MessageSquare, Share2, Bookmark, Send, Repeat,
  MoreHorizontal, Image as ImageIcon, Smile, ArrowLeft, CheckCircle2, Lock
} from 'lucide-react';

interface ThreadDetailModalProps {
  thread: any;
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  user: any;
}

export const ThreadDetailModal = ({ thread, isOpen, onClose, sessionId, user }: ThreadDetailModalProps) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(thread?.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Fetch comments when opened - only once per thread
  const lastFetchedRef = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen && thread?.id && lastFetchedRef.current !== thread.id) {
      lastFetchedRef.current = thread.id;
      fetchComments();
      const saved = JSON.parse(localStorage.getItem('bookmarked_threads') || '[]');
      setIsBookmarked(saved.includes(thread.id));
    }
    if (!isOpen) {
      lastFetchedRef.current = null;
    }
  }, [isOpen, thread?.id]);

  const fetchComments = async () => {
    if (!thread?.id) return;
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/discussions/${thread.id}/comments?t=${Date.now()}`, {
        cache: 'no-store'
      });
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch comments:', e);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!user) {
      alert("Please login first to join the conversation!");
      return;
    }
    if (!newComment.trim() || submitting) return;

    const commentText = newComment.trim();
    setNewComment('');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/discussions/${thread.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentText,
          authorId: user?.id || null,
          authorName: user?.name || 'Guest',
          sessionId: sessionId
        }),
      });

      if (res.ok) {
        const savedComment = await res.json();
        const displayComment = {
          ...savedComment,
          guestName: savedComment.guestName || 'Guest',
          author: {
            name: savedComment.guestName || 'Guest',
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(savedComment.guestName || 'Guest')}&background=FF4D00&color=fff`
          },
          likesCount: 0
        };
        setComments(prev => [...prev, displayComment]);
        setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
      } else {
        setNewComment(commentText);
        alert("Failed to post comment. Please try again.");
      }
    } catch (e) {
      console.error('Failed to post comment:', e);
      setNewComment(commentText);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount((prev: number) => newLiked ? prev + 1 : prev - 1);

    try {
      await fetch(`/api/discussions/${thread.id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: 'like', sessionId }),
      });
    } catch (e) {
      setIsLiked(!newLiked);
      setLikesCount((prev: number) => newLiked ? prev - 1 : prev + 1);
    }
  };

  const handleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem('bookmarked_threads') || '[]');
    let updated: string[];
    if (isBookmarked) {
      updated = saved.filter((id: string) => id !== thread.id);
    } else {
      updated = [...saved, thread.id];
    }
    localStorage.setItem('bookmarked_threads', JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/community?thread=${thread.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: thread.title, text: thread.snippet, url });
      } catch (e) { }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const hasImage = thread?.images && thread.images.length > 0;

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  const renderTextWithLinks = (text: string) => {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D00] hover:underline font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (!isOpen || !thread) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && thread && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
          />

          {/* Bottom Sheet - Full Width */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="relative w-full max-w-6xl mx-4 bg-white flex flex-col h-[94vh] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.4)] rounded-t-[40px] pointer-events-auto overflow-hidden border-x border-t border-gray-100"
          >
            {/* Drag Handle Aesthetic */}
            <div className="w-full flex justify-center pt-3 pb-1 shrink-0 bg-white">
              <div className="w-12 h-1.5 bg-gray-100 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 px-6 sm:px-8 py-5 border-b border-gray-50 flex-shrink-0">
              <button onClick={onClose} className="p-2.5 rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all">
                <X size={22} strokeWidth={2.5} />
              </button>
              <div className="flex-1">
                <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Discussion</h2>
                <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
                  <span>{comments.length} Replies</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span className="text-[#FF4D00]">Active Now</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-full transition-all">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content - Full Width */}
            <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-gray-50/10">
              {/* Original Post */}
              <div className="p-6 sm:p-8 pb-10 bg-white">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    {thread.user.avatar && (
                      <img
                        src={thread.user.avatar}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                        alt=""
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] sm:text-[16px] font-black text-gray-900">{thread.user.name}</span>
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </div>
                      <span className="text-[10px] sm:text-[12px] font-bold text-gray-400 uppercase tracking-tight">
                        @{thread.user.name.toLowerCase().replace(/\s+/g, '')} · {thread.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body - Full Width */}
                <h3 className="text-[20px] sm:text-[24px] font-black text-gray-900 leading-[1.2] mb-5 tracking-tight">
                  {thread.title}
                </h3>
                <p className="text-[15px] sm:text-[17px] text-gray-700 leading-relaxed font-medium mb-8 whitespace-pre-wrap">
                  {renderTextWithLinks(thread.snippet)}
                </p>

                {/* Dynamic Image - Full Width */}
                {hasImage && thread.images[0].imageUrl && (
                  <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-gray-100 bg-gray-50 mb-10 shadow-xl shadow-gray-100">
                    <img
                      src={thread.images[0].imageUrl}
                      className="w-full object-cover max-h-[500px]"
                      alt="post visual"
                    />
                  </div>
                )}

                {/* Interaction Footer */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="p-2 sm:p-2.5 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2 font-black text-[12px] sm:text-[13px] border border-gray-100">
                        <Heart
                          size={18}
                          strokeWidth={3}
                          className={`cursor-pointer transition-all ${isLiked ? "fill-[#FF4D00] text-[#FF4D00]" : ""}`}
                          onClick={handleLike}
                        />
                        {likesCount}
                      </div>
                      <div className="p-2 sm:p-2.5 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2 font-black text-[12px] sm:text-[13px] border border-gray-100">
                        <MessageSquare size={18} strokeWidth={3} />
                        {comments.length}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleBookmark} className={`p-2 sm:p-3 rounded-2xl transition-all ${isBookmarked ? 'bg-[#FF4D00] text-white shadow-lg shadow-orange-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
                      <Bookmark size={18} strokeWidth={2.5} className={isBookmarked ? "fill-current" : ""} />
                    </button>
                    <button onClick={handleShare} className="p-2 sm:p-3 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100">
                      <Share2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section - Full Width */}
              <div className="p-6 sm:p-8 pt-4 space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[11px] sm:text-[13px] font-black text-gray-300 uppercase tracking-[0.2em]">Community Responses</h4>
                </div>

                {loadingComments ? (
                  <div className="py-20 flex justify-center">
                    <div className="w-10 h-10 border-4 border-gray-100 border-t-[#FF4D00] rounded-full animate-spin" />
                  </div>
                ) : comments.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-[24px] sm:rounded-[32px] border border-dashed border-gray-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare size={28} className="text-gray-300" strokeWidth={1.5} />
                    </div>
                    <h5 className="text-[14px] sm:text-[15px] font-black text-gray-900 mb-2">No replies yet</h5>
                    <p className="text-[12px] sm:text-[13px] text-gray-400 font-medium">Be the first to share your perspective!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 sm:p-6 bg-white rounded-[20px] sm:rounded-[24px] border border-gray-50 shadow-sm"
                      >
                        <div className="flex gap-4 sm:gap-5">
                          {(comment.author?.image || comment.guestName) && (
                            <img
                              src={comment.author?.image || `https://ui-avatars.com/api/?name=${comment.author?.name || 'G'}&background=111&color=fff&size=80`}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover shrink-0"
                              alt=""
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <span className="text-[13px] sm:text-[14px] font-black text-gray-900">{comment.author?.name || comment.guestName || 'Guest'}</span>
                              <span className="text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest">{formatTime(comment.createdAt)}</span>
                            </div>
                            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-medium break-words whitespace-pre-wrap">
                              {renderTextWithLinks(comment.content)}
                            </p>
                            <div className="flex items-center gap-6 mt-4">
                              <button className="flex items-center gap-1.5 text-gray-400 hover:text-[#FF4D00] transition-colors group/clike">
                                <Heart size={14} strokeWidth={3} className="group-hover/clike:scale-110 transition-transform" />
                                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{comment.likesCount || 0}</span>
                              </button>
                              <button className="text-[10px] sm:text-[11px] font-black text-gray-300 hover:text-gray-900 uppercase tracking-widest transition-colors">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                <div ref={commentsEndRef} className="h-20" />
              </div>
            </div>

            {/* Fixed Comment Input - Full Width */}
            <div className="p-4 sm:p-6 pb-8 sm:pb-12 bg-white border-t border-gray-100 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="hidden sm:block w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gray-50 border border-gray-100 shrink-0 overflow-hidden relative">
                  <img src={user?.avatar || "https://ui-avatars.com/api/?name=Guest&background=111&color=fff"} alt="" />
                  {!user && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Share your thoughts..."
                    className="w-full bg-gray-50 border border-transparent rounded-[20px] sm:rounded-[24px] px-5 sm:px-6 py-3 sm:py-4 text-[14px] sm:text-[15px] font-medium text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-[#FF4D00] transition-all resize-none min-h-[56px] sm:min-h-[64px]"
                  />
                  <div className="absolute right-3 bottom-2 flex items-center gap-1">
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || submitting}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF4D00] text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 disabled:opacity-30 transition-all hover:bg-[#E64500]"
                    >
                      {submitting ? (
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={16} strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};