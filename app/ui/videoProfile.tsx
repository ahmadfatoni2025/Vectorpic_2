"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export function VideoProfile() {
    const contentData = [
        {
            tab: "Vector Illustration",
            highlight: "charming,",
            subtext: "clean, and modern.",
            quote: "Vectorpic made our landing page stand out with charming characters and a perfectly balanced color palette.",
            author: "Alex Rivera",
            role: "Product Manager @ TechFlow",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
            videoId: "https://framerusercontent.com/assets/Kny5Ty8J6mn9PsM1TGpXsWNtNh4.mp4",
            bgColor: "bg-[#6366F1]"
        },
        {
            tab: "Brand Identity",
            highlight: "unique,",
            subtext: "bold, and iconic.",
            quote: "Their retro-modern aesthetic gave our brand a unique voice in a crowded market. Truly world-class design work.",
            author: "Sarah Jenkins",
            role: "Creative Director @ RetroWave",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
            videoId: "29_u9_0Vv08",
            bgColor: "bg-[#8B5CF6]"
        },
        {
            tab: "Social Content",
            highlight: "playful,",
            subtext: "vibrant, and engaging.",
            quote: "Our engagement skyrocketed after switching to Vectorpic's playful illustrations for our daily social media assets.",
            author: "David Chen",
            role: "Founder @ SocialPulse",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            videoId: "dQw4w9WgXcQ",
            bgColor: "bg-[#EC4899]"
        },
        {
            tab: "Character Design",
            highlight: "whimsical,",
            subtext: "layered, and alive.",
            quote: "The whimsy and personality in their characters are unmatched. They bring a soul to every project they touch.",
            author: "Emily Watson",
            role: "Head of Art @ GameSprint",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            videoId: "29_u9_0Vv08",
            bgColor: "bg-[#10B981]"
        },
        {
            tab: "Print & Merch",
            highlight: "crisp,",
            subtext: "scalable, and precise.",
            quote: "Clean lines and perfect color palettes. Every file is production-ready and looks stunning on any physical medium.",
            author: "Marcus Thorne",
            role: "Owner @ MerchKing",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            videoId: "dQw4w9WgXcQ",
            bgColor: "bg-[#F59E0B]"
        }
    ];

    const [activeIdx, setActiveIdx] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scrollToSlide = (index: number) => {
        if (scrollRef.current) {
            const slideWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            setActiveIdx(index);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
            if (index !== activeIdx) setActiveIdx(index);
        }
    };

    return (
        <section className="w-full bg-[#F8F9FA] py-12 sm:py-16 md:py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <div className="max-w-3xl mb-8 sm:mb-10">
                    <ScrollReveal
                        containerClassName="mb-3 sm:mb-4"
                        textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight tracking-tighter"
                    >
                        Design solutions for every business
                    </ScrollReveal>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                        From startups to established brands, we provide tailored design support for your specific needs.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-100 mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
                    <div className="flex gap-4 sm:gap-6 md:gap-10 min-w-max pb-3">
                        {contentData.map((item, idx) => (
                            <button
                                key={item.tab}
                                onClick={() => scrollToSlide(idx)}
                                className={`text-[10px] sm:text-xs md:text-sm font-bold transition-all relative whitespace-nowrap uppercase tracking-wider ${activeIdx === idx ? "text-[#4F46E5]" : "text-gray-400 hover:text-black"
                                    }`}
                            >
                                {item.tab}
                                {activeIdx === idx && (
                                    <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#4F46E5] rounded-t-full transition-all" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {contentData.map((content, idx) => (
                            <div key={idx} className="w-full h-full shrink-0 snap-center grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center pr-4 select-none">
                                {/* Left Column - Video Thumbnail Card */}
                                <div
                                    className={`relative group cursor-pointer aspect-video md:aspect-4/3 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden ${content.bgColor} flex items-center justify-center transition-colors duration-700`}
                                    onClick={() => setShowVideo(true)}
                                >
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10 z-10">
                                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
                                            Vectorpic is <span className="bg-black/80 px-1.5 sm:px-2 py-0.5 rounded-md">{content.highlight}</span> <br />
                                            {content.subtext}
                                        </h3>
                                    </div>

                                    <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={content.image}
                                                alt="Profile"
                                                fill
                                                draggable={false}
                                                className="object-cover grayscale mix-blend-overlay opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                                        <div className="w-0 h-0 border-t-[5px] sm:border-t-[6px] md:border-t-8 border-t-transparent border-l-10 sm:border-l-12 md:border-l-16 border-l-[#4F46E5] border-b-[5px] sm:border-b-[6px] md:border-b-8 border-b-transparent ml-1 sm:ml-1.5 md:ml-2"></div>
                                    </div>

                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-white/20 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 rounded-full text-[7px] sm:text-[8px] md:text-[10px] uppercase font-black tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        Watch Tutorial
                                    </div>
                                </div>

                                {/* Right Column - Testimonial */}
                                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 overflow-visible pr-4">
                                    <div className="relative">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gray-100 absolute -top-6 sm:-top-8 -left-2 sm:-left-4 z-0 sm:w-10 sm:h-10">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C12.9124 21 12.017 20.1046 12.017 19V18C12.017 15.2386 14.2556 13 17.017 13V13C17.017 10.2386 14.7784 8 12.017 8H12.017C10.9124 8 10.017 7.10457 10.017 6V4L10.017 1V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>

                                        <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#1A1A1A] leading-[1.3] tracking-tight pr-4">
                                            &ldquo;{content.quote}&rdquo;
                                        </blockquote>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm sm:text-base md:text-lg font-black text-black tracking-tight">{content.author}</span>
                                        <span className="text-gray-500 text-xs sm:text-sm font-medium">{content.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Player Modal */}
                {showVideo && (
                    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-10 transition-opacity animate-in fade-in duration-300">
                        <div
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            onClick={() => setShowVideo(false)}
                        />
                        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl scale-95 animate-in zoom-in-95 duration-300">
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                            {contentData[activeIdx].videoId.includes('.mp4') ? (
                                <video
                                    src={contentData[activeIdx].videoId}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                />
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${contentData[activeIdx].videoId}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default VideoProfile;
