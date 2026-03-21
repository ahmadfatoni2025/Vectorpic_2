"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export function Sponsor() {
    const { t } = useLanguage();
    
    const sponsors = [
        { name: "Airbnb", logo: "/Airbnb.png" },
        { name: "Stripe", logo: "/Stripe.png" },
        { name: "Google", logo: "/Google.png" },
        { name: "Amazon", logo: "/Amazon.webp" },
        { name: "Meta", logo: "/Meta.png" },
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6">
            <h4 className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 text-center mb-8 sm:mb-10 md:mb-16 max-w-[260px] sm:max-w-[280px] md:max-w-sm leading-relaxed">
                {t(
                    "Trusted by 1000+ agencies growing fast without hiring full-time designers",
                    "Dipercaya oleh 1000+ agensi yang berkembang pesat tanpa merekrut desainer penuh waktu"
                )}
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 max-w-5xl mx-auto px-4">
                {sponsors.map((sponsor) => (
                    <div key={sponsor.name} className="relative w-16 h-5 sm:w-20 sm:h-6 md:w-28 md:h-8 lg:w-32 lg:h-10 flex items-center justify-center group">
                        <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain transition-transform group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
