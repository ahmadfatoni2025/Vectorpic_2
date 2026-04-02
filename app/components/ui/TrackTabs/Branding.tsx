"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../../layout/Navbar';
import { Footer } from '../../layout/Footer';

const defaultData = {
  badgeText: 'Trust, Innovation, Prosperity',
  headline: 'Effortless banking,\ntotal financial ease',
  description: 'Your financial needs evolve — and your bank should too. From managing daily expenses to planning for life\'s biggest moments, our platform adapts to support your goals at every stage.',
  buttonText: 'Open an Account',
  buttonUrl: '/contact',
  statLabel: 'New clients',
  statValue: '135K+',
  card1Image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  card1Label: 'Mobile banking\nat your fingertips',
  card2Badge: 'Haven',
  card2Subtitle: 'Credit Card',
  card2Value: '5769',
  card2Name: 'Alan\nWinklevoss',
  card2Role: 'VISA',
  profileName: 'Jerry Wick',
  profileDesc: '$329,394.23',
  profileAvatar: 'https://i.pravatar.cc/150?u=jerry',
  card3Image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  card3Label: 'Advising our\ncustomers 24/7',
  card4Image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80',
  card4Label: 'Custom cards',
  accentColor: '#00A3FF',
  badgeBgColor: '#E0F7FF',
};

export default function Branding() {
  const [d, setD] = useState(defaultData);

  useEffect(() => {
    fetch('/api/track-tabs')
      .then(r => r.json())
      .then(data => {
        const tab = (Array.isArray(data) ? data : []).find((t: any) => t.tabId === 'branding');
        if (tab?.data) setD(prev => ({ ...prev, ...tab.data }));
      })
      .catch(() => {});
  }, []);

  const headlineParts = (d.headline || '').split('\n');

  return (
    <div className="bg-white min-h-screen font-sans text-[#1A1A1A]">
      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col pt-32">
        
        {/* Top Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24 items-start">
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 w-fit rounded-full text-[10px] font-bold tracking-tight" style={{ backgroundColor: d.badgeBgColor, color: d.accentColor }}>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
               {d.badgeText}
            </div>
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-gray-900 leading-[0.95] max-w-xl">
              {headlineParts.map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < headlineParts.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </div>

          <div className="flex flex-col items-end gap-10 pt-4">
              <p className="text-gray-500 text-sm md:text-base leading-relaxed text-right max-w-[400px]">
                {d.description}
              </p>
              <div className="flex items-center gap-6">
                 <button className="px-10 py-4 text-white rounded-full font-bold text-sm shadow-md transition-all" style={{ backgroundColor: d.accentColor }}>
                    {d.buttonText}
                 </button>
                 <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                           <Image src={`https://i.pravatar.cc/150?u=user-${i}`} alt="user" fill className="object-cover" />
                         </div>
                       ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400">{d.statValue} {d.statLabel}</span>
                 </div>
              </div>
          </div>
        </div>

        {/* Gallery Section - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 mb-20">
          
          {/* Card 1: Portrait Image */}
          <div className="lg:col-span-4 aspect-[4/5] md:aspect-auto md:h-[500px] rounded-[2rem] bg-gray-100 overflow-hidden relative group">
              <Image 
                  src={d.card1Image} 
                  alt="Card 1" 
                  fill 
                  className="object-cover" 
                  unoptimized
              />
              <div className="absolute bottom-8 left-8">
                 <p className="text-gray-900 text-[10px] font-bold leading-tight opacity-40">{d.card1Label?.split('\n').map((l: string, i: number) => <React.Fragment key={i}>{l}{i === 0 && <br/>}</React.Fragment>)}</p>
              </div>
          </div>

          {/* Card 2: Themed Card & User Info */}
          <div className="lg:col-span-3 flex flex-col gap-4">
             {/* Themed Card */}
             <div className="flex-1 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group" style={{ backgroundColor: d.accentColor }}>
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border-2 border-white/20 rounded-md flex items-center justify-center p-1">
                          <div className="w-full h-full bg-white rounded-xs opacity-50"></div>
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-80">{d.card2Badge}</span>
                   </div>
                   <div className="text-white brightness-200 opacity-60">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                   </div>
                </div>

                <div className="relative z-10">
                   <div className="text-white/40 text-[10px] font-bold uppercase mb-4">{d.card2Subtitle}</div>
                   <div className="text-white text-lg font-mono tracking-widest flex justify-between items-center opacity-80">
                      <span>••••</span>
                      <span>••••</span>
                      <span>••••</span>
                      <span>{d.card2Value}</span>
                   </div>
                </div>

                <div className="flex justify-between items-end relative z-10">
                    <div className="text-white text-[10px] font-bold uppercase leading-tight opacity-60">
                        {d.card2Name?.split('\n').map((l: string, i: number) => <React.Fragment key={i}>{l}{i === 0 && <br/>}</React.Fragment>)}
                    </div>
                    <div className="text-white text-2xl font-black italic opacity-40">{d.card2Role}</div>
                </div>

                {/* Decorative background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-black opacity-5 pointer-events-none -rotate-12">{d.card2Badge?.[0] || 'H'}</div>
             </div>

             {/* User Profile Bar */}
             <div className="h-20 bg-white border border-gray-50 rounded-[1.5rem] shadow-sm flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden relative">
                       <Image src={d.profileAvatar} alt={d.profileName} fill className="object-cover" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900 leading-none mb-1">{d.profileName}</span>
                      <span className="text-[10px] font-bold text-gray-400">{d.profileDesc}</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center p-1.5 opacity-40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="10"/></svg>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center p-1.5 opacity-40">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l4-4M3 20V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/></svg>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 3: Person Close-up */}
          <div className="lg:col-span-3 aspect-square lg:aspect-auto lg:h-[500px] rounded-[2rem] bg-gray-100 overflow-hidden relative group">
              <Image 
                  src={d.card3Image} 
                  alt="Card 3" 
                  fill 
                  className="object-cover" 
                  unoptimized 
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <p className="text-white text-[10px] font-bold leading-tight opacity-60">{d.card3Label?.split('\n').map((l: string, i: number) => <React.Fragment key={i}>{l}{i === 0 && <br/>}</React.Fragment>)}</p>
              </div>
          </div>

          {/* Card 4: Hand Holding Card  */}
          <div className="lg:col-span-2 aspect-[3/4] lg:aspect-auto lg:h-[500px] rounded-[2rem] bg-gray-100 overflow-hidden relative group">
              <Image 
                  src={d.card4Image} 
                  alt="Card 4" 
                  fill 
                  className="object-cover" 
                  unoptimized 
              />
              <div className="absolute bottom-8 left-8">
                 <p className="text-gray-900 text-[10px] font-bold pb-2 border-b border-gray-900/10 mb-2 opacity-60 uppercase tracking-widest">{d.card4Label}</p>
              </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
