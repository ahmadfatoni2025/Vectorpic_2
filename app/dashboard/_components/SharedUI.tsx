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

export function SimpleInput({ label, value, onChange, placeholder, type = 'text', description, required }: any) {
  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="text-[13px] font-semibold text-gray-800 mb-1.5 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-gray-50/50 px-4 py-3 text-[13px] font-medium text-gray-700 rounded-xl border border-gray-100/80 focus:bg-white focus:border-gray-200 outline-none transition-all placeholder:text-gray-400"
          placeholder={placeholder}
        />
      </div>
      {description && <p className="mt-1.5 text-[11px] text-gray-400 font-medium">{description}</p>}
    </div>
  );
}

export function SimpleTextarea({ label, value, onChange, placeholder, required, description }: any) {
  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="text-[13px] font-semibold text-gray-800 mb-1.5 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-50/50 px-4 py-3 text-[13px] font-medium text-gray-700 rounded-xl border border-gray-100/80 focus:bg-white focus:border-gray-200 outline-none transition-all placeholder:text-gray-400 min-h-[100px] resize-none"
        placeholder={placeholder}
      />
      {description && <p className="mt-1.5 text-[11px] text-gray-400 font-medium">{description}</p>}
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
    <div className="w-full text-left font-sans">
      <div className="relative group">
        {value ? (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
               <button 
                 type="button"
                 onClick={() => fileInputRef.current?.click()}
                 className="p-2.5 bg-white text-black rounded-lg hover:scale-110 transition-transform shadow-lg"
               >
                 <Upload size={16} />
               </button>
               <button 
                 type="button"
                 onClick={() => onChange('')}
                 className="p-2.5 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform shadow-lg"
               >
                 <X size={16} />
               </button>
            </div>
            {uploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-black" />
                </div>
            )}
          </div>
        ) : (
          <div
            className="w-full py-8 px-6 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center gap-2 group-hover:border-gray-400 transition-all bg-white"
          >
            {uploading ? (
                <div className="flex flex-col items-center gap-2">
                   <Loader2 size={24} className="animate-spin text-gray-400" />
                   <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Uploading...</span>
                </div>
            ) : (
                <>
                    <div className="text-gray-400 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <div>
                       <p className="text-[13px] font-semibold text-gray-700">Select a file or drag and drop here</p>
                       <p className="text-[11px] text-gray-400 mt-0.5">JPG, PNG or SVG, file size no more than 10MB</p>
                       <button
                         type="button"
                         onClick={() => fileInputRef.current?.click()}
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                       >
                         Click to browse
                       </button>
                    </div>
                </>
            )}
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
