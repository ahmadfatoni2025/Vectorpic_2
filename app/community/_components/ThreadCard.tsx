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
  isQuestion?: boolean;
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
    setLikesCount(prev => newLiked ? prev + 1 : Math.max(0, prev - 1));

    try {
      await fetch(`/api/discussions/${thread.id}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reactionType: "like", sessionId })
      });
    } catch (error) {
      console.error("Failed to toggle like:", error);
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
    await navigator.clipboard.writeText(url);
    alert("Discussion link copied to clipboard!");
  };

  if (thread.isQuestion) {
    return (
      <div 
        onClick={() => onOpenThread(thread)}
        className="bg-white rounded-3xl p-8 border-l-4 border-l-[#FF4D00] border-y border-r border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#FF4D00]">
             <span className="text-xl font-bold italic">?</span>
          </div>
          <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Question from {thread.category} Community
          </div>
        </div>

        <h3 className="text-[19px] font-black text-gray-900 leading-tight mb-4 group-hover:text-[#FF4D00] transition-colors font-sans">
          {thread.title}
        </h3>
        
        <p className="text-[15px] text-gray-500 leading-relaxed font-medium mb-8">
          {thread.snippet}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onOpenThread(thread); }}
              className="px-6 py-2.5 bg-[#FFF5F0] text-[#FF4D00] rounded-xl text-[13px] font-bold hover:bg-[#FF4D00] hover:text-white transition-all"
            >
              Answer this
            </button>
            <span className="text-[13px] text-gray-400 font-bold">{Math.floor(Math.random() * 20)+5} people are following this</span>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={handleBookmark} className={`p-2 rounded-lg transition-all ${isBookmarked ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}>
                <Bookmark size={18} className={isBookmarked ? "fill-current" : ""} />
             </button>
             <button onClick={handleShare} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <Share2 size={18} strokeWidth={2.5} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onOpenThread(thread)} 
      className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group"
    >
      {/* Post Header Meta */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
            <img src={thread.user.avatar} className="w-full h-full object-cover" alt="" />
          </div>
          <div>
            <span className="text-[14px] font-black text-gray-900 group-hover:text-[#FF4D00] transition-colors">{thread.user.name}</span>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
               <span>Posted in {thread.category}</span>
               <span>•</span>
               <span className="text-gray-300">{thread.time}</span>
            </div>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); alert("Option menu coming soon"); }} className="text-gray-300 hover:text-gray-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Title */}
      <h3 className="text-[20px] font-black text-gray-900 leading-[1.2] mb-4 tracking-tight group-hover:text-[#FF4D00] transition-colors">
        {thread.title}
      </h3>

      {/* Post Snippet */}
      <p className="text-[15px] text-gray-600 leading-relaxed font-medium mb-6 line-clamp-3">
        {thread.snippet}
      </p>

      {/* Post Image */}
      {hasImage && (
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-gray-50 border border-gray-100">
          <img src={thread.images![0].imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Post content" />
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[thread.category, "Showcase", "Inspiration"].map(tag => (
          <span 
            key={tag} 
            onClick={(e) => { e.stopPropagation(); alert(`Searching for tag: ${tag}`); }}
            className="px-3 py-1 bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-widest rounded-lg border border-transparent hover:border-gray-200 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
             <button onClick={handleLike} className="flex items-center gap-2 pl-4 pr-3 py-1.5 hover:text-[#FF4D00] transition-colors border-r border-gray-200 group/like">
                <Heart size={16} strokeWidth={3} className={isLiked ? "fill-[#FF4D00] text-[#FF4D00]" : "group-hover/like:text-[#FF4D00]"} />
                <span className={`text-[13px] font-black tracking-tight ${isLiked ? "text-[#FF4D00]" : ""}`}>{likesCount > 1000 ? `${(likesCount/1000).toFixed(1)}k` : likesCount}</span>
             </button>
             <button onClick={(e) => { e.stopPropagation(); alert("Downvoted"); }} className="px-3 py-1.5 text-gray-300 hover:text-gray-600 transition-colors">
                <Heart size={16} strokeWidth={3} className="rotate-180" />
             </button>
          </div>
          
          <button onClick={(e) => { e.stopPropagation(); onOpenThread(thread); }} className="flex items-center gap-2.5 text-gray-400 hover:text-gray-900 transition-colors group/comment">
             <MessageSquare size={18} strokeWidth={2.5} className="group-hover/comment:scale-110 transition-transform" />
             <span className="text-[13px] font-bold">{thread.replies || 0} comments</span>
          </button>
        </div>

        <button onClick={handleShare} className="text-gray-300 hover:text-gray-900 transition-all hover:scale-110">
           <Share2 size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
