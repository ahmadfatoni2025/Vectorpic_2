"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
    id: number | string;
    content: string;
    author: string;
    avatar: string;
    role: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="shrink-0 w-[350px] bg-white border border-slate-100 p-8 rounded-4xl flex flex-col justify-between group transition-all hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 cursor-default">
        <div>
            <p className="text-slate-600 text-[15px] leading-relaxed font-medium">
                "{testimonial.content}"
            </p>
        </div>

        <div className="flex items-center gap-4">
            <div className="relative">
                {testimonial.avatar && (
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-50"
                    />
                )}
                <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-0.5 shadow-sm">
                    <Star className="w-2 h-2 text-white fill-white" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-slate-900 font-bold text-sm tracking-tight">{testimonial.author}</span>
                <span className="text-slate-400 text-[11px] font-medium">{testimonial.role}</span>
            </div>
        </div>
    </div>
);

const MarqueeRow = ({ items, direction = 'left', speed = 60 }: { items: Testimonial[], direction?: 'left' | 'right', speed?: number }) => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className="flex overflow-hidden relative py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                animate={{ x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    // Use a key to "reset" or "pause" effectively by slowing it down enormously 
                    // or just use the paused state logic if needed. 
                    // Actually, framer motion doesn't natively pause an infinite loop easily without useAnimation.
                    // But we can use style for pause-on-hover!
                }}
                className="flex gap-8 px-4"
                style={{
                    animationPlayState: isPaused ? 'paused' : 'running',
                    // Note: This only works with CSS animations. 
                    // For Framer Motion, we can use the 'pause' prop on transition if we use 2-step animation or CSS-in-JS.
                }}
            >
                {/* Framer motion variant for pause on hover is tricky on infinite loops.
                    Instead, we'll use a regular motion.div and control the animation state.
                */}
                <motion.div
                    className="flex gap-8"
                    animate={isPaused ? { animationPlayState: "paused" } : { animationPlayState: "running" }}
                >
                    {/* Double the items for seamless loop */}
                    {[...items, ...items].map((t, i) => (
                        <TestimonialCard key={`${t.id}-${direction}-${i}`} testimonial={t} />
                    ))}
                </motion.div>
            </motion.div>

            {/* Gradient Mask Overlays for smooth entry/exit */}
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
    );
};

export default function Rateing() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/testimonials");
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading || testimonials.length === 0) return null;

    // Split testimonials for different rows
    const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 3));
    const row2 = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil(2 * testimonials.length / 3));
    const row3 = testimonials.slice(Math.ceil(2 * testimonials.length / 3));

    return (
        <section className="w-full bg-white pt-28 overflow-hidden relative">
            {/* Background Decorative Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-indigo-50/50 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/30 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full">
                {/* Header Section */}
                <div className="text-center mb-16 px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight"
                    >
                        Loved by <span className="text-indigo-600">brands</span> worldwide
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg sm:text-l font-medium max-w-2xl mx-auto"
                    >
                        Success stories from teams who've upgraded their workflow with Vectorpic.
                    </motion.p>
                </div>

                {/* 3 Marquee Rows */}
                <div className="flex flex-col gap-4">
                    <MarqueeRow items={row1} direction="left" speed={70} />
                    <MarqueeRow items={row2} direction="right" speed={80} />
                    <MarqueeRow items={row3} direction="left" speed={75} />
                </div>
            </div>

            {/* Subtle Bottom Divider Glow */}
            <div className="mt-24 px-6 flex justify-center opacity-30">
                <div className="w-1/2 h-px bg-linear-to-r from-transparent via-indigo-200 to-transparent" />
            </div>
        </section>
    );
}

