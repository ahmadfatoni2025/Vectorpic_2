"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export function StatCard({ label, val, icon }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 p-5 group transition-all hover:shadow-md hover:shadow-gray-100/50 hover:border-gray-200/60">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100/60 flex items-center justify-center text-gray-400 group-hover:scale-105 group-hover:text-gray-600 transition-all">
          {icon}
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-60" />
      </div>
      <div className="text-3xl font-semibold text-gray-900 tracking-tight mb-1">{val}</div>
      <div className="text-[11px] font-medium text-gray-400 tracking-wide">{label}</div>
    </div>
  );
}

export function SimpleInput({ label, value, onChange, placeholder, type = 'text', description, required }: any) {
  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block tracking-wide uppercase">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white px-3.5 py-2.5 text-[13px] font-medium text-gray-800 rounded-xl border border-gray-200/80 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 outline-none transition-all placeholder:text-gray-300"
        placeholder={placeholder}
      />
      {description && <p className="mt-1 text-[11px] text-gray-400">{description}</p>}
    </div>
  );
}

export function SimpleTextarea({ label, value, onChange, placeholder, required, description }: any) {
  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block tracking-wide uppercase">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white px-3.5 py-2.5 text-[13px] font-medium text-gray-800 rounded-xl border border-gray-200/80 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 outline-none transition-all placeholder:text-gray-300 min-h-[100px] resize-none"
        placeholder={placeholder}
      />
      {description && <p className="mt-1 text-[11px] text-gray-400">{description}</p>}
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
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200/80 bg-gray-50">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity backdrop-blur-xs">
               <button
                 type="button"
                 onClick={() => fileInputRef.current?.click()}
                 className="p-2.5 bg-white text-gray-700 rounded-xl hover:scale-105 transition-transform shadow-lg border border-gray-100"
               >
                 <Upload size={15} />
               </button>
               <button
                 type="button"
                 onClick={() => onChange('')}
                 className="p-2.5 bg-red-500 text-white rounded-xl hover:scale-105 transition-transform shadow-lg"
               >
                 <X size={15} />
               </button>
            </div>
            {uploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 size={22} className="animate-spin text-emerald-500" />
                </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className="w-full py-7 px-4 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-1.5 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer bg-gray-50/30"
          >
            {uploading ? (
                <div className="flex flex-col items-center gap-2">
                   <Loader2 size={22} className="animate-spin text-emerald-500" />
                   <span className="text-[11px] font-semibold text-gray-400">Uploading...</span>
                </div>
            ) : (
                <>
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-gray-300 mb-1 shadow-sm">
                       <Upload size={18} />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-500">Drop file or <span className="text-emerald-600">browse</span></p>
                    <p className="text-[10px] text-gray-400">JPG, PNG or SVG, max 10MB</p>
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
