"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '../Navbar';
import { Footer } from '../footer';

export default function UIUX() {
    const paperTexture = "https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=1200&q=60";
    const darkPaperTexture = "https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=1200&q=60";

    const masonryImages = [
        "https://images.unsplash.com/photo-1508344928928-76bc0633b49e?w=400&q=60",
        "https://images.unsplash.com/photo-1574629810360-7efbb1925846?w=400&q=60",
        "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&q=60",
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&q=60",
        "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400&q=60",
        "https://images.unsplash.com/photo-1518091043644-c1d44570a2c1?w=400&q=60",
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=60",
        "https://images.unsplash.com/photo-1461896836934-ffe607fa8211?w=400&q=60",
        "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=60",
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&q=60",
    ];

    return (
        <div className="font-sans overflow-x-hidden min-h-screen bg-white">
            <Navbar />

            {/* 1. HERO SECTION */}
            <div className="relative w-full h-auto min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
                {/* Paper Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0"
                    style={{ backgroundImage: `url(${paperTexture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>

                {/* Chain and airplane doodles */}
                <div className="absolute top-10 left-10 opacity-60 w-32 h-32 z-10 hidden md:block select-none pointer-events-none drop-shadow-sm">
                    {/* Simple chain SVG */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="transparent" stroke="currentColor" strokeWidth="4">
                        <rect x="25" y="25" width="20" height="40" rx="10" transform="rotate(-45 50 50) translate(-30,-30)" />
                        <rect x="25" y="25" width="20" height="40" rx="10" transform="rotate(-45 50 50) translate(0,-30)" />
                        <rect x="25" y="25" width="20" height="40" rx="10" transform="rotate(-45 50 50) translate(30,-30)" />
                    </svg>
                </div>
                <div className="absolute top-10 right-10 opacity-80 w-32 h-32 z-10 hidden md:block select-none pointer-events-none drop-shadow-sm">
                    {/* Paper Airplane SVG with dashed trail */}
                    <svg viewBox="0 0 100 100" stroke="black" fill="none" strokeWidth="2" strokeDasharray="4,4">
                        <path d="M 0 100 Q 30 70 60 50" />
                    </svg>
                    <svg viewBox="0 0 100 100" stroke="black" fill="none" strokeWidth="3" className="absolute top-0 right-0 w-16 h-16 transform translate-x-[20%] -translate-y-[20%]">
                        <path d="M 10 90 L 90 10 L 40 10 Z" fill="white" />
                        <path d="M 90 10 L 40 40 L 10 90 Z" fill="white" />
                        <path d="M 40 10 L 40 40" />
                    </svg>
                </div>

                {/* Stars */}
                <div className="absolute top-[25%] left-[20%] text-3xl z-10 pointer-events-none font-bold">✶</div>
                <div className="absolute top-[25%] right-[15%] text-3xl z-10 pointer-events-none font-bold">✶</div>
                <div className="absolute bottom-[20%] left-[25%] text-3xl z-10 pointer-events-none font-bold text-[#4F46E5] drop-shadow">✶</div>

                {/* Central Logo Header */}
                <div className="relative z-20 flex flex-col items-center mt-12 md:max-w-2xl px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className=" text-white px-6 md:px-12 py-4 md:py-6 border-b-[6px] md:border-b-[8px] border-black flex flex-col items-center shadow-lg relative overflow-hidden"
                    >
                        <div className="flex items-center justify-center gap-1 md:gap-2 font-bold">
                            {/* Main text */}
                            <span className="text-[3.5rem] md:text-8xl lg:text-[9rem] leading-none tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                PURTO
                            </span>

                            {/* Stylized F with accents */}
                            <div className="relative inline-flex flex-col items-center justify-center">
                                <span className="text-[3.5rem] md:text-8xl lg:text-[9rem] leading-none tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    F
                                </span>
                                <span className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 text-[0.3em] md:text-[0.25em] font-medium text-gray-400">
                                    ~
                                </span>
                                <span className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 text-[0.4em] md:text-[0.3em] font-medium text-gray-500">
                                    A
                                </span>
                            </div>

                            {/* Remaining text */}
                            <span className="text-[3.5rem] md:text-8xl lg:text-[9rem] leading-none tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                LIO
                            </span>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-between w-full border-t-[1.5px] border-white pt-2 text-[6px] sm:text-[8px] md:text-[10px] tracking-[0.2em] font-bold">
                            <span>DESIGNED BY ABDUL AZIZ ANNAJIH</span>
                            <span className="flex-grow mx-2 md:mx-4 h-[1.5px] bg-white hidden sm:block"></span>
                            <span className="ml-auto sm:ml-0">2024</span>
                        </div>
                    </motion.div>

                    {/* VVVV Patterns */}
                    <div className="text-[#4F46E5] text-[10px] sm:text-xs md:text-lg font-mono tracking-[0.2em] md:tracking-[0.4em] font-bold mt-8 md:mt-12 whitespace-nowrap overflow-hidden w-full text-center mix-blend-multiply opacity-90 z-20">
                        vvvv vvvv vvvv vvvv vvvv vvvv vvvv vvvv vvvv vvvv
                    </div>
                </div>

                {/* Left Statue */}
                <div className="absolute bottom-[-10%] left-[-10%] md:bottom-0 md:left-[-2%] w-64 h-80 md:w-96 md:h-[30rem] z-10 opacity-100 select-none pointer-events-none">
                    {/* Faking brand outline with glowing background blob */}
                    <svg viewBox="0 0 200 200" className="absolute inset-x-0 bottom-0 top-1/4 w-full h-[80%] transform scale-110 drop-shadow-[0_0_15px_rgba(79,70,229,0.8)]" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4F46E5" d="M39.9,-27.2C54.4,-11.2,70.9,4.4,68.9,21.9C67,39.4,46.7,58.8,25.4,64.2C4.1,69.5,-18.2,60.8,-35.3,46.4C-52.5,32,-64.4,12.1,-60.8,-6.2C-57.2,-24.5,-38.1,-41.2,-20.9,-46.7C-3.8,-52.1,11.5,-46.2,25.4,-43.3L39.9,-27.2Z" transform="translate(100 100) scale(1.1)" />
                    </svg>
                    <Image
                        src="https://images.unsplash.com/photo-1544413156-f446cc22b4cb?w=600&q=70"
                        alt="Statue Left"
                        fill
                        className="object-contain origin-bottom object-bottom filter grayscale contrast-[1.1] mix-blend-multiply"
                    />
                </div>

                {/* Right Statue */}
                <div className="absolute bottom-[-10%] right-[-10%] md:bottom-0 md:right-[-2%] w-64 h-80 md:w-96 md:h-[30rem] z-10 opacity-100 select-none pointer-events-none">
                    {/* Outline blob */}
                    <svg viewBox="0 0 200 200" className="absolute inset-x-0 bottom-0 top-1/4 w-[110%] h-[80%] transform scale-125 drop-shadow-[0_0_15px_rgba(79,70,229,0.8)]" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4F46E5" d="M47.7,-64.1C59.7,-51.9,65.8,-34.5,69.5,-17.7C73.1,-0.8,74.3,15.6,67.8,29.9C61.3,44.2,47,56.5,31.7,64.3C16.3,72.2,0,75.6,-16.9,73.6C-33.7,71.6,-51.2,64.1,-63.9,51C-76.5,37.8,-84.3,18.9,-83.4,0.6C-82.5,-17.8,-72.9,-35.6,-60.1,-48.1C-47.2,-60.6,-31,-67.7,-14.8,-69.5C1.3,-71.4,17.7,-68.1,33.7,-61.7L47.7,-64.1Z" transform="translate(100 100) scale(1.1) rotate(45)" />
                    </svg>
                    <Image
                        src="https://images.unsplash.com/photo-1552559092-23c3167b2d5f?w=600&q=70"
                        alt="Statue Right"
                        fill
                        className="object-contain origin-bottom object-bottom filter grayscale contrast-[1.1] mix-blend-multiply"
                    />
                </div>

            </div>

            {/* 2. ABOUT SECTION */}
            <div className="relative w-full py-24 px-8 md:px-20 bg-[#0f172a] text-white overflow-hidden shadow-[inset_0_20px_30px_rgba(0,0,0,0.5)]">
                {/* Dark paper texture overlay */}
                <div
                    className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-0 filter grayscale"
                    style={{ backgroundImage: `url(${darkPaperTexture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">

                    {/* Left: About Me */}
                    <div className="flex-1 max-w-2xl">
                        <div className="inline-block bg-[#4F46E5] text-white px-4 py-1.5 font-bold text-xl md:text-3xl tracking-tight mb-8 transform -skew-x-[5deg] shadow-lg">
                            <span className="block transform skew-x-[5deg]">ABOUT ME</span>
                        </div>
                        <p className="text-gray-200 text-sm md:text-[17px] leading-relaxed font-medium">
                            Hello, my name is Abdul Aziz Annajih. i am a student at Al-Azhar University, i am now pursuing the field of graphic design for about the last 3 years and i prefer the sport of graphic design.
                            <br /><br />
                            Hope you like to get to know me.
                        </p>
                    </div>

                    {/* Right: Software */}
                    <div className="flex-1 flex flex-col items-start md:items-end md:text-right">
                        <div className="inline-block bg-[#4F46E5] text-white px-4 py-1.5 font-bold text-xl md:text-3xl tracking-tight mb-8 transform -skew-x-[5deg] shadow-lg">
                            <span className="block transform skew-x-[5deg]">SOFTWARE</span>
                        </div>
                        <div className="flex flex-wrap md:justify-end gap-3 mt-4 max-w-xs">
                            {['Pr', 'Ps', 'Ae', 'Ai'].map((sw, idx) => (
                                <div key={idx} className="w-[4.5rem] h-[4.5rem] bg-white rounded-2xl flex items-center justify-center transform transition duration-300 hover:scale-110 shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(79,70,229,0.8)] border border-gray-100">
                                    <span className="text-black font-black text-2xl tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>{sw}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sparkles bottom right */}
                <div className="absolute bottom-[30%] right-[10%] text-white text-3xl z-10 select-none pointer-events-none">✶</div>
            </div>

            {/* 3. MASONRY GRID (PORTFOLIO PROJECTS) */}
            <div className="relative w-full bg-[#111] min-h-screen pt-4 pb-20">
                {/* "DESIGN" sticker label */}
                <div className="absolute top-12 left-6 md:top-20 md:left-20 z-20 bg-[#4F46E5] text-white px-6 py-2 md:px-10 md:py-3 font-bold text-2xl md:text-4xl shadow-2xl hover:scale-105 transition-transform cursor-crosshair border border-indigo-400">
                    DESIGN
                </div>

                {/* Masonry Layout Container */}
                {/* Simple columns wrapper for masonry */}
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-0 space-y-0 w-full hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    {masonryImages.map((src, i) => (
                        <div key={i} className="relative group overflow-hidden break-inside-avoid bg-black p-[1px]">
                            <Image
                                src={src}
                                alt={`Project ${i}`}
                                width={500}
                                height={i % 3 === 0 ? 600 : i % 2 === 0 ? 400 : 300} // Masonry varied heights
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.03] filter brightness-90 group-hover:brightness-110"
                                unoptimized
                            />
                            {/* Subtle vignette on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div >
    );
}
