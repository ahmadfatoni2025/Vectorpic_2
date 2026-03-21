"use client";

import React, { useState } from 'react';
import { Navbar } from "../../ui/Navbar";
import { Footer } from "../../ui/footer";

export default function VisionPage() {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');

  const visionPoints = [
    {
      title: "Global Aesthetic Leadership",
      desc: "To be the premier global studio defining the future of digital art and sophisticated brand identities."
    },
    {
      title: "Technological Excellence",
      desc: "Pioneering the integration of cutting-edge creative tools degan pure artistic vision."
    },
    {
      title: "Empowering Creativity",
      desc: "Creating an ecosystem where the world's most talented artists can perform at their peak."
    }
  ];

  const missionPoints = [
    {
      title: "Brand Transformation",
      desc: "Propelling brands into the future through high-performance visual storytelling and strategic logic."
    },
    {
      title: "Quality Without Compromise",
      desc: "Delivering pixel-perfect assets and textiles that meet the highest international standards."
    },
    {
      title: "Client-Centric Results",
      desc: "Building long-term partnerships through measurable business impact and creative reliability."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl">
          <span className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase mb-8 block italic">/ CORE PHILOSOPHY /</span>
          <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-[0.9] mb-12 uppercase italic">
            Vision <br /> <span className="bg-black text-white px-8 py-2 rounded-sm rotate-1 inline-block not-italic shadow-2xl">Mission</span>
          </h1>
          <p className="text-gray-400 font-bold text-xl leading-relaxed italic">
            Defining the strategic direction and artistic soul of Vectorpic's digital journey.
          </p>
        </div>

        {/* Interactive Tabs Section */}
        <div className="w-full max-w-5xl">
          <div className="flex justify-center gap-8 mb-16">
            <button 
              onClick={() => setActiveTab('vision')}
              className={`text-sm font-black uppercase tracking-widest pb-4 border-b-4 transition-all ${
                activeTab === 'vision' ? "border-blue-600 text-black translate-y-[-4px]" : "border-transparent text-gray-300 hover:text-black"
              }`}
            >
              Our Vision
            </button>
            <button 
              onClick={() => setActiveTab('mission')}
              className={`text-sm font-black uppercase tracking-widest pb-4 border-b-4 transition-all ${
                activeTab === 'mission' ? "border-blue-600 text-black translate-y-[-4px]" : "border-transparent text-gray-300 hover:text-black"
              }`}
            >
              Our Mission
            </button>
          </div>

          {/* List Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {(activeTab === 'vision' ? visionPoints : missionPoints).map((point, idx) => (
              <div 
                key={idx}
                className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-2xl transition-all group flex flex-col justify-between aspect-square"
              >
                <div>
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-black text-xs mb-8 group-hover:bg-blue-600 transition-colors">
                    {idx + 1}
                  </div>
                  <h3 className="text-2xl font-black text-black leading-tight tracking-tighter mb-4">
                    {point.title}
                  </h3>
                </div>
                <p className="text-gray-400 font-bold text-sm leading-relaxed group-hover:text-black transition-colors">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
