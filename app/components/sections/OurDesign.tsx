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
        async function fetchVectors() {
            try {
                const response = await fetch("/api/vectors");
                const data = await response.json();
                if (data && data.length > 0) {
                    const mappedVectors = data.map((v: any) => ({
                        title: v.title,
                        desc: v.description,
                        media: v.thumbnailUrl || v.imageUrl,
                        type: 'image',
                        tag: v.category?.name || 'Vector'
                    }));
                    setAdvantages(mappedVectors);
                } else {
                    // Fallback to minimal placeholder if DB is truly empty, 
                    // but we should ideally have data.
                    setAdvantages([]);
                }
            } catch (error) {
                console.error("Failed to fetch vectors:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchVectors();
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
                                    <div className="relative w-full aspect-16/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 overflow-hidden bg-gray-900">
                                        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                                            {item.type === 'video' ? (
                                                <video
                                                    src={item.media}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <Image
                                                    src={item.media}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}

                                            {/* Tag Badge */}
                                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                                                <span className="px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white bg-black/60 backdrop-blur-sm rounded-full">
                                                    {item.tag}
                                                </span>
                                            </div>

                                            {/* UI Elements Deco */}
                                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1.5 opacity-50 z-10">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60"></div>
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40"></div>
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/20"></div>
                                            </div>

                                            {/* Play Indicator for video */}
                                            {item.type === 'video' && (
                                                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                                                    <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-medium text-white/70 uppercase tracking-wider backdrop-blur-md px-2 py-1 rounded-full bg-black/40">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                                            <path d="M5 3l14 9-14 9V3z" />
                                                        </svg>
                                                        <span>Demo</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Gradient Overlay on Hover */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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