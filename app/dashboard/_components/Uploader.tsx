"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleInput, ImageUploadInput, SimpleTextarea } from './SharedUI';

export function Uploader({ isOpen, onClose, data, onAction, onSwitchTab }: any) {
  const [uploadData, setUploadData] = useState<any>({ title: '', imageUrl: '', categoryId: '', description: '', isPremium: false });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-black/40 backdrop-blur-md" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
        className="relative w-full max-w-xl bg-white p-0 rounded-3xl shadow-2xl overflow-hidden font-sans border border-gray-100"
      >
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-1">
             <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 border border-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
             </div>
             <h2 className="text-xl font-bold text-black tracking-tight">Create New Asset</h2>
          </div>
          <p className="text-[14px] text-gray-400 font-medium ml-11">Set up a new project to start organizing your team&apos;s work.</p>
        </div>

        <form 
          className="flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            const success = await onAction('POST', '/api/vectors', uploadData);
            if (success) {
              setUploadData({ title: '', imageUrl: '', categoryId: '', description: '', isPremium: false });
              onClose();
              if (onSwitchTab) onSwitchTab('assets');
            }
          }}
        >
          <div className="px-8 pb-8 space-y-6 max-h-[600px] overflow-y-auto no-scrollbar">
            <div className="mb-4">
              <ImageUploadInput 
                 value={uploadData.imageUrl} 
                 onChange={(v: string) => setUploadData({...uploadData, imageUrl: v})} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SimpleInput 
                label="Project Name" 
                value={uploadData.title} 
                onChange={(v: string) => setUploadData({...uploadData, title: v})} 
                required 
                placeholder="Enter project name" 
              />
              <div>
                <label className="text-[13px] font-semibold text-gray-800 mb-1.5 block">Category</label>
                <select 
                  value={uploadData.categoryId} 
                  onChange={e => setUploadData({...uploadData, categoryId: Number(e.target.value)})}
                  className="w-full bg-gray-50/50 px-4 py-3 text-[13px] font-medium text-gray-700 rounded-xl border border-gray-100/80 focus:bg-white focus:border-gray-200 outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  {data.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <SimpleTextarea 
              label="Description" 
              value={uploadData.description} 
              onChange={(v: string) => setUploadData({...uploadData, description: v})} 
              required 
              placeholder="Describe the project goals and scope" 
            />

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                checked={uploadData.isPremium} 
                onChange={e => setUploadData({...uploadData, isPremium: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label className="text-[14px] text-gray-600 font-medium">Mark as premium asset</label>
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 bg-white border border-gray-100 text-gray-700 text-[14px] font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-black text-white text-[14px] font-bold rounded-xl hover:bg-gray-900 transition-all active:scale-95 shadow-lg flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save project
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
