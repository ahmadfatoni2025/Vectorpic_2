"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

export function StatCard({ label, val, icon }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 group transition-all hover:border-black/10">
      <div className="flex items-center gap-4 text-gray-400 mb-6">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-4xl font-light text-gray-900 tracking-tight">{val}</div>
    </div>
  );
}

export function SimpleInput({ label, value, onChange, placeholder, type = 'text' }: any) {
  return (
    <div className="w-full text-left">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-50 px-5 py-4 text-xs font-bold rounded-2xl border-2 border-transparent focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-300"
        placeholder={placeholder}
      />
    </div>
  );
}
export function ImageUploadInput({ label, value, onChange }: any) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">{label}</label>
      
      <div className="relative group">
        {value ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-black transition-all">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
               <button 
                 type="button"
                 onClick={() => fileInputRef.current?.click()}
                 className="p-3 bg-white text-black rounded-xl hover:scale-110 transition-transform shadow-xl"
               >
                 <Upload size={18} />
               </button>
               <button 
                 type="button"
                 onClick={() => onChange('')}
                 className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform shadow-xl"
               >
                 <X size={18} />
               </button>
            </div>
            {uploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-black" />
                </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-black hover:text-black hover:bg-gray-50/50 transition-all overflow-hidden relative"
          >
            {uploading ? (
                <Loader2 size={28} className="animate-spin text-black" />
            ) : (
                <>
                    <ImageIcon size={32} strokeWidth={1} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Select Image</span>
                </>
            )}
          </button>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      <div className="mt-3 relative">
        <input 
          type="text" 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste direct image URL here..."
          className="w-full bg-gray-50/50 px-5 py-3 text-[10px] font-bold rounded-xl border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all placeholder:text-gray-300 font-sans"
        />
      </div>
    </div>
  );
}
