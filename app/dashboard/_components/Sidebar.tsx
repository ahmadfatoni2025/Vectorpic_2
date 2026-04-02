"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  Layers,
  Database,
  MessageSquare,
  Settings,
  Plus,
  Minus,
  Search,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Video,
  Palette,
  Bell,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, inquiryCount, onQuickUpload }: any) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    library: true // default open
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className={`${isSidebarOpen ? 'w-[272px]' : 'w-20'} bg-white border-r border-gray-100/80 transition-all duration-300 hidden md:flex flex-col sticky top-0 h-screen`}>
      {/* Brand Header */}
      <div className={`h-[72px] flex items-center ${isSidebarOpen ? 'px-6 justify-between' : 'justify-center'} border-b border-gray-100/60`}>
        {isSidebarOpen ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <span className="text-[15px] font-semibold text-gray-900 tracking-tight">vectorpic</span>
            <span className="ml-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">Admin</span>
            <button onClick={() => setIsSidebarOpen(false)} className="ml-auto text-gray-300 hover:text-gray-600 transition-colors">
              <ChevronsLeft size={16} />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsSidebarOpen(true)} className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white transition-all">
            <ChevronsRight size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto no-scrollbar">
        {isSidebarOpen && (
          <div className="px-3 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Main</span>
          </div>
        )}

        <NavItem
          active={activeTab === 'overview'}
          label="Discover"
          icon={<LayoutDashboard size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('overview')}
        />

        <NavDropdown
          keyId="library"
          label="Projects"
          icon={<Layers size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          isExpanded={openDropdowns.library}
          onToggle={() => toggleDropdown('library')}
          activeChildren={['upload', 'assets'].includes(activeTab)}
        >
          <NavChild active={activeTab === 'assets'} label="Assets Gallery" onClick={() => setActiveTab('assets')} />
          <NavChild active={false} label="Quick Upload" onClick={onQuickUpload} />
        </NavDropdown>

        <NavItem
          active={activeTab === 'management'}
          label="Tasks"
          icon={<Database size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('management')}
        />

        <NavItem
          active={activeTab === 'video-profiles'}
          label="Video Profiles"
          icon={<Video size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('video-profiles')}
        />

        <NavItem
          active={activeTab === 'our-design'}
          label="Our Design"
          icon={<Layers size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('our-design')}
        />

        <NavItem
          active={activeTab === 'track-tabs'}
          label="Track Tabs"
          icon={<Palette size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('track-tabs')}
        />

        {isSidebarOpen && (
          <div className="px-3 mt-5 mb-3 pt-4 border-t border-gray-50">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">System</span>
          </div>
        )}
        {!isSidebarOpen && <div className="h-px bg-gray-50 my-3 mx-2" />}

        <NavItem
          active={activeTab === 'settings'}
          label="Settings"
          icon={<Settings size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('settings')}
        />

        <NavItem
          active={activeTab === 'messages'}
          label="Messages"
          icon={<MessageSquare size={18} strokeWidth={1.8} />}
          isOpen={isSidebarOpen}
          onClick={() => setActiveTab('messages')}
          count={inquiryCount}
        />
      </nav>

      {/* Bottom Profile */}
      <div className={`border-t border-gray-100/60 ${isSidebarOpen ? 'px-4 py-4' : 'p-3 flex justify-center'}`}>
        {isSidebarOpen ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold shadow-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">Admin Panel</p>
              <p className="text-[11px] text-gray-400 truncate">admin@vectorpic.com</p>
            </div>
            <Link href="/auth/user/login" className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Sign Out">
              <LogOut size={16} strokeWidth={1.8}/>
            </Link>
          </div>
        ) : (
          <Link href="/auth/user/login" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Sign Out">
            <LogOut size={16} strokeWidth={1.8}/>
          </Link>
        )}
      </div>
    </aside>
  );
}

function NavItem({ active, label, icon, isOpen, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${isOpen ? 'px-3' : 'justify-center'} gap-3 py-2.5 rounded-xl transition-all text-[13px] relative group ${
        active
          ? 'bg-gray-900 text-white font-medium shadow-sm'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium'
      }`}
    >
      <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>{icon}</span>
      {isOpen && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="whitespace-nowrap truncate">{label}</span>
          {count !== undefined && count > 0 && (
            <span className={`min-w-[20px] text-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500 border border-red-100'}`}>{count}</span>
          )}
        </div>
      )}
      {!isOpen && count !== undefined && count > 0 && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">{count}</div>
      )}
    </button>
  );
}

function NavDropdown({ keyId, label, icon, isOpen, isExpanded, onToggle, activeChildren, children }: any) {
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-center py-2.5 rounded-xl transition-all text-[13px] font-medium ${
          isExpanded || activeChildren ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <span className={isExpanded || activeChildren ? 'text-emerald-600' : 'text-gray-400'}>{icon}</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-[13px] font-medium ${
          isExpanded
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={isExpanded ? 'text-emerald-600' : 'text-gray-400'}>{icon}</span>
          <span>{label}</span>
        </div>
        {isExpanded ? <ChevronDown size={14} className="text-emerald-500" /> : <ChevronRight size={14} className="text-gray-400" />}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-5 pl-4 py-1.5 flex flex-col gap-0.5 border-l-2 border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavChild({ active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-[12px] ${
        active
          ? 'bg-gray-100 text-gray-900 font-semibold'
          : 'text-gray-500 hover:text-gray-800 font-medium hover:bg-gray-50'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-3 ${active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
      {label}
    </button>
  );
}
