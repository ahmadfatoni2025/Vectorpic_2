"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from "../../context/LanguageContext";
import { Navbar } from '../Navbar';
import { Footer } from '../footer';

export default function UIUX() {
  const { t } = useLanguage();

  const colors = [
    { name: t("Interactivity Blue", "Biru Interaktif"), hex: "#0070f3", desc: t("Drives focus, action, and trust deep within the digital environment.", "Mendorong fokus, tindakan, dan kepercayaan di dalam lingkungan digital.") },
    { name: t("Slate Contrast", "Kontras Slate"), hex: "#111827", desc: t("Provides strong visual hierarchy and modern aesthetics.", "Memberikan hierarki visual yang kuat dan estetika modern.") },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full bg-[#111827] overflow-hidden pt-32 pb-40 md:py-48 px-6">
        {/* Abstract Geometric Shapes */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none opacity-80">
          <div className="absolute top-10 right-20 w-40 h-40 bg-[#0070f3] rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 right-0 w-64 h-32 bg-[#0070f3] rounded-t-full translate-x-1/4 opacity-70"></div>
          <div className="absolute bottom-0 right-40 w-48 h-24 bg-white/10 rounded-t-full backdrop-blur-md"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-2xl border border-white/10 rotate-45 backdrop-blur-lg"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-2xl">
              <Image src="/logo/logo-brand.jpg" alt="Logo" width={60} height={60} className="object-contain" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">UI/UX Design</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-12">
              {t(
                "We craft intuitive, engaging, and highly functional user interfaces. Our UX research ensures that every interaction is meaningful and seamless.",
                "Kami merancang antarmuka pengguna yang intuitif, menarik, dan sangat fungsional. Riset UX kami memastikan setiap interaksi bermakna dan mulus."
              )}
            </p>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-white/50 text-xs font-black tracking-widest uppercase border border-white/5">
              {t("Digital Experience Hub", "Pusat Pengalaman Digital")}
            </span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32">

        {/* 2. DESIGN PROCESS SECTION */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tight">{t("Wireframing", "Pembuatan Rangka")}</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                {t(
                  "Our process balances complex user flows with minimal cognitive load, prioritizing usability without sacrificing aesthetic quality.",
                  "Proses kami menyeimbangkan alur pengguna yang kompleks dengan beban kognitif minimal, mengutamakan kegunaan tanpa mengorbankan kualitas estetika."
                )}
              </p>
            </div>
            {/* Checklist badge */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 w-52 shrink-0">
              <ul className="flex flex-col gap-3">
                {["Research", "Wireframe", "Prototype", "Testing", "Execution"].map((tag) => (
                  <li key={tag} className="flex items-center gap-3 text-[11px] font-black uppercase text-[#0070f3] tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0070f3]"></div>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-full aspect-square bg-gray-50 border border-dashed border-gray-300 rounded-3xl flex items-center justify-center p-12 overflow-hidden relative">
                 <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-gray-200 rounded-xl"></div>
                 <div className="absolute top-16 left-12 right-12 h-8 bg-gray-200 rounded"></div>
                 <div className="absolute top-28 left-12 w-16 h-16 bg-gray-200 rounded-full"></div>
              </div>
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{t("Low Fidelity", "Fidelitas Rendah")}</span>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-full aspect-square bg-white border border-gray-100 shadow-lg rounded-3xl flex flex-col items-center justify-center p-8 overflow-hidden relative">
                <div className="w-full h-full bg-blue-50/50 rounded-2xl border border-blue-100 p-4 flex flex-col gap-4">
                   <div className="w-8 h-8 rounded-full bg-blue-200"></div>
                   <div className="flex-1 w-full bg-white rounded-lg shadow-sm"></div>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{t("Interactive Prototyping", "Prototipe Interaktif")}</span>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-full aspect-square bg-white shadow-2xl rounded-3xl flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#0070f3]/10 to-transparent"></div>
                <div className="w-full h-full bg-[#111827] rounded-2xl relative overflow-hidden z-10 p-4 flex flex-col">
                   <div className="w-full h-6 flex justify-between items-center mb-4">
                      <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div><div className="w-2 h-2 rounded-full bg-yellow-400"></div><div className="w-2 h-2 rounded-full bg-green-400"></div></div>
                   </div>
                   <div className="flex-1 bg-gray-800 rounded-xl mb-3"></div>
                   <div className="h-12 bg-gray-800 rounded-xl"></div>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{t("High Fidelity", "Fidelitas Tinggi")}</span>
            </div>
          </div>
        </section>

        {/* 3. PLATFORM USAGE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("Mobile Interface", "Antarmuka Seluler")}</h3>
            <div className="flex gap-8 md:gap-12 relative h-64 justify-center items-center">
              <div className="w-32 h-60 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] border-[6px] border-gray-900 relative overflow-hidden shrink-0">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-900 rounded-full"></div>
                 <div className="mt-8 px-3 flex flex-col gap-3">
                   <div className="w-full h-12 bg-gray-100 rounded-xl"></div>
                   <div className="w-full h-20 bg-blue-50 rounded-xl"></div>
                   <div className="w-1/2 h-8 bg-gray-100 rounded-xl"></div>
                 </div>
              </div>
              <div className="w-32 h-60 bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] border-[6px] border-gray-800 mt-8 relative overflow-hidden shrink-0">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-800 rounded-full"></div>
                 <div className="mt-8 px-3 flex flex-col gap-3">
                   <div className="w-full h-12 bg-gray-800 rounded-xl"></div>
                   <div className="w-full h-20 bg-blue-900/40 rounded-xl"></div>
                   <div className="w-1/2 h-8 bg-gray-800 rounded-xl"></div>
                 </div>
              </div>
            </div>
            <div className="flex justify-around mt-8">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">iOS / Android</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Dark Mode</span>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("Desktop Interface", "Antarmuka Desktop")}</h3>
            <div className="flex flex-col gap-6 flex-1 justify-center">
              <div className="w-full h-48 bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col overflow-hidden relative">
                 <div className="w-full h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div><div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                 </div>
                 <div className="flex h-full p-4 gap-4">
                    <div className="w-1/4 h-full bg-gray-100 rounded-lg shrink-0"></div>
                    <div className="w-3/4 h-full flex flex-col gap-4">
                      <div className="w-full h-1/2 bg-blue-50 rounded-lg"></div>
                      <div className="flex gap-4 flex-1">
                        <div className="w-1/2 h-full bg-gray-50 rounded-lg border border-gray-100"></div>
                        <div className="w-1/2 h-full bg-gray-50 rounded-lg border border-gray-100"></div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="flex justify-around mt-8">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t("Web Application", "Aplikasi Web")}</span>
            </div>
          </div>
        </section>

        {/* 4. DESIGN SYSTEM SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 pt-16 border-t border-gray-100">
          <div>
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("Colors", "Warna")}</h3>
            <div className="flex flex-wrap gap-12 mb-10">
              {colors.map((color) => (
                <div key={color.hex} className="flex flex-col gap-6">
                  <div className="w-40 h-44 rounded-3xl shadow-2xl border-2 border-white" style={{ backgroundColor: color.hex }}></div>
                  <div className="text-center">
                    <span className="block text-sm font-black text-gray-300 mb-1">{color.hex}</span>
                    <span className="block text-xs font-bold text-black uppercase tracking-widest">{color.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm font-medium italic max-w-sm">
              {t("A robust design system ensures consistency and speeds up development across platforms.", "Sistem desain yang kuat memastikan konsistensi dan mempercepat pengembangan di seluruh platform.")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("Font System", "Sistem Font")}</h3>
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black text-black tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>Inter Bold</span>
                <span className="text-2xl md:text-3xl font-medium text-gray-400 tracking-tight mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>Inter Medium</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-medium italic max-w-md leading-relaxed">
              {t(
                "Inter is a typeface carefully crafted & designed for computer screens, ensuring excellent readability.",
                "Inter adalah jenis huruf yang dirancang hati-hati untuk layar komputer, memastikan keterbacaan yang sangat baik."
              )}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

