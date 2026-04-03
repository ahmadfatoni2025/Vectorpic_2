"use client";

import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

export function AssetHub({ data, onEdit, onDelete, onSwitchTab, onAddNew }: any) {
   return (
      <div className="space-y-5">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-[15px] font-semibold text-gray-900">Assets Gallery</h2>
               <p className="text-[12px] text-gray-400 mt-0.5">{data.vectors.length} active assets</p>
            </div>
            <button onClick={onAddNew} className="px-4 py-2 bg-gray-900 text-white text-[12px] font-medium rounded-xl hover:bg-gray-800 transition-all flex items-center gap-1.5 shadow-sm">
               <Plus size={14} /> Add New
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.vectors.map((v: any) => (
               <div key={v.id} className="bg-white border border-gray-100/80 rounded-2xl p-3 group transition-all hover:shadow-md hover:shadow-gray-100/50 hover:border-gray-200">
<<<<<<< HEAD
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 relative flex items-center justify-center">
                     {v.imageUrl ? (
                        <img src={v.imageUrl} className="w-full h-full object-cover transition-all group-hover:scale-105" />
                     ) : (
                        <div className="flex flex-col items-center gap-1 text-gray-300">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                           <span className="text-[10px] font-medium">No Image</span>
                        </div>
                     )}
=======
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 relative">
                     <img src={v.imageUrl} className="w-full h-full object-cover transition-all group-hover:scale-105" />
>>>>>>> a314e5fcbb1969ea3e7c2ecd8c36dbd03aadbbea
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 backdrop-blur-xs">
                        <button onClick={() => onEdit(v)} className="p-2 bg-white text-gray-700 rounded-lg shadow-lg hover:scale-105 transition-transform">
                           <Pencil size={14} />
                        </button>
                        <button onClick={() => onDelete('vectors', v.id)} className="p-2 bg-white text-red-500 rounded-lg shadow-lg hover:scale-105 transition-transform">
                           <Trash2 size={14} />
                        </button>
                     </div>
                  </div>
                  <div className="px-1">
                     <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100 inline-block mb-1">{v.category?.name || 'Asset'}</span>
                     <h4 className="text-[13px] font-medium text-gray-800 truncate">{v.title}</h4>
                  </div>
               </div>
            ))}
         </div>

         {data.vectors.length === 0 && (
            <div className="py-16 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center">
               <Plus size={24} className="text-gray-300 mb-2" />
               <p className="text-[13px] text-gray-400">No assets uploaded yet</p>
            </div>
         )}
      </div>
   );
}
