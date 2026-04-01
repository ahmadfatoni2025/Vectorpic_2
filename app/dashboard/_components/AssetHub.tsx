"use client";

import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

export function AssetHub({ data, onEdit, onDelete, onSwitchTab, onAddNew }: any) {
   return (
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight">Active Assets Gallery</h2>
            <button onClick={onAddNew} className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2">
               <Plus size={14} /> Add New
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.vectors.map((v: any) => (
               <div key={v.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-4 group transition-all hover:shadow-2xl hover:shadow-black/5">
                  <div className="aspect-square rounded-4xl overflow-hidden bg-gray-50 mb-4 relative">
                     <img src={v.imageUrl} className="w-full h-full object-cover transition-all group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <button onClick={() => onEdit(v)} className="p-3 bg-white text-black rounded-2xl hover:bg-black hover:text-white transition-all"><Pencil size={18} /></button>
                        <button onClick={() => onDelete('vectors', v.id)} className="p-3 bg-white text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                     </div>
                  </div>
                  <div className="px-2">
                     <div className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">{v.category?.name || 'Asset'}</div>
                     <h4 className="text-sm font-black truncate text-gray-900">{v.title}</h4>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
