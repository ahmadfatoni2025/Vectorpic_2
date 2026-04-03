"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Search,
  Plus,
  Home,
  Compass,
  Bell,
  Bookmark,
  TrendingUp,
  Image as ImageIcon,
  X,
  Filter,
  ChevronDown,
  LayoutGrid,
  Users,
  FlaskConical,
  Film,
  Music,
  Palette,
  Utensils,
  GraduationCap,
  Link as LinkIcon,
  List,
  CheckCircle2,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ThreadCard } from "./_components/ThreadCard";
import { ThreadDetailModal } from "./_components/ThreadDetailModal";
import Image from 'next/image';

// --- Constants ---

const categoryColors: Record<string, string> = {
  "SHOWCASE": "#4F46E5",
  "FEEDBACK": "#8B5CF6",
  "ANNOUNCEMENTS": "#F43F5E",
  "TUTORIAL": "#10B981",
  "Q&A": "#06B6D4",
  "GENERAL": "#64748B"
};

const categoryFilters = ["All", "Main Feed", "Following", "Design", "Tutorial", "Q&A", "General"];

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem('community_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('community_session_id', id);
  }
  return id;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("Read");
  const [activeCategory, setActiveCategory] = useState("Main Feed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [createPostTab, setCreatePostTab] = useState("Create Post");

  // Post Creator State
  const [newDescription, setNewDescription] = useState("");
  const [tempImages, setTempImages] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sessionId = useMemo(() => getSessionId(), []);

  const fetchThreads = async () => {
    try {
      const response = await fetch("/api/discussions");
      const data = await response.json();
      const mappedThreads = data.map((t: any) => ({
        id: t.id,
        user: {
          name: t.author?.name || "Anonymous",
          avatar: t.author?.image || `https://ui-avatars.com/api/?name=${t.author?.name || "A"}&background=4F46E5&color=fff`,
          role: t.author?.role || "Editorial Member"
        },
        title: t.title,
        snippet: t.description,
        category: t.category,
        categoryColor: categoryColors[t.category] || "#94A3B8",
        replies: t.commentsCount || 0,
        likes: t.likesCount || 0,
        views: t.viewsCount || 0,
        createdAt: new Date(t.createdAt),
        time: formatRelativeTime(new Date(t.createdAt)),
        images: t.images || [],
        type: t.category === 'Q&A' ? 'question' : 'post'
      }));
      setThreads(mappedThreads);
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setTempImages(prev => [...prev, data.url]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image");
    }
  };

  const handleWebLink = () => {
    const url = prompt("Enter image URL from the web:");
    if (url && (url.startsWith('http') || url.startsWith('https'))) {
      setTempImages(prev => [...prev, url]);
    } else if (url) {
      alert("Please enter a valid URL starting with http:// or https://");
    }
  };

  const handleCreatePost = async () => {
    if (!newDescription.trim() || isPosting) return;

    // Auto-generate title from the first few words of the content
    const words = newDescription.trim().split(/\s+/);
    const finalTitle = words.length > 5
      ? words.slice(0, 5).join(" ") + "..."
      : newDescription.trim();

    setIsPosting(true);
    try {
      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: finalTitle,
          description: newDescription.trim(),
          category: createPostTab === "Ask Question" ? "Q&A" : (activeCategory === "Main Feed" ? "GENERAL" : activeCategory.toUpperCase()),
          visibility: "Public",
          authorId: null, // Anonymous for now
          images: tempImages
        })
      });

      if (res.ok) {
        setNewDescription("");
        setTempImages([]);
        fetchThreads();
      } else {
        alert("Failed to share post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const filteredThreads = threads
    .filter(t => {
      const matchesSearch = searchQuery === '' || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.snippet.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filtering (Main Feed shows everything, others filter strictly)
      const matchesCategory = activeCategory === "Main Feed" || t.category?.toUpperCase() === activeCategory.toUpperCase();

      if (activeTab === "Answer") return t.type === 'question' && matchesSearch && matchesCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleOpenThread = (thread: any) => {
    setSelectedThread(thread);
    setIsDetailOpen(true);
    window.history.pushState({}, '', `/community?thread=${thread.id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      {/* ─── Top Header ─── */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-gray-100 z-50 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-black text-[#FF4D00] tracking-tight whitespace-nowrap cursor-pointer" onClick={() => window.location.reload()}>The Editorial Feed</h1>
            <nav className="hidden md:flex items-center gap-6">
              {["Read", "Answer"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[14px] font-bold px-1 py-6 relative transition-colors ${activeTab === tab ? "text-[#FF4D00]" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="headerTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D00]" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Search & Actions */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF4D00] transition-colors" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-full text-[14px] outline-none transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <button className="relative text-gray-400 hover:text-[#FF4D00] transition-colors" onClick={() => alert("No new notifications")}>
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF4D00] border-2 border-white rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-100 cursor-pointer hover:ring-2 ring-orange-400 transition-all" onClick={() => alert("User profile coming soon!")}>
              <img src="https://ui-avatars.com/api/?name=Alex+Curatore&background=111&color=fff" alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[104px] pb-20">
        <div className="flex gap-10">

          {/* ─── Left Sidebar ─── */}
          <aside className="hidden lg:flex flex-col w-56 space-y-6 shrink-0 sticky top-[104px] h-fit">
            <div className="space-y-1">
              {[
                { name: "Main Feed", icon: LayoutGrid },
                { name: "Following", icon: Users },
                { name: "Science", icon: FlaskConical },
                { name: "Movies", icon: Film },
                { name: "Music", icon: Music },
                { name: "Design", icon: Palette },
                { name: "Food", icon: Utensils },
                { name: "Education", icon: GraduationCap },
              ].map(item => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveCategory(item.name);
                    setSearchQuery(""); // Reset search on category change
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${activeCategory === item.name ? "bg-[#FFF5F0] text-[#FF4D00]" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}`}
                >
                  <item.icon size={18} strokeWidth={2.5} />
                  {item.name.toUpperCase()}
                </button>
              ))}
            </div>

            <button className="w-full py-2.5 px-4 rounded-xl border border-orange-100 text-[#FF4D00] text-[13px] font-bold hover:bg-[#FFF5F0] transition-all text-center">
              Improve your feed
            </button>
          </aside>

          {/* ─── Main Feed ─── */}
          <div className="flex-1 max-w-[800px] mx-auto space-y-6 min-w-0">

            {/* Create Post Inline Box */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-6 mb-8 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Alex+Curatore&background=111&color=fff" alt="" />
                  </div>
                  <div className="flex gap-8">
                    {["Create Post", "Ask Question"].map(t => (
                      <button
                        key={t}
                        onClick={() => {
                          setCreatePostTab(t);
                          // Option to change category automatically if needed
                        }}
                        className={`py-4 text-[13px] font-bold relative transition-colors ${createPostTab === t ? "text-[#FF4D00]" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        {t}
                        {createPostTab === t && <motion.div layoutId="createTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D00]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder={createPostTab === "Create Post" ? "Share your insights with the community..." : "What is your question?"}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full min-h-[120px] text-[17px] text-gray-700 outline-none resize-none placeholder:text-gray-300 px-1 font-medium leading-relaxed"
                />

                {/* Media Previews */}
                {tempImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {tempImages.map((img, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                        <button
                          onClick={() => setTempImages(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute -top-1 -right-1 bg-white p-1 rounded-full text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-4">
                  <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-gray-600 transition-colors" onClick={() => fileInputRef.current?.click()}><ImageIcon size={20} /></button>
                    <button className="hover:text-gray-600 transition-colors" onClick={handleWebLink}><LinkIcon size={20} /></button>
                    <button className="hover:text-gray-600 transition-colors" onClick={() => alert("Lists coming soon")}><List size={20} /></button>
                  </div>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newDescription.trim() || isPosting}
                    className="px-8 py-3 bg-[#FF4D00] text-white rounded-full text-[14px] font-bold shadow-lg shadow-orange-100 hover:bg-[#E64500] transition-all disabled:opacity-50"
                  >
                    {isPosting ? "Posting..." : "Post Insight"}
                  </button>
                </div>
              </div>
            </div>

            {/* Threads List */}
            <div className="space-y-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse" />
                ))
              ) : filteredThreads.map((thread, idx) => (
                <ThreadCard
                  key={thread.id}
                  thread={{ ...thread, isQuestion: thread.type === 'question' }}
                  sessionId={sessionId}
                  onOpenThread={handleOpenThread}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ThreadDetailModal
        thread={selectedThread}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        sessionId={sessionId}
      />
    </main>
  );
}

function formatRelativeTime(date: Date): string {
  const diff = new Date().getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}