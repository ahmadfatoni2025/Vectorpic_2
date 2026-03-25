"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Link2, Folder, Plus, MoreHorizontal } from 'lucide-react';

interface PostCardPreviewProps {
  title?: string;
  description?: string;
  category?: string;
  date?: string;
  commentCount?: number;
  linkCount?: number;
  fileCount?: number;
}

export const PostCardPreview = ({
  title = "CRM Layout Draft",
  description = "Designing the basic structure of the CRM dashboard. Focus on organizing customer dat...",
  category = "ON BOARDING",
  date = "Sept, 17",
  commentCount = 8,
  linkCount = 4,
  fileCount = 12
}: PostCardPreviewProps) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 font-sans">
        {/* Blue Header */}
        <div className="bg-[#38BDF8] py-2 px-4 flex justify-center items-center">
          <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
            {category}
          </span>
        </div>

        {/* Interior Card with Dashed Border */}
        <div className="p-4">
          <div className="border-2 border-dashed border-gray-100 rounded-[1.5rem] p-5 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {title}
              </h3>
              <span className="text-sm text-gray-300 font-medium whitespace-nowrap ml-2">
                {date}
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>

            <div className="flex items-center justify-between pt-2">
              {/* Avatars */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?u=${i + 10}`}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    alt="avatar"
                  />
                ))}
              </div>

              {/* Status Badge */}
              <div className="bg-emerald-50 text-emerald-500 text-[10px] font-bold px-4 py-2 rounded-xl">
                In Progress
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 pb-4 flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 hover:bg-white rounded-xl border border-gray-100 transition-colors group">
              <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              <span className="text-[10px] font-bold text-gray-400">
                <span className="text-gray-900">{commentCount}</span> Comment
              </span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 hover:bg-white rounded-xl border border-gray-100 transition-colors group">
              <Link2 className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
              <span className="text-[10px] font-bold text-gray-400">
                <span className="text-gray-900">{linkCount}</span> Link
              </span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 hover:bg-white rounded-xl border border-gray-100 transition-colors group">
              <Folder className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
              <span className="text-[10px] font-bold text-gray-400">
                <span className="text-gray-900">{fileCount}</span> File
              </span>
            </button>
          </div>
          
          <button className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-white rounded-xl border border-gray-100 transition-colors group">
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};
