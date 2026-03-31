"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Heart, 
  Download, 
  Clock, 
  Grid, 
  Search,
  Bell,
  CheckCircle2,
  TrendingUp,
  Box,
  Palette,
  Zap,
  ChevronRight,
  LogOut,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [vectors, setVectors] = useState<any[]>([]);
  const [user, setUser] = useState<any>({
    name: 'Ahmad Fatoni',
    email: 'ahmad@example.com',
    plan: 'Pro Plan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad'
  });

  useEffect(() => {
    async function fetchVectors() {
      try {
        const res = await fetch('/api/vectors');
        const data = await res.json();
        setVectors(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchVectors();
  }, []);

  const stats = [
    { label: 'Saved Items', value: vectors.length.toString(), icon: <Heart className="text-pink-500" />, bg: 'bg-pink-50' },
    { label: 'Downloads', value: '142', icon: <Download className="text-indigo-500" />, bg: 'bg-indigo-50' },
    { label: 'Credits', value: '850', icon: <Zap className="text-yellow-500" />, bg: 'bg-yellow-50' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans">
      {/* Sidebar - Modern Slim Sidebar */}
      <aside className="w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 gap-8 sticky top-0 h-screen">
        <Link href="/" className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mb-4 group hover:scale-110 transition-all duration-500">
          <Zap className="fill-current group-hover:rotate-12 transition-transform" size={24} />
        </Link>
        
        <nav className="flex flex-col gap-4 flex-1">
          <NavIcon icon={<Grid />} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} tooltip="Overview" />
          <NavIcon icon={<Heart />} active={activeTab === 'collection'} onClick={() => setActiveTab('collection')} tooltip="My Collections" />
          <NavIcon icon={<Clock />} active={activeTab === 'history'} onClick={() => setActiveTab('history')} tooltip="History" />
          <NavIcon icon={<Settings />} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} tooltip="Settings" />
        </nav>

        <button className="text-gray-400 hover:text-red-500 transition-colors p-3 rounded-2xl hover:bg-red-50">
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Welcome back, <span className="text-indigo-600">{user.name.split(' ')[0]}!</span></h1>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              <Sparkles size={14} className="text-yellow-500" />
               Your creativity buffer is at 85% capacity.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm pr-6">
            <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden relative">
              <img src={user.avatar} alt="" className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-900">{user.name}</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-0.5">{user.plan}</span>
            </div>
            <Bell size={18} className="text-gray-300 ml-4 cursor-pointer hover:text-indigo-600 transition-colors" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label} 
              className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                {React.cloneElement(stat.icon as any, { size: 24 })}
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collections Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-gray-900">Recently Saved Assets</h2>
            <Link href="/showcase" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 group">
              Explore More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-4/3 bg-gray-100 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {vectors.slice(0, 4).map((vector, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={vector.id} 
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                >
                  <div className="aspect-4/3 overflow-hidden relative">
                    <img src={vector.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors">
                        <Download size={18} />
                       </button>
                       <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors">
                        <Heart size={18} className="fill-pink-500 text-pink-500" />
                       </button>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{vector.title}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{vector.category?.name || 'Asset'}</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Upgrade Card */}
        <div className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 flex-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 border border-white/5">
                <Sparkles size={12} /> Special Offer
             </div>
             <h3 className="text-3xl font-black text-white mb-4">Unlimited Creative Potential <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">Up to 70% off</span> for lifetime Pro</h3>
             <p className="text-gray-400 text-sm max-w-md leading-relaxed">Unlock access to exclusive vector libraries, private management tools, and priority rendering for all your visual projects.</p>
          </div>

          <button className="relative z-10 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl">
            Upgrade Now
          </button>
        </div>
      </main>
    </div>
  );
}

function NavIcon({ icon, active, onClick, tooltip }: any) {
  return (
    <div className="group relative">
      <button 
        onClick={onClick}
        className={`p-4 rounded-2xl transition-all duration-300 ${
          active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:bg-gray-50 hover:text-indigo-600'
        }`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </button>
      <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
        {tooltip}
      </div>
    </div>
  );
}