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
  Video
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, inquiryCount, onQuickUpload }: any) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    library: true // default open
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-white border-r border-gray-100 transition-all duration-300 hidden md:flex flex-col sticky top-0 h-screen overflow-hidden`}>
      {/* Title Navigation */}
      <div className={`p-8 mb-4 border-b border-gray-50 flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
        {isSidebarOpen ? (
          <div className="flex items-center gap-4 text-gray-900 w-full pl-2">
            <span className="font-medium text-[15px] tracking-tight flex-1">Title Navigation</span>
            <button className="text-gray-400 hover:text-black transition-colors"><Search size={18} /></button>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-black transition-colors"><ChevronsLeft size={18} /></button>
          </div>
        ) : (
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-black transition-colors"><ChevronsRight size={20} /></button>
        )}
      </div>

      <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto no-scrollbar pb-6">
        <NavItem 
           active={false} 
           label="Home" 
           icon={<Home size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => {}} 
        />
        
        <NavItem 
           active={activeTab === 'overview'} 
           label="Dashboard" 
           icon={<LayoutDashboard size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => setActiveTab('overview')} 
        />
        
        <NavDropdown
          keyId="library"
          label="Projects"
          icon={<Layers size={20} strokeWidth={1.5} />}
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
           icon={<Database size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => setActiveTab('management')} 
        />

        <NavItem 
           active={activeTab === 'video-profiles'} 
           label="Video Profiles" 
           icon={<Video size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => setActiveTab('video-profiles')} 
        />

        <NavItem 
           active={activeTab === 'our-design'} 
           label="Our Design" 
           icon={<Layers size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => setActiveTab('our-design')} 
        />
        
        <NavItem 
           active={activeTab === 'settings'}
           label="Settings" 
           icon={<Settings size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => setActiveTab('settings')} 
        />

        <NavItem 
           active={activeTab === 'messages'} 
           label="Message" 
           icon={<MessageSquare size={20} strokeWidth={1.5} />} 
           isOpen={isSidebarOpen} 
           onClick={() => setActiveTab('messages')} 
           count={inquiryCount}
        />
      </nav>

      <div className="p-6 border-t border-gray-50 flex justify-center">
        <Link href="/auth/user/login" className={`flex w-full items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'} gap-4 p-3 rounded-xl transition-all text-[13px] font-medium text-gray-500 hover:text-red-500 hover:bg-red-50`}>
          <LogOut size={18} strokeWidth={1.5}/> {isSidebarOpen && "Sign Out"}
        </Link>
      </div>
    </aside>
  );
}

function NavItem({ active, label, icon, isOpen, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${isOpen ? 'justify-start' : 'justify-center'} gap-4 p-3 rounded-2xl transition-all text-[14px] font-medium ${
        active 
          ? 'bg-gray-100 text-black shadow-sm' 
          : 'text-gray-600 hover:text-black hover:bg-gray-50'
      }`}
    >
      <span className={active ? 'text-black' : 'text-gray-400'}>{icon}</span>
      {isOpen && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="whitespace-nowrap">{label}</span>
          {count !== undefined && count > 0 ? (
            <span className="bg-black/5 text-black px-2 py-0.5 rounded-md text-[10px] font-bold">{count}</span>
          ) : (
             <Plus size={16} className="text-gray-400" />
          )}
        </div>
      )}
    </button>
  );
}

function NavDropdown({ keyId, label, icon, isOpen, isExpanded, onToggle, activeChildren, children }: any) {
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-center p-3 rounded-2xl transition-all text-sm font-medium ${
          isExpanded || activeChildren ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:text-black hover:bg-gray-50'
        }`}
      >
        <span className={isExpanded || activeChildren ? 'text-purple-600' : 'text-gray-400'}>{icon}</span>
      </button>
    );
  }

  const activeStyle = isExpanded ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:text-black hover:bg-gray-50';
  const iconStyle = isExpanded ? 'text-purple-600' : 'text-gray-400';

  return (
    <div className="flex flex-col">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-[14px] font-medium ${activeStyle}`}
      >
        <div className="flex items-center gap-4">
           <span className={iconStyle}>{icon}</span>
           <span>{label}</span>
        </div>
        {isExpanded ? <Minus size={16} className={iconStyle} /> : <Plus size={16} className="text-gray-400" />}
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-6 py-3 flex flex-col gap-1.5 relative">
              <div className="absolute left-[22px] top-6 bottom-4 w-px border-l-2 border-dotted border-gray-200" />
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
      className={`w-full flex items-center pl-8 pr-3 py-3 rounded-xl transition-all text-[13px] relative z-10 ${
        active 
          ? 'bg-gray-100 text-black font-semibold shadow-sm' 
          : 'text-gray-500 hover:text-black font-medium hover:bg-gray-50'
      }`}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-black rounded-r-full" />
      )}
      {label}
    </button>
  );
}
