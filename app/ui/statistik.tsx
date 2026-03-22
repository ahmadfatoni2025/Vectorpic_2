"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

// --- Types ---
export interface StatsItem {
    type: 'testimonial' | 'testimonial-short' | 'metric' | 'large-metric' | 'feature';
    content?: string;
    author?: string;
    role?: string;
    avatar?: string;
    value?: string;
    label?: string;
    desc?: string;
    gradient?: string;
    gridSpan: string;
    video?: string;
    image?: string;
    title?: string;
    bgColor?: string;
    textColor?: string;
}

// --- Constants ---
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 350;
const DEFAULT_GLOW_COLOR = '0, 112, 243'; // Blue glow for light mode
const MOBILE_BREAKPOINT = 768;

// --- Helper Functions ---
const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 0.6);
    box-shadow: 0 0 4px rgba(${color}, 0.3);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.4,
    fadeDistance: radius * 0.6
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', (glow * 0.15).toString()); // Subtle intensity for light mode
    card.style.setProperty('--glow-radius', `${radius}px`);
};

// --- Sub-components ---

const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}> = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = true,
    enableMagnetism = true
}) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement[]>([]);
        const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
        const isHoveredRef = useRef(false);
        const memoizedParticles = useRef<HTMLDivElement[]>([]);
        const particlesInitialized = useRef(false);
        const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

        const initializeParticles = useCallback(() => {
            if (particlesInitialized.current || !cardRef.current) return;
            const { width, height } = cardRef.current.getBoundingClientRect();
            memoizedParticles.current = Array.from({ length: particleCount }, () =>
                createParticleElement(Math.random() * width, Math.random() * height, glowColor)
            );
            particlesInitialized.current = true;
        }, [particleCount, glowColor]);

        const clearAllParticles = useCallback(() => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            magnetismAnimationRef.current?.kill();
            particlesRef.current.forEach(particle => {
                gsap.to(particle, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => { particle.parentNode?.removeChild(particle); } });
            });
            particlesRef.current = [];
        }, []);

        const animateParticles = useCallback(() => {
            if (!cardRef.current || !isHoveredRef.current) return;
            if (!particlesInitialized.current) initializeParticles();
            memoizedParticles.current.forEach((particle, index) => {
                const timeoutId = setTimeout(() => {
                    if (!isHoveredRef.current || !cardRef.current) return;
                    const clone = particle.cloneNode(true) as HTMLDivElement;
                    cardRef.current.appendChild(clone);
                    particlesRef.current.push(clone);
                    gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
                    gsap.to(clone, {
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 60,
                        duration: 3 + Math.random() * 2,
                        ease: 'power1.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }, index * 150);
                timeoutsRef.current.push(timeoutId);
            });
        }, [initializeParticles]);

        useEffect(() => {
            if (disableAnimations || !cardRef.current) return;
            const element = cardRef.current;
            const handleMouseEnter = () => { isHoveredRef.current = true; animateParticles(); };
            const handleMouseLeave = () => {
                isHoveredRef.current = false;
                clearAllParticles();
                gsap.to(element, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.4 });
            };
            const handleMouseMove = (e: MouseEvent) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if (enableTilt) {
                    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
                    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
                    gsap.to(element, { rotateX, rotateY, duration: 0.2, transformPerspective: 1000 });
                }
                if (enableMagnetism) {
                    const magnetX = (x - rect.width / 2) * 0.03;
                    const magnetY = (y - rect.height / 2) * 0.03;
                    magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.3 });
                }
            };
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
            return () => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mousemove', handleMouseMove);
                clearAllParticles();
            };
        }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism]);

        return (
            <div ref={cardRef} className={`${className} relative overflow-hidden`} style={style}>{children}</div>
        );
    };

const GlobalSpotlight: React.FC<{
    gridRef: React.RefObject<HTMLDivElement | null>;
    disableAnimations?: boolean;
}> = ({ gridRef, disableAnimations = false }) => {
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (disableAnimations || !gridRef?.current) return;
        const spotlight = document.createElement('div');
        spotlight.style.cssText = `position: fixed; width: 600px; height: 600px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR}, 0.08) 0%, transparent 70%); z-index: 200; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: multiply;`;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;
        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current || !gridRef.current) return;
            const section = gridRef.current.closest('.bento-section');
            const rect = section?.getBoundingClientRect();
            if (!rect || e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
                gridRef.current.querySelectorAll('.magic-card').forEach(c => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
                return;
            }
            const cards = gridRef.current.querySelectorAll('.magic-card');
            cards.forEach(card => {
                const cardRect = (card as HTMLElement).getBoundingClientRect();
                const d = Math.hypot(e.clientX - (cardRect.left + cardRect.width / 2), e.clientY - (cardRect.top + cardRect.height / 2)) - Math.max(cardRect.width, cardRect.height) / 2;
                const glow = d < 150 ? 1 : d < 250 ? (250 - d) / 100 : 0;
                updateCardGlowProperties(card as HTMLElement, e.clientX, e.clientY, glow, DEFAULT_SPOTLIGHT_RADIUS);
            });
            gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, opacity: 1, duration: 0.2 });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (spotlightRef.current) spotlightRef.current.remove();
        };
    }, [gridRef, disableAnimations]);
    return null;
};

