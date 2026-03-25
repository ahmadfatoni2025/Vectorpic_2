"use client";

import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ChevronRight, Clock, Search, X, MessageCircle, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const categories = [
  "All Work", "Vector Art", "Branding", "UI/UX Design", "Packaging", "Illustration", "Motion"
];

const projects = [
  { id: 1, title: "Modern Brand Identity", category: "Branding", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800", size: "lg", description: "A high-end visual identity system designed for premium brands looking to stand out." },
  { id: 2, title: "Abstract Vector Set", category: "Vector Art", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", size: "sm", description: "Carefully crafted vector illustrations with a focus on geometric patterns and modern aesthetics." },
  { id: 3, title: "Premium Package Design", category: "Packaging", img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=800", size: "sm", description: "Eco-friendly and visually stunning packaging solutions for luxury goods." },
  { id: 4, title: "Fintech Mobile App", category: "UI/UX Design", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800", size: "md", description: "A seamless, secure, and intuitive banking experience designed for the next generation." },
  { id: 5, title: "Minimalist Poster", category: "Illustration", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800", size: "lg", description: "Bold, minimal compositions that capture complex ideas through simplicity." },
  { id: 6, title: "Digital Art Collection", category: "Vector Art", img: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=800", size: "md", description: "NFT-ready digital artwork created with precision and vibrant color palettes." },
  { id: 7, title: "Corporate Rebrand", category: "Branding", img: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800", size: "sm", description: "Refreshing established corporate identities for a digital-first world." },
  { id: 8, title: "Social Media Motion", category: "Motion", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800", size: "md", description: "High-engagement motion graphics tailored for maximum impact on social platforms." },
];

export default function ShowcaseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const filteredProjects = projects.filter(p => activeCategory === "All Work" || p.category === activeCategory);

  return (
    <main className="min-h-screen bg-stone-50/50 font-sans text-gray-900 pb-20 overflow-x-hidden pt-40">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] text-[#4F46E5] uppercase mb-4 block">Visual Excellence</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter leading-none mb-6">Curated <span className="text-gray-300">Showcase.</span></h1>
        </motion.div>

        {/* --- FILTERS --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? "bg-black text-white shadow-lg" : "bg-white text-gray-400 border border-gray-100 hover:text-black"}`}>{cat}</button>
          ))}
        </div>

        {/* --- GRID --- */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project, idx) => (
            <motion.div layout key={project.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} onClick={() => setSelectedProject(project)} className="relative group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl cursor-pointer break-inside-avoid transition-all">
              <Image src={project.img} alt={project.title} width={800} height={1000} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
              <div className="p-6 text-left flex justify-between items-center"><h4 className="font-bold text-gray-900">{project.title}</h4><ChevronRight className="w-4 h-4" /></div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8"><button onClick={() => setSelectedProject(null)} className="float-right text-gray-400"><X /></button>
                <div className="flex flex-col md:flex-row gap-10 mt-10">
                  <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-lg"><Image src={selectedProject.img} alt={selectedProject.title} fill className="object-cover" /></div>
                  <div className="flex-1 text-left"><span className="text-[10px] font-black text-indigo-600 uppercase mb-4 block">{selectedProject.category}</span><h2 className="text-4xl font-black mb-4">{selectedProject.title}</h2><p className="text-gray-500 mb-8">{selectedProject.description}</p><button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Inquire Project</button></div>
                </div></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
