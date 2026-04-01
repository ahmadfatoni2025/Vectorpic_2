"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '../ui/ScrollReveal';

export function OurDesign() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [advantages, setAdvantages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOurDesigns() {
            try {
                const response = await fetch("/api/our-designs");
                const data = await response.json();
                if (data && data.length > 0) {
                    const mappedDesigns = data.map((d: any) => {
                        const videoId = d.youtubeUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
                        return {
                            title: d.title,
                            desc: d.description,
                            media: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null,
                            youtubeUrl: d.youtubeUrl,
                            videoId: videoId,
                            type: 'youtube',
                            tag: d.tag || 'Design'
                        };
                    });
                    setAdvantages(mappedDesigns);
                } else {
                    setAdvantages([]);
                }
            } catch (error) {
                console.error("Failed to fetch our designs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOurDesigns();
    }, []);


    // Check scroll position for navigation buttons
    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons();
            return () => container.removeEventListener('scroll', checkScrollButtons);
        }
    }, [loading]);

    if (loading) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Drag to scroll handlers for desktop
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.preventDefault();
        const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8 mb-8 sm:mb-10">

                    <div className="max-w-2xl">
                        {/* Judul dengan animasi reveal */}
                        <ScrollReveal
                            containerClassName="mb-1"
                            textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#111] leading-tight tracking-tight"
                        >
                            Why professional creators choose Vectorpic Excellence
                        </ScrollReveal>

                        {/* Paragraf dengan animasi reveal terpisah */}
                        <ScrollReveal
                            containerClassName="mb-4 sm:mb-6"
                            textClassName="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg"
                        >
                            Vectorpic streamlines branding workflows by offering tools for visual parallelization, strategic customization, and efficient asset management.
                        </ScrollReveal>
                    </div>

                    <Link
                        href="/showcase"
                        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-200 text-xs sm:text-sm font-medium text-black hover:bg-gray-50 transition-all active:scale-95 whitespace-nowrap"
                    >
                        Explore Portfolio
                    </Link>
                </div>

                {/* Navigation Buttons - Desktop Only */}
                <div className="hidden lg:flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium bg-gray-50 border border-gray-100 px-4 py-2 rounded-full shadow-sm animate-pulse cursor-default select-none transition-all duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <path d="M18 8L22 12L18 16" />
                            <path d="M6 8L2 12L6 16" />
                            <path d="M2 12H22" />
                        </svg>
                        <span>Drag or use arrows to navigate</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full border transition-all ${canScrollLeft
                                ? 'border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 cursor-pointer'
                                : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                            aria-label="Scroll left"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full border transition-all ${canScrollRight
                                ? 'border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 cursor-pointer'
                                : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                            aria-label="Scroll right"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className={`overflow-x-auto scroll-smooth hide-scrollbar select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Horizontal Scroll Layout */}
                    <div className="flex gap-6 sm:gap-8 min-w-max pb-4">
                        {advantages.map((item, idx) => (
                            <div
                                key={idx}
                                className="shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[380px]"
                            >
                                <div className="flex flex-col group h-full">
                                    {/* Media Container */}
                                    <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl mb-4 sm:mb-5 overflow-hidden bg-gray-900 group-hover:shadow-2xl transition-all duration-500">
                                         <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                                             {item.media ? (
                                                 <Image
                                                     src={item.media}
                                                     alt={item.title}
                                                     fill
                                                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                 />
                                             ) : (
                                                 <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                         <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                                         <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                                     </svg>
                                                 </div>
                                             )}

                                             {/* YouTube Play Icon Overlay */}
                                             <div className="absolute inset-0 flex items-center justify-center">
                                                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 ring-1 ring-white/30 shadow-2xl">
                                                     <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                                                     <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                                                 </div>
                                             </div>

                                             {/* Tag Badge */}
                                             <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                                                 <span className="px-3 py-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/80 backdrop-blur-md rounded-full tracking-tight border border-white/10">
                                                     {item.tag}
                                                 </span>
                                             </div>

                                             {/* Link Overlay */}
                                             <a 
                                                 href={item.youtubeUrl} 
                                                 target="_blank" 
                                                 rel="noopener noreferrer" 
                                                 className="absolute inset-0 z-20"
                                                 aria-label={`Watch ${item.title} on YouTube`}
                                             />

                                             {/* Bottom Decorative Edge */}
                                             <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
                                         </div>
                                     </div>


                                    {/* Text Content */}
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#04cce7] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator - Mobile Only */}
                <div className="lg:hidden flex flex-col items-center justify-center mt-6 gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 animate-pulse transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <path d="M18 8L22 12L18 16" />
                            <path d="M6 8L2 12L6 16" />
                            <path d="M2 12H22" />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                            Swipe to explore
                        </span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                        {advantages.map((_, idx) => (
                            <div
                                key={idx}
                                className="h-1 rounded-full bg-gray-200 transition-all duration-300"
                                style={{ width: '6px' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}

export default OurDesign;