// --- Main Components ---

export default function Statistik() {
    const { t } = useLanguage();
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT;

    // Mapping items to the image layout:
    // Left: [Large Top] [Small Bottom L] [Small Bottom R]
    // Right: [Tall Item]
    const stats: StatsItem[] = [
        {
            type: 'testimonial',
            content: t(
                "FOR EVERYONE BUT NOT ANYONE",
                "UNTUK SEMUA TAPI BUKAN SIAPA SAJA"
            ),
            desc: t(
                "We establish personal relationships with our boutiques, to make sure each is vetted for a stress-free shopping experience",
                "Kami menjalin hubungan pribadi dengan butik kami, untuk memastikan masing-masing diperiksa untuk pengalaman berbelanja tanpa stres"
            ),
            gridSpan: "col-span-12 md:col-span-7 row-span-1",
            bgColor: "#dbdbd6",
            textColor: "#000"
        },
        {
            type: 'large-metric',
            title: "#RIP STOP",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
            gridSpan: "col-span-12 md:col-span-3.5", // Half of 7
            bgColor: "#9ea49d"
        },
        {
            type: 'large-metric',
            title: "#INSULATED",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
            gridSpan: "col-span-12 md:col-span-3.5", // Half of 7
            bgColor: "#5b6b61"
        },
        {
            type: 'feature',
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            gridSpan: "col-span-12 md:col-span-5 row-span-2",
            bgColor: "#e2e2dd"
        }
    ];

    // More items can be added below or modified to fit the grid
    const remainingStats = [
        {
            type: 'metric',
            value: "98%",
            label: t("Customer Satisfaction", "Kepuasan Pelanggan"),
            gridSpan: "col-span-12 md:col-span-3",
            bgColor: "#fff"
        },
        {
            type: 'metric',
            value: "50,000+",
            label: t("Assets Delivered", "Aset Terkirim"),
            gridSpan: "col-span-12 md:col-span-3",
            bgColor: "#f0f0f0"
        }
    ];

    return (
        <section className="bg-white py-10 sm:py-16 px-4">
            <style>
                {`
                .bento-section {
                    --glow-x: 50%;
                    --glow-y: 50%;
                    --glow-intensity: 0;
                    --glow-radius: 400px;
                }
                .floating-pill {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
                    50% { transform: translateY(-10px) rotate(var(--tw-rotate, 0deg)); }
                }
                `}
            </style>

            <div className="max-w-6xl mx-auto bento-section">
                <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} />

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-14 gap-4 h-auto">

                    {/* Top Left - Character & Info Card */}
                    <ParticleCard
                        className="magic-card md:col-span-8 md:row-span-1 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 bg-linear-to-br from-blue-700 to-blue-500 overflow-visible relative group"
                    >
                        {/* Floating Labels */}
                        <div className="absolute top-1/4 left-8 bg-black/80 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest floating-pill z-30 shadow-2xl" style={{ "--tw-rotate": "-12deg" } as React.CSSProperties}>
                            {t("Receive", "Terima")}
                        </div>
                        <div className="absolute top-1/3 right-10 bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest floating-pill z-30 shadow-2xl" style={{ "--tw-rotate": "8deg" } as React.CSSProperties}>
                            {t("Send", "Kirim")}
                        </div>
                        <div className="absolute bottom-1/4 right-8 bg-[#111] text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest floating-pill z-30 shadow-2xl" style={{ "--tw-rotate": "-5deg" } as React.CSSProperties}>
                            {t("Save", "Simpan")}
                        </div>

                        {/* Character Video */}
                        <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-full z-20 overflow-hidden rounded-3xl">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <video
                                    src="/stats/sketboard.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                                />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-end text-white relative z-20">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] mb-8 tracking-tighter">
                                {t("Design", "Desain")} <span className="font-thin block opacity-80 leading-[0.8] italic">{t("doesn't", "tidak")}</span>
                                {t("have to", "harus")} <br />
                                <span className="text-[#111]">{t("be boring.", "membosankan.")}</span>
                            </h2>
                            <div className="flex flex-col gap-4 border-l-2 border-white/20 pl-6">
                                <p className="text-xs md:text-sm font-black opacity-90 leading-relaxed uppercase tracking-widest">
                                    {t("Do everything through the app,", "Lakukan segalanya melalui aplikasi,")} <br /> {t("with a few clicks.", "dengan beberapa klik.")}
                                </p>
                                <span className="text-[10px] opacity-60 font-medium uppercase tracking-widest">{t("Refining the Digital Experience", "Menyempurnakan Pengalaman Digital")}</span>
                            </div>
                        </div>
                    </ParticleCard>

                    {/* Right Column - Secondary Info */}
                    <ParticleCard
                        className="magic-card md:col-span-6 md:row-span-2 rounded-4xl relative group flex flex-col p-10 justify-between items-start border border-gray-200"
                    >
                        <div className="w-full">

                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-black">
                                {t("Speed &", "Kecepatan &")} <br />
                                <span className="text-blue-600">{t("Security", "Keamanan")}</span> <br />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-300 mt-2 block">{t("you can Trust", "yang Anda Percayai")}</span>
                            </h3>

                            <p className="text-sm font-medium text-gray-400 max-w-[220px] leading-relaxed">
                                {t("Manage everything right from your dashboard and keep assets where they belong.", "Kelola segalanya langsung dari dasbor Anda dan jaga aset tetap berada di tempatnya.")}
                            </p>
                        </div>

                        <div className="mt-auto w-full flex justify-center py-2 overflow-hidden">
                            {/* Video Showcase Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative w-full max-w-[420px] aspect-video border-b-2 border-gray-200 overflow-hidden"
                            >
                                <video
                                    src="/stats/basket.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-black">
                                    Live Preview
                                </div>
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-wrap gap-3 mt-10">
                            <button className="bg-[#111] hover:bg-black text-white rounded-2xl px-5 py-3 flex items-center gap-3 transition-all hover:scale-105 group border border-white/5">
                                <div className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.63-.33 2.47-.33.83 0 1.68.11 2.47.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] font-medium opacity-50 leading-none">Github</div>
                                    <div className="text-xs font-black tracking-tight">{t("Open Project", "Proyek Terbuka")}</div>
                                </div>
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-black border border-gray-200 rounded-2xl px-5 py-3 flex items-center gap-3 transition-all hover:scale-105 shadow-sm">
                                <div className="text-left">
                                    <div className="text-[10px] font-medium opacity-50 leading-none">{t("Join our", "Bergabunglah")}</div>
                                    <div className="text-xs font-black tracking-tight">Discord</div>
                                </div>
                                <div className="w-5 h-5 text-indigo-600">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.312 11.233c-.767 0-1.38.74-1.38 1.623s.631 1.623 1.38 1.623a1.51 1.51 0 0 0 1.38-1.623c-.001-.884-.613-1.623-1.38-1.623zM8.688 11.233c-.767 0-1.38.74-1.38 1.623s.631 1.623 1.38 1.623a1.51 1.51 0 0 0 1.38-1.623c-.001-.884-.613-1.623-1.38-1.623zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" /></svg>
                                </div>
                            </button>
                        </div>
                    </ParticleCard>

                    {/* Bottom Left Pieces */}
                    <ParticleCard
                        className="magic-card md:col-span-4 md:row-span-1 rounded-4xl bg-gray-50 flex flex-col p-8 justify-between h-[250px] md:h-auto border border-gray-100/50"
                    >
                        <h4 className="text-2xl font-black tracking-tighter leading-none mb-4 text-[#111]">
                            Global <br /> <span className="text-blue-600">Reach.</span>
                        </h4>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-relaxed italic">
                            {t("Total control in the app,", "Kontrol penuh dalam aplikasi,")} <br /> {t("with zero complexity.", "dengan nol kerumitan.")}
                        </p>
                        <div className="mt-auto flex -space-x-3 items-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                    <Image src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" width={40} height={40} />
                                </div>
                            ))}
                            <div className="ml-5 text-[10px] font-black text-blue-600 uppercase tracking-widest">+50K USERS</div>
                        </div>
                    </ParticleCard>

                    <ParticleCard
                        className="magic-card md:col-span-4 md:row-span-1 rounded-4xl bg-[#111] flex flex-col p-8 justify-end h-[250px] md:h-auto overflow-hidden relative group"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-colors"></div>
                        <h4 className="text-3xl font-black tracking-tighter leading-[0.85] mb-4 text-white">
                            {t("Your style,", "Gayamu,")} <br />
                            <span className="text-blue-500">{t("your way.", "caramu.")}</span>
                        </h4>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{t("Unlimited possibilities.", "Kemungkinan tanpa batas.")}</p>
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full transform group-hover:scale-125 transition-transform duration-700"></div>
                    </ParticleCard>

                </div>
            </div>
        </section>
    );
}
