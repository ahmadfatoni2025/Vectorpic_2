"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Layers, 
  Library, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical, 
  ArrowUpRight, 
  Clock, 
  Download, 
  MessageSquare,
  ChevronRight,
  LogOut,
  LayoutGrid
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Home');

  const stats = [
    { label: "Total Projects", value: "248", change: "+12%", icon: <Layers className="w-5 h-5" />, color: "bg-indigo-600" },
    { label: "Downloads", value: "1.2k", change: "+8%", icon: <Download className="w-5 h-5" />, color: "bg-emerald-600" },
    { label: "Team Members", value: "12", change: "Stable", icon: <Users className="w-5 h-5" />, color: "bg-amber-600" },
    { label: "Recent Comments", value: "84", change: "+24", icon: <MessageSquare className="w-5 h-5" />, color: "bg-rose-600" },
  ];

  const recentProjects = [
    { id: 1, title: "Modern Branding Kit", category: "Branding", date: "2h ago", image: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?q=80&w=400&auto=format&fit=crop" },
    { id: 2, title: "E-Commerce Icons", category: "Vector Art", date: "5h ago", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&auto=format&fit=crop" },
    { id: 3, title: "Dashboard UI System", category: "UI/UX", date: "1d ago", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop" },
    { id: 4, title: "Abstract Mesh Gradient", category: "Backgrounds", date: "2d ago", image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&auto=format&fit=crop" },
  ];

  const navItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" /> },
    { name: 'Projects', icon: <Layers className="w-5 h-5" /> },
    { name: 'Library', icon: <Library className="w-5 h-5" /> },
    { name: 'Team', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-[#111] overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col justify-between p-6 h-screen shrink-0">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-10 pl-2">
            <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg">
               <div className="w-4 h-4 bg-white/20 rounded-sm rotate-12" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Vectorpic</span>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
                  activeTab === item.name 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.name}
                {activeTab === item.name && (
                  <motion.div layoutId="nav-bg" className="absolute inset-0 bg-indigo-600 rounded-xl -z-10" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl relative overflow-hidden group">
             <div className="relative z-10 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-2 underline decoration-indigo-200 decoration-2 underline-offset-4">Upgrade Plan</span>
                <p className="text-sm font-bold text-indigo-900 leading-tight mb-4">Unlock premium vectors and priority support.</p>
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-black shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all uppercase tracking-widest">Pricing Plan</button>
             </div>
             <div className="absolute top-[-20%] right-[-20%] w-20 h-20 bg-indigo-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* --- HEADER --- */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <span className="text-xl font-bold tracking-tight hidden sm:block">Dashboard Overview</span>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects, assets..." 
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-px h-6 bg-gray-100 mx-2" />
            <div className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-xl transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none mb-1">Ahmad Fatoni</p>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 border-2 border-white shadow-xl overflow-hidden flex items-center justify-center text-white font-black text-xs">
                 AF
              </div>
            </div>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar" data-lenis-prevent>
          {/* Welcome Message */}
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
          >
             <div>
                <h2 className="text-4xl font-black tracking-tighter leading-none mb-3">Hi, Ahmad. 👋</h2>
                <p className="text-gray-500 font-medium">Here's what's happening with your workspace today.</p>
             </div>
             <button className="flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-2xl font-black text-xs shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 transition-all uppercase tracking-widest">
                <Plus className="w-4 h-4" />
                New Project
             </button>
          </motion.div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                  {stat.change !== 'Stable' && (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">{stat.change}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Grid: Projects & Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Recent Projects Left (2/3) */}
            <div className="xl:col-span-2 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-tight">Recent Projects</h3>
                  <Link href="#" className="text-xs font-black text-indigo-600 flex items-center gap-1 uppercase tracking-widest hover:underline">
                    View All <ChevronRight className="w-3 h-3" />
                  </Link>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recentProjects.map((project, idx) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                           <span className="bg-black/20 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{project.category}</span>
                        </div>
                      </div>
                      <div className="p-6 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">{project.title}</h4>
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                             <Clock className="w-3 h-3" />
                             {project.date}
                          </div>
                        </div>
                        <button className="text-gray-300 hover:text-black transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Side Activity Feed Right (1/3) */}
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight">Live Activity</h3>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="flex gap-4 relative group cursor-pointer">
                      <div className="relative shrink-0">
                         <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i + 50}`} alt="user" />
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-xs font-medium text-gray-500">
                           <span className="font-black text-black">Sarah Wilson</span> commented on <span className="text-indigo-600 font-bold">New Branding Assets</span>
                         </p>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">24 mins ago</p>
                      </div>
                      {i < 4 && <div className="absolute top-12 left-5 w-px h-8 bg-gray-50" />}
                   </div>
                 ))}
                 
                 <button className="w-full py-3 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-gray-50 hover:text-black transition-all">
                   View Full Activity Log
                 </button>
              </div>

              {/* Internal Ad / Feature Highlight */}
              <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                 <div className="relative z-10 text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                       <LayoutGrid className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h4 className="text-lg font-black tracking-tight mb-2">New: Grid Builder</h4>
                    <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">Design consistent layouts faster with our new intelligent grid system integration.</p>
                    <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-white/10 hover:scale-105 transition-all">Try it now</button>
                 </div>
                 <div className="absolute bottom-[-20%] left-[-20%] w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}