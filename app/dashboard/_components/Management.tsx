"use client";

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Video, X } from 'lucide-react';

export function Management({ data, onEdit, onDelete }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
    <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-gray-800">{title}</h3>
          <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">{items?.length || 0}</span>
        </div>
        <button onClick={onAdd} className="w-7 h-7 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-all">
          <Plus size={14} />
        </button>
      </div>
      <div className="divide-y divide-gray-50 max-h-[360px] overflow-y-auto no-scrollbar">
        {items?.map((item: any, index: number) => (
          <div key={item.id || index} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 group transition-colors">
            <div className="flex flex-col text-left overflow-hidden mr-3 min-w-0">
              <span className="text-[13px] font-medium text-gray-800 truncate">{item.name || item.label || item.author || item.tab}</span>
              <span className="text-[11px] text-gray-400 truncate">{item.slug || item.value || item.role || item.highlight || (type === 'image-stacks' ? 'Image' : type === 'sponsors' ? 'Partner' : '')}</span>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button onClick={() => onEdit(item)} className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-all">
                <Pencil size={12} />
              </button>
              <button onClick={() => onDelete(item.id)} className="w-7 h-7 rounded-lg bg-red-50/50 border border-red-100/50 flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && (
          <div className="px-5 py-8 text-center">
            <p className="text-[12px] text-gray-400">No items yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Messages({ data, onDelete }: any) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100/80 rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-gray-800">Support & Inquiries</h3>
          <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">{data.inquiries.length}</span>
        </div>
        <div className="divide-y divide-gray-50">
          {data.inquiries.map((q: any, index: number) => (
            <div key={q.id || index} className="px-5 py-4 hover:bg-gray-50/30 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-500 flex-shrink-0">
                      {q.firstName?.[0]}{q.lastName?.[0]}
                    </div>
                    <span className="text-[13px] font-medium text-gray-800">{q.firstName} {q.lastName}</span>
                    <span className="text-[11px] text-gray-400">{q.email}</span>
                  </div>
                  {q.subject && <p className="text-[12px] font-medium text-gray-600 mb-1">{q.subject}</p>}
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{q.message}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] font-medium text-gray-300">{new Date(q.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => onDelete('inquiries', q.id)} className="w-8 h-8 bg-red-50/50 border border-red-100/50 text-red-300 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:bg-red-50 flex items-center justify-center">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data.inquiries.length === 0 && (
            <div className="px-5 py-12 text-center">
              <p className="text-[13px] text-gray-400">No messages yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

