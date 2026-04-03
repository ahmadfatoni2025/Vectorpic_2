"use client";

import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ChevronRight, Clock, Search, X, MessageCircle, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ShowcaseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [categories, setCategories] = useState<string[]>(["All Work"]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [catsRes, vectorsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/vectors")
        ]);

        const catsData = await catsRes.json();
        const vectorsData = await vectorsRes.json();

        if (Array.isArray(catsData)) {
          setCategories(["All Work", ...catsData.map((c: any) => c.name)]);
        }

        if (Array.isArray(vectorsData)) {
          const mappedVectors = vectorsData.map((v: any) => ({
            id: v.id,
            title: v.title,
            category: v.category?.name || 'Uncategorized',
            img: v.imageUrl,
            description: v.description,
            size: v.id.length % 3 === 0 ? "lg" : (v.id.length % 2 === 0 ? "md" : "sm") // Procedural sizing
          }));
          setProjects(mappedVectors);
        }
      } catch (error) {
        console.error("Failed to fetch showcase data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam, categories]);

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
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const filteredProjects = projects.filter(p =>
    activeCategory === "All Work" || p.category === activeCategory
  );

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
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx % 6 * 0.05 
                }}
                onClick={() => setSelectedProject(project)}
                className="relative group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl cursor-pointer break-inside-avoid transition-all duration-500 border border-transparent hover:border-indigo-100/50"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image 
                    src={project.img} 
                    alt={project.title} 
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">

                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1 block">{project.category}</span>
                      <h4 className="text-xl font-bold text-white leading-tight">{project.title}</h4>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{project.title}</h4>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{project.category}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer />

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedProject(null)} 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: 60, opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden z-10" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 transition-all hover:rotate-90 duration-300"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col lg:flex-row max-h-[85vh] overflow-y-auto lg:overflow-hidden bg-white">
                {/* Image Section */}
                <div className="w-full lg:w-[62%] relative aspect-4/5 lg:aspect-auto lg:min-h-[650px] bg-gray-100 shrink-0">
                  <Image 
                    src={selectedProject.img} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover transition-opacity duration-500" 
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  {/* Subtle placeholder/loading state background */}
                  <div className="absolute inset-0 bg-stone-100 -z-10 animate-pulse" />
                </div>
                
                {/* Content Section */}
                <div className="w-full lg:w-[38%] p-8 lg:p-12 lg:overflow-y-auto flex flex-col justify-center bg-white">

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-6">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-10">
                      {selectedProject.description || "A premium visual design piece focused on excellence, modern aesthetics, and user experience. Part of our curated collections for high-end digital products."}
                    </p>
                    
                    <div className="space-y-4">
                      <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-200 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group">
                        Inquire Project <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-gray-400">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold">V</div>
                          <span className="text-xs font-bold text-gray-400 tracking-tight">Curated by Vectorpic</span>
                        </div>
                        <button className="text-xs font-bold text-gray-900 flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                          <MessageCircle size={14} /> Get Quote
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
