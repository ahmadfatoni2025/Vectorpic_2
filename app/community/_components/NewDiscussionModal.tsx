"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Image as ImageIcon, Type, Layout, MessageSquare } from 'lucide-react';
import { PostCardPreview } from './PostCardPreview';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewDiscussionModal = ({ isOpen, onClose }: NewDiscussionModalProps) => {
  const [formData, setFormData] = useState({
    title: "CRM Layout Draft",
    category: "ON BOARDING",
    description: "Designing the basic structure of the CRM dashboard. Focus on organizing customer dat..."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-[#F8FAFD] rounded-[3rem] shadow-2xl z-50 overflow-hidden flex flex-col lg:flex-row min-h-[600px]"
          >
            {/* Left Side: Form */}
            <div className="flex-1 bg-white p-8 lg:p-12 space-y-8 overflow-y-auto max-h-[90vh] lg:max-h-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                    Create <span className="text-blue-500">Post</span>
                  </h2>
                  <p className="text-gray-400 font-medium mt-2">Fill in the details to share with the community</p>
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Title</label>
                  <div className="relative">
                    <Type className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter title..."
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 text-gray-900 font-bold placeholder:text-gray-200 focus:bg-white focus:border-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Category</label>
                  <div className="relative">
                    <Layout className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-10 text-gray-900 font-bold appearance-none focus:bg-white focus:border-blue-100 outline-none transition-all cursor-pointer"
                    >
                      <option>ON BOARDING</option>
                      <option>Introductions</option>
                      <option>Announcements</option>
                      <option>Feedback</option>
                      <option>Off-Topic Chatter</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more..."
                    className="w-full bg-gray-50 border-2 border-transparent rounded-3xl p-6 text-gray-900 font-medium placeholder:text-gray-200 focus:bg-white focus:border-blue-100 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-8 py-5 rounded-2xl text-gray-400 font-bold bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-5 rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all active:scale-95"
                    onClick={(e) => { e.preventDefault(); onClose(); }}
                  >
                    <Send className="w-5 h-5" />
                    Upload Post
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side: Live Preview (The requested UI) */}
            <div className="lg:w-[400px] bg-[#F1F5F9] p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full -ml-16 -mb-16 blur-3xl" />
              
              <div className="relative z-10 w-full">
                <div className="mb-10 text-center">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">Live Preview</span>
                  <h3 className="text-xl font-bold text-gray-800">Your Post Card</h3>
                </div>

                <PostCardPreview 
                  title={formData.title}
                  description={formData.description}
                  category={formData.category}
                  date="Sept, 17"
                />

                <div className="mt-12 text-center text-gray-400 text-sm font-medium">
                  This is how your post will appear <br /> in the community feed.
                </div>
              </div>

              <button
                onClick={onClose}
                className="hidden lg:flex absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white shadow-sm items-center justify-center text-gray-400 hover:text-rose-500 transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
