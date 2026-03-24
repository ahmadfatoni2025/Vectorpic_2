"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Wallet, Rocket, ShieldCheck } from 'lucide-react';

export default function Services() {
    const benefits = [
        {
            title: "Save time",
            description: "Focus on growing your business while we handle the design work.",
            icon: <Clock className="w-8 h-8 text-sky-600" />,
            iconBg: "bg-sky-50",
            iconBorder: "border-sky-100"
        },
        {
            title: "Save money",
            description: "80% more affordable than hiring in-house or working with agencies.",
            icon: <Wallet className="w-8 h-8 text-blue-600" />,
            iconBg: "bg-blue-50",
            iconBorder: "border-blue-100"
        },
        {
            title: "Scale faster",
            description: "Launch more campaigns, create more content without hiring more staff.",
            icon: <Rocket className="w-8 h-8 text-indigo-600" />,
            iconBg: "bg-indigo-50",
            iconBorder: "border-indigo-100"
        },
        {
            title: "Brand consistency",
            description: "Keep your visual identity consistent across every touchpoint and platform.",
            icon: <ShieldCheck className="w-8 h-8 text-cyan-600" />,
            iconBg: "bg-cyan-50",
            iconBorder: "border-cyan-100"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const blobs = [
        { color: 'bg-blue-400', top: '20%', left: '10%', size: 'w-64 h-64' },
        { color: 'bg-sky-400', top: '40%', right: '15%', size: 'w-80 h-80' },
        { color: 'bg-indigo-400', bottom: '10%', left: '20%', size: 'w-72 h-72' },
        { color: 'bg-cyan-400', bottom: '20%', right: '10%', size: 'w-60 h-60' },
        { color: 'bg-blue-500', top: '60%', left: '40%', size: 'w-96 h-96' },
        { color: 'bg-sky-300', bottom: '5%', right: '30%', size: 'w-56 h-56' },
    ];

    return (
        <section className="w-full bg-slate-50 py-24 sm:py-32 overflow-hidden relative min-h-[800px]">
            {/* Background: Vertical Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px)',
                backgroundSize: '80px 100%'
            }} />

            {/* Background: Optimized Blue Mosaic Blobs */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-blue-50/80 via-transparent to-transparent z-10" />
                {blobs.map((blob, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ ...blob, position: 'absolute' }}
                        className={`${blob.color} ${blob.size} rounded-full blur-[100px] filter will-change-transform`}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-20">
                {/* Header Section */}
                <div className="max-w-2xl mb-20 sm:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8"
                    >
                        Transform your <br />
                        <span className="text-blue-600 italic font-thin">design</span> process
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-slate-500 text-lg sm:text-xl leading-relaxed max-w-xl font-medium"
                    >
                        Free your team from design bottlenecks and elevate your brand with our subscription-based approach.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16"
                >
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex flex-col gap-6 group"
                        >
                            {/* Icon Container with specific styling */}
                            <div className="relative">
                                <div className={`w-20 h-20 rounded-3xl ${benefit.iconBg} border ${benefit.iconBorder} flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl relative z-10`}>
                                    {benefit.icon}
                                </div>
                                {/* Decorative shadow glow */}
                                <div className={`absolute -inset-2 ${benefit.iconBg} blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Subtle floating star/glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: 45
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-[15%] right-[25%] w-3 h-3 bg-blue-300 rounded-sm blur-[1px] will-change-transform"
            />
        </section>
    );
}