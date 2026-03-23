"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function Announcement() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative w-full overflow-hidden bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 text-white z-[110]"
                >
                    <div className="max-w-7xl mx-auto px-4 py-1.5 sm:px-6 flex items-center justify-center gap-4 text-center">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 animate-pulse">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                </svg>
                            </span>
                            <span className="opacity-90">
                                {t("Flash Sale:", "Promo Kilat:")}
                            </span>
                            <Link href="/contact" className="hover:underline decoration-purple-300 underline-offset-4 decoration-2">
                                {t(
                                    "Get 35% OFF on all Vectorpic design services. Limited time offer!",
                                    "Diskon 35% untuk semua jasa desain Vectorpic. Penawaran terbatas!"
                                )}
                            </Link>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-2 sm:right-6 p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-shimmer pointer-events-none"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
