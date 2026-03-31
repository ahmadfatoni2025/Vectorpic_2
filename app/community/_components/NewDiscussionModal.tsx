"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Type, Layout, MessageSquare, Plus, Trash2, Star } from 'lucide-react';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewDiscussionModal = ({ isOpen, onClose }: NewDiscussionModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    title: "CRM Layout Draft",
    category: "ON BOARDING",
    description: "Designing the basic structure of the CRM dashboard. Focus on organizing customer dat..."
  });

  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file: file,
      preview: URL.createObjectURL(file)
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Images:', uploadedImages);
    alert('Discussion started successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            // Prevent click from closing modal
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Start a Discussion</h2>
                <p className="text-sm text-gray-500 mt-1">Share your thoughts, ask questions, or start a conversation</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto p-6 overscroll-contain">
              <div className="space-y-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discussion Title <span className="text-red-500">*</span>
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter discussion title..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                {/* Category & Visibility Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 appearance-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                      >
                        <option value="ON BOARDING">On Boarding</option>
                        <option value="FEEDBACK">Feedback</option>
                        <option value="ANNOUNCEMENTS">Announcements</option>
                        <option value="OFF-TOPIC">Off-Topic</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Visibility
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 appearance-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                      >
                        <option>Public</option>
                        <option>Followers Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <textarea
                      placeholder="Enter discussion description..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attachments
                  </label>

                  {/* Uploaded Images Grid */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <img
                            src={img.preview}
                            className="w-full h-full object-cover"
                            alt={`Upload ${idx + 1}`}
                          />
                          <button
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-all bg-gray-50 hover:bg-blue-50/30"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-sm font-medium">Upload Images</span>
                    <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-white border-t border-gray-100 px-6 py-4 flex gap-3 shrink-0">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Start Discussion</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};