"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Search,
  Plus,
  Home,
  Grid,
  HelpCircle,
  Sparkles,
  Eye,
  Settings,
  Book,
  TrendingUp,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { NewDiscussionModal } from "./_components/NewDiscussionModal";
import { ThreadCard } from "./_components/ThreadCard";

// --- Constants ---

const mainNav = [
  { name: "Home", icon: Home, active: true },
  { name: "Showcases", icon: Grid, active: false },
  { name: "Trending", icon: TrendingUp, active: false },
  { name: "Resources", icon: HelpCircle, active: false },
];

const topicCategories = [
  { name: "UI/UX Design", icon: Sparkles, count: 234 },
  { name: "Graphic Design", icon: Grid, count: 189 },
  { name: "Branding", icon: Heart, count: 156 },
  { name: "Web Design", icon: Eye, count: 142 },
  { name: "Motion Graphics", icon: Zap, count: 98 },
  { name: "Design Tools", icon: Settings, count: 87 },
  { name: "Portfolio Review", icon: Users, count: 76 },
  { name: "Design Theory", icon: Book, count: 65 },
];

const categoryColors: Record<string, string> = {
  "SHOWCASE": "#10B981",
  "FEEDBACK": "#8B5CF6",
  "ANNOUNCEMENTS": "#F43F5E",
  "TUTORIAL": "#10B981",
  "Q&A": "#06B6D4",
  "GENERAL": "#F59E0B"
};

// --- Main Page ---

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("Newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThreads() {
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
          replies: Math.floor(Math.random() * 50),
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 500) + 100,
          createdAt: new Date(t.createdAt),
          time: new Date(t.createdAt).toLocaleDateString(),
          images: t.images || [],
        }));

        setThreads(mappedThreads);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchThreads();
  }, [isModalOpen]);

  const tabs = [
    { id: "Newest", label: "Newest", icon: Clock },
    { id: "Popular", label: "Popular", icon: TrendingUp },
    { id: "Discussed", label: "Most Discussed", icon: MessageCircle },
  ];

  const filteredThreads = threads
    .filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (activeTab === "Newest") return b.createdAt - a.createdAt;
      if (activeTab === "Popular") return b.likes - a.likes;
      if (activeTab === "Discussed") return b.replies - a.replies;
      return 0;
    });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 h-fit">
            {/* Navigation Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <nav className="space-y-1.5">
                {mainNav.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {}}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                        ? 'bg-cyan-50 text-cyan-600 font-bold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${item.active ? 'text-cyan-600' : 'text-gray-300 group-hover:text-cyan-400'}`} />
                    <span className="text-[14.5px]">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Topics Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Popular Topics
                </h3>
                <button className="text-[11px] text-cyan-500 font-bold hover:underline">VIEW ALL</button>
              </div>
              <div className="space-y-1">
                {topicCategories.map((topic) => (
                  <button
                    key={topic.name}
                    onClick={() => {}}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-all group overflow-hidden"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                        <topic.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-[14px] font-medium group-hover:text-gray-900">{topic.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-bold bg-gray-50 group-hover:bg-cyan-100 group-hover:text-cyan-600 px-2 py-0.5 rounded-md transition-colors">{topic.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-24 h-24 text-cyan-400" />
               </div>
               <div className="text-center relative z-10">
                  <div className="text-3xl font-black text-gray-900">2.8k</div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Active Creators</div>
                  <div className="h-px bg-gray-50 my-5" />
                  <div className="flex justify-around">
                    <div>
                      <div className="text-lg font-bold text-gray-900">156</div>
                      <div className="text-[10px] font-bold text-gray-400">DAILY POSTS</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">2.3k</div>
                      <div className="text-[10px] font-bold text-gray-400">MONTHLY TIPS</div>
                    </div>
                  </div>
               </div>
            </div>
          </aside>

          {/* Main Content - Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Search and Navigation Tabs */}
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="bg-white rounded-2xl p-1.5 flex gap-1 border border-gray-100 shadow-sm w-fit">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 ${activeTab === tab.id
                          ? 'bg-cyan-50 text-cyan-600 shadow-sm'
                          : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-[#04cce7] hover:bg-cyan-500 text-white px-7 py-3 rounded-xl text-[15px] font-bold transition-all shadow-lg shadow-cyan-100 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </button>
              </div>

              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search discussions by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-13 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-[15px] outline-none focus:ring-4 focus:ring-cyan-50 focus:border-cyan-100 shadow-sm transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {loading ? (
                <div className="bg-white rounded-3xl p-24 text-center border border-gray-100 shadow-sm">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-cyan-500 border-t-transparent"></div>
                  <p className="text-gray-400 mt-6 font-bold text-[15px]">Syncing community data...</p>
                </div>
              ) : filteredThreads.length > 0 ? (
                <div className="space-y-6">
                  {filteredThreads.map((thread, idx) => (
                    <motion.div
                      key={thread.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                      <ThreadCard thread={thread} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No results found</h3>
                  <p className="text-gray-400 text-[15px] mt-2 max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                  <button
                    onClick={() => {setSearchQuery(""); setActiveTab("Newest");}}
                    className="mt-8 text-cyan-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Load More */}
            {filteredThreads.length > 0 && (
              <div className="flex justify-center pt-8">
                <button 
                   onClick={() => {}}
                   className="flex items-center gap-2.5 px-8 py-3.5 bg-white border border-gray-100 rounded-2xl text-[15px] font-bold text-gray-600 hover:bg-gray-50 hover:border-cyan-100 hover:text-cyan-600 transition-all active:scale-95 shadow-sm"
                >
                  Load More
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 h-fit">
            {/* Trending Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">
                Trending Discussions
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Best UI tools for 2024", replies: 145, likes: 528, authorAvatar: "https://i.pravatar.cc/150?u=a" },
                  { title: "Design system best practices", replies: 82, likes: 294, authorAvatar: "https://i.pravatar.cc/150?u=b" },
                  { title: "Freelance pricing guide", replies: 64, likes: 176, authorAvatar: "https://i.pravatar.cc/150?u=c" },
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="flex gap-3">
                      <div className="shrink-0">
                         <img src={item.authorAvatar} className="w-8 h-8 rounded-full border border-gray-50" alt="avatar" />
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[14px] font-bold text-gray-900 group-hover:text-cyan-600 transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5" /> {item.replies}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5" /> {item.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-cyan-600 rounded-3xl p-7 shadow-xl shadow-cyan-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <Zap className="w-32 h-32 text-white" />
              </div>
              <h3 className="text-lg font-black text-white mb-3">Community Rules</h3>
              <p className="text-[13px] text-cyan-50 font-medium leading-relaxed opacity-90">
                Be respectful, give constructive feedback, and help others grow. Let's build a positive community together.
              </p>
              <button 
                onClick={() => {}}
                className="mt-6 w-full bg-white text-cyan-600 py-3 rounded-xl text-[14px] font-bold hover:bg-cyan-50 transition-colors"
              >
                Read Guidelines
              </button>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      
      {/* New Discussion Modal */}
      <NewDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mobile FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-cyan-600 transition-all active:scale-90 shadow-cyan-200"
      >
        <Plus className="w-7 h-7" />
      </button>
    </main>
  );
}