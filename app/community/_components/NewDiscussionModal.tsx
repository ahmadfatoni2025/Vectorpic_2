"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Plus, Trash2, Image as ImageIcon, SlidersHorizontal, ChevronDown, Mic, Sparkles, XCircle, Paperclip } from 'lucide-react';

interface NewDiscussionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const NewDiscussionModal = ({ isOpen, setIsOpen }: NewDiscussionModalProps) => {
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "GENERAL",
    description: "",
    visibility: "Public"
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const titleInput = document.getElementById('discussion-title');
        titleInput?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'description' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.title || !formData.description) return;

    setIsSubmitting(true);
    try {
      const imageUrls: string[] = [];
      for (const img of uploadedImages) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', img.file);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageUrls.push(url);
        }
      }

      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, images: imageUrls }),
      });

      if (response.ok) {
        onClose();
        setFormData({ title: "", category: "GENERAL", description: "", visibility: "Public" });
        setUploadedImages([]);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center pointer-events-none px-4 pb-4 md:pb-10">
      
      {/* Backdrop for Expanded State */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 backdrop-blur-[1px] pointer-events-auto z-[-1]"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={false}
        className="relative w-full max-w-2xl pointer-events-auto flex flex-col items-center gap-4"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* RESTING STATE: Compact Bar */
            <motion.div
              key="resting-bar"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={onOpen}
              className="w-full bg-[#1e1f20] hover:bg-[#2a2b2d] rounded-full border border-[#333537] shadow-xl px-6 py-3 cursor-pointer flex items-center justify-between group transition-all"
            >
              <span className="text-[#8e9196] text-[15px] group-hover:text-[#e3e3e3] transition-colors">Apa yang ingin kamu bahas hari ini?</span>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#8e9196]" />
                <Plus className="w-4 h-4 text-[#8e9196]" />
                <div className="w-6 h-6 rounded-full bg-linear-to-tr from-[#4285f4] via-[#9b72cb] to-[#d96570] opacity-80" />
              </div>
            </motion.div>
          ) : (
            /* EXPANDED STATE: Full Prompt Box */
            <motion.div
              key="expanded-box"
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full bg-[#1e1f20] rounded-[28px] border border-[#333537] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col"
            >
              {/* Header: Minta Vectorpic & Icons */}
              <div className="px-6 pt-5 pb-1 flex items-center justify-between">
                <span className="text-[#e3e3e3] text-[15px] font-medium tracking-wide">Minta Vectorpic</span>
                <div className="flex items-center gap-1">
                   <div className="w-6 h-6 rounded-full bg-[#1e1f20] border border-[#333537] flex items-center justify-center">
                     <Sparkles className="w-3 h-3 text-[#9b72cb]" />
                   </div>
                   <div className="w-6 h-6 rounded-full bg-[#1e1f20] border border-[#333537] flex items-center justify-center overflow-hidden">
                     <div className="w-full h-full bg-linear-to-tr from-[#4285f4] via-[#9b72cb] to-[#d96570] opacity-80" />
                   </div>
                </div>
              </div>

              {/* Input Workspace */}
              <div className="px-6 py-2 flex flex-col gap-1 max-h-[50vh] overflow-y-auto custom-scrollbar">
                <input
                  id="discussion-title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Beri judul diskusi..."
                  className="w-full bg-transparent border-none text-[#e3e3e3] text-lg font-medium placeholder:text-[#8e9196]/50 focus:ring-0 outline-none"
                />
                
                <textarea
                  ref={textareaRef}
                  name="description"
                  rows={1}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Apa yang ingin kamu bahas hari ini?"
                  className="w-full bg-transparent border-none text-[#e3e3e3] text-[15px] placeholder:text-[#8e9196] focus:ring-0 outline-none resize-none leading-normal min-h-[40px]"
                />

                {/* Image Previews */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 py-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative group w-16 h-16 rounded-xl overflow-hidden border border-[#333537]">
                        <img src={img.preview} className="w-full h-full object-cover" alt="prev" />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toolbar: + Alat ... Pro Mic */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-[#333537]/30">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-10 h-10 rounded-full hover:bg-[#333537] flex items-center justify-center text-[#e3e3e3] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <div className="relative group/cat">
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-[#333537] transition-colors cursor-pointer text-[#e3e3e3]">
                      <SlidersHorizontal className="w-4 h-4 text-[#8e9196]" />
                      <span className="text-[13px] font-medium">
                        {categories.find(c => c.slug === formData.category)?.name || 'Alat'}
                      </span>
                    </div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                      {categories.length === 0 && <option value="GENERAL">General</option>}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="relative group/vis">
                    <div className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-[#333537] transition-colors cursor-pointer text-[#e3e3e3]">
                      <span className="text-[13px] font-medium">
                        {formData.visibility === 'Public' ? 'Pro' : formData.visibility}
                      </span>
                      <ChevronDown className="w-3 h-3 text-[#8e9196] mt-0.5" />
                    </div>
                    <select
                      name="visibility"
                      value={formData.visibility}
                      onChange={handleChange}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    >
                      <option value="Public">Public</option>
                      <option value="Followers Only">Followers Only</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                  <button className="w-10 h-10 rounded-full hover:bg-[#333537] flex items-center justify-center text-[#e3e3e3] transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.title || !formData.description}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isSubmitting || !formData.title || !formData.description
                      ? 'text-[#4d4d4d]' 
                      : 'text-white hover:bg-[#333537]'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-3.5 h-3.5 border-2 border-[#4d4d4d] border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" multiple accept="image/*" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer Text */}
        <p className="text-[11px] text-[#8e9196] font-normal opacity-80 text-center tracking-tight">
          Vectorpic adalah platform komunitas dan dapat menampilkan konten yang bervariasi.
          {isOpen && <button onClick={onClose} className="ml-2 underline hover:text-[#e3e3e3] transition-colors">Tutup</button>}
        </p>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333537; border-radius: 10px; }
      `}</style>
    </div>
  );
};