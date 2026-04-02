"use client";

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Video, X, Play, Quote, User, Briefcase, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function VideoProfileSection({ data, onEdit, onDelete }: any) {
  const [previewVideo, setPreviewVideo] = useState<any>(null);

  return (
    <div className="space-y-6 font-sans">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-[24px] border border-gray-100/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Video size={18} strokeWidth={2.5} />
            </div>
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Video Profiles</h2>
          </div>
          <p className="text-[13px] text-gray-400 font-medium">Create engaging video testimonials and feature highlights for your home page.</p>
        </div>
        <button
          onClick={() => onEdit(null, 'video-profiles')}
          className="px-5 py-2.5 bg-gray-900 text-white text-[13px] font-bold rounded-xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} strokeWidth={3} /> New Profile
        </button>
      </div>

      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(data.videoProfiles || []).map((item: any, index: number) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group bg-white border border-gray-100 rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 flex flex-col relative`}
          >
            {/* Media Cover Area */}
            <div className="relative aspect-video overflow-hidden bg-gray-50 flex items-center justify-center border-b border-gray-50">
              {(() => {
                const vid = item.videoId || '';
                const img = item.image || '';
                
                const ytMatch = vid.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                const ytId = ytMatch ? ytMatch[1] : (vid.length === 11 ? vid : null);

                // Priority 1: Explicit Cover Image
                if (img) {
                  return <img src={img} alt={item.tab} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />;
                } 
                // Priority 2: YouTube Thumbnail
                else if (ytId) {
                  return <img src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`} alt={item.tab} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />;
                } 
                // Priority 3: Local Video Preview
                else if (vid.match(/\.(mp4|webm|mov|ogg)$/i)) {
                  return (
                    <video 
                      src={vid} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      muted 
                      loop 
                      playsInline 
                      autoPlay 
                    />
                  );
                }
                // Priority 4: Standard Image Link in videoId
                else if (vid.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) || vid.startsWith('http')) {
                    return <img src={vid} alt={item.tab} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />;
                }
                else {
                  return (
                    <div className="flex flex-col items-center gap-2 text-gray-200">
                      <Video size={40} strokeWidth={1} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">No Thumbnail</span>
                    </div>
                  );
                }
              })()}

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-gray-800 backdrop-blur-md shadow-xs border border-white/20 uppercase tracking-wider">
                  {item.tab}
                </span>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-[-10px] group-hover:translate-y-0">
                  <button onClick={() => onEdit(item, 'video-profiles')} className="w-9 h-9 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:text-white transition-all">
                    <Pencil size={14} strokeWidth={2.5} />
                  </button>
                  <button onClick={() => onDelete('video-profiles', item.id)} className="w-9 h-9 bg-white text-red-500 rounded-xl flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setPreviewVideo(item)}
                className="absolute inset-x-0 bottom-0 top-0 m-auto w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-600 shadow-2xl scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all z-20"
              >
                <Play size={20} fill="currentColor" strokeWidth={0} className="ml-1" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                <p className="text-white text-[14px] font-bold truncate drop-shadow-sm">{item.highlight}</p>
                <p className="text-white/70 text-[10px] font-medium truncate">{item.subtext}</p>
              </div>
            </div>

            {/* Testimonial Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="relative">
                <Quote size={24} className="absolute -top-1 -left-2 text-emerald-50 opacity-80 z-0" />
                <p className="relative z-1 text-[13px] text-gray-600 italic leading-relaxed line-clamp-3 pl-3 border-l-2 border-emerald-100/50">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs ring-4 ring-white">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900 leading-none mb-1 flex items-center gap-1.5">
                    <User size={12} className="text-gray-400" /> {item.author}
                  </p>
                  <p className="text-[11px] text-emerald-600/70 font-semibold flex items-center gap-1.5 uppercase tracking-wide">
                    <Briefcase size={10} /> {item.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {(!data.videoProfiles || data.videoProfiles.length === 0) && (
          <div className="col-span-full py-24 bg-white/50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center text-center px-6 transition-all hover:bg-white hover:border-emerald-200 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-gray-100 group-hover:scale-110 group-hover:text-emerald-500 transition-all">
              <Video size={28} strokeWidth={1.5} className="text-gray-300 group-hover:text-emerald-500" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-800 mb-2 leading-none">Your Video Masterpieces Await</h3>
            <p className="text-[13px] text-gray-400 max-w-[300px] leading-relaxed">Showcase high-impact video testimonials or project deep-dives on your homepage.</p>
            <button onClick={() => onEdit(null, 'video-profiles')} className="mt-6 px-6 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[12px] font-bold text-gray-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
              Start with your first profile
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-10 lg:p-20 bg-black/90 backdrop-blur-md" onClick={() => setPreviewVideo(null)}>
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-gray-800 ring-1 ring-white/10" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/40 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-xl border border-white/10 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {(() => {
              const videoId = previewVideo.videoId?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] ||
                (previewVideo.videoId?.length === 11 ? previewVideo.videoId : null);

              if (videoId) {
                return (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                );
              } else if (previewVideo.videoId?.match(/\.(mp4|webm)$/i)) {
                return <video src={previewVideo.videoId} className="w-full h-full" controls autoPlay />;
              } else if (previewVideo.videoId) {
                return <img src={previewVideo.videoId} className="w-full h-full object-contain bg-gray-900" />;
              }
              return <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-900 font-medium space-y-4">
                <Video size={48} className="opacity-20" />
                <span>Media format not supported</span>
              </div>;
            })()}

            {/* Floating Info Overlay in Modal */}
            <div className="absolute bottom-6 left-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl pointer-events-none hidden md:block">
              <h2 className="text-white text-xl font-black mb-1">{previewVideo.highlight}</h2>
              <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                <span>{previewVideo.author}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{previewVideo.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
