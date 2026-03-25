"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, MessageCircle } from 'lucide-react';

interface Thread {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  title: string;
  snippet: string;
  category: string;
  categoryColor: string;
  replies: number;
  time: string;
  latestReplyBy: string;
  participants: string[];
}

interface ThreadCardProps {
  thread: Thread;
}

export const ThreadCard = ({ thread }: ThreadCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}
    className="bg-white rounded-3xl p-6 border border-gray-100 flex items-start gap-6 transition-all group cursor-pointer"
  >
    {/* Left: Avatar */}
    <div className="relative shrink-0">
      <img src={thread.user.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt={thread.user.name} />
      <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1 border-2 border-white shadow-xs">
        <Star className="w-2 h-2 text-white fill-current" />
      </div>
    </div>

    {/* Center: Info */}
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-500 transition-colors">
          {thread.title}
        </h3>
      </div>
      <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
        <ArrowRight className="w-3 h-3 -rotate-45" />
        <span>Latest reply from <span className="text-gray-600 font-bold italic">@{thread.latestReplyBy}</span> {thread.time}</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-2 max-w-2xl">
        {thread.snippet}
      </p>
    </div>

    {/* Right: Meta */}
    <div className="flex flex-col items-end gap-3 shrink-0 py-1">
      <div className="flex items-center gap-1.5 self-end mb-1">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: thread.categoryColor }} />
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{thread.category}</span>
      </div>

      <div className="flex items-center -space-x-2">
        {thread.participants.map((p, i) => (
          <img key={i} src={p} className="w-7 h-7 rounded-full border-2 border-white shadow-xs" alt="participant" />
        ))}
        {thread.participants.length > 3 && (
          <div className="w-7 h-7 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
            ...
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-gray-400 mt-1">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs font-bold">{thread.replies} <span className="font-medium text-gray-400/70 ml-1">Comments</span></span>
      </div>
    </div>
  </motion.div>
);
