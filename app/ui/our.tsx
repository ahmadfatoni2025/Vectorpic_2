"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export function OurDesign() {
    const { t } = useLanguage();

    const advantages = [
        {
            title: t("Visual Identity", "Identitas Visual"),
            desc: t(
                "A bespoke creative suite designed to achieve unparalleled aesthetic perfection for modern brands.",
                "Rangkaian kreatif yang dirancang untuk mencapai kesempurnaan estetika bagi merek modern."
            ),
            media: "https://cdn.dribbble.com/userupload/47124760/file/50bfef1d96f832785708aebfa71627dc.mp4",
            type: "video"
        },
        {
            title: t("Strategic Assets", "Aset Strategis"),
            desc: t(
                "High-performance asset systems that tackle routine branding tasks, allowing you to focus on core growth.",
                "Sistem aset berperforma tinggi yang menangani tugas branding rutin, membuat Anda fokus pada pertumbuhan."
            ),
            media: "https://cdn.dribbble.com/uploads/67234/original/237b6de01a45c98571b102df8218d03e.mp4?1765339677",
            type: "video"
        },
        {
            title: t("Global Delivery", "Pengiriman Global"),
            desc: t(
                "Sophisticated handling of complex project lifecycles through extensive creative research and retrieval.",
                "Penanganan siklus proyek kompleks yang canggih melalui riset kreatif dan penyampaian yang mendalam."
            ),
            media: "https://cdn.dribbble.com/userupload/45688590/file/cf070e74c379030ab61645fea227459d.mp4",
            type: "video"
        }
    ];

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8 mb-10 sm:mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#111] mb-6 sm:mb-8 leading-tight tracking-tight">
                            {t(
                                "Why professional creators choose Vectorpic Excellence",
                                "Mengapa kreator profesional memilih Vectorpic Excellence"
                            )}
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
                            {t(
                                "Vectorpic streamlines branding workflows by offering tools for visual parallelization, strategic customization, and efficient asset management.",
                                "Vectorpic menyederhanakan alur kerja branding dengan alat untuk paralelisasi visual, kustomisasi strategis, dan manajemen aset yang efisien."
                            )}
                        </p>
                    </div>
                    <Link
                        href="/showcase"
                        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-200 text-xs sm:text-sm font-medium text-black hover:bg-gray-50 transition-all active:scale-95 whitespace-nowrap"
                    >
                        {t("Explore Portfolio", "Jelajahi Portfolio")}
                    </Link>
                </div>

                {/* 3 Column Grid with Video/Image/GIF Support */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {advantages.map((item, idx) => (
                        <div key={idx} className="flex flex-col group">
                            {/* Media Container */}
                            <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-3xl mb-4 sm:mb-6 overflow-hidden">
                                <div className="flex items-center justify-center">
                                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-black">
                                        {item.type === 'video' ? (
                                            <video
                                                src={item.media}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover transform transition-transform duration-700"
                                            />
                                        ) : (
                                            <Image
                                                src={item.media}
                                                alt={item.title}
                                                fill
                                                className="object-cover transform transition-transform duration-700"
                                            />
                                        )}

                                        {/* UI Elements Deco */}
                                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-1.5 opacity-40">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40"></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/20"></div>
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/10"></div>
                                        </div>

                                        {/* Play Indicator for video */}
                                        {item.type === 'video' && (
                                            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-[7px] sm:text-[8px] font-black text-white/40 uppercase tracking-widest backdrop-blur-md px-2 py-1 rounded bg-black/20">
                                                Live Flow
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Soft Gradient Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-gray-50/80 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[280px]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default OurDesign;