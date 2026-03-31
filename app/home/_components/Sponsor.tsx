"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function Sponsor() {
    const [sponsors, setSponsors] = useState<{ name: string, logo: string }[]>([]);

    useEffect(() => {
        async function fetchSponsors() {
            try {
                const response = await fetch("/api/sponsors");
                const data = await response.json();
                setSponsors(data);
            } catch (error) {
                console.error("Failed to fetch sponsors:", error);
            }
        }
        fetchSponsors();
    }, []);

    return (
        <div className="w-full relative -mt-24 sm:-mt-32 md:-mt-48 lg:-mt-56 flex flex-col items-center justify-center px-4 sm:px-6 py-10 md:py-16 z-20">
            <h4 className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 text-center mb-6 sm:mb-8 md:mb-10 max-w-[260px] sm:max-w-[280px] md:max-w-sm leading-relaxed">
                Trusted by 1000+ agencies growing fast without hiring full-time designers
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 max-w-6xl mx-auto px-4">
                {sponsors.map((sponsor) => (
                    <div key={sponsor.name} className="relative w-16 h-5 sm:w-20 sm:h-6 md:w-28 md:h-8 lg:w-32 lg:h-10 flex items-center justify-center group">
                        <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain transition-transform group-hover:scale-110 brightness-200"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
