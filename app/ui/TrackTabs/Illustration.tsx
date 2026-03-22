"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from "../../context/LanguageContext";
import { Navbar } from '../Navbar';
import { Footer } from '../footer';
import { Eye, Mic2, Music, Activity, Camera } from 'lucide-react';

export default function Illustration() {
  const { t } = useLanguage();

  const artworks = [
    { src: "/ilustrasi/citacita.png", label: "content creators", color: "#04cce7", icon: <Eye size={32} strokeWidth={2.5} className="text-blue-600" /> },
    { src: "/ilustrasi/coretax.png", label: "freestyle", color: "#ffec00", icon: <Mic2 size={32} strokeWidth={2.5} className="text-yellow-700" /> },
    { src: "/ilustrasi/jalanSehat.png", label: "solo & band", color: "#ff2e00", icon: <Music size={32} strokeWidth={2.5} className="text-red-600" /> },
    { src: "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=800&q=80", label: "urban dance", color: "#ff85c0", icon: <Activity size={32} strokeWidth={2.5} className="text-pink-600" /> },
    { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", label: "mtv host", color: "#000000", icon: <Camera size={32} strokeWidth={2.5} className="text-white" />, whiteText: true },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen relative overflow-hidden font-sans pt-32 pb-20">

        {/* 1. TYPOGRAPHY SECTION (Top) */}
        <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative">
            <span className="text-gray-400 font-mono text-xs mb-4 block">_typography</span>
            <h1 className="text-6xl md:text-9xl font-black text-black leading-none tracking-tighter uppercase mb-6">
              CODE PRO<br />BLACK
            </h1>
            <p className="max-w-xs text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
              {t("Our specialized fonts for creative impact, ensuring that every stroke of our illustration tells a story.", "Font khusus kami untuk dampak kreatif, memastikan setiap goresan ilustrasi menceritakan kisah.")}
            </p>
            {/* Floating Blobs */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500 rounded-full blur-xl opacity-50"
            />
          </div>
          <div className="md:pt-48 flex flex-col gap-10">
            <h2 className="text-4xl md:text-7xl font-black text-black leading-none tracking-tighter uppercase">
              helvetica neue<br />cyrillic pro
            </h2>
            <p className="max-w-xs text-xs font-bold text-gray-400 uppercase leading-loose">
              {t("Modern, sleek, and timeless. The foundation of our digital aesthetics.", "Modern, ramping, dan abadi. Dasar dari estetika digital kami.")}
            </p>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          </div>
        </section>

        {/* 2. TOP MARQUEE (MTV Style) */}
        <div className="relative z-20 w-full overflow-hidden border-y-2 border-black py-4 flex mb-2">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap flex items-center gap-12 px-12"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-12 text-black">
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter shrink-0">ICONOS Y FORMAS</span>
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter shrink-0">MTV</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3. THE PILLAR GALLERY (MTV GRID) */}
        <section className="relative z-10 w-full h-[80vh] min-h-[600px] flex flex-col md:flex-row border-b-2 border-black">
          {artworks.map((art, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col relative group overflow-hidden border-r-2 last:border-r-0 border-black"
              style={{ backgroundColor: art.color }}
            >
              {/* Pillar Header */}
              <div className="p-10 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                  {art.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${art.whiteText ? 'text-white' : 'text-black'}`}>
                  {art.label}
                </span>
              </div>

              {/* Pillar Image (Grayscale focused) */}
              <div className="flex-1 relative mt-auto">
                <Image
                  src={art.src}
                  alt={art.label}
                  fill
                  unoptimized={art.src.startsWith('http')}
                />
              </div>
            </div>
          ))}
        </section>

        {/* 4. FLOATING SHAPES SECTION */}
        <section className="relative w-full h-[60vh] bg-white flex items-center justify-center overflow-hidden">
          <div className="text-center z-10">
            <span className="text-gray-400 font-mono text-xs mb-4 block">_icons & organic shapes</span>
            <p className="max-w-lg text-black font-bold uppercase text-[10px] leading-relaxed mx-auto px-6">
              {t(
                "Organic forms and illustrated icons are the stars of this season. Each icon represents a category. The forms intertwine and overlap creating dynamic illustrations.",
                "Bentuk organik dan ikon bergambar adalah bintang musim ini. Setiap ikon mewakili kategori. Bentuk-bentuknya terjalin dan tumpang tindih menciptakan ilustrasi dinamis."
              )}
            </p>
          </div>

          {/* Large Organic Shapes (Blobs) */}
          <motion.div
            animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20"
          />
          <motion.div
            animate={{ x: [0, -80, 80, 0], y: [0, 50, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-20"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full blur-[150px] opacity-10"></div>
        </section>

        {/* 5. BOTTOM MARQUEE (MTV Style) */}
        <div className="relative z-20 w-full overflow-hidden bg-red-600 py-3 flex">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap flex items-center gap-12 px-12"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-12 text-white">
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter shrink-0">TE BUSCA</span>
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter shrink-0">MTV</span>
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter shrink-0">VECTOR ARTWORKS</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
      <Footer />
    </>
  );
}
