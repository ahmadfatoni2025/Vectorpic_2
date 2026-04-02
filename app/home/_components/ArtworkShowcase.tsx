"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';

export function ArtworkShowcase() {
    const [vectors, setVectors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVectors = async () => {
            try {
                const response = await fetch('/api/vectors');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setVectors(data.slice(0, 8)); // Show only first 8 for home page
                }
            } catch (error) {
                console.error("Failed to fetch vectors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVectors();
    }, []);

    if (loading && vectors.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-20">
                <div className="animate-pulse flex flex-col gap-10">
                    <div className="h-10 w-64 bg-gray-100 rounded-xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-gray-50 rounded-[2.5rem]" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (vectors.length === 0) return null;

    return (
        <section className="w-full bg-white py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-[2px] bg-blue-500 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Premium Gallery</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Explore our latest masterpiece <span className="text-gray-400">artworks</span>
                        </h2>
                    </div>

                    <Link 
                        href="/showcase" 
                        className="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-black text-black hover:text-white rounded-2xl transition-all font-bold text-sm shadow-sm"
                    >
                        View Full Gallery
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {vectors.map((vector, idx) => (
                        <motion.div
                            key={vector.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="group relative"
                        >
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-2">
                                <img 
                                    src={vector.imageUrl} 
                                    alt={vector.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay On Hover */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white cursor-pointer hover:bg-white hover:text-black transition-all">
                                            <Heart size={20} />
                                        </div>
                                        <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-xl shadow-blue-500/30 cursor-pointer hover:bg-blue-600 transition-all">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Badge */}
                                {vector.isPremium && (
                                    <div className="absolute top-4 right-4 bg-amber-400 text-white p-2 rounded-xl shadow-lg ring-4 ring-white/20">
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <div className="mt-6 px-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/70 mb-1 block italic">{vector.category?.name || 'Vibrant Asset'}</span>
                                <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{vector.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center text-center">
                    <p className="text-sm text-gray-400 font-medium mb-6 uppercase tracking-widest">Join 2,000+ creators sharing their work</p>
                    <Link href="/community" className="text-blue-500 font-black text-lg hover:underline flex items-center gap-2 group">
                        Explore Community Discussions
                        <ArrowRight className="transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
