"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Statistik() {
    const { t } = useLanguage();

    const stats = [
        {
            type: 'testimonial',
            content: t(
                "Vectorpic has completely transformed how we handle our brand assets. The quality of their SVG generation is unparalleled in the industry.",
                "Vectorpic telah sepenuhnya mengubah cara kami mengelola aset brand kami. Kualitas pembuatan SVG mereka tak tertandingi di industri ini."
            ),
            author: "Sarah Jenkins",
            role: "Design Director @ CreativeFlow",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            gridSpan: "col-span-12 md:col-span-5",
            video: "https://framerusercontent.com/assets/Kny5Ty8J6mn9PsM1TGpXsWNtNh4.mp4" // Subtle design video
        },
        {
            type: 'metric',
            value: "98%",
            label: t("Customer Satisfaction", "Kepuasan Pelanggan"),
            desc: t("Based on 5,000+ reviews", "Berdasarkan 5.000+ ulasan"),
            gradient: "from-blue-500 to-indigo-600",
            gridSpan: "col-span-12 md:col-span-3",
            video: "" // Static for metrics is usually better, but possible
        },
        {
            type: 'testimonial-short',
            content: t(
                "The fast turnaround and attention to detail are what keep us coming back. Best design partner ever!",
                "Waktu pengerjaan yang cepat dan perhatian pada detail adalah alasan kami terus kembali. Partner desain terbaik!"
            ),
            author: "Marcus Chen",
            role: "Founder of TechSphere",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            gridSpan: "col-span-12 md:col-span-4",
            video: "https://framerusercontent.com/assets/fX3f95u90W39R09S2W4m5m7s8E.mp4" // Abstract motion
        },
        {
            type: 'large-metric',
            value: "50,000+",
            label: t("Assets Delivered", "Aset Terkirim"),
            desc: t("Scaling brands with high-performance vector graphics globally.", "Mengembangkan brand dengan grafis vektor berperforma tinggi secara global."),
            gradient: "from-emerald-400 via-teal-500 to-blue-500",
            gridSpan: "col-span-12 md:col-span-4",
            video: ""
        },
        {
            type: 'testimonial',
            content: t(
                "Managing complex design systems became a breeze once we integrated Vectorpic's automated delivery flow.",
                "Mengelola sistem desain yang kompleks menjadi sangat mudah setelah kami mengintegrasikan alur pengiriman otomatis Vectorpic."
            ),
            author: "Elena Rodriguez",
            role: "Product Manager @ GlobalUX",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
            gridSpan: "col-span-12 md:col-span-4",
            video: "https://framerusercontent.com/assets/S8i6Y8s90R3Y09S2W4m5m7s8E.mp4" // Smooth color flow
        },
        {
            type: 'feature',
            title: t("Enterprise-Grade Speed", "Kecepatan Skala Enterprise"),
            desc: t(
                "We handle high-volume artistic requests with the precision of a small studio and the speed of a global engine.",
                "Kami menangani permintaan artistik bervolume tinggi dengan presisi studio kecil dan kecepatan mesin global."
            ),
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
            gridSpan: "col-span-12 md:col-span-4",
            video: "https://framerusercontent.com/assets/L5k6Y8s90R3Y09S2W4m5m7s8E.mp4" // Tech/Speed video
        }
    ];

    return (
        <section className=" py-16 sm:py-24 md:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight mb-4">
                        {t("Creators and Brands Love Us!", "Kreator dan Brand Mencintai Kami!")}
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base font-medium max-w-xl mx-auto">
                        {t(
                            "With over 50,000 assets served to thousands of businesses worldwide. Here's what they have to say.",
                            "Dengan lebih dari 50.000 aset yang dikirimkan ke ribuan bisnis di seluruh dunia. Inilah kata mereka."
                        )}
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6">
                    {stats.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`${item.gridSpan} bg-white rounded-[2rem] p-6 sm:p-8 flex flex-col relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group min-h-[220px] sm:min-h-[280px]`}
                        >
                            {/* Background Video/GIF Support */}
                            {item.video && (
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-opacity duration-700"
                                    >
                                        <source src={item.video} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/40 to-white/90"></div>
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col h-full uppercase-none">
                            {item.type === 'testimonial' && (
                                <>
                                    <div className="text-[#4F46E5] mb-6">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C12.9124 21 12.017 20.1046 12.017 19V18C12.017 15.2386 14.2556 13 17.017 13V13C17.017 10.2386 14.7784 8 12.017 8H12.017C10.9124 8 10.017 7.10457 10.017 6V4L10.017 1V1" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed mb-8 flex-1">
                                        &ldquo;{item.content}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <Image src={item.avatar!} alt={item.author!} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-black">{item.author}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.role}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {item.type === 'testimonial-short' && (
                                <>
                                    <div className="text-[#4F46E5] mb-4 opacity-40">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C12.9124 21 12.017 20.1046 12.017 19V18C12.017 15.2386 14.2556 13 17.017 13V13C17.017 10.2386 14.7784 8 12.017 8H12.017C10.9124 8 10.017 7.10457 10.017 6V4L10.017 1V1" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-800 text-sm font-medium leading-relaxed mb-6 flex-1">
                                        &ldquo;{item.content}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <Image src={item.avatar!} alt={item.author!} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-black">{item.author}</span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none mt-0.5">{item.role}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {item.type === 'metric' && (
                                <>
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.gradient} opacity-10 blur-3xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity whitespace-normal`}></div>
                                    <div className="mt-2">
                                        <span className={`text-5xl sm:text-6xl font-black bg-linear-to-br ${item.gradient} bg-clip-text text-transparent`}>
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex-1">
                                        <h4 className="text-base sm:text-lg font-black text-black leading-tight">{item.label}</h4>
                                        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">{item.desc}</p>
                                    </div>
                                    <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-transparent rounded-full mt-4"></div>
                                </>
                            )}

                            {item.type === 'large-metric' && (
                                <>
                                    <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}></div>
                                    <div className="relative z-10 h-full flex flex-col">
                                        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-black tracking-tighter mb-4">
                                            {item.value}
                                        </span>
                                        <div className="mt-auto">
                                            <h4 className="text-xl font-black text-black mb-2">{item.label}</h4>
                                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {item.type === 'feature' && (
                                <div className="absolute inset-0 group">
                                    <Image
                                        src={item.image!}
                                        alt={item.title!}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20 group-hover:opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-transparent"></div>
                                    <div className="relative z-10 h-full flex flex-col p-6 sm:p-8">
                                        <div className="mt-auto">
                                            <h4 className="text-xl font-black text-black mb-2">{item.title}</h4>
                                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                                                {item.desc}
                                            </p>
                                            <button className="relative z-20 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all group-hover:scale-110">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
