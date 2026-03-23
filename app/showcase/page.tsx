"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/footer';
import { ChevronLeft, ChevronRight, Clock, Heart, MoreHorizontal, Search } from 'lucide-react';

const EthIcon = () => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block text-blue-500 mr-1">
    <path d="M4.99968 0L4.85156 0.530368V11.0261L4.99968 11.1738L9.99936 8.16782L4.99968 0Z" fill="currentColor" />
    <path d="M4.99999 0L0 8.16782L4.99999 11.1738V5.88219V0Z" fill="currentColor" fillOpacity="0.7" />
    <path d="M4.99968 12.0163L4.88086 12.1648V15.7001L4.99968 16L10 8.99591L4.99968 12.0163Z" fill="currentColor" />
    <path d="M5.00003 16V12.0163L0 8.99591L5.00003 16Z" fill="currentColor" fillOpacity="0.7" />
  </svg>
);

const FlowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block text-green-500 mr-1">
    <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 18.3333C8.50219 18.3333 5.66667 15.4978 5.66667 12C5.66667 8.50219 8.50219 5.66667 12 5.66667C15.4978 5.66667 18.3333 8.50219 18.3333 12C18.3333 15.4978 15.4978 18.3333 12 18.3333Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 5.66667C8.50219 5.66667 5.66667 8.50219 5.66667 12C5.66667 15.4978 8.50219 18.3333 12 18.3333C15.4978 18.3333 18.3333 15.4978 18.3333 12C18.3333 8.50219 15.4978 5.66667 12 5.66667ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" fill="currentColor" />
  </svg>
);

const XtzIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block text-blue-400 mr-1">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M15.4286 7.71429V6H8.57143V7.71429H10.2857C10.6011 7.71429 10.8571 7.97029 10.8571 8.28571V15.4286H9.42857С9.11314 15.4286 8.85714 15.6846 8.85714 16V17.7143H15.4286V16H14.5714C14.256 16 14 15.744 14 15.4286V8.28571C14 7.97029 14.256 7.71429 14.5714 7.71429H15.4286Z" fill="currentColor" />
  </svg>
);


