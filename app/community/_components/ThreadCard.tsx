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
  reactions?: { icon: string; count: number }[];
  views?: string;
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev: number) => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: thread.title,
        text: thread.snippet,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm transition-all hover:shadow-md group"
    >
      {/* Header: User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={thread.user.avatar}
            className="w-10 h-10 rounded-full object-cover border border-gray-50"
            alt={thread.user.name}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-gray-900 leading-none hover:text-[#04cce7] cursor-pointer transition-colors">
                {thread.user.name}
              </span>
              {thread.user.role === 'Expert' && (
                <div className="bg-cyan-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#04cce7] border border-cyan-100">
                  EXPERT
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[12px] text-gray-400 font-medium">{thread.time}</span>
              <div className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
              <span className="text-[12px] font-bold text-gray-400">{thread.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-xl border border-cyan-100 bg-cyan-50/30 text-[12px] font-bold text-[#04cce7] hover:bg-[#04cce7] hover:text-white transition-all active:scale-95">
            Follow
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content: Title & Snippet */}
      <div className="space-y-2.5 mb-4 px-1">
        <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-tight group-hover:text-[#04cce7] transition-colors cursor-pointer">
          {thread.title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-normal line-clamp-3">
          {thread.snippet}
        </p>
      </div>

      {/* Image if available */}
      {hasImage && (
        <div className="mb-5 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group/img relative">
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors z-10 pointer-events-none" />
          <img
            src={thread.images![0].imageUrl}
            className="w-full object-cover max-h-[450px] transition-transform duration-500 group-hover/img:scale-105"
            alt="thread content"
          />
        </div>
      )}

      {/* Footer: Reactions & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-50 mt-2 gap-4">
        <div className="flex items-center gap-2">
          {/* Reaction Buttons */}
          <button
            onClick={handleLike}
            className={`flex items-center rounded-full px-3.5 py-2 gap-2 border transition-all active:scale-95 ${isLiked ? 'bg-cyan-50 border-cyan-200 text-[#04cce7]' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#04cce7]' : ''}`} />
            <span className="text-[13px] font-bold">{likesCount}</span>
          </button>

          <button className="flex items-center bg-gray-50 rounded-full px-3.5 py-2 gap-2 border border-gray-100 text-gray-500 hover:bg-gray-100 transition-all active:scale-95 font-medium">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span className="text-[13px] font-bold">45</span>
          </button>

          <button className="flex items-center bg-gray-50 rounded-full px-3.5 py-2 gap-2 border border-gray-100 text-gray-500 hover:bg-gray-100 transition-all active:scale-95 font-medium">
            <ThumbsUp className="w-4 h-4 text-blue-400 fill-blue-400" />
            <span className="text-[13px] font-bold">12</span>
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-4 md:gap-6">
          <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-500 transition-colors group/btn">
            <div className="p-2 border border-transparent group-hover/btn:bg-cyan-50 group-hover/btn:border-cyan-100 rounded-xl transition-all">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold">{thread.replies || 0}</span>
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-2 transition-colors group/btn ${isBookmarked ? 'text-cyan-500' : 'text-gray-400 hover:text-cyan-500'}`}
          >
            <div className={`p-2 border rounded-xl transition-all ${isBookmarked ? 'bg-cyan-50 border-cyan-100' : 'border-transparent group-hover/btn:bg-cyan-50 group-hover/btn:border-cyan-100'}`}>
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-500' : ''}`} />
            </div>
            <span className="text-[13px] font-bold">Save</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-500 transition-colors group/btn"
          >
            <div className="p-2 border border-transparent group-hover/btn:bg-cyan-50 group-hover/btn:border-cyan-100 rounded-xl transition-all">
              <Share2 className="w-4 h-4" />
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-gray-300 ml-2">
            <Eye className="w-4 h-4" />
            <span className="text-[12px] font-bold">2.5k</span>
          </div>
        </div>
      </div>
    </div>
  );
};
