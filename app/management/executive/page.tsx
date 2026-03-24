"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../../ui/Navbar";
import { Footer } from "../../ui/footer";
import { ShieldCheck, Target, Globe, Award, TrendingUp, Users } from "lucide-react";

const stats = [
  { label: "Decisions Made", value: "1,200+" },
  { label: "Global Partners", value: "85+" },
  { label: "Markets Reached", value: "50+" },
];

const responsibilities = [
  {
    title: "Strategic Governance",
    desc: "Overseeing the global direction of Vectorpic Media Ltd with a focus on sustainable growth.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "Media Representation",
    desc: "Managing high-level media space sales and professional representation services.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Venture Capital",
    desc: "Analyzing and executing investment opportunities in emerging digital art spaces.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Board Leadership",
    desc: "Facilitating core communication between department heads and global stakeholders.",
    icon: <Users className="w-6 h-6" />,
  },
];

export default function ExecutivePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-black overflow-x-hidden flex flex-col relative">
      <Navbar />

      <div className="grow">

        {/* --- HERO SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 pt-32 sm:pt-48 pb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-50/30 blur-[100px] -z-10 rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Global Governance</span>
            </span>

            <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-8">
              The <br />
              <span className="bg-[#4F46E5] text-white px-4 md:px-8 py-2 rounded-sm rotate-[-1.5deg] inline-block shadow-2xl mt-4">Executive</span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-500 font-medium text-lg md:text-xl leading-relaxed">
              Vectorpic's executive board is comprised of industry-leading visionaries dedicated
              to defining the future of media representation and photographic excellence globally.
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
                Driving strategic <br /> excellence
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
                The executive division manages the overarching business model,
                ensuring every photographic and artistic creation meets the
                highest professional standards of Vectorpic Media Ltd.
              </p>
              <Link href="/management" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest group">
                View All Leadership <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {responsibilities.map((r, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
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
