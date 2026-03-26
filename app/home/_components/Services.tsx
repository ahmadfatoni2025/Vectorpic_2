"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';


export default function Services() {
    const benefits = [
        {
            title: "Save time",
            description: "Focus on growing your business while we handle the design work.",
            icon: <img src="/images/service/recource.png" className="object-contain" alt="Save time" />,
            iconBg: "bg-sky-50",
            iconBorder: "border-sky-100"
        },
        {
            title: "Save money",
            description: "80% more affordable than hiring in-house or working with agencies.",
            icon: <img src="/images/service/dompet.png" className="object-contain" alt="Save money" />,
            iconBg: "bg-blue-50",
            iconBorder: "border-blue-100"
        },
        {
            title: "Scale faster",
            description: "Launch more campaigns, create more content without hiring more staff.",
            icon: <img src="/images/service/many.png" className="object-contain" alt="Scale faster" />,
            iconBg: "bg-indigo-50",
            iconBorder: "border-indigo-100"
        },
        {
            title: "Brand consistency",
            description: "Keep your visual identity consistent across every touchpoint and platform.",
            icon: <img src="/images/service/shild.png" className="object-contain" alt="Brand consistency" />,
            iconBg: "bg-cyan-50",
            iconBorder: "border-cyan-100"
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
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

    // Background blobs removed for performance - replaced by single background image

    return (
        <section className="w-full bg-slate-50 py-24 sm:py-32 overflow-hidden relative min-h-[800px]">
            {/* Background Image: Simplified for performance */}
            <div
                className="absolute inset-x-0 top-0 h-[480px] pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'url("https://i.pinimg.com/736x/75/2c/8e/752c8e7e20195797d9e8c03d8561c0bf.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maskImage: 'linear-gradient(to bottom, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
                }}
            />

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
                        Transform your design process.
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


        </section>
    );
}