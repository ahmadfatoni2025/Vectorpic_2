"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative w-full bg-white pt-16 sm:pt-20 overflow-hidden">
            {/* Background Large Text Watermark */}
            <div className="absolute -bottom-10 left-0 w-full select-none pointer-events-none opacity-[25%] overflow-hidden">
                <h2 className="text-[20vw] sm:text-[28vw] font-black text-black leading-none translate-y-1/4">VECTORPIC</h2>
            </div>

            <div className="w-full relative z-10">
                <div className="flex flex-col lg:flex-row gap-0 border-t border-gray-100 min-h-[400px] sm:min-h-[500px]">

                    {/* Left Panel: Blue Gradient */}
                    <div className="w-full lg:w-[40%] bg-linear-to-br from-[#1E40AF] to-[#3B82F6] p-8 sm:p-12 md:p-20 flex flex-col justify-between text-white relative">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                                    <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-white/20 rounded-sm rotate-12"></div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm -rotate-12"></div>
                                </div>
                                <span className="text-2xl sm:text-3xl font-black tracking-tighter">VECTORPIC</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] mb-4 max-w-sm tracking-tighter mt-6 sm:mt-8">
                                {t("Digital Art", "Seni Digital")} <br /> {t("Meets Tech Perfection.", "Bertemu Kesempurnaan Teknologi.")}
                            </h3>
                        </div>

                        <div className="mt-12 sm:mt-20">
                            <span className="text-[10px] sm:text-xs font-medium text-white/60 mb-4 sm:mb-6 block italic uppercase tracking-widest">
                                {t("Connect with Us", "Terhubung dengan Kami")}
                            </span>
                            <div className="flex items-center gap-3 sm:gap-4">
                                {[
                                    { name: 'Discord', icon: <path d="M15.312 11.233c-.767 0-1.38.74-1.38 1.623s.631 1.623 1.38 1.623a1.51 1.51 0 0 0 1.38-1.623c-.001-.884-.613-1.623-1.38-1.623zM8.688 11.233c-.767 0-1.38.74-1.38 1.623s.631 1.623 1.38 1.623a1.51 1.51 0 0 0 1.38-1.623c-.001-.884-.613-1.623-1.38-1.623zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" /> },
                                    { name: 'Twitter', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                                    { name: 'LinkedIn', icon: <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a2.7 2.7 0 0 0-5.4 0v5.3h-3v-9h3v1.1c.8-1.2 2.3-1.4 3.3-1.4 3 0 5.1 2.2 5.1 5.1v4.2zM6.5 7.7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 18.5v-9H5v9z" /> },
                                    { name: 'GitHub', icon: <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.63-.33 2.47-.33.83 0 1.68.11 2.47.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /> },
                                ].map((social) => (
                                    <Link key={social.name} href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all hover:scale-110 active:scale-95">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                                            {social.icon}
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Light Content */}
                    <div className="flex-1 bg-gray-50/50 p-8 sm:p-12 md:p-20 flex flex-col justify-between relative overflow-hidden">

                        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-20 lg:gap-32">
                            <div className="flex flex-col gap-6 sm:gap-8">
                                <span className="text-[10px] sm:text-[11px] font-black text-gray-300 uppercase tracking-widest italic">{t("Navigation", "Navigasi")}</span>
                                <div className="flex flex-col gap-3 sm:gap-4 font-black text-[#111] text-sm sm:text-base">
                                    <Link href="/" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Home", "Beranda")}</Link>
                                    <Link href="/showcase" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Showcase", "Galeri")}</Link>
                                    <Link href="/management" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Leadership", "Kepemimpinan")}</Link>
                                    <Link href="/about" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("About Us", "Tentang Kami")}</Link>
                                    <Link href="/contact" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Contact", "Kontak")}</Link>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 sm:gap-8">
                                <span className="text-[10px] sm:text-[11px] font-black text-gray-300 uppercase tracking-widest italic">{t("Company", "Perusahaan")}</span>
                                <div className="flex flex-col gap-3 sm:gap-4 font-black text-[#111] text-sm sm:text-base">
                                    <Link href="/company/mission" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Our Mission", "Misi Kami")}</Link>
                                    <Link href="/company/team" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Creative Team", "Tim Kreatif")}</Link>
                                    <Link href="/company/careers" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Global Careers", "Karir Global")}</Link>
                                    <Link href="/company/privacy" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Privacy Policy", "Kebijakan Privasi")}</Link>
                                    <Link href="/company/terms" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">{t("Terms & Condition", "Syarat & Ketentuan")}</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
