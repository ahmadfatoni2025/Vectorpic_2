"use client";

import React, { useState } from 'react';
import { Upload, Save } from 'lucide-react';
import { SimpleInput, ImageUploadInput } from './SharedUI';

export function Uploader({ data, onAction, onSwitchTab }: any) {
  const [uploadData, setUploadData] = useState<any>({ title: '', imageUrl: '', categoryId: '', description: '', isPremium: false });

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
         <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10">
            <Upload size={28} />
         </div>
         <h2 className="text-3xl font-black tracking-tight mb-2">Upload New Asset</h2>
         <p className="text-gray-400 font-medium font-sans">Add professional vector graphics to your gallery.</p>
      </div>

      <form className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm space-y-8" onSubmit={async (e) => {
        e.preventDefault();
        const success = await onAction('POST', '/api/vectors', uploadData);
        if (success) {
           setUploadData({ title: '', imageUrl: '', categoryId: '', description: '', isPremium: false });
           onSwitchTab('assets');
        }
      }}>
         <div className="space-y-6">
            <SimpleInput label="Asset Title" value={uploadData.title} onChange={(v: string) => setUploadData({...uploadData, title: v})} placeholder="e.g. Minimalist Abstract Pattern" />
            <ImageUploadInput label="Asset Image" value={uploadData.imageUrl} onChange={(v: string) => setUploadData({...uploadData, imageUrl: v})} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Category</label>
                  <select 
                    value={uploadData.categoryId} 
                    onChange={e => setUploadData({...uploadData, categoryId: Number(e.target.value)})}
                    className="w-full bg-gray-50 px-5 py-4 text-xs font-bold rounded-2xl border-2 border-transparent focus:bg-white focus:border-black outline-none transition-all"
                  >
                     <option value="">Select Category</option>
                     {data.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
               </div>
               <div className="flex items-center gap-4 bg-gray-50 px-5 rounded-2xl h-[58px]">
                  <input 
                    type="checkbox" 
                    checked={uploadData.isPremium} 
                    onChange={e => setUploadData({...uploadData, isPremium: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-200 text-black focus:ring-black"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Premium Asset</span>
               </div>
            </div>

            <div>
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Asset Description</label>
               <textarea 
                  value={uploadData.description}
                  onChange={e => setUploadData({...uploadData, description: e.target.value})}
                  className="w-full bg-gray-50 px-5 py-4 text-xs font-bold rounded-2xl border-2 border-transparent focus:bg-white focus:border-black outline-none transition-all min-h-[120px] resize-none"
                  placeholder="Tell designers about this asset..."
               />
            </div>
         </div>

         <button type="submit" className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-widest rounded-3xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
            <Save size={18} /> Confirm and Upload
         </button>
      </form>
    </div>
  );
}
