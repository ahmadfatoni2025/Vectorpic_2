"use client";

import React from 'react';
import {
    ImageIcon, Layers, Mail, BarChart3, Plus, Pencil,
    Video, MonitorPlay, Star, Award, MessageSquare, Briefcase
} from 'lucide-react';
import { StatCard } from './SharedUI';

export function Overview({ data, onEdit, onSwitchTab }: any) {
<<<<<<< HEAD
    return (
        <div className="space-y-6">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-4">
                <StatCard label="Assets" val={data.vectors?.length || 0} icon={<ImageIcon size={18} />} />
                <StatCard label="Video Profiles" val={data.videoProfiles?.length || 0} icon={<Video size={18} />} />
                <StatCard label="Our Designs" val={data.ourDesigns?.length || 0} icon={<MonitorPlay size={18} />} />
                <StatCard label="Image Stacks" val={data.imageStacks?.length || 0} icon={<Layers size={18} />} />
                <StatCard label="Categories" val={data.categories?.length || 0} icon={<Briefcase size={18} />} />
                <StatCard label="Unread Messages" val={data.inquiries?.length || 0} icon={<Mail size={18} />} />
                <StatCard label="Testimonials" val={data.testimonials?.length || 0} icon={<Star size={18} />} />
                <StatCard label="Sponsors" val={data.sponsors?.length || 0} icon={<Award size={18} />} />
                <StatCard label="Platform Stats" val={data.statistics?.length || 0} icon={<BarChart3 size={18} />} />
=======
   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Live Assets" val={data.vectors.length} icon={<ImageIcon size={18} />} />
            <StatCard label="Categories" val={data.categories.length} icon={<Layers size={18} />} />
            <StatCard label="New Messages" val={data.inquiries.length} icon={<Mail size={18} />} />
            <StatCard label="Platform Stats" val={data.statistics.length} icon={<BarChart3 size={18} />} />
         </div>

         <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
               <h3 className="text-[13px] font-semibold text-gray-700">Recently Uploaded</h3>
               <span className="text-[11px] text-gray-400 font-medium">{data.vectors.length} total</span>
            </div>
            <div className="p-5">
               <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {data.vectors.slice(0, 6).map((v: any) => (
                     <div key={v.id} className="aspect-square rounded-xl overflow-hidden group relative border border-gray-100/80 bg-gray-50">
                        <img src={v.imageUrl} className="w-full h-full object-cover transition-all group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-xs">
                           <button onClick={() => onEdit(v)} className="p-2 bg-white text-gray-700 rounded-lg shadow-lg hover:scale-105 transition-transform">
                              <Pencil size={14} />
                           </button>
                        </div>
                     </div>
                  ))}
                  <button onClick={() => onSwitchTab('upload')} className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300 hover:border-emerald-300 hover:text-emerald-500 hover:bg-emerald-50/30 transition-all">
                     <Plus size={20} />
                     <span className="text-[10px] font-medium mt-1">Add</span>
                  </button>
               </div>
>>>>>>> a314e5fcbb1969ea3e7c2ecd8c36dbd03aadbbea
            </div>

            {/* Monitoring Panels */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Col: Recent Assets & Stacks */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Recent Assets Gallery */}
                    <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-[13px] font-semibold text-gray-700">Recent Assets Gallery</h3>
                            <button onClick={() => onSwitchTab('assets')} className="text-[11px] text-emerald-600 font-medium hover:text-emerald-700">View All</button>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                                {data.vectors?.slice(0, 4).map((v: any) => (
                                    <div key={v.id} className="aspect-square rounded-xl overflow-hidden group relative border border-gray-100/80 bg-gray-50 flex items-center justify-center">
                                        {v.imageUrl ? (
                                            <img src={v.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        ) : (
                                            <ImageIcon size={24} className="text-gray-200" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                                            <button onClick={() => onEdit(v)} className="p-2 bg-white text-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
                                                <Pencil size={14} />
                                            </button>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                                            <p className="text-[10px] text-white font-medium truncate">{v.title}</p>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => onSwitchTab('upload')} className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-emerald-300 hover:text-emerald-500 hover:bg-emerald-50/30 transition-all">
                                    <Plus size={20} />
                                    <span className="text-[10px] font-medium mt-1">Upload</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sub-panels for Video & Design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden shadow-sm">
                            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-[13px] font-semibold text-gray-700">Video Profiles</h3>
                                <button onClick={() => onSwitchTab('video-profiles')} className="text-[11px] text-emerald-600 font-medium">Manage</button>
                            </div>
                            <div className="p-4 space-y-2">
                                {data.videoProfiles?.slice(0, 3).map((vp: any) => (
                                    <div key={vp.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group cursor-pointer" onClick={() => { onSwitchTab('video-profiles'); onEdit(vp, 'video-profiles') }}>
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                            {vp.image ? <img src={vp.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><Video size={14} /></div>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-medium text-gray-900 truncate group-hover:text-emerald-600 transition-colors">{vp.highlight || 'No Title'}</p>
                                            <p className="text-[10px] text-gray-500 truncate">{vp.tab}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!data.videoProfiles || data.videoProfiles.length === 0) && <p className="text-[11px] text-gray-400 text-center py-4">No video profiles added</p>}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden shadow-sm">
                            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-[13px] font-semibold text-gray-700">Our Designs</h3>
                                <button onClick={() => onSwitchTab('our-design')} className="text-[11px] text-emerald-600 font-medium">Manage</button>
                            </div>
                            <div className="p-4 space-y-2">
                                {data.ourDesigns?.slice(0, 3).map((od: any) => (
                                    <div key={od.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group cursor-pointer" onClick={() => { onSwitchTab('our-design'); onEdit(od, 'our-designs') }}>
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0 border border-indigo-100">
                                            <MonitorPlay size={16} strokeWidth={1.8} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{od.title}</p>
                                            <p className="text-[10px] text-gray-500 truncate">{od.tag}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!data.ourDesigns || data.ourDesigns.length === 0) && <p className="text-[11px] text-gray-400 text-center py-4">No designs added</p>}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Col: Feed & Logs */}
                <div className="space-y-6">

                    {/* Recent Inquiries */}
                    <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[320px]">
                        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between shrink-0">
                            <h3 className="text-[13px] font-semibold text-gray-700">Recent Inquiries</h3>
                            {data.inquiries?.length > 0 && (
                                <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold">
                                    {data.inquiries.length}
                                </div>
                            )}
                        </div>
                        <div className="p-4 space-y-3 flex-1 overflow-y-auto no-scrollbar">
                            {data.inquiries?.slice(0, 4).map((msg: any) => (
                                <div key={msg.id} className="p-3 bg-gray-50/80 border border-gray-100/80 rounded-xl relative hover:bg-gray-100 transition-colors">
                                    <p className="text-[11px] font-semibold text-gray-900 mb-0.5">{msg.name}</p>
                                    <p className="text-[10px] text-gray-400 mb-2 truncate">{msg.email}</p>
                                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">{msg.message}</p>
                                </div>
                            ))}
                            {(!data.inquiries || data.inquiries.length === 0) && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <MessageSquare size={24} className="mb-2 opacity-50" />
                                    <p className="text-xs">No recent messages</p>
                                </div>
                            )}
                        </div>
                        {data.inquiries?.length > 0 && (
                            <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/50 shrink-0">
                                <button onClick={() => onSwitchTab('messages')} className="w-full py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-[11px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                    All Messages
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden shadow-sm p-5 relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                        <h3 className="text-[13px] font-semibold text-gray-700 mb-4 inline-flex items-center gap-2">
                            Quick Shortcuts
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => onSwitchTab('management')} className="py-2.5 bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-700 rounded-xl text-[11px] font-semibold text-gray-600 transition-all flex items-center justify-center gap-2">
                                <Layers size={14} className="opacity-70" /> Categories
                            </button>
                            <button onClick={() => onSwitchTab('management')} className="py-2.5 bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-700 rounded-xl text-[11px] font-semibold text-gray-600 transition-all flex items-center justify-center gap-2">
                                <Star size={14} className="opacity-70" /> Testimonials
                            </button>
                            <button onClick={() => onSwitchTab('track-tabs')} className="py-2.5 bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-700 rounded-xl text-[11px] font-semibold text-gray-600 transition-all flex items-center justify-center gap-2">
                                <ImageIcon size={14} className="opacity-70" /> Track Tabs
                            </button>
                            <button onClick={() => onSwitchTab('settings')} className="py-2.5 bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-700 rounded-xl text-[11px] font-semibold text-gray-600 transition-all flex items-center justify-center gap-2">
                                <Briefcase size={14} className="opacity-70" /> Settings
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
