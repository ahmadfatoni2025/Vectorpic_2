"use client";

import React from 'react';
import { Plus, Pencil, Trash2, Layers, X, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ImageStackManagement({ data, onEdit, onDelete }: any) {
  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-[24px] border border-gray-100/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers size={18} strokeWidth={2.5} />
            </div>
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Image Stacks</h2>
          </div>
          <p className="text-[13px] text-gray-400 font-medium">Manage the floating image cards displayed in the home page showcase.</p>
        </div>
        <button
          onClick={() => onEdit(null, 'image-stacks')}
          className="px-5 py-2.5 bg-gray-900 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} strokeWidth={3} /> New Stack
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {(data.stacks || []).map((item: any, index: number) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative aspect-3/4 bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all"
          >
            <img 
              src={item.imageUrl} 
              alt={item.label} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
            
            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform">
              <p className="text-[12px] font-bold text-white mb-3 line-clamp-1">{item.label}</p>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={() => onEdit(item, item.origin || 'image-stacks')}
                  className="flex-1 py-1.5 bg-white text-gray-900 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button 
                  onClick={() => onDelete(item.origin || 'image-stacks', item.id)}
                  className="w-8 py-1.5 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            {/* Order Badge */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md text-[9px] font-bold text-white/80 border border-white/10">
              #{item.order || 0}
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {(!data.stacks || data.stacks.length === 0) && (
          <div className="col-span-full py-20 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center text-center px-6">
            <Layers size={32} className="text-gray-300 mb-3 opacity-50" />
            <p className="text-[13px] text-gray-400 font-medium">No stacks created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
