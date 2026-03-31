"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';

import { Sidebar } from './_components/Sidebar';
import { Overview } from './_components/Overview';
import { Uploader } from './_components/Uploader';
import { AssetHub } from './_components/AssetHub';
import { Management, Messages, VideoProfileManagement } from './_components/Management';
import { SimpleInput, ImageUploadInput } from './_components/SharedUI';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    vectors: [],
    categories: [],
    statistics: [],
    inquiries: [],
    imageStacks: [],
    sponsors: [],
    testimonials: [],
    videoProfiles: []
  });

  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoints = ['vectors', 'categories', 'statistics', 'contact', 'image-stacks', 'sponsors', 'testimonials', 'video-profiles'];
      const responses = await Promise.all(endpoints.map(e => fetch(`/api/${e}`)));
      const results = await Promise.all(responses.map(r => r.json()));

      setData({
        vectors: Array.isArray(results[0]) ? results[0] : [],
        categories: Array.isArray(results[1]) ? results[1] : [],
        statistics: Array.isArray(results[2]) ? results[2] : [],
        inquiries: Array.isArray(results[3]) ? results[3] : [],
        imageStacks: Array.isArray(results[4]) ? results[4] : [],
        sponsors: Array.isArray(results[5]) ? results[5] : [],
        testimonials: Array.isArray(results[6]) ? results[6] : [],
        videoProfiles: Array.isArray(results[7]) ? results[7] : []
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (method: string, endpoint: string, body: any) => {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        showStatus('success', 'Operation successful');
        fetchAllData();
        return true;
      }
      showStatus('error', 'Operation failed');
      return false;
    } catch (e) {
      showStatus('error', 'Network error');
      return false;
    }
  };

  const handleDelete = async (tab: string, id: string | number) => {
    if (!confirm('Permanently delete this item?')) return;
    const apiPath = tab === 'inquiries' ? 'contact' : tab;
    await fetch(`/api/${apiPath}/${id}`, { method: 'DELETE' });
    fetchAllData();
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50/20 flex font-sans text-gray-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        inquiryCount={data.inquiries.length}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="px-10 lg:px-16 h-28 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button className="md:hidden p-3 bg-gray-50 rounded-2xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu size={20} /></button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight text-gray-900 capitalize">{activeTab}</h1>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toDateString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div onClick={() => setActiveTab('upload')} className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer">
              <Upload size={20} />
            </div>
          </div>
        </header>

        <div className="px-10 lg:px-16 py-16 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className={`mb-12 p-6 rounded-3xl flex items-center gap-4 border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-red-50 text-red-800 border-red-100'} shadow-sm`}>
                {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                <span className="text-sm font-black tracking-tight">{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="animate-pulse space-y-12">
              <div className="grid grid-cols-4 gap-6"><div className="h-32 bg-gray-100 rounded-3xl" /><div className="h-32 bg-gray-100 rounded-3xl" /><div className="h-32 bg-gray-100 rounded-3xl" /><div className="h-32 bg-gray-100 rounded-3xl" /></div>
              <div className="h-96 bg-gray-100 rounded-[3rem]" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {activeTab === 'overview' && <Overview data={data} onEdit={(v: any) => { setEditingItem(v); setFormData(v); }} onSwitchTab={setActiveTab} />}
              {activeTab === 'upload' && <Uploader data={data} onAction={handleAction} onSwitchTab={setActiveTab} />}
              {activeTab === 'assets' && <AssetHub data={data} onEdit={(v: any) => { setEditingItem(v); setFormData(v); }} onDelete={handleDelete} onSwitchTab={setActiveTab} />}
              {activeTab === 'management' && <Management data={data} onEdit={(item: any, type?: string) => { setEditingItem(item || { name: type === 'categories' || type === 'sponsors' ? '' : undefined, slug: type === 'categories' ? '' : undefined, label: (type === 'statistics' || type === 'image-stacks') ? '' : undefined, value: type === 'statistics' ? '' : undefined, title: type === 'vectors' ? '' : undefined, imageUrl: (type === 'vectors' || type === 'image-stacks') ? '' : undefined, logo: type === 'sponsors' ? '' : undefined, author: (type === 'testimonials' || type === 'video-profiles') ? '' : undefined, role: (type === 'testimonials' || type === 'video-profiles') ? '' : undefined, content: type === 'testimonials' ? '' : undefined, avatar: type === 'testimonials' ? '' : undefined, tab: type === 'video-profiles' ? '' : undefined, highlight: type === 'video-profiles' ? '' : undefined, subtext: type === 'video-profiles' ? '' : undefined, quote: type === 'video-profiles' ? '' : undefined, image: type === 'video-profiles' ? '' : undefined, videoId: type === 'video-profiles' ? '' : undefined, bgColor: type === 'video-profiles' ? '' : undefined, type }); setFormData(item || (type === 'categories' ? { name: '', slug: '', type } : type === 'statistics' ? { label: '', value: '', type } : type === 'sponsors' ? { name: '', logo: '', type } : type === 'testimonials' ? { author: '', role: '', avatar: '', content: '', type } : type === 'video-profiles' ? { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type } : { label: '', imageUrl: '', type })); }} onDelete={handleDelete} />}
              {activeTab === 'video-profiles' && <VideoProfileManagement data={data} onEdit={(item: any, type?: string) => { setEditingItem(item || { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type: 'video-profiles' }); setFormData(item || { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type: 'video-profiles' }); }} onDelete={handleDelete} />}
              {activeTab === 'messages' && <Messages data={data} onDelete={handleDelete} />}
            </motion.div>
          )}
        </div>
      </main>

      {/* Editor Modal shared across tabs */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingItem(null)} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-lg bg-white p-12 rounded-[3rem] shadow-2xl">
              <div className="flex items-center justify-between mb-10 text-left">
                <h2 className="text-2xl font-black tracking-tight">{editingItem.id ? 'Edit Item' : 'New Item'}</h2>
                <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-black"><X size={24} /></button>
              </div>

              {(() => {
                let formType = 'vectors';
                const t = editingItem.type || formData.type;
                if (t === 'categories' || (formData.name !== undefined && formData.slug !== undefined)) formType = 'categories';
                else if (t === 'sponsors' || (formData.name !== undefined && formData.logo !== undefined)) formType = 'sponsors';
                else if (t === 'statistics' || formData.value !== undefined) formType = 'statistics';
                else if (t === 'image-stacks' || (formData.label !== undefined && formData.imageUrl !== undefined && formData.value === undefined)) formType = 'image-stacks';
                else if (t === 'testimonials' || formData.author !== undefined) formType = 'testimonials';
                else if (t === 'video-profiles' || formData.tab !== undefined) formType = 'video-profiles';

                return (
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    const method = editingItem.id ? 'PATCH' : 'POST';
                    const url = editingItem.id ? `/api/${formType}/${editingItem.id}` : `/api/${formType}`;

                    const submitData = { ...formData };
                    delete submitData.type;

                    const success = await handleAction(method, url, submitData);
                    if (success) setEditingItem(null);
                  }}>
                    {formType === 'categories' ? (
                      <>
                        <SimpleInput label="Category Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
                        <SimpleInput label="Slug" value={formData.slug} onChange={(v: string) => setFormData({ ...formData, slug: v })} />
                      </>
                    ) : formType === 'statistics' ? (
                      <>
                        <SimpleInput label="Stat Label" value={formData.label} onChange={(v: string) => setFormData({ ...formData, label: v })} />
                        <SimpleInput label="Value" value={formData.value} onChange={(v: string) => setFormData({ ...formData, value: v })} />
                      </>
                    ) : formType === 'sponsors' ? (
                      <>
                        <SimpleInput label="Sponsor Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
                        <ImageUploadInput label="Sponsor Logo" value={formData.logo} onChange={(v: string) => setFormData({ ...formData, logo: v })} />
                      </>
                    ) : formType === 'testimonials' ? (
                      <>
                        <SimpleInput label="Author Name" value={formData.author} onChange={(v: string) => setFormData({ ...formData, author: v })} />
                        <SimpleInput label="Author Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} />
                        <ImageUploadInput label="Avatar Image" value={formData.avatar} onChange={(v: string) => setFormData({ ...formData, avatar: v })} />
                        <SimpleInput label="Quote Content" value={formData.content} onChange={(v: string) => setFormData({ ...formData, content: v })} />
                      </>
                    ) : formType === 'image-stacks' ? (
                      <>
                        <SimpleInput label="Showcase Label" value={formData.label} onChange={(v: string) => setFormData({ ...formData, label: v })} />
                        <ImageUploadInput label="Showcase Image" value={formData.imageUrl} onChange={(v: string) => setFormData({ ...formData, imageUrl: v })} />
                      </>
                    ) : formType === 'video-profiles' ? (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                        <SimpleInput label="Tab Name" value={formData.tab} onChange={(v: string) => setFormData({ ...formData, tab: v })} />
                        <SimpleInput label="Highlight (Boxed Text)" value={formData.highlight} onChange={(v: string) => setFormData({ ...formData, highlight: v })} />
                        <SimpleInput label="Subtext" value={formData.subtext} onChange={(v: string) => setFormData({ ...formData, subtext: v })} />
                        <SimpleInput label="Quote" value={formData.quote} onChange={(v: string) => setFormData({ ...formData, quote: v })} />
                        <SimpleInput label="Author" value={formData.author} onChange={(v: string) => setFormData({ ...formData, author: v })} />
                        <SimpleInput label="Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} />
                        <ImageUploadInput label="Background Image" value={formData.image} onChange={(v: string) => setFormData({ ...formData, image: v })} />
                        <SimpleInput label="Video ID / URL" value={formData.videoId} onChange={(v: string) => setFormData({ ...formData, videoId: v })} />
                        <SimpleInput label="BG Color (Tailwind)" value={formData.bgColor} onChange={(v: string) => setFormData({ ...formData, bgColor: v })} />
                      </div>
                    ) : (
                      <>
                        <SimpleInput label="Title" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} />
                        <ImageUploadInput label="Asset Image" value={formData.imageUrl} onChange={(v: string) => setFormData({ ...formData, imageUrl: v })} />
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                          <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({ ...formData, isPremium: e.target.checked })} className="w-4 h-4 rounded border-gray-200 text-black focus:ring-black" />
                          <span className="text-[10px] font-black uppercase text-gray-500">Premium asset</span>
                        </div>
                      </>
                    )}

                    <div className="pt-6 flex flex-col gap-3">
                      <button type="submit" className="w-full py-4 bg-black text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-gray-800 transition-all active:scale-95">Save Changes</button>
                      <button type="button" onClick={() => setEditingItem(null)} className="w-full py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black">Cancel</button>
                    </div>
                  </form>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}