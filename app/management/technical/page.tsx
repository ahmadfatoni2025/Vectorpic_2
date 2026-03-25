"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Cpu, Code, Database, Zap, Settings, Binary } from "lucide-react";

const stats = [
  { label: "Systems Deployed", value: "200+" },
  { label: "Data Processed", value: "50TB+" },
  { label: "Uptime", value: "99.9%" },
];

const responsibilities = [
  {
    title: "Precision Engineering",
    desc: "Developing technical systems that support high-scale media representation.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Platform Development",
    desc: "Building the digital infrastructure for Vectorpic's creative and photographic ecosystems.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "Data Intelligence",
    desc: "Analyzing market trends and photographic metadata for professional growth.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: "Scientific Research",
    desc: "Implementing technical scientific activities to optimize media delivery and quality.",
    icon: <Binary className="w-6 h-6" />,
  },
];

export default function TechnicalPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-black overflow-x-hidden flex flex-col relative">
      <Navbar />

      <div className="grow">
        {/* --- HERO SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 pt-32 sm:pt-48 pb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-50/20 blur-[100px] -z-10 rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Digital Precision</span>
            </span>

            <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-8">
              The <br />
              <span className="bg-[#10B981] text-white px-4 md:px-8 py-2 rounded-sm -rotate-1 inline-block shadow-2xl mt-4">Technical</span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-500 font-medium text-lg md:text-xl leading-relaxed">
              Vectorpic's technical division ensures every digital asset and platform operates
              with unparalleled precision and scientific excellence.
            </p>
          </motion.div>
        </section>

        {/* --- STATS STRIP --- */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-sm">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <span className="block text-4xl font-black text-black tracking-tighter group-hover:scale-110 transition-transform">{s.value}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- CORE RESPONSIBILITIES --- */}
        <section className="max-w-7xl mx-auto px-6 py-20 mb-32">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1 sticky top-32">
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none mb-8">
                Engineering the <br /> future
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
                The technical division provides the scientific backbone for
                Vectorpic Media Ltd, ensuring every photographic asset and
                commercial platform reaches perfection.
              </p>
              <Link href="/management" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-widest group">
                View Systems <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {responsibilities.map((r, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {r.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{r.title}</h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
