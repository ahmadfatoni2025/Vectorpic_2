"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../../ui/Navbar";
import { Footer } from "../../ui/footer";
import { Palette, Camera, Image as ImageIcon, Stars, Sparkles, Layout } from "lucide-react";

const stats = [
  { label: "Assets Created", value: "5,000+" },
  { label: "Design Awards", value: "24+" },
  { label: "Creative Minds", value: "45+" },
];

const responsibilities = [
  {
    title: "Artistic Creation",
    desc: "Developing unique visual identities and artistic projects for global brands.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    title: "Commercial Photography",
    desc: "Delivering high-end photographic activities with professional precision.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    title: "Visual Identity",
    desc: "Crafting modern branding and aesthetic systems for digital ecosystems.",
    icon: <Layout className="w-6 h-6" />,
  },
  {
    title: "Media Representation",
    desc: "Representing creative works in global advertising and media spaces.",
    icon: <Stars className="w-6 h-6" />,
  },
];

export default function CreativePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-black overflow-x-hidden flex flex-col relative">
      <Navbar />

      <div className="grow">
        {/* --- CORE RESPONSIBILITIES --- */}
        <section className="max-w-7xl mx-auto px-6 py-20 mb-32">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-start">
            <div className="flex-1 sticky top-32">
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none mb-8">
                Pioneering visual <br /> aesthetics
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
                Every pixel and portrait at Vectorpic Media Ltd is a result of
                intense creative research and artistic craftsmanship.
              </p>
              <Link href="/management" className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-widest group">
                Explore Our Vision <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {responsibilities.map((r, i) => (
                <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
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
