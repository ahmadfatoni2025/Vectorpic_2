"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
  MoreHorizontal,
  X,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { NewDiscussionModal } from "./_components/NewDiscussionModal";
import { ThreadCard } from "./_components/ThreadCard";
import { ThreadDetailModal } from "./_components/ThreadDetailModal";

// --- Constants ---

const categoryColors: Record<string, string> = {
  "SHOWCASE": "#10B981",
  "FEEDBACK": "#8B5CF6",
  "ANNOUNCEMENTS": "#F43F5E",
  "TUTORIAL": "#10B981",
  "Q&A": "#06B6D4",
  "GENERAL": "#F59E0B"
};

const categoryFilters = ["All", "SHOWCASE", "FEEDBACK", "TUTORIAL", "Q&A", "GENERAL", "ANNOUNCEMENTS"];

// Generate a stable session ID for guest users
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem('community_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('community_session_id', id);
  }
  return id;
}

// --- Main Page ---

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("For You");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const sessionId = useMemo(() => getSessionId(), []);

  // Fetch threads
  const fetchThreads = async () => {
    try {
      const response = await fetch("/api/discussions");
      const data = await response.json();

      const mappedThreads = data.map((t: any) => ({
        id: t.id,
        user: {
          name: t.author?.name || "Anonymous",
          avatar: t.author?.image || `https://ui-avatars.com/api/?name=${t.author?.name || "A"}&background=04cce7&color=fff`,
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

  // Re-fetch when modal closes (new post created)
  useEffect(() => {
    if (!isModalOpen) fetchThreads();
  }, [isModalOpen]);

  // Check URL for thread param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const threadId = params.get('thread');
    if (threadId && threads.length > 0) {
      const found = threads.find(t => t.id === threadId);
      if (found) {
        setSelectedThread(found);
        setIsDetailOpen(true);
      }
    }
  }, [threads]);

  // Get bookmarked thread IDs
  const bookmarkedIds = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('bookmarked_threads') || '[]');
  }, [activeTab]); // re-read when switching tabs

  // Filter & sort  
  const filteredThreads = threads
    .filter(t => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.snippet.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;

      // Tab filter
      if (activeTab === 'Bookmarks') {
        return matchesSearch && matchesCategory && bookmarkedIds.includes(t.id);
      }

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (activeTab === "For You") return b.createdAt - a.createdAt;
      if (activeTab === "Popular") return b.likes - a.likes;
      if (activeTab === "Bookmarks") return b.createdAt - a.createdAt;
      return 0;
    });

  // Open thread detail
  const handleOpenThread = (thread: any) => {
    setSelectedThread(thread);
    setIsDetailOpen(true);
    // Update URL without navigation
    window.history.pushState({}, '', `/community?thread=${thread.id}`);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedThread(null);
    window.history.pushState({}, '', '/community');
  };



  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans">
      <Navbar />

      <div className="max-w-[7xl] mx-auto px-4 sm:px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ─── Left Sidebar ─── */}
          <aside className="hidden lg:block col-span-1 space-y-4 top-28 h-fit">
            {/* Navigation */}


            {/* Category Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Categories</h3>
              <div className="space-y-0.5">
                {categoryFilters.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${activeCategory === cat
                      ? 'bg-cyan-50 text-cyan-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                  >
                    <span className="flex items-center justify-between">
                      {cat === 'All' ? '📋 All Posts' : `#${cat}`}
                      {cat !== 'All' && (
                        <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                          {threads.filter(t => t.category === cat).length}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-gray-800">{threads.length}</div>
                  <div className="text-[10px] text-gray-400 font-medium">Posts</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-gray-800">{threads.reduce((sum, t) => sum + (t.replies || 0), 0)}</div>
                  <div className="text-[10px] text-gray-400 font-medium">Replies</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Contributors</h3>
              <div className="space-y-3">
                {threads.slice(0, 5).map((thread, idx) => (
                  <div key={`contrib-${idx}`} className="flex items-center gap-3 group cursor-pointer">
                    <img src={thread.user.avatar} className="w-8 h-8 rounded-full object-cover border border-gray-100" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-800 truncate group-hover:text-cyan-600 transition-colors">{thread.user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{thread.title}</p>
                    </div>
                  </div>
                ))}
                {threads.length === 0 && (
                  <p className="text-[12px] text-gray-400">No activity yet</p>
                )}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(categoryColors).map(cat => {
                  const count = threads.filter(t => t.category === cat).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${activeCategory === cat
                        ? 'bg-cyan-50 text-cyan-600 border-cyan-200'
                        : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200'
                        }`}
                    >
                      #{cat} <span className="text-[10px] opacity-60 ml-0.5">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            <div className="px-2">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400 font-medium">
                <span className="hover:underline cursor-pointer">Terms</span>
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Guidelines</span>
                <span>© 2026 Vectorpic</span>
              </div>
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <div className="col-span-1 lg:col-span-2 space-y-4">


            {/* Feed Tabs + Search */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center border-b border-gray-200 flex-1">
                {["For You", "Popular"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-[13px] font-semibold relative transition-colors ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="feedTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-2 rounded-xl transition-all ${showSearch ? 'bg-cyan-50 text-cyan-500' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                >
                  {showSearch ? <X size={16} /> : <Search size={16} />}
                </button>

                {/* Mobile category filter */}
                <div className="lg:hidden relative">
                  <button
                    onClick={() => {
                      const idx = categoryFilters.indexOf(activeCategory);
                      setActiveCategory(categoryFilters[(idx + 1) % categoryFilters.length]);
                    }}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-1"
                  >
                    <Filter size={16} />
                    {activeCategory !== 'All' && (
                      <span className="text-[10px] font-bold text-cyan-500">{activeCategory}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar (expandable) */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by title or content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-200 transition-all placeholder:text-gray-400"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Category Badge (when filtered) */}
            {activeCategory !== 'All' && (
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500">Filtered by:</span>
                <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-[12px] font-medium rounded-full border border-cyan-100 flex items-center gap-1.5">
                  #{activeCategory}
                  <button onClick={() => setActiveCategory('All')} className="hover:text-cyan-800">
                    <X size={12} />
                  </button>
                </span>
              </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-3">
              {loading ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent" />
                  <p className="text-[13px] text-gray-400 mt-3">Loading discussions...</p>
                </div>
              ) : filteredThreads.length > 0 ? (
                filteredThreads.map((thread, idx) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                  >
                    <ThreadCard
                      thread={thread}
                      sessionId={sessionId}
                      onOpenThread={handleOpenThread}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                  <MessageCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <h3 className="text-[15px] font-semibold text-gray-700">
                    {activeTab === 'Bookmarks' ? 'No bookmarks yet' : 'No posts found'}
                  </h3>
                  <p className="text-gray-400 text-[13px] mt-1 max-w-xs mx-auto">
                    {activeTab === 'Bookmarks'
                      ? 'Bookmark posts to save them for later.'
                      : 'Try adjusting your filters or be the first to post!'
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                      className="mt-4 text-cyan-600 text-[13px] font-medium hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Results count */}
            {!loading && filteredThreads.length > 0 && (
              <div className="text-center py-4">
                <span className="text-[12px] text-gray-400">
                  Showing {filteredThreads.length} of {threads.length} discussions
                </span>
              </div>
            )}
          </div>

          {/* ─── Right Sidebar ─── */}

        </div>
      </div>

      <Footer />

      {/* New Post Modal */}
      <NewDiscussionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />

      {/* Thread Detail Panel */}
      <ThreadDetailModal
        thread={selectedThread}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        sessionId={sessionId}
      />

      {/* Mobile FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-800 transition-all active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}

// Helper
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}