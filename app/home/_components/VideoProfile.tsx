"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoProfile() {
    const [contentData, setContentData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIdx, setActiveIdx] = useState(0);
    const [prevIdx, setPrevIdx] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = right, -1 = left
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/video-profiles");
                const data = await response.json();
                setContentData(data);
            } catch (error) {
                console.error("Failed to fetch video profiles:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleTabClick = (idx: number) => {
        if (idx === activeIdx) return;
        setDirection(idx > activeIdx ? 1 : -1);
        setPrevIdx(activeIdx);
        setActiveIdx(idx);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        })
    };

    if (loading) {
        return (
            <div className="w-full bg-[#F8F9FA] py-24 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading amazing designs...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full bg-[#F8F9FA] py-12 sm:py-16 md:py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <div className="max-w-3xl mb-8 sm:mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight tracking-tighter mb-3 sm:mb-4"
                    >
                        Design solutions for every business
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg"
                    >
                        From startups to established brands, we provide tailored design support for your specific needs.
                    </motion.p>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-100 mb-8 sm:mb-12">
                    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 pb-3">
                        {contentData.map((item, idx) => (
                            <button
                                key={`tab-${idx}`}
                                onClick={() => handleTabClick(idx)}
                                className={`text-[10px] sm:text-xs md:text-sm font-bold transition-all relative whitespace-nowrap uppercase tracking-wider ${activeIdx === idx ? "text-[#4F46E5]" : "text-gray-400 hover:text-black"
                                    }`}
                            >
                                {item.tab}
                                {activeIdx === idx && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#4F46E5] rounded-t-full z-10"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slider */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        {contentData.length > 0 && contentData[activeIdx] && (
                            <motion.div
                                key={activeIdx}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.8 },
                                    opacity: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.8 },
                                }}
                                className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center select-none"
                            >
                                {/* Left Column - Video Thumbnail Card */}
                                <div
                                    className={`relative group cursor-pointer aspect-video md:aspect-4/3 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden ${contentData[activeIdx].bgColor} flex items-center justify-center transition-colors duration-700`}
                                    onClick={() => setShowVideo(true)}
                                >
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10 z-10">
                                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
                                            Vectorpic is <span className="bg-black/80 px-1.5 sm:px-2 py-0.5 rounded-md">{contentData[activeIdx].highlight}</span> <br />
                                            {contentData[activeIdx].subtext}
                                        </h3>
                                    </div>

                                    <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden">
                                        <div className="relative w-full h-full">
                                            {contentData[activeIdx].image && (
                                                <Image
                                                    src={contentData[activeIdx].image}
                                                    alt="Profile"
                                                    fill
                                                    draggable={false}
                                                    className="object-cover grayscale mix-blend-overlay opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                                                />
                                            )}
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
                                        <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#1A1A1A] leading-[1.3] tracking-tight pr-4">
                                            &ldquo;{contentData[activeIdx].quote}&rdquo;
                                        </blockquote>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm sm:text-base md:text-lg font-black text-black tracking-tight">{contentData[activeIdx].author}</span>
                                        <span className="text-gray-500 text-xs sm:text-sm font-medium">{contentData[activeIdx].role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Video Player Modal */}
                <AnimatePresence>
                    {showVideo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                        >
                            <div
                                className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                                onClick={() => setShowVideo(false)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full max-w-5xl aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <button
                                    onClick={() => setShowVideo(false)}
                                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>
                                {contentData[activeIdx].videoId && (contentData[activeIdx].videoId.includes('.mp4') ? (
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
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default VideoProfile;
