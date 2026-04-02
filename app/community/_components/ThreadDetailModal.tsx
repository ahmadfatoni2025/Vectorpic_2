"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, MessageSquare, Share2, Bookmark, Send, Repeat,
  MoreHorizontal, Image as ImageIcon, Smile, ArrowLeft
} from 'lucide-react';

interface ThreadDetailModalProps {
  thread: any;
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export const ThreadDetailModal = ({ thread, isOpen, onClose, sessionId }: ThreadDetailModalProps) => {
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

  // Fetch comments when opened
  useEffect(() => {
    if (isOpen && thread?.id) {
      fetchComments();
      // Check if bookmarked
      const saved = JSON.parse(localStorage.getItem('bookmarked_threads') || '[]');
      setIsBookmarked(saved.includes(thread.id));
    }
  }, [isOpen, thread?.id]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/discussions/${thread.id}/comments`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch comments:', e);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/discussions/${thread.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment.trim(), authorId: null }),
      });
      if (res.ok) {
        setNewComment('');
        fetchComments();
        // Scroll to bottom
        setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    } catch (e) {
      console.error('Failed to post comment:', e);
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
      // Revert on error
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
      } catch (e) { /* user cancelled */ }
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

  if (!isOpen || !thread) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative ml-auto w-full max-w-2xl bg-white flex flex-col h-full shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h2 className="text-[15px] font-semibold text-gray-900">Thread</h2>
              <p className="text-[11px] text-gray-400">{comments.length} replies</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Original Post */}
            <div className="p-5 border-b border-gray-100">
              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={thread.user.avatar}
                  className="w-11 h-11 rounded-full object-cover border border-gray-100"
                  alt={thread.user.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-gray-900">{thread.user.name}</span>
                    {thread.user.role === 'Expert' && (
                      <span className="bg-cyan-50 px-1.5 py-0.5 rounded text-[9px] font-bold text-cyan-600 border border-cyan-100">EXPERT</span>
                    )}
                  </div>
                  <span className="text-[12px] text-gray-400">@{thread.user.name.toLowerCase().replace(/\s+/g, '')} · {thread.time}</span>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Content */}
              <h3 className="text-[18px] font-bold text-gray-900 leading-snug mb-2">{thread.title}</h3>
              <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">{thread.snippet}</p>

              {/* Category */}
              {thread.category && (
                <span className="text-[13px] font-medium text-cyan-500 mb-3 inline-block">#{thread.category.replace(/\s+/g, '')}</span>
              )}

              {/* Image */}
              {hasImage && (
                <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 mb-4">
                  <img src={thread.images[0].imageUrl} className="w-full object-cover max-h-[400px]" alt="post" loading="lazy" />
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 py-3 border-y border-gray-50 text-[13px] text-gray-500">
                <span><strong className="text-gray-700">{thread.replies || 0}</strong> Replies</span>
                <span><strong className="text-gray-700">{likesCount}</strong> Likes</span>
                <span><strong className="text-gray-700">{thread.views || 0}</strong> Views</span>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-around py-2 border-b border-gray-50">
                <button onClick={() => inputRef.current?.focus()} className="p-2.5 rounded-full hover:bg-cyan-50 text-gray-500 hover:text-cyan-500 transition-all">
                  <MessageSquare size={18} />
                </button>
                <button className="p-2.5 rounded-full hover:bg-emerald-50 text-gray-500 hover:text-emerald-500 transition-all">
                  <Repeat size={18} />
                </button>
                <button onClick={handleLike} className={`p-2.5 rounded-full transition-all ${isLiked ? 'bg-pink-50 text-pink-500' : 'hover:bg-pink-50 text-gray-500 hover:text-pink-500'}`}>
                  <Heart size={18} className={isLiked ? 'fill-pink-500' : ''} />
                </button>
                <button onClick={handleBookmark} className={`p-2.5 rounded-full transition-all ${isBookmarked ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 text-gray-500 hover:text-blue-500'}`}>
                  <Bookmark size={18} className={isBookmarked ? 'fill-blue-500' : ''} />
                </button>
                <button onClick={handleShare} className="p-2.5 rounded-full hover:bg-cyan-50 text-gray-500 hover:text-cyan-500 transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="divide-y divide-gray-50">
              {loadingComments ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent" />
                </div>
              ) : comments.length === 0 ? (
                <div className="p-10 text-center">
                  <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-[13px] text-gray-400">No replies yet. Be the first to respond!</p>
                </div>
              ) : (
                comments.map((comment: any) => (
                  <div key={comment.id} className="px-5 py-4 hover:bg-gray-50/30 transition-colors">
                    <div className="flex gap-3">
                      <img
                        src={comment.author?.image || `https://ui-avatars.com/api/?name=${comment.author?.name || 'G'}&background=e0e7ff&color=4f46e5&size=80`}
                        className="w-9 h-9 rounded-full object-cover border border-gray-100 flex-shrink-0"
                        alt="commenter"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[13px] font-bold text-gray-900">{comment.author?.name || comment.guestName || 'Guest'}</span>
                          <span className="text-[12px] text-gray-400">· {formatTime(comment.createdAt)}</span>
                        </div>
                        <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-4 mt-2 -ml-2">
                          <button className="p-1.5 rounded-full hover:bg-cyan-50 text-gray-400 hover:text-cyan-500 transition-all">
                            <MessageSquare size={14} />
                          </button>
                          <button className="p-1.5 rounded-full hover:bg-pink-50 text-gray-400 hover:text-pink-500 transition-all">
                            <Heart size={14} />
                          </button>
                          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
                            <Share2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-100 p-4 flex-shrink-0 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                G
              </div>
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Post your reply..."
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-300 resize-none transition-all"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-all">
                      <ImageIcon size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-all">
                      <Smile size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || submitting}
                    className="px-5 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-full hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
