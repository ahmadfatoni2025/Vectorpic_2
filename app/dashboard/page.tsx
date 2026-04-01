"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';

import { Sidebar } from './_components/Sidebar';
import { Overview } from './_components/Overview';
import { Uploader } from './_components/Uploader';
import { AssetHub } from './_components/AssetHub';
import { Management, Messages, VideoProfileManagement, OurDesignManagement } from './_components/Management';
import { SimpleInput, ImageUploadInput, SimpleTextarea } from './_components/SharedUI';

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
    videoProfiles: [],
    ourDesigns: []
  });

  const [editingItem, setEditingItem] = useState<any>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoints = ['vectors', 'categories', 'statistics', 'contact', 'image-stacks', 'sponsors', 'testimonials', 'video-profiles', 'our-designs'];
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
        videoProfiles: Array.isArray(results[7]) ? results[7] : [],
        ourDesigns: Array.isArray(results[8]) ? results[8] : []
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
        onQuickUpload={() => setIsUploaderOpen(true)}
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
            <div onClick={() => setIsUploaderOpen(true)} className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer">
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
              {activeTab === 'assets' && <AssetHub data={data} onAddNew={() => setIsUploaderOpen(true)} onEdit={(v: any) => { setEditingItem(v); setFormData(v); }} onDelete={handleDelete} onSwitchTab={setActiveTab} />}
              {activeTab === 'management' && <Management data={data} onEdit={(item: any, type?: string) => { setEditingItem(item || { name: type === 'categories' || type === 'sponsors' ? '' : undefined, slug: type === 'categories' ? '' : undefined, label: (type === 'statistics' || type === 'image-stacks') ? '' : undefined, value: type === 'statistics' ? '' : undefined, title: type === 'vectors' ? '' : undefined, imageUrl: (type === 'vectors' || type === 'image-stacks') ? '' : undefined, logo: type === 'sponsors' ? '' : undefined, author: (type === 'testimonials' || type === 'video-profiles') ? '' : undefined, role: (type === 'testimonials' || type === 'video-profiles') ? '' : undefined, content: type === 'testimonials' ? '' : undefined, avatar: type === 'testimonials' ? '' : undefined, tab: type === 'video-profiles' ? '' : undefined, highlight: type === 'video-profiles' ? '' : undefined, subtext: type === 'video-profiles' ? '' : undefined, quote: type === 'video-profiles' ? '' : undefined, image: type === 'video-profiles' ? '' : undefined, videoId: type === 'video-profiles' ? '' : undefined, bgColor: type === 'video-profiles' ? '' : undefined, type }); setFormData(item || (type === 'categories' ? { name: '', slug: '', type } : type === 'statistics' ? { label: '', value: '', type } : type === 'sponsors' ? { name: '', logo: '', type } : type === 'testimonials' ? { author: '', role: '', avatar: '', content: '', type } : type === 'video-profiles' ? { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type } : { label: '', imageUrl: '', type })); }} onDelete={handleDelete} />}
              {activeTab === 'video-profiles' && <VideoProfileManagement data={data} onEdit={(item: any, type?: string) => { const base = { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type: 'video-profiles' }; setEditingItem(item || base); setFormData(item || base); }} onDelete={handleDelete} />}
              {activeTab === 'our-design' && <OurDesignManagement data={data} onEdit={(item: any, type?: string) => { const base = { title: '', description: '', youtubeUrl: '', tag: 'Design', type: 'our-designs' }; setEditingItem(item || base); setFormData(item || base); }} onDelete={handleDelete} />}
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
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl bg-white p-0 rounded-3xl shadow-2xl overflow-hidden font-sans border border-gray-100">
              {/* Modal Header */}
              <div className="px-8 pt-8 pb-6">
                <div className="flex items-center gap-3 mb-1">
                   <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 border border-gray-100">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                   </div>
                   <h2 className="text-xl font-bold text-black tracking-tight">{editingItem.id ? 'Update Project' : 'Create New Project'}</h2>
                </div>
                <p className="text-[14px] text-gray-400 font-medium ml-11">Set up a new project to start organizing your team&apos;s work.</p>
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
                else if (t === 'our-designs' || formData.youtubeUrl !== undefined) formType = 'our-designs';

                return (
                  <form 
                    className="flex flex-col"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const method = editingItem.id ? 'PATCH' : 'POST';
                      const url = editingItem.id ? `/api/${formType}/${editingItem.id}` : `/api/${formType}`;

                      const submitData = { ...formData };
                      delete submitData.type;

                      const success = await handleAction(method, url, submitData);
                      if (success) setEditingItem(null);
                    }}
                  >
                    <div className="px-8 pb-8 space-y-6 max-h-[600px] overflow-y-auto no-scrollbar">
                      {/* Common Uploader at top (conditional for types with images) */}
                      {['vectors', 'sponsors', 'testimonials', 'image-stacks', 'video-profiles', 'our-designs'].includes(formType) && (
                        <div className="mb-8">
                          <ImageUploadInput 
                             value={formData.imageUrl || formData.logo || formData.avatar || formData.image || formData.youtubeUrl} 
                             onChange={(v: string) => {
                               if (formType === 'sponsors') setFormData({...formData, logo: v});
                               else if (formType === 'testimonials') setFormData({...formData, avatar: v});
                               else if (formType === 'video-profiles') setFormData({...formData, image: v});
                               else if (formType === 'our-designs') setFormData({...formData, youtubeUrl: v});
                               else setFormData({...formData, imageUrl: v});
                             }} 
                          />
                        </div>
                      )}

                      {formType === 'categories' ? (
                        <div className="space-y-5">
                          <SimpleInput label="Category Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} required placeholder="Enter category name" />
                          <SimpleInput label="Slug" value={formData.slug} onChange={(v: string) => setFormData({ ...formData, slug: v })} placeholder="enter-slug-here" />
                          <SimpleTextarea label="Description" value={formData.description} onChange={(v: string) => setFormData({ ...formData, description: v })} required placeholder="Describe the purpose of this category" />
                        </div>
                      ) : formType === 'statistics' ? (
                        <div className="grid grid-cols-2 gap-4">
                          <SimpleInput label="Stat Label" value={formData.label} onChange={(v: string) => setFormData({ ...formData, label: v })} required placeholder="Label" />
                          <SimpleInput label="Value" value={formData.value} onChange={(v: string) => setFormData({ ...formData, value: v })} required placeholder="Value" />
                        </div>
                      ) : formType === 'testimonials' ? (
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                            <SimpleInput label="Author Name" value={formData.author} onChange={(v: string) => setFormData({ ...formData, author: v })} required placeholder="John Doe" />
                            <SimpleInput label="Author Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} placeholder="Designer" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.content} onChange={(v: string) => setFormData({ ...formData, content: v })} required placeholder="Describe the project goals and scope" />
                        </div>
                      ) : formType === 'video-profiles' ? (
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                             <SimpleInput label="Tab Name" value={formData.tab} onChange={(v: string) => setFormData({ ...formData, tab: v })} required placeholder="Creative" />
                             <SimpleInput label="Highlight" value={formData.highlight} onChange={(v: string) => setFormData({ ...formData, highlight: v })} placeholder="Big Heading" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.quote} onChange={(v: string) => setFormData({ ...formData, quote: v })} required placeholder="Describe the project goals and scope" />
                          <div className="grid grid-cols-2 gap-4">
                             <SimpleInput label="Video URL" value={formData.videoId} onChange={(v: string) => setFormData({ ...formData, videoId: v })} placeholder="YouTube Link" />
                             <SimpleInput label="Author" value={formData.author} onChange={(v: string) => setFormData({ ...formData, author: v })} placeholder="Author Name" />
                          </div>
                        </div>
                      ) : formType === 'our-designs' ? (
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                             <SimpleInput label="Design Title" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} required placeholder="Enter design name" />
                             <SimpleInput label="Tag" value={formData.tag} onChange={(v: string) => setFormData({ ...formData, tag: v })} placeholder="Pick a tag" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.description} onChange={(v: string) => setFormData({ ...formData, description: v })} required placeholder="Describe the project goals and scope" />
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                             <SimpleInput label="Project Name" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} required placeholder="Enter project name" />
                             <SimpleInput label="Status/Tag" value={formData.tag} onChange={(v: string) => setFormData({ ...formData, tag: v })} placeholder="Select status" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.description || formData.content} onChange={(v: string) => setFormData({ ...formData, description: v })} required placeholder="Describe the project goals and scope" />
                          <div className="flex items-center gap-2 pt-2">
                             <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({ ...formData, isPremium: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                             <label className="text-[14px] text-gray-600 font-medium">Mark as premium asset</label>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => setEditingItem(null)} 
                        className="px-5 py-2.5 bg-white border border-gray-100 text-gray-700 text-[14px] font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-5 py-2.5 bg-black text-white text-[14px] font-bold rounded-xl hover:bg-gray-900 transition-all active:scale-95 shadow-lg flex items-center gap-2"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        {editingItem.id ? 'Update project' : 'Save project'}
                      </button>
                    </div>
                  </form>
                );

              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <Uploader 
          isOpen={isUploaderOpen} 
          onClose={() => setIsUploaderOpen(false)} 
          data={data} 
          onAction={handleAction} 
          onSwitchTab={setActiveTab} 
        />
      </AnimatePresence>
    </div>
  );
}