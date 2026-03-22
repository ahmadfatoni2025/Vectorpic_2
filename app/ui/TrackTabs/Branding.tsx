"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from "../../context/LanguageContext";
import { Navbar } from '../Navbar';
import { Footer } from '../footer';

export default function Branding() {
  const { t } = useLanguage();

  const colors = [
    { name: t("Vector Blue", "Biru Vektor"), hex: "#04cce7", desc: t("Provides freshness and technological trust to the users.", "Memberikan kesegaran dan kepercayaan teknologi kepada pengguna.") },
    { name: t("Energy Orange", "Oranye Energi"), hex: "#FDB62F", desc: t("Represents creativity and vibrant energy flow.", "Mewakili kreativitas dan aliran energi yang bersemangat.") },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full bg-[#053CC8] overflow-hidden pt-32 pb-40 md:py-48 px-6">
        {/* Abstract Geometric Shapes */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none opacity-80">
          <div className="absolute top-10 right-20 w-40 h-40 bg-[#FDB62F] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-64 h-32 bg-[#FDB62F] rounded-t-full translate-x-1/4"></div>
          <div className="absolute bottom-0 right-40 w-48 h-24 bg-white/20 rounded-t-full"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/10 rounded-full border border-white/20"></div>
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
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Vectorpic</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-12">
              {t(
                "Vectorpic is a leading digital design studio, providing premium vector assets, brand identities, and high-performance creative solutions.",
                "Vectorpic adalah studio desain digital terkemuka, menyediakan aset vektor premium, identitas merek, dan solusi kreatif berkinerja tinggi."
              )}
            </p>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-white/50 text-xs font-black tracking-widest uppercase border border-white/5">
              {t("Official Rebrand Material 2024", "Materi Rebrand Resmi 2024")}
            </span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32">

        {/* 2. LOGO CONSTRUCTION SECTION */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tight">{t("Logo", "Logo")}</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                {t(
                  "We are dealing between precision and creativity to get our visual outputs with good vibes and meaningful impact, so our logo should say something about the quality and our relationship with clients.",
                  "Kami berurusan antara presisi dan kreativitas untuk mendapatkan hasil visual kami dengan suasana yang baik dan dampak yang bermakna."
                )}
              </p>
            </div>
            {/* Checklist badge */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 w-52">
              <ul className="flex flex-col gap-3">
                {["Meaningful", "Clean", "Minimal", "Reliable", "Memorable"].map((tag) => (
                  <li key={tag} className="flex items-center gap-3 text-[11px] font-black uppercase text-blue-500 tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-full aspect-square bg-white border border-dashed border-gray-200 rounded-3xl flex items-center justify-center p-12 overflow-hidden">
                <div className="w-full h-full border-2 border-gray-100 rounded-lg transform -rotate-12 flex items-center justify-center opacity-30">
                  <span className="text-xs font-black text-gray-200">LINE CONCEPT</span>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{t("Line concept of the logo", "Konsep garis dari logo")}</span>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-full aspect-square bg-white border border-dashed border-gray-200 rounded-3xl flex items-center justify-center p-12 overflow-hidden relative">
                {/* Construction lines decoration */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500 transform -rotate-45"></div>
                  <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500 transform rotate-45"></div>
                </div>
                <div className="w-32 h-32 bg-gray-100/50 rounded-2xl"></div>
              </div>
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{t("Removing direct interactions", "Menghapus interaksi langsung")}</span>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-full aspect-square bg-white shadow-2xl rounded-3xl flex items-center justify-center p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent"></div>
                <Image src="/logo/logo-brand.jpg" alt="Final" width={180} height={180} className="object-contain relative z-10" />
              </div>
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{t("Final Output", "Hasil Akhir")}</span>
            </div>
          </div>
        </section>

        {/* 3. USAGE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("App Usage", "Penggunaan Aplikasi")}</h3>
            <div className="flex gap-12">
              <div className="w-36 h-36 bg-white shadow-xl rounded-[2.5rem] flex items-center justify-center p-8 border border-gray-50">
                <Image src="/logo/logo-brand.jpg" alt="App Icon" width={60} height={60} />
              </div>
              <div className="w-36 h-36 bg-[#053CC8] shadow-xl rounded-[2.5rem] flex items-center justify-center p-8">
                <Image src="/logo/logo-brand.jpg" alt="App Icon Dark" width={60} height={60} className="brightness-200" />
              </div>
            </div>
            <div className="flex gap-12 mt-4 ml-12">
              <span className="w-36 text-center text-[9px] font-black text-gray-300 uppercase tracking-widest">App Icon</span>
              <span className="w-36 text-center text-[9px] font-black text-gray-300 uppercase tracking-widest">App Icon</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("Web Usage", "Penggunaan Web")}</h3>
            <div className="flex flex-col gap-6">
              <div className="w-full h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-4 px-10">
                <Image src="/logo/logo-brand.jpg" alt="Web Logo" width={40} height={40} />
                <span className="text-2xl font-black text-[#053CC8]">Vectorpic</span>
              </div>
              <div className="w-full h-24 bg-[#053CC8] rounded-2xl flex items-center justify-center gap-4 px-10">
                <Image src="/logo/logo-brand.jpg" alt="Web Logo White" width={40} height={40} className="brightness-200" />
                <span className="text-2xl font-black text-white">Vectorpic</span>
              </div>
            </div>
            <div className="flex justify-around mt-4">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Web Logo</span>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Web Logo</span>
            </div>
          </div>
        </section>

        {/* 4. ASSETS SECTION */}
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
              {t("Both are brighter colours, it will give freshness to the users.", "Keduanya adalah warna yang lebih cerah, itu akan memberikan kesegaran bagi pengguna.")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black text-black mb-10 uppercase tracking-widest">{t("Font", "Font")}</h3>
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black text-black tracking-tighter">Outfit Heavy</span>
                <span className="text-2xl md:text-3xl font-medium text-gray-400 tracking-tight mt-2">Outfit Medium</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-medium italic max-w-md leading-relaxed">
              {t(
                "Outfit is one of the best and premium fonts used by worldwide designers for modern digital experiences.",
                "Outfit adalah salah satu font terbaik dan premium yang digunakan oleh desainer di seluruh dunia untuk pengalaman digital modern."
              )}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
