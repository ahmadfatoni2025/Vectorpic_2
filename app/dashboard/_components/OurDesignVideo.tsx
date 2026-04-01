"use client";

import React from 'react';
import { Plus, Pencil, Trash2, Video } from 'lucide-react';

export function OurDesignManagement({ data, onEdit, onDelete }: any) {
  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Design (YouTube Showcase)</h2>
          <p className="text-[14px] text-gray-500 font-medium leading-relaxed">Manage your portfolio designs with YouTube video links for the main section.</p>
        </div>
        <button 
          onClick={() => onEdit(null, 'our-designs')}
          className="px-8 py-3.5 bg-black text-white text-[13px] font-bold rounded-2xl hover:bg-gray-900 transition-all active:scale-95 flex items-center gap-2 shadow-lg"
        >
          <Plus size={18} /> Add New Design
        </button>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {(data.ourDesigns || []).map((item: any) => {
          // Extract YouTube ID for thumbnail
          const videoId = item.youtubeUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

          return (
            <div key={item.id} className="bg-white border border-gray-100 rounded-4xl p-8 group transition-all hover:border-blue-600/20 hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-400 border border-gray-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  {item.tag || 'Design'}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(item, 'our-designs')} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100"><Pencil size={15} /></button>
                  <button onClick={() => onDelete('our-designs', item.id)} className="w-9 h-9 bg-red-50/30 rounded-xl flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"><Trash2 size={15} /></button>
                </div>
              </div>

              <div className="space-y-5 flex-1">
                <div className="aspect-video rounded-3xl overflow-hidden relative bg-gray-50 border border-gray-100 group-hover:border-blue-600/30 transition-all">
                  {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                       <Video size={32} strokeWidth={1} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">No Thumbnail</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                      <Video size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1.5 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-50 text-red-500 rounded-lg">
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 truncate max-w-[140px] uppercase tracking-tighter">YouTube Showcase</span>
                   </div>
                   <div className="text-[11px] font-bold text-gray-300">#{item.id}</div>
                </div>
              </div>
            </div>
          );
        })}

        {(!data.ourDesigns || data.ourDesigns.length === 0) && (
          <div className="col-span-full py-32 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-white rounded-4xl flex items-center justify-center mb-6 shadow-xl shadow-gray-100 border border-gray-50">
               <Video size={36} className="text-gray-200" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Showcase your designs</h3>
            <p className="text-[14px] text-gray-400 font-medium max-w-[320px] leading-relaxed">Add YouTube videos to feature your best design work in the portfolio slider.</p>
          </div>
        )}
      </div>
    </div>
  );
}
