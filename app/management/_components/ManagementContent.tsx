"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import {
  X,
  ChevronRight,
  Briefcase,
  Globe,
  Target,
  ShieldCheck,
  Linkedin,
  Mail,
} from 'lucide-react';

const managementData = [
  {
    id: 1,
    name: "Yomi Denzel",
    role: "E-Commerce 2.0 Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    category: "Executive",
    bio: "Yomi is a pioneer in digital commerce, leading strategic initiatives that bridge traditional retail with modern e-commerce ecosystems.",
    stats: { years: "10+", projects: "400+", success: "98%" },
    vision: "To empower global entrepreneurs through high-performance digital stores."
  },
  {
    id: 2,
    name: "Timothée Moiroux",
    role: "Investment Analyst",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    category: "Executive",
    bio: "Timothée specializes in real estate and financial investments, providing deep market insights to drive long-term business growth.",
    stats: { years: "12+", projects: "150+", success: "95%" },
    vision: "Creating sustainable wealth through precision-driven financial strategy."
  },
  {
    id: 3,
    name: "David Sequiera",
    role: "Strategy & Closing",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    category: "Operations",
    bio: "David is the expert in strategic negotiation and deal closing, ensuring every partnership at Vectorpic is built on excellence.",
    stats: { years: "15+", projects: "300+", success: "99%" },
    vision: "Architecting attention and pioneers of outdoor media innovation."
  },
  {
    id: 4,
    name: "Ahmad Fatoni",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    category: "Creative",
    bio: "The driving force behind Vectorpic's visual excellence. Ahmad focuses on artistic creation and media representation services with a modern aesthetic.",
    stats: { years: "10+", projects: "300+", success: "97%" },
    vision: "Ensuring every vector and illustration tells a compelling brand story."
  },
  {
    id: 5,
    name: "Manuel Ravier",
    role: "Real Estate Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    category: "Executive",
    bio: "Manuel leads our regional development, focusing on premium physical spaces that complement our digital identity.",
    stats: { years: "18+", projects: "250+", success: "96%" },
    vision: "Bridging the gap between physical architecture and digital media."
  },
  {
    id: 6,
    name: "Sheri Ham",
    role: "VP Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    category: "Creative",
    bio: "Leading our global marketing efforts with a focus on client-first solutions and innovative growth strategies.",
    stats: { years: "14+", projects: "200+", success: "97%" },
    vision: "Empowering brands with data-driven creative assets."
  }
];

export default function ManagementContent() {
  const [selectedLeader, setSelectedLeader] = useState<any>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedLeader(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    if (selectedLeader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedLeader]);


  return (
    <main className="min-h-screen bg-white font-sans text-black overflow-x-hidden flex flex-col relative">
      <Navbar />

      <div className="grow pt-28 sm:pt-32">

        {/* --- BACKGROUND DECORATION --- */}
        <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        {/* --- HERO SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-gray-900 tracking-tight leading-[1.2] mb-8 sm:mb-12 max-w-4xl mx-auto">
              Partnered with industry leaders worldwide
            </h1>
          </motion.div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-7">
            {managementData.map((leader, idx) => (
              <motion.div
                layout
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                onClick={() => setSelectedLeader(leader)}
                className="group relative h-[420px] sm:h-[480px] md:h-[520px] cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-500 group-hover:shadow-2xl">
                  <div className="absolute inset-0 transition-all duration-700 ease-out group-hover:-translate-y-6 group-hover:scale-105 rounded-2xl">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/50 group-hover:via-black/20 rounded-2xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-left transition-all duration-500 group-hover:bottom-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{leader.name}</h3>
                      <p className="text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-wider">{leader.role}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
                      <div className="relative z-10 p-5 sm:p-6">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5">{leader.name}</h3>
                          <p className="text-[9px] sm:text-[10px] font-semibold text-indigo-600 uppercase tracking-wider mb-3">{leader.role}</p>
                          <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">{leader.bio}</p>
                          <button className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] sm:text-xs font-semibold rounded-lg transition-all group/btn w-full sm:w-auto justify-center">
                            <span>View Profile</span>
                            <X className="w-3.5 h-3.5 rotate-135 transition-transform group-hover/btn:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- STATISTICS & GROWTH --- */}
        <div className="max-w-7xl mx-auto px-6 py-32 bg-gray-50/50 rounded-[4rem] border border-gray-100 mb-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-black tracking-tighter mb-6">Decades of evolution</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">From our founding in 2016 to our current global leadership in 2026, we've scaled our impact globally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all"><h3 className="text-2xl font-black text-black mb-4">Initial Foundation</h3><p className="text-4xl font-black text-indigo-600">2016 — 2018</p></div>
            <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all"><h3 className="text-2xl font-black text-black mb-4">Global Expansion</h3><p className="text-4xl font-black text-amber-600">2019 — 2022</p></div>
            <div className="p-10 bg-black rounded-[3rem] shadow-2xl hover:-translate-y-2 transition-all"><h3 className="text-2xl font-black text-white mb-4">Market Leadership</h3><p className="text-4xl font-black text-indigo-400">2023 — 2026</p></div>
          </div>
        </div>

      </div>

      <Footer />

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLeader(null)} className="fixed inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} className="relative w-full sm:max-w-lg md:max-w-2xl bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8"><button onClick={() => setSelectedLeader(null)} className="float-right p-2 text-gray-400 hover:text-black"><X /></button>
                <div className="flex flex-col items-center pt-8">
                  <div className="relative w-40 h-40 rounded-4xl overflow-hidden border-4 border-white shadow-xl mb-6">
                    <Image src={selectedLeader.image} alt={selectedLeader.name} fill className="object-cover" />
                  </div>
                  <h2 className="text-4xl font-black text-black mb-2">{selectedLeader.name}</h2>
                  <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6">{selectedLeader.role}</p>
                  <p className="text-gray-500 text-center mb-8">{selectedLeader.bio}</p>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button className="py-4 bg-black text-white rounded-2xl font-bold">Contact</button>
                    <button className="py-4 bg-indigo-600 text-white rounded-2xl font-bold">LinkedIn</button>
                  </div>
                </div></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
