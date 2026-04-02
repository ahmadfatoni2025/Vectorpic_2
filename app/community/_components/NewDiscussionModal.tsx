"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Layout, Plus, Trash2, Image as ImageIcon, Globe, Users, Lock } from 'lucide-react';

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
    title: "",
    category: "GENERAL",
    description: "",
    visibility: "Public"
  });

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          if (data && data.length > 0) {
            setFormData(prev => ({ ...prev, category: data[0].slug }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      alert("Please fill in both title and description.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload images first
      const imageUrls: string[] = [];
      for (const img of uploadedImages) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', img.file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageUrls.push(url);
        }
      }

      // 2. Create the discussion with the real image URLs
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: imageUrls
        }),
      });

      if (response.ok) {
        onClose();
        // Reset form
        setFormData({ title: "", category: "GENERAL", description: "", visibility: "Public" });
        setUploadedImages([]);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create post'}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            className="absolute inset-0 bg-[#334155]/20 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white px-8 pt-8 pb-4 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Post</h2>
                <p className="text-[14px] text-gray-400 mt-1 font-medium italic">Share your work or start a discussion</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-cyan-50 flex items-center justify-center text-gray-400 hover:text-[#04cce7] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto px-8 py-4 overscroll-contain">
              <div className="space-y-6">
                
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-700 ml-1">
                    Post Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a title..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-cyan-100 outline-none transition-all font-medium"
                  />
                </div>

                {/* Category & Visibility */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">Category</label>
                    <div className="relative">
                      <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-gray-900 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-100 outline-none transition-all cursor-pointer font-medium"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                        {categories.length === 0 && (
                          <>
                            <option value="SHOWCASE">Showcase</option>
                            <option value="FEEDBACK">Feedback</option>
                            <option value="TUTORIAL">Tutorial</option>
                            <option value="Q&A">Q&A</option>
                            <option value="ANNOUNCEMENTS">Announcements</option>
                            <option value="GENERAL">General</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">Visibility</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
                      <select
                        name="visibility"
                        value={formData.visibility}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-gray-900 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-100 outline-none transition-all cursor-pointer font-medium"
                      >
                        <option value="Public">Public</option>
                        <option value="Followers Only">Followers Only</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-700 ml-1">Post Content</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What's on your mind?..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-cyan-100 outline-none transition-all resize-none font-medium"
                  />
                </div>

                {/* Images Upload */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[14px] font-bold text-gray-700">Images</label>
                    <span className="text-[12px] text-gray-400 font-medium">PNG, JPG, GIF</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                        <img src={img.preview} className="w-full h-full object-cover" alt={`p-${idx}`} />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 bg-[#04cce7]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-2xl border-2 border-dashed border-cyan-100 flex flex-col items-center justify-center gap-2 text-cyan-300 hover:bg-cyan-50 hover:border-cyan-200 transition-all active:scale-95"
                    >
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-[11px] font-bold">Add Image</span>
                    </button>
                  </div>
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

            {/* Footer */}
            <div className="bg-white px-8 py-8 flex gap-4 shrink-0">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-4 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] bg-[#04cce7] hover:bg-cyan-500 text-white font-bold px-4 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-100 active:scale-95 disabled:grayscale"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Publish Post</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};