export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* --- HEADER GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Hero Left Banner */}
          <div className="relative rounded-[2rem] bg-gradient-to-br from-[#8A2387] via-[#E94057] to-[#F27121] p-10 flex flex-col justify-end min-h-[480px] overflow-hidden group">
            {/* Decorative floating circular images */}
            <div className="absolute top-[10%] left-[10%] w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200" alt="3d" fill className="object-cover" />
            </div>
            <div className="absolute top-[5%] left-[45%] w-16 h-16 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=200" alt="3d" fill className="object-cover" />
            </div>
            <div className="absolute top-[20%] right-[15%] w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-black">
              <Image src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200" alt="3d" fill className="object-cover" />
            </div>
            <div className="absolute top-[40%] left-[15%] w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-black">
              <Image src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=200" alt="3d" fill className="object-cover" />
            </div>
            <div className="absolute top-[35%] left-[38%] w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-purple-500">
              <Image src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200" alt="3d" fill className="object-cover" />
            </div>
            <div className="absolute top-[45%] right-[5%] w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-orange-400">
              <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200" alt="3d" fill className="object-cover" />
            </div>


            {/* Text Content */}
            <div className="relative z-10 text-center text-white mt-auto">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">Explore and collect NFTs</h1>
              <p className="text-white/80 max-w-md mx-auto mb-8 text-sm md:text-base font-medium drop-shadow-sm">
                Our marketplace is the world's first and largest NFT market for independent creators worldwide
              </p>
              <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm">
                See 240,590 items
              </button>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Box 1 */}
            <div className="relative rounded-[2rem] overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=400" alt="Trendy Robot" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-16 pb-6 text-center">
                <h3 className="text-white font-bold text-lg leading-tight">Trendy Robot</h3>
                <p className="text-white/70 text-xs font-medium mt-1">by Xuan Jingyi</p>
              </div>
            </div>
            {/* Box 2 */}
            <div className="relative rounded-[2rem] overflow-hidden group bg-purple-100">
              <Image src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400" alt="Meta Angels" fill className="object-cover mix-blend-multiply opacity-80 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent pt-16 pb-6 text-center">
                <h3 className="text-white font-bold text-lg leading-tight">Meta Angels</h3>
                <p className="text-white/70 text-xs font-medium mt-1">by Pan Su</p>
              </div>
            </div>
            {/* Box 3 */}
            <div className="relative rounded-[2rem] overflow-hidden group bg-gray-200">
              <Image src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=400" alt="Mutant Sqaure" fill className="object-cover mix-blend-multiply opacity-50 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent pt-16 pb-6 text-center">
                <h3 className="text-white font-bold text-lg leading-tight">Mutant Sqaure</h3>
                <p className="text-white/70 text-xs font-medium mt-1">by Marco Alves</p>
              </div>
            </div>
            {/* Box 4 */}
            <div className="relative rounded-[2rem] overflow-hidden group bg-stone-200">
              <Image src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400" alt="Immersive Toys" fill className="object-cover mix-blend-multiply opacity-80 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent pt-16 pb-6 text-center">
                <h3 className="text-white font-bold text-lg leading-tight">Immersive Toys</h3>
                <p className="text-white/70 text-xs font-medium mt-1">by Julian Gruber</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RUNNING AUCTIONS --- */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Running auctions</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Right Messages and Memes", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400", time: "10:40:57", likes: 24, price: "1.90 Eth", author: "Martina Brito", icon: <EthIcon />, bg: "bg-orange-100" },
              { title: "Brick-and-Mortar Travails", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400", time: "05:45:10", likes: 19, price: "0.45 Flow", author: "Haim Chuwrqn", icon: <FlowIcon />, bg: "bg-indigo-100" },
              { title: "Free Way to Back Up", img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=400", time: "15:32:10", likes: 20, price: "0.53 Flow", author: "Langke Zambo", icon: <FlowIcon />, bg: "bg-gray-200" },
              { title: "Patturb and Waymo", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400", time: "03:39:57", likes: 12, price: "2.43 Eth", author: "Shirai Subaru", icon: <EthIcon />, bg: "bg-pink-100" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 group hover:shadow-xl transition-shadow cursor-pointer">
                <div className={`relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-4 ${item.bg}`}>
                  <Image src={item.img} alt={item.title} fill className="object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {item.time}
                  </div>
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    <Heart className="w-3.5 h-3.5 text-gray-400" />
                    {item.likes}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-4">{item.title}</h3>
                <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Price</p>
                    <p className="font-bold text-sm tracking-tight">{item.icon} {item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs mb-1">Author</p>
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 relative">
                        <Image src={`https://i.pravatar.cc/100?img=${i + 15}`} alt={item.author} fill className="object-cover" />
                      </div>
                      <p className="font-bold text-sm tracking-tight text-gray-900">{item.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TOP COLLECTIONS --- */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Top collections</h2>
            <div className="bg-gray-100 p-1 rounded-full inline-flex text-xs font-bold text-gray-500">
              <button className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full shadow-sm">1 Day</button>
              <button className="px-4 py-1.5 hover:text-black">7 Days</button>
              <button className="px-4 py-1.5 hover:text-black">30 Days</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {[
              { name: "Bored Ape Yacht Club", vol: "10,450.00", icon: <EthIcon />, img: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=100" },
              { name: "Bored Ape Chemistry Club", vol: "5344.13", icon: <EthIcon />, img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=100" },
              { name: "RTFKT CloneX Mintvial", vol: "33457.59", icon: <EthIcon />, img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=100" },
              { name: "Chromie Squiggle by Snowfro", vol: "18,520.00", icon: <FlowIcon />, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100" },
              { name: "Bored Ape Kennel Club", vol: "4579.40", icon: <EthIcon />, img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=100" },
              { name: "Psychedelics Anonymous", vol: "5344.13", icon: <EthIcon />, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=100" },
              { name: "Worldwide Webb Land", vol: "13457.59", icon: <XtzIcon />, img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100" },
              { name: "Brick-and-Mortar Travails", vol: "3355.20", icon: <FlowIcon />, img: "https://images.unsplash.com/photo-1579546678183-a9c101ad59b6?q=80&w=100" },
              { name: "Free Way to Back Up", vol: "6890.34", icon: <FlowIcon />, img: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=100" },
            ].map((col, i) => (
              <div key={i} className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-colors">
                <span className="text-gray-900 font-bold w-4">{i + 1}</span>
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={col.img} alt={col.name} fill className="object-cover mix-blend-multiply opacity-90" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{col.name}</h4>
                  <p className="text-xs text-gray-500 flex items-center">{col.icon} {col.vol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TRENDING ITEMS --- */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Trending items</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "May Bring Back", price: "0.45 Flow", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400", likes: 99, icon: <FlowIcon />, bg: "bg-gray-100", avatars: [1, 2] },
              { title: "Auto Technology", price: "7 XTZ", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400", likes: 99, icon: <XtzIcon />, bg: "bg-orange-50", avatars: [3] },
              { title: "Agents Were Behind", price: "17.50 Flow", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400", likes: 99, icon: <FlowIcon />, bg: "bg-fuchsia-100", avatars: [4, 5, 6] },
              { title: "Front Desk", price: "3 Flow", img: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=400", likes: 99, icon: <FlowIcon />, bg: "bg-stone-200", avatars: [7, 8] },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-3 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group hover:shadow-xl transition-shadow cursor-pointer">
                <div className={`relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-4 ${item.bg}`}>
                  <Image src={item.img} alt={item.title} fill className="object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" />

                  {/* Top floating elements */}
                  <div className="absolute top-3 left-3 flex -space-x-1.5">
                    {item.avatars.map(avId => (
                      <div key={avId} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
                        <Image src={`https://i.pravatar.cc/100?img=${avId + 20}`} alt="avatar" fill />
                      </div>
                    ))}
                  </div>
                  <button className="absolute top-3 right-3 w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-500 shadow-sm hover:text-black">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-2 pb-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-gray-500 text-xs flex items-center gap-1 font-medium">from <span className="font-bold text-gray-900">{item.icon} {item.price}</span></p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold bg-gray-50 px-2 py-1 rounded-full">
                      <Heart className="w-3 h-3 text-gray-400" />
                      {item.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-4">
          <button className="bg-indigo-50 hover:bg-indigo-100 text-[#6366f1] font-bold px-8 py-2.5 rounded-full text-sm transition-colors transition-transform active:scale-95 cursor-pointer">
            Load More
          </button>
        </div>

      </div>

      <Footer />
    </main>
  );
}