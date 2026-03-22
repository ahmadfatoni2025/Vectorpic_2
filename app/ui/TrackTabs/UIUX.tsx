"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from "../../context/LanguageContext";
import { Star, ArrowRight } from 'lucide-react';

export default function UIUX() {
  const { t } = useLanguage();

  const projects = [
    { title: "SaaS Dashboard", url: "https://images.unsplash.com/photo-1551288049-bbda4833effb?w=800&q=80", color: "#e3f2fd" },
    { title: "E-Commerce App", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", color: "#f3e5f5" },
    { title: "Bank Portal", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", color: "#e8f5e9" },
    { title: "Fitness Tracker", url: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80", color: "#fff3e0" },
    { title: "Medical App", url: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=800&q=80", color: "#ffebee" },
  ];

  return (
    <div className="bg-white min-h-screen py-20 font-sans">
      
      {/* 1. HERO HEADER (Centered MTV/SaaS Style) */}
      <section className="max-w-4xl mx-auto text-center px-6 mb-24">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
        >
             <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={32} height={32} />
                   </div>
                ))}
            </div>
            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">{t("Trusted by 1000+ Brands", "Dipercaya oleh 1000+ Brand")}</span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tighter uppercase mb-6">
            {t("UNLIMITED", "TAK TERBATAS")}<br />
            <span className="text-[#04cce7] italic">UI / UX</span> DESIGN
        </h2>
        
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
            {t(
                "World-class product design for visionary startups and enterprises. Get a dedicated design team for a flat monthly fee.",
                "Desain produk kelas dunia untuk startup dan perusahaan visioner. Dapatkan tim desain khusus dengan biaya bulanan flat."
            )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="px-10 py-5 bg-[#04cce7] text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-200 flex items-center gap-3">
                {t("Book a Demo", "Pesan Demo")}
                <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white border-2 border-gray-100 text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">
                {t("Try for Free", "Coba Gratis")}
            </button>
        </div>

        {/* Ratings Section */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
             <div className="flex items-center gap-2">
                <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                <span className="text-[10px] font-black text-black/40 uppercase">4.9/5 on Google</span>
             </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                <span className="text-[10px] font-black text-black/40 uppercase">Top Rated on Clutch</span>
             </div>
        </div>
      </section>

      {/* 2. FULL WIDTH LARGE GALLERY (Design Shifu Style) */}
      <section className="w-full relative py-10">
        <div className="flex overflow-x-auto gap-10 px-6 md:px-20 scrollbar-hide snap-x snap-mandatory">
            {projects.map((proj, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ y: -20 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-shrink-0 w-[85vw] md:w-[600px] h-[450px] md:h-[550px] rounded-[3.5rem] overflow-hidden relative shadow-2xl snap-center group"
                    style={{ backgroundColor: proj.color }}
                >
                    <Image 
                        src={proj.url} 
                        alt={proj.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12">
                         <span className="text-[#04cce7] font-black uppercase text-xs tracking-widest mb-2">Portfolio</span>
                         <h4 className="text-white text-3xl font-black uppercase tracking-tighter">{proj.title}</h4>
                    </div>
                </motion.div>
            ))}
            {/* Last Spacer */}
            <div className="flex-shrink-0 w-1 md:w-20"></div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-[#1e1b4b] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-8">
                    {t("Ready to elevate your", "Siap meningkatkan")} <br /> 
                    <span className="text-[#04cce7]">Digital Experience?</span>
                </h3>
                <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#04cce7] hover:text-white transition-all">
                     {t("Get Started Today", "Mulai Hari Ini")}
                </button>
             </div>
             {/* Decorative Background Blob */}
             <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
             <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
        </div>
      </section>

    </div>
  );
}
