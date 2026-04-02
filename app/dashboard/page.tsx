"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Upload, X, CheckCircle2, AlertCircle, Bell, Search, Filter } from 'lucide-react';

import { Sidebar } from './_components/Sidebar';
import { Overview } from './_components/Overview';
import { Uploader } from './_components/Uploader';
import { AssetHub } from './_components/AssetHub';
import { Management, Messages, VideoProfileManagement } from './_components/Management';
import { OurDesignManagement } from './_components/OurDesignVideo';
import { BreandingManagement } from './_components/Breanding';
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
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error:', res.status, errorData);
      showStatus('error', errorData?.error || `Operation failed (${res.status})`);
      return false;
    } catch (e) {
      console.error('Network error:', e);
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

  // Human-readable tab labels
  const tabLabels: Record<string, string> = {
    overview: 'Discover',
    assets: 'Assets Gallery',
    management: 'Tasks',
    'video-profiles': 'Video Profiles',
    'our-design': 'Our Design',
    'track-tabs': 'Track Tabs',
    settings: 'Settings',
    messages: 'Messages',
  };

  const tabDescriptions: Record<string, string> = {
    overview: 'Overview of your platform content and analytics.',
    assets: 'Browse and manage all uploaded assets.',
    management: 'Manage categories, statistics, sponsors and more.',
    'video-profiles': 'Configure video features and testimonials.',
    'our-design': 'YouTube Showcase for your portfolio.',
    'track-tabs': 'Manage content for all track tab pages.',
    settings: 'Platform configuration and preferences.',
    messages: 'View and manage support inquiries.',
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-sans text-gray-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        inquiryCount={data.inquiries.length}
        onQuickUpload={() => setIsUploaderOpen(true)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-[72px] px-6 lg:px-8 flex items-center justify-between bg-white border-b border-gray-100/80 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 bg-gray-50 rounded-xl border border-gray-100" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-gray-900">{tabLabels[activeTab] || activeTab}</h1>
              <p className="text-[11px] text-gray-400 font-medium">{tabDescriptions[activeTab] || ''}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100/80 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-all">
              <Search size={16} />
            </button>
            <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100/80 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-all relative">
              <Bell size={16} />
              {data.inquiries.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            <div onClick={() => setIsUploaderOpen(true)} className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-all cursor-pointer">
              <Upload size={16} />
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold ml-1 shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-6 lg:px-8 py-6 max-w-[1400px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                className={`mb-6 px-5 py-4 rounded-xl flex items-center gap-3 text-[13px] font-medium border ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : 'bg-red-50 text-red-700 border-red-100'
                }`}
              >
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="grid grid-cols-4 gap-4"><div className="h-28 bg-gray-100 rounded-2xl" /><div className="h-28 bg-gray-100 rounded-2xl" /><div className="h-28 bg-gray-100 rounded-2xl" /><div className="h-28 bg-gray-100 rounded-2xl" /></div>
              <div className="h-80 bg-gray-100 rounded-2xl" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              {activeTab === 'overview' && <Overview data={data} onEdit={(v: any) => { setEditingItem(v); setFormData(v); }} onSwitchTab={setActiveTab} />}
              {activeTab === 'assets' && <AssetHub data={data} onAddNew={() => setIsUploaderOpen(true)} onEdit={(v: any) => { setEditingItem(v); setFormData(v); }} onDelete={handleDelete} onSwitchTab={setActiveTab} />}
              {activeTab === 'management' && <Management data={data} onEdit={(item: any, type?: string) => { setEditingItem(item || { name: type === 'categories' || type === 'sponsors' ? '' : undefined, slug: type === 'categories' ? '' : undefined, label: (type === 'statistics' || type === 'image-stacks') ? '' : undefined, value: type === 'statistics' ? '' : undefined, title: type === 'vectors' ? '' : undefined, imageUrl: (type === 'vectors' || type === 'image-stacks') ? '' : undefined, logo: type === 'sponsors' ? '' : undefined, author: (type === 'testimonials' || type === 'video-profiles') ? '' : undefined, role: (type === 'testimonials' || type === 'video-profiles') ? '' : undefined, content: type === 'testimonials' ? '' : undefined, avatar: type === 'testimonials' ? '' : undefined, tab: type === 'video-profiles' ? '' : undefined, highlight: type === 'video-profiles' ? '' : undefined, subtext: type === 'video-profiles' ? '' : undefined, quote: type === 'video-profiles' ? '' : undefined, image: type === 'video-profiles' ? '' : undefined, videoId: type === 'video-profiles' ? '' : undefined, bgColor: type === 'video-profiles' ? '' : undefined, type }); setFormData(item || (type === 'categories' ? { name: '', slug: '', type } : type === 'statistics' ? { label: '', value: '', type } : type === 'sponsors' ? { name: '', logo: '', type } : type === 'testimonials' ? { author: '', role: '', avatar: '', content: '', type } : type === 'video-profiles' ? { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type } : { label: '', imageUrl: '', type })); }} onDelete={handleDelete} />}
              {activeTab === 'video-profiles' && <VideoProfileManagement data={data} onEdit={(item: any, type?: string) => { const base = { tab: '', highlight: '', subtext: '', quote: '', author: '', role: '', image: '', videoId: '', bgColor: '', type: 'video-profiles' }; setEditingItem(item || base); setFormData(item || base); }} onDelete={handleDelete} />}
              {activeTab === 'our-design' && <OurDesignManagement data={data} onEdit={(item: any, type?: string) => { const base = { title: '', description: '', youtubeUrl: '', tag: 'Design', type: 'our-designs' }; setEditingItem(item || base); setFormData(item || base); }} onDelete={handleDelete} />}
              {activeTab === 'track-tabs' && <BreandingManagement />}
              {activeTab === 'messages' && <Messages data={data} onDelete={handleDelete} />}
            </motion.div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingItem(null)} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden font-sans border border-gray-100">
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">{editingItem.id ? 'Update Item' : 'Create New'}</h2>
                  </div>
                  <button onClick={() => setEditingItem(null)} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                    <X size={16} />
                  </button>
                </div>
                <p className="text-[12px] text-gray-400 ml-[42px]">Fill in the details below to configure this item.</p>
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
                      const allowedFields: Record<string, string[]> = {
                        'categories': ['name', 'slug', 'description', 'icon'],
                        'statistics': ['label', 'value'],
                        'sponsors': ['name', 'logo'],
                        'testimonials': ['author', 'role', 'avatar', 'content'],
                        'image-stacks': ['label', 'imageUrl'],
                        'video-profiles': ['tab', 'highlight', 'subtext', 'quote', 'author', 'role', 'image', 'videoId', 'bgColor'],
                        'our-designs': ['title', 'description', 'youtubeUrl', 'tag', 'order'],
                        'vectors': ['title', 'imageUrl', 'description', 'categoryId', 'isPremium']
                      };

                      const finalData: any = {};
                      if (allowedFields[formType]) {
                         allowedFields[formType].forEach(key => {
                            if (submitData[key] !== undefined) finalData[key] = submitData[key];
                         });
                      }

                      const success = await handleAction(method, url, finalData);
                      if (success) setEditingItem(null);
                    }}
                  >
                    <div className="px-6 pb-6 space-y-4 max-h-[520px] overflow-y-auto no-scrollbar">
                      {['vectors', 'sponsors', 'testimonials', 'image-stacks', 'video-profiles'].includes(formType) && (
                        <div className="mb-4">
                          <ImageUploadInput
                             value={formData.imageUrl || formData.logo || formData.avatar || formData.image}
                             onChange={(v: string) => {
                               if (formType === 'sponsors') setFormData({...formData, logo: v});
                               else if (formType === 'testimonials') setFormData({...formData, avatar: v});
                               else if (formType === 'video-profiles') setFormData({...formData, image: v});
                               else setFormData({...formData, imageUrl: v});
                             }}
                          />
                        </div>
                      )}

                      {formType === 'categories' ? (
                        <div className="space-y-4">
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
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <SimpleInput label="Author Name" value={formData.author} onChange={(v: string) => setFormData({ ...formData, author: v })} required placeholder="John Doe" />
                            <SimpleInput label="Author Role" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} placeholder="Designer" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.content} onChange={(v: string) => setFormData({ ...formData, content: v })} required placeholder="Describe the project goals and scope" />
                        </div>
                      ) : formType === 'video-profiles' ? (
                        <div className="space-y-4">
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
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                             <SimpleInput label="Design Title" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} required placeholder="Enter design name" />
                             <SimpleInput label="Tag" value={formData.tag} onChange={(v: string) => setFormData({ ...formData, tag: v })} placeholder="Pick a tag" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.description} onChange={(v: string) => setFormData({ ...formData, description: v })} required placeholder="Describe the project goals and scope" />
                          <SimpleInput label="YouTube Link" value={formData.youtubeUrl} onChange={(v: string) => setFormData({ ...formData, youtubeUrl: v })} placeholder="https://youtube.com/watch?v=..." required />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                             <SimpleInput label="Project Name" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} required placeholder="Enter project name" />
                             <SimpleInput label="Status/Tag" value={formData.tag} onChange={(v: string) => setFormData({ ...formData, tag: v })} placeholder="Select status" />
                          </div>
                          <SimpleTextarea label="Description" value={formData.description || formData.content} onChange={(v: string) => setFormData({ ...formData, description: v })} required placeholder="Describe the project goals and scope" />
                          <div className="flex items-center gap-2 pt-1">
                             <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({ ...formData, isPremium: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                             <label className="text-[13px] text-gray-600 font-medium">Mark as premium asset</label>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100/80 flex items-center justify-end gap-2 bg-gray-50/50">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-[13px] font-medium rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        {editingItem.id ? 'Update' : 'Save'}
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