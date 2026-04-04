"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Search,
  Plus,
  TrendingUp,
  Image as ImageIcon,
  X,
  Users,
  Sparkles,
  BookOpen,
  Award,
  Smile,
  Calendar,
  MapPin,
  BarChart3,
  Film,
} from 'lucide-react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ThreadCard } from "./_components/ThreadCard";
import { ThreadDetailModal } from "./_components/ThreadDetailModal";

// --- Constants ---

const categoryColors: Record<string, string> = {
  "SHOWCASE": "#4F46E5",
  "FEEDBACK": "#8B5CF6",
  "ANNOUNCEMENTS": "#F43F5E",
  "TUTORIAL": "#10B981",
  "Q&A": "#06B6D4",
  "GENERAL": "#64748B"
};

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem('community_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('community_session_id', id);
  }
  return id;
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

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("For You");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

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
          role: t.author?.role || "Member"
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
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      setShowAuthWarning(true);
      return;
    }
    if (!newDescription.trim() || isPosting) return;

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
          category: "GENERAL",
          visibility: "Public",
          authorId: user.id || null,
          authorName: user.name,
          authorEmail: user.email,
          images: tempImages
        })
      });

      if (res.ok) {
        setNewDescription("");
        setTempImages([]);
        fetchThreads();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleStartDiscussion = () => {
    if (!user) {
      setShowAuthWarning(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      textarea?.focus();
    }, 500);
  };

  const filteredThreads = useMemo(() => {
    let result = [...threads];

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.snippet.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(t => t.category === activeCategory.toUpperCase());
    }

    // Sort by Tab
    if (activeTab === "Trending") {
      result.sort((a, b) => (b.likes + b.replies) - (a.likes + a.replies));
    } else if (activeTab === "Latest") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      // Default: Latest
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [threads, searchQuery, activeCategory, activeTab]);

  const handleOpenThread = (thread: any) => {
    setSelectedThread(thread);
    setIsDetailOpen(true);
    window.history.pushState({}, '', `/community?thread=${thread.id}`);
  };

  // Top contributors
  const topContributors = [
    { name: "Sarah Chen", posts: 156, avatar: "SC" },
    { name: "Marcus Rivera", posts: 134, avatar: "MR" },
    { name: "Emma Watson", posts: 98, avatar: "EW" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-35 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ─── Left Sidebar - Navigation ─── */}
          <aside className="hidden lg:block lg:col-span-3 space-y-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-xl border border-gray-100 p-2">
              {[
                { icon: Sparkles, label: "For You" },
                { icon: TrendingUp, label: "Trending" },
                { icon: Users, label: "Following" },
                { icon: BookOpen, label: "Saved" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === item.label
                    ? 'bg-orange-50 text-orange-600 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.1)]'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.label ? 'text-orange-500' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {["All", "Design", "Development", "Tutorial", "Q&A", "Showcase"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${activeCategory === cat
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      {cat}
                      {activeCategory === cat && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Top Contributors</h3>
              <div className="space-y-3">
                {topContributors.map((contributor, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSearchQuery(contributor.name)}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold group-hover:scale-110 transition-transform">
                        {contributor.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{contributor.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{contributor.posts} posts</p>
                      </div>
                    </div>
                    {i < 3 && <Award className="w-4 h-4 text-yellow-500 group-hover:rotate-12 transition-transform" />}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ─── Main Content - Center Feed (Full Width) ─── */}
          <div className="lg:col-span-9 space-y-4">

            {/* Post Creator */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-500 overflow-hidden flex items-center justify-center text-white font-semibold text-sm shrink-0 border-2 border-white shadow-sm">
                  {user?.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <Users className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="What's happening?"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-base text-gray-900 placeholder:text-gray-400 outline-none resize-none pt-2 bg-transparent"
                    rows={2}
                  />

                  {tempImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-3 rounded-lg overflow-hidden border border-gray-100">
                      {tempImages.map((img, i) => (
                        <div key={i} className="relative aspect-video bg-gray-50">
                          <img src={img} className="w-full h-full object-cover" alt="" />
                          <button
                            onClick={() => setTempImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all"
                      >
                        <ImageIcon size={18} />
                      </button>
                      <button onClick={() => alert("Video upload coming soon!")} className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all">
                        <Film size={18} />
                      </button>
                      <button onClick={() => alert("Emoji picker coming soon!")} className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all">
                        <Smile size={18} />
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newDescription.trim() || isPosting}
                      className="px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPosting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Tabs */}
            <div className="flex gap-1 border-b border-gray-100">
              {["For You", "Trending", "Latest"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium relative transition-colors ${activeTab === tab ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Posts Feed */}
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    sessionId={sessionId}
                    onOpenThread={handleOpenThread}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Be the first to start a discussion!
                  </p>
                  <button
                    onClick={handleStartDiscussion}
                    className="text-orange-500 font-medium text-sm hover:text-orange-600"
                  >
                    Create a post →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Warning Modal */}
      <AnimatePresence>
        {showAuthWarning && (
          <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthWarning(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-4xl p-8 text-center shadow-2xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Login Required</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Join the Vectorpic community to start discussions, share assets, and engage with other creators.
              </p>
              <div className="flex flex-col gap-3">
                <Link 
                  href="/auth/user/login" 
                  className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100"
                >
                  Sign In Now
                </Link>
                <button 
                  onClick={() => setShowAuthWarning(false)}
                  className="w-full py-4 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-900 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <ThreadDetailModal
        thread={selectedThread}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        sessionId={sessionId}
        user={user}
      />

      {/* Mobile FAB */}
      <button
        onClick={handleStartDiscussion}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-orange-600 transition-all active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}