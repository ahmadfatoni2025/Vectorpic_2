"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface StartDiscussionButtonProps {
  onClick: () => void;
}

export const StartDiscussionButton = ({ onClick }: StartDiscussionButtonProps) => {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-white font-bold py-6 rounded-3xl shadow-2xl shadow-blue-400/30 flex items-center justify-center gap-4 transition-all group overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      <div className="bg-white/20 p-2 rounded-xl group-hover:scale-110 transition-transform">
        <Plus className="w-5 h-5 text-white" />
      </div>
      <span className="text-lg tracking-tight relative z-10">Start New Discussion</span>
    </motion.button>
  );
};
