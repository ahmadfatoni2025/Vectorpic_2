"use client";

import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Repeat,
  Flame,
  ThumbsUp,
  Eye,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Thread {
  id: string;
  user: { name: string; avatar: string; role?: string; handle?: string; };
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
  onOpenThread?: (thread: Thread) => void;
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 hover:bg-gray-50/70 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0 group"
      onClick={() => onOpenThread?.(thread)}
    >
      <div className="flex gap-3">
        {/* Left: Avatar */}
        <div className="shrink-0">
          {thread.user.avatar && (
            <img
              src={thread.user.avatar}
              className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
              alt={thread.user.name}
            />
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[15px] font-bold text-gray-900 truncate hover:underline">
                {thread.user.name}
              </span>
              {thread.user.role === 'Expert' && <CheckCircle2 size={15} className="text-[#FF4D00]" fill="currentColor" />}
              <span className="text-[14px] text-gray-500 truncate ml-0.5">{thread.user.handle || `@${thread.user.name.toLowerCase().replace(/\s/g, '_')}`}</span>
              <span className="text-[14px] text-gray-400 mx-1">·</span>
              <span className="text-[14px] text-gray-500 hover:underline">{thread.time}</span>
            </div>
            <button className="p-1.5 text-gray-500 hover:text-[#FF4D00] hover:bg-orange-50 rounded-full transition-all">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Title & Body */}
          <div className="space-y-1 mb-3">
            {thread.title && thread.category !== 'GENERAL' && (
              <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                {thread.title}
              </h3>
            )}
            <p className="text-[15px] text-gray-900 leading-[1.4] whitespace-pre-wrap wrap-break-word">
              {thread.snippet}
            </p>
          </div>

          {/* Image */}
          {hasImage && thread.images![0].imageUrl && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={thread.images![0].imageUrl}
                className="w-full h-auto max-h-[512px] object-cover"
                alt="Post content"
              />
            </div>
          )}

          {/* Interactions */}
          <div className="flex items-center justify-between max-w-[425px] -ml-2 text-gray-500">
            <button 
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-orange-50 hover:text-[#FF4D00] rounded-full transition-all group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare size={18} className="group-hover/btn:scale-110 transition-transform" />
              <span className="text-[13px]">{thread.replies || 0}</span>
            </button>
            
            <button 
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-green-50 hover:text-green-600 rounded-full transition-all group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              <Repeat size={18} className="group-hover/btn:scale-110 transition-transform" />
              <span className="text-[13px]">45</span>
            </button>

            <button 
              className={`flex items-center gap-2 px-2 py-1.5 rounded-full transition-all group/btn ${isLiked ? 'text-pink-600' : 'hover:bg-pink-50 hover:text-pink-600'}`}
              onClick={(e) => { e.stopPropagation(); handleLike(); }}
            >
              <Heart size={18} className={`group-hover/btn:scale-110 transition-transform ${isLiked ? 'fill-pink-600' : ''}`} />
              <span className="text-[13px]">{likesCount}</span>
            </button>

            <button 
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-blue-50 hover:text-blue-500 rounded-full transition-all group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              <BarChart3 size={18} className="group-hover/btn:scale-110 transition-transform" />
              <span className="text-[13px]">{thread.views || '1.2k'}</span>
            </button>

            <div className="flex items-center gap-0">
               <button 
                className={`p-2 rounded-full transition-all hover:bg-blue-50 hover:text-blue-500 ${isBookmarked ? 'text-blue-500' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }}
              >
                <Bookmark size={18} className={isBookmarked ? 'fill-blue-500' : ''} />
              </button>
               <button 
                className="p-2 hover:bg-blue-50 hover:text-blue-500 rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); handleShare(); }}
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
