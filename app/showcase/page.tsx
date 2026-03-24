"use client";

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/footer';
import { ChevronLeft, ChevronRight, Clock, Heart, MoreHorizontal, Search, X, MessageCircle, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';

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

function ShowcaseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter(p => activeCategory === "All Work" || p.category === activeCategory);

  return (
    <main className="min-h-screen bg-stone-50/50 font-sans text-gray-900 pb-20 overflow-x-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 text-center bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-0"
        >
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] text-[#4F46E5] uppercase mb-3 sm:mb-4 block">
            Visual Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter leading-[1.1] sm:leading-[1.1] mb-4 sm:mb-6">
            Curated <span className="text-gray-300">Showcase.</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-sm sm:text-base md:text-lg font-medium leading-relaxed px-4 sm:px-0 mb-8 sm:mb-12">
            A collection of high-end vector graphics, brand identities, and digital experiences crafted with precision.
          </p>
        </motion.div>

        {/* --- FILTERS (Responsive Scrollable) --- */}
        <div className="relative mb-12 sm:mb-16">
          <div className="overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex flex-nowrap justify-start md:justify-center gap-2 px-4 sm:px-0 min-w-min">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white text-gray-400 border border-gray-100 hover:border-gray-300 hover:text-black"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Gradient fade indicators for scrollable filters on mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-stone-50/50 to-transparent pointer-events-none md:hidden" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-50/50 to-transparent pointer-events-none md:hidden" />
        </div>

        {/* --- PORTFOLIO GRID (Fully Responsive Masonry) --- */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6 px-2 sm:px-0">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              className="relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-gray-100 cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay on hover (desktop only) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:flex flex-col justify-end p-4 sm:p-6 md:p-8 text-left">
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">{project.category}</span>
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight">{project.title}</h3>
                  <div className="mt-3 sm:mt-4 flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-white">View Details</span>
                  </div>
                </div>
              </div>

              {/* Visible label (mobile and desktop) */}
              <div className="p-4 sm:p-5 md:p-6 text-left flex justify-between items-center group-hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 leading-tight text-sm sm:text-base truncate">{project.title}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-1">{project.category}</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-black group-hover:border-black transition-all flex-shrink-0 ml-2">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <p className="text-gray-400 text-sm sm:text-base">No projects found in this category.</p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-12 sm:mt-16 md:mt-20 px-4">
          <button className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-black text-white rounded-full font-bold overflow-hidden transition-all hover:pr-10 sm:hover:pr-14 active:scale-95 shadow-xl text-sm sm:text-base w-full sm:w-auto">
            <span>Explore More Works</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </button>
        </div>
      </div>

      <Footer />

      {/* --- DETAIL MODAL (Fully Responsive) --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProject(null);
                setIsModalOpen(false);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden mx-2 sm:mx-4 md:mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[85vh] sm:max-h-[90vh] md:max-h-[85vh] overflow-y-auto custom-scrollbar">
                {/* Decorative Swirl - hidden on mobile */}
                <div className="absolute top-0 left-0 w-full h-40 pointer-events-none overflow-hidden opacity-5 sm:opacity-10 hidden sm:block">
                  <svg viewBox="0 0 800 200" className="w-full h-full text-blue-600 fill-none stroke-current" strokeWidth="2">
                    <path d="M-50,150 C200,50 600,250 850,100" />
                    <path d="M-50,180 C250,80 550,280 850,130" />
                  </svg>
                </div>

                {/* Top Actions / Close */}
                <div className="sticky top-0 right-0 p-3 sm:p-4 md:p-6 flex justify-end z-50 bg-white/95 sm:bg-white/10 sm:backdrop-blur-sm border-b border-gray-100 sm:border-0">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setIsModalOpen(false);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-black transition-colors border border-gray-100 active:scale-95"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 md:gap-14">

                  {/* Left Column - Visual */}
                  <div className="shrink-0 w-full lg:w-auto">
                    <div className="relative mx-auto lg:mx-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                      {/* Subtle Background Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-50 to-transparent" />

                      {/* Project Image */}
                      <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        <Image
                          src={selectedProject.img}
                          alt={selectedProject.title}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover"
                          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                        />
                      </div>

                      {/* Decorative accent */}
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-500 rounded-full opacity-10 blur-md" />
                    </div>

                    <div className="hidden lg:block text-center mt-6">
                      <span className="text-[9px] text-gray-400 font-mono tracking-wide">
                        VP-{selectedProject.id}024
                      </span>
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="flex-1 w-full">
                    {/* Category Badge */}
                    <div className="mb-5 sm:mb-6 text-center lg:text-left">
                      <span className="inline-block px-3.5 py-1.5 bg-gray-50 text-gray-600 text-[11px] font-semibold uppercase tracking-wide rounded-full">
                        {selectedProject.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-6 sm:mb-8 text-center lg:text-left">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-[1.2] tracking-tight">
                        {selectedProject.title}
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {selectedProject.description || "Premium visual content crafted for high-end digital experiences and brand storytelling."}
                      </p>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-5 transition-all hover:bg-white hover:shadow-md">
                        <Clock className="w-5 h-5 text-indigo-500 mb-2" />
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                            Timeline
                          </p>
                          <p className="text-sm sm:text-base font-bold text-gray-900">
                            2-3 Days
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 sm:p-5 transition-all hover:bg-white hover:shadow-md">
                        <Search className="w-5 h-5 text-teal-500 mb-2" />
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                            Quality
                          </p>
                          <p className="text-sm sm:text-base font-bold text-gray-900">
                            High Resolution
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                      <button className="flex-1 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-98 shadow-sm">
                        <ExternalLink className="w-4 h-4 inline mr-2" />
                        View Project
                      </button>
                      <button className="flex-1 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-xl transition-all active:scale-98">
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Order Now
                      </button>
                    </div>

                    {/* Social Proof */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                            <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" width={28} height={28} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium">
                        Trusted by 120+ designers worldwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Notch Indicator (Mobile Only) */}
                <div className="flex justify-center pb-3 sm:pb-4 lg:hidden">
                  <div className="w-12 sm:w-16 h-1 bg-gray-200 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </main>
  );
}

export default function ShowcasePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    }>
      <ShowcaseContent />
    </Suspense>
  );
}