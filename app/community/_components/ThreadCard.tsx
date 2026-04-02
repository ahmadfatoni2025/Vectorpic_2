"use client";

import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Repeat
} from 'lucide-react';

interface Thread {
  id: string;
  user: { name: string; avatar: string; role?: string; };
  title: string;
  snippet: string;
  category: string;
  categoryColor?: string;
  replies: number;
  likes?: number;
  time: string;
  images?: { imageUrl: string }[];
  views?: number;
}

interface ThreadCardProps {
  thread: Thread;
  sessionId: string;
  onOpenThread: (thread: Thread) => void;
}

export const ThreadCard = ({ thread, sessionId, onOpenThread }: ThreadCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(thread.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = JSON.parse(localStorage.getItem('bookmarked_threads') || '[]');
    return saved.includes(thread.id);
  });
  
  const hasImage = thread.images && thread.images.length > 0;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount(prev => newLiked ? prev + 1 : prev - 1);

    try {
      await fetch(`/api/discussions/${thread.id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: 'like', sessionId }),
      });
    } catch (e) {
      setIsLiked(!newLiked);
      setLikesCount(prev => newLiked ? prev - 1 : prev + 1);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/community?thread=${thread.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: thread.title, text: thread.snippet, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenThread(thread);
  };

  return (
    <div 
      onClick={() => onOpenThread(thread)} 
      className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm transition-all hover:bg-gray-50/50 cursor-pointer"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img 
            src={thread.user.avatar} 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-gray-100" 
            alt={thread.user.name} 
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 truncate text-[13px] sm:text-[14px]">
              <span className="font-bold text-gray-900 hover:underline truncate">{thread.user.name}</span>
              {thread.user.role === 'Expert' && (
                <span className="bg-cyan-50 px-1.5 py-0.5 rounded text-[9px] font-bold text-cyan-600 border border-cyan-100 flex-shrink-0">✓</span>
              )}
              <span className="text-gray-400 truncate flex-shrink-0">@{thread.user.name.toLowerCase().replace(/\s+/g, '')}</span>
              <span className="text-gray-400 flex-shrink-0">·</span>
              <span className="text-gray-400 whitespace-nowrap flex-shrink-0">{thread.time}</span>
            </div>
            <button 
              onClick={(e) => e.stopPropagation()} 
              className="p-1.5 text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-all flex-shrink-0 ml-2"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Title & Body */}
          {thread.title && (
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 leading-snug mb-1">{thread.title}</h3>
          )}
          <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-wrap line-clamp-3 mb-2">{thread.snippet}</p>

          {/* Category Tag */}
          {thread.category && (
            <span className="text-[13px] font-medium text-cyan-500 mb-2 inline-block">#{thread.category.replace(/\s+/g, '')}</span>
          )}

          {/* Image Preview */}
          {hasImage && (
            <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 mb-3 max-w-lg">
              <img src={thread.images![0].imageUrl} className="w-full object-cover max-h-[280px]" alt="post" loading="lazy" />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between max-w-sm -ml-2 pt-1">
            <button onClick={handleComment} className="flex items-center gap-1 hover:text-cyan-500 text-gray-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-cyan-50 transition-colors">
                <MessageSquare size={17} />
              </div>
              <span className="text-[12px] font-medium">{thread.replies || 0}</span>
            </button>
            
            <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 hover:text-emerald-500 text-gray-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-emerald-50 transition-colors">
                <Repeat size={17} />
              </div>
              <span className="text-[12px] font-medium">{Math.floor((thread.likes || 1) / 3)}</span>
            </button>

            <button onClick={handleLike} className={`flex items-center gap-1 transition-colors group ${isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}>
              <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-pink-50' : 'group-hover:bg-pink-50'}`}>
                <Heart size={17} className={isLiked ? 'fill-pink-500' : ''} />
              </div>
              <span className="text-[12px] font-medium">{likesCount}</span>
            </button>

            <div className="flex items-center gap-1">
              <button onClick={handleBookmark} className={`transition-colors group ${isBookmarked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}>
                <div className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-blue-50' : 'group-hover:bg-blue-50'}`}>
                  <Bookmark size={17} className={isBookmarked ? 'fill-blue-500' : ''} />
                </div>
              </button>
              <button onClick={handleShare} className="text-gray-400 hover:text-cyan-500 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-cyan-50 transition-colors">
                  <Share2 size={17} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
