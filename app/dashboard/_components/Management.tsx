"use client";

import React from 'react';
import { Plus, Pencil, Trash2, Video } from 'lucide-react';

export function Management({ data, onEdit, onDelete }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ManagementCard
        title="Categories"
        items={data.categories}
        onEdit={(item: any) => onEdit(item, 'categories')}
        onDelete={(id: any) => onDelete('categories', id)}
        onAdd={() => onEdit(null, 'categories')}
        type="categories"
      />
      <ManagementCard
        title="Statistics"
        items={data.statistics}
        onEdit={(item: any) => onEdit(item, 'statistics')}
        onDelete={(id: any) => onDelete('statistics', id)}
        onAdd={() => onEdit(null, 'statistics')}
        type="statistics"
      />
      <ManagementCard
        title="Showcase Cards"
        items={data.imageStacks}
        onEdit={(item: any) => onEdit(item, 'image-stacks')}
        onDelete={(id: any) => onDelete('image-stacks', id)}
        onAdd={() => onEdit(null, 'image-stacks')}
        type="image-stacks"
      />
      <ManagementCard
        title="Sponsors"
        items={data.sponsors}
        onEdit={(item: any) => onEdit(item, 'sponsors')}
        onDelete={(id: any) => onDelete('sponsors', id)}
        onAdd={() => onEdit(null, 'sponsors')}
        type="sponsors"
      />
      <ManagementCard
        title="Testimonials"
        items={data.testimonials}
        onEdit={(item: any) => onEdit(item, 'testimonials')}
        onDelete={(id: any) => onDelete('testimonials', id)}
        onAdd={() => onEdit(null, 'testimonials')}
        type="testimonials"
      />
    </div>
  );
}

function ManagementCard({ title, items, onEdit, onDelete, onAdd, type }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden">
      <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">{title}</h3>
        <button onClick={onAdd} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all"><Plus size={16} /></button>
      </div>
      <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto no-scrollbar">
        {items?.map((item: any) => (
          <div key={item.id} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50/30 group">
            <div className="flex flex-col text-left overflow-hidden mr-4">
              <span className="text-sm font-black text-gray-900 truncate">{item.name || item.label || item.author || item.tab}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{item.slug || item.value || item.role || item.highlight || (type === 'image-stacks' ? 'Image Uploaded' : type === 'sponsors' ? 'Partner Logo' : '')}</span>
            </div>
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => onEdit(item)} className="text-gray-300 hover:text-black"><Pencil size={14} /></button>
              <button onClick={() => onDelete(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Messages({ data, onDelete }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black tracking-tight">Support & Inquiries</h2>
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-50">
        {data.inquiries.map((q: any) => (
          <div key={q.id} className="p-8 hover:bg-gray-50/50 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black text-gray-900">{q.firstName} {q.lastName}</span>
                  <span className="text-[10px] font-bold text-gray-400">{q.email}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{q.message}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">{new Date(q.createdAt).toLocaleDateString()}</span>
                <button onClick={() => onDelete('inquiries', q.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoProfileManagement({ data, onEdit, onDelete }: any) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Video Profiles</h2>
          <p className="text-sm text-gray-500 font-medium tracking-tight">Manage home page video features and testimonials.</p>
        </div>
        <button 
          onClick={() => onEdit(null, 'video-profiles')}
          className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-3xl hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-black/10"
        >
          <Plus size={16} /> Add Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(data.videoProfiles || []).map((item: any) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-[3rem] p-10 group transition-all hover:border-black/10 hover:shadow-2xl hover:shadow-gray-200/50">
            <div className="flex items-start justify-between mb-8">
              <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.bgColor || 'bg-indigo-500'} text-white shadow-lg shadow-black/5`}>
                {item.tab}
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(item, 'video-profiles')} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:shadow-md transition-all"><Pencil size={16} /></button>
                <button onClick={() => onDelete('video-profiles', item.id)} className="w-10 h-10 bg-red-50/50 rounded-xl flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-video rounded-[2rem] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={item.image} alt={item.tab} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
                      <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-black border-b-6 border-b-transparent ml-1" />
                   </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-gray-900 mb-2 leading-tight tracking-tight">{item.highlight}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest line-clamp-1">{item.subtext}</p>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <p className="text-sm text-gray-600 italic mb-4 leading-relaxed line-clamp-3 font-medium">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-black text-gray-900 tracking-tight">{item.author}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!data.videoProfiles || data.videoProfiles.length === 0) && (
          <div className="col-span-full py-32 bg-gray-50/30 border-2 border-dashed border-gray-100 rounded-[4rem] flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-gray-100 transition-transform hover:scale-110">
               <Video size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">Expand showcase</h3>
            <p className="text-sm text-gray-400 font-medium max-w-[280px] leading-relaxed">Let's populate your dashboard with video profiles to showcase your work.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export function OurDesignManagement({ data, onEdit, onDelete }: any) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Our Design (YouTube Showcase)</h2>
          <p className="text-sm text-gray-500 font-medium tracking-tight">Manage your portfolio designs with YouTube video links.</p>
        </div>
        <button 
          onClick={() => onEdit(null, 'our-designs')}
          className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-3xl hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-black/10"
        >
          <Plus size={16} /> Add Design
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(data.ourDesigns || []).map((item: any) => {
          // Extract YouTube ID for thumbnail
          const videoId = item.youtubeUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

          return (
            <div key={item.id} className="bg-white border border-gray-100 rounded-[3rem] p-10 group transition-all hover:border-black/10 hover:shadow-2xl hover:shadow-gray-200/50">
              <div className="flex items-start justify-between mb-8">
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-black text-white shadow-lg shadow-black/5`}>
                  {item.tag || 'Design'}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(item, 'our-designs')} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:shadow-md transition-all"><Pencil size={16} /></button>
                  <button onClick={() => onDelete('our-designs', item.id)} className="w-10 h-10 bg-red-50/50 rounded-xl flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="aspect-video rounded-[2.5rem] overflow-hidden relative bg-gray-100 flex items-center justify-center">
                  {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <Video size={32} className="text-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500 text-red-600">
                      <Video size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-gray-900 mb-2 leading-tight tracking-tight">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 flex items-center gap-2">
                   <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">YouTube Link:</div>
                   <div className="text-[10px] font-bold text-black truncate max-w-[150px]">{item.youtubeUrl}</div>
                </div>
              </div>
            </div>
          );
        })}

        {(!data.ourDesigns || data.ourDesigns.length === 0) && (
          <div className="col-span-full py-32 bg-gray-50/30 border-2 border-dashed border-gray-100 rounded-[4rem] flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-gray-100">
               <Video size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">Showcase your designs</h3>
            <p className="text-sm text-gray-400 font-medium max-w-[280px] leading-relaxed">Add YouTube videos to showcase your portfolio in the Our Design section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
