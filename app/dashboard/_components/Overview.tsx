"use client";

import React from 'react';
import { ImageIcon, Layers, Mail, BarChart3, Plus, Pencil } from 'lucide-react';
import { StatCard } from './SharedUI';

export function Overview({ data, onEdit, onSwitchTab }: any) {
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
            </div>
         </div>
      </div>
   );
}
