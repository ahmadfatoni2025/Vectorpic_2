"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ArrowRight,
  Plus,
  Send,
  Search,
  Bell,
  Mail,
  ChevronDown,
  Star,
  Check,
  HelpCircle,
  MessageSquare,
  User,
  Smile,
  Megaphone,
  Layers,
  Briefcase
} from 'lucide-react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { StartDiscussionButton } from "./_components/StartDiscussionButton";
import { NewDiscussionModal } from "./_components/NewDiscussionModal";
import { ThreadCard } from "./_components/ThreadCard";

// --- Types & Data ---

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  likes: number;
  time: string;
}

interface Thread {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  title: string;
  snippet: string;
  category: string;
  categoryColor: string;
  replies: number;
  time: string;
  latestReplyBy: string;
  participants: string[];
}

const threads: Thread[] = [
  {
    id: 1,
    user: { name: "Harry Wilson", avatar: "https://i.pravatar.cc/150?u=harry", role: "New Member" },
    title: "Introduce Yourself!",
    snippet: "Hey @everyone, new member alert here! Thought I'd write a bit about myself and why I'm here. First of my name is Harry and I'm 31 years old massive fan of...",
    category: "Introductions",
    categoryColor: "#10B981", // Green
    replies: 25,
    time: "5 minutes ago",
    latestReplyBy: "harrywilson",
    participants: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
      "https://i.pravatar.cc/150?u=4"
    ]
  },
  {
    id: 2,
    user: { name: "Ada", avatar: "https://i.pravatar.cc/150?u=ada", role: "Member" },
    title: "The 12 month member programme",
    snippet: "This is looking great! Quick question, if I already have a membership, can I upgrade it to include these new perks?",
    category: "Announcements",
    categoryColor: "#F43F5E", // Rose
    replies: 16,
    time: "26 minutes ago",
    latestReplyBy: "ada",
    participants: [
      "https://i.pravatar.cc/150?u=5",
      "https://i.pravatar.cc/150?u=6",
      "https://i.pravatar.cc/150?u=7"
    ]
  },
  {
    id: 3,
    user: { name: "Linyanhavoc", avatar: "https://i.pravatar.cc/150?u=linyan", role: "Contributor" },
    title: "What are you working on?",
    snippet: "Right now I'm working with this fantastic client who are looking to re-design their forum, currently we've just completed our research phase and moving into...",
    category: "Off-Topic Chatter",
    categoryColor: "#10B981", // Green
    replies: 4,
    time: "1 hour ago",
    latestReplyBy: "linyanhavoc",
    participants: [
      "https://i.pravatar.cc/150?u=8",
      "https://i.pravatar.cc/150?u=9",
      "https://i.pravatar.cc/150?u=10"
    ]
  },
  {
    id: 4,
    user: { name: "Donations", avatar: "https://i.pravatar.cc/150?u=don", role: "Member" },
    title: "UI of a new airline app, help needed!",
    snippet: "I wonder if you could help me check... we're developing a new flight booking flow and need some feedback on the seat selection...",
    category: "Feedback",
    categoryColor: "#8B5CF6", // Violet
    replies: 12,
    time: "3 hours ago",
    latestReplyBy: "donations",
    participants: [
      "https://i.pravatar.cc/150?u=11",
      "https://i.pravatar.cc/150?u=12"
    ]
  }
];

const sidebarCategories = [
  { name: "FAQ's", color: "#F59E0B", icon: HelpCircle },
  { name: "Off-Topic Chatter", color: "#10B981", icon: MessageSquare },
  { name: "Feedback", color: "#8B5CF6", icon: MessageCircle },
  { name: "Member Spotlight", color: "#EF4444", icon: User },
  { name: "Introductions", color: "#06B6D4", icon: Smile },
  { name: "Announcements", color: "#F43F5E", icon: Megaphone },
  { name: "Showcase", color: "#94A3B8", icon: Layers },
  { name: "Jobs", color: "#D97706", icon: Briefcase }
];

// --- Main Page ---

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("All Discussion");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFD] flex flex-col relative overflow-x-hidden pt-32">
      <Navbar />

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-10 grow mb-20">

        {/* Top Header / Search */}
        <div className="bg-white rounded-3xl p-4 mb-10 flex items-center justify-between border border-gray-100/50 shadow-sm">
          <div className="flex items-center gap-4 px-4 w-full max-w-md">
            {/* Logo placeholder same as image */}
            <div className="flex gap-1 items-end h-6 mr-4">
              <div className="w-2 h-4 bg-blue-400 rounded-sm" />
              <div className="w-2 h-6 bg-blue-500 rounded-sm" />
              <div className="w-2 h-2 bg-blue-300 rounded-sm" />
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search the forum"
                className="w-full bg-gray-50/50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pr-4">
            <button className="text-gray-400 hover:text-blue-500 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <button className="text-gray-400 hover:text-blue-500 transition-colors relative">
              <Mail className="w-5 h-5" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <img src="https://i.pravatar.cc/150?u=99" className="w-9 h-9 rounded-full border border-gray-100 shadow-sm" alt="profile" />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Feed */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-4 cursor-pointer shadow-sm hover:border-blue-100 transition-colors">
                <span className="text-sm font-bold text-gray-900">Latest first</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors pr-2">
                <Check className="w-4 h-4" />
                <span className="text-[12px] font-bold">Mark all as read</span>
              </div>
            </div>

            <div className="space-y-4">
              {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </div>

            <div className="pt-10 flex justify-center">
              <button className="text-blue-500 font-bold text-sm hover:underline cursor-pointer">Load more discussions</button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <StartDiscussionButton onClick={() => setIsModalOpen(true)} />

            <nav className="space-y-4">
              <button
                onClick={() => setActiveTab("All Discussion")}
                className={`w-full flex items-center justify-between px-2 py-2 rounded-xl transition-all ${activeTab === 'All Discussion' ? 'text-blue-500 font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">All Discussion</span>
                </div>
                {activeTab === 'All Discussion' && <Check className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setActiveTab("Following")}
                className={`w-full flex items-center justify-between px-2 py-2 rounded-xl transition-all ${activeTab === 'Following' ? 'text-blue-500 font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  <span className="text-sm">Following</span>
                </div>
                {activeTab === 'Following' && <Check className="w-4 h-4" />}
              </button>
            </nav>

            <div className="pt-8 space-y-4">
              <h4 className="px-2 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Categories</h4>
              <div className="">
                {sidebarCategories.map((cat) => (
                  <button key={cat.name} className="flex items-center gap-2 w-full group text-left px-2 py-2 rounded-xl hover:bg-white transition-all">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <cat.icon className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <div className="overscroll-contain z-100">
        <NewDiscussionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-blue-50/30 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-indigo-50/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </main>
  );
}
