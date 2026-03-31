"use client";

import React from 'react';
import { ImageIcon, Layers, Mail, BarChart3, Plus, Pencil } from 'lucide-react';
import { StatCard } from './SharedUI';

export function Overview({ data, onEdit, onSwitchTab }: any) {
   return (
      <div className="space-y-12">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Live Assets" val={data.vectors.length} icon={<ImageIcon size={20} />} />
            <StatCard label="Categories" val={data.categories.length} icon={<Layers size={20} />} />
            <StatCard label="New Messages" val={data.inquiries.length} icon={<Mail size={20} />} />
            <StatCard label="Platform Stats" val={data.statistics.length} icon={<BarChart3 size={20} />} />
         </div>

         <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Recently Uploaded</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
               {data.vectors.slice(0, 6).map((v: any) => (
                  <div key={v.id} className="aspect-square rounded-xl overflow-hidden group relative border border-gray-50">
                     <img src={v.imageUrl} className="w-full h-full object-cover transition-all group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button onClick={() => onEdit(v)} className="p-2 text-white"><Pencil size={18} /></button>
                     </div>
                  </div>
               ))}
               <button onClick={() => onSwitchTab('upload')} className="aspect-square border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300 hover:border-black hover:text-black transition-all">
                  <Plus size={24} />
               </button>
            </div>
         </div>
      </div>
   );
}
