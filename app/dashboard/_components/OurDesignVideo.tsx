"use client";

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Video, X } from 'lucide-react';

export function OurDesignManagement({ data, onEdit, onDelete }: any) {
  const [previewVideo, setPreviewVideo] = useState<any>(null);
  return (
    <div className="space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900">Our Design</h2>
          <p className="text-[12px] text-gray-400 mt-0.5">YouTube Showcase for your portfolio designs.</p>
        </div>
        <button
          onClick={() => onEdit(null, 'our-designs')}
          className="px-4 py-2 bg-gray-900 text-white text-[12px] font-medium rounded-xl hover:bg-gray-800 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={14} /> Add Design
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data.ourDesigns || []).map((item: any, index: number) => {
          const videoId = item.youtubeUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : (item.youtubeUrl?.startsWith('http') || item.youtubeUrl?.startsWith('/') ? item.youtubeUrl : null);
          const isVideo = thumbnailUrl?.match(/\.(mp4|webm)$/i);

          return (
            <div key={item.id || index} className="bg-white border border-gray-100/80 rounded-2xl p-4 group transition-all hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/50 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-50 text-gray-500 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                  {item.tag || 'Design'}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => onEdit(item, 'our-designs')} className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all">
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => onDelete('our-designs', item.id)} className="w-7 h-7 bg-red-50/50 border border-red-100/50 rounded-lg flex items-center justify-center text-red-300 hover:text-red-500 transition-all">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div 
                  className="aspect-video rounded-xl overflow-hidden relative bg-gray-50 border border-gray-100/80 cursor-pointer"
                  onClick={() => setPreviewVideo(item)}
                >
                  {thumbnailUrl ? (
                    isVideo ? (
                      <video src={thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop playsInline autoPlay />
                    ) : (
                      <img src={thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-1">
                      <Video size={24} strokeWidth={1.5} />
                      <span className="text-[10px] font-medium">No Thumbnail</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500">
                      <Video size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[14px] font-semibold text-gray-800 mb-1 leading-snug">{item.title}</h4>
                  <p className="text-[12px] text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 bg-red-50 text-red-500 rounded-md">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">YouTube</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-300">#{item.id || index}</span>
                </div>
              </div>
            </div>
          );
        })}

        {(!data.ourDesigns || data.ourDesigns.length === 0) && (
          <div className="col-span-full py-16 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center px-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Video size={24} className="text-gray-300" strokeWidth={1.5} />
            </div>
            <h3 className="text-[14px] font-semibold text-gray-700 mb-1">Showcase your designs</h3>
            <p className="text-[12px] text-gray-400 max-w-[260px]">Add YouTube videos to feature your best design work.</p>
          </div>
        )}
      </div>

      {previewVideo && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewVideo(null)}>
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setPreviewVideo(null)} 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 hover:bg-red-500/90 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
            >
              <X size={20} />
            </button>
            {(() => {
              const videoId = previewVideo.youtubeUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
              if (videoId) {
                return (
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                    className="w-full aspect-video" 
                    allowFullScreen 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  />
                );
              } else if (previewVideo.youtubeUrl?.match(/\.(mp4|webm)$/i)) {
                return <video src={previewVideo.youtubeUrl} className="w-full aspect-video" controls autoPlay />;
              } else if (previewVideo.youtubeUrl) {
                return <img src={previewVideo.youtubeUrl} className="w-full object-contain max-h-[80vh] bg-gray-900" />;
              }
              return <div className="w-full aspect-video flex items-center justify-center text-gray-500 bg-gray-900 font-medium">No Media Available</div>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
