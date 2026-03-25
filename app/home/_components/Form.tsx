"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Marquee = ({ reverse = false }: { reverse?: boolean }) => {
    const items = ["Design", "Website Design", "UX/UI Design", "Graphics Design", "Digital Marketing"];
    return (
        <div className="bg-indigo-600 pt-3 pb-3 overflow-hidden flex items-center relative z-10">
            <motion.div
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap items-center gap-12 pr-12"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12">
                        {items.map((text, idx) => (
                            <div key={idx} className="flex items-center gap-12">
                                <span className="text-xl md:text-3xl font-black uppercase text-white tracking-tight">{text}</span>
                                <span className="text-3xl text-white/40">✴</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const Form = () => {
    return (
        <section className="bg-white w-full overflow-hidden border-t border-gray-100">
            {/* Top Marquee */}
            <Marquee />

            <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Side - Form */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-indigo-600" />
                                <span className="text-xs font-black text-indigo-600 tracking-widest uppercase">Contact Us</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-[0.95] tracking-tighter">
                                Join Us in Creating <br /> Something Great
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base max-w-xl font-medium">
                                Have a project in mind? We'd love to hear from you. Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="First Name *"
                                    className="w-full bg-gray-50 border-gray-100 focus:bg-white border rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name *"
                                    className="w-full bg-gray-50 border-gray-100 focus:bg-white border rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="email"
                                    placeholder="Email *"
                                    className="w-full bg-gray-50 border-gray-100 focus:bg-white border rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    className="w-full bg-gray-50 border-gray-100 focus:bg-white border rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Subject *"
                                className="w-full bg-gray-50 border-gray-100 focus:bg-white border rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
                            />
                            <textarea
                                placeholder="Message *"
                                rows={6}
                                className="w-full bg-gray-50 border-gray-100 focus:bg-white border rounded-3xl p-5 text-sm font-semibold focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none resize-none transition-all"
                            ></textarea>

                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-4 active:scale-95 group shadow-xl shadow-indigo-200">
                                Send Message
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 transition-transform group-hover:translate-x-1">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Info Box */}
                    <div className="lg:col-span-5 relative mt-20 lg:mt-0">
                        {/* Stamp Icon */}
                        <div className="absolute -top-16 -right-4 w-36 h-36 z-20 hidden md:block">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="relative w-full h-full"
                            >
                                <div className="absolute inset-0 bg-gray-900 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                                    <span className="text-[10px] text-white font-black uppercase text-center p-3 leading-tight">
                                        Vectorpic • Production • Vectorpic •
                                    </span>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                    <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                                </div>
                            </motion.div>
                        </div>

                        <div className="bg-gray-900 rounded-4xl p-10 md:p-14 space-y-12 h-full shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                            
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                    <h4 className="text-lg font-black uppercase tracking-widest text-white/40">Address</h4>
                                </div>
                                <p className="text-white text-lg font-bold leading-relaxed">
                                    4517 Washington Ave. <br /> Manchester, Kentucky 39495
                                </p>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                    <h4 className="text-lg font-black uppercase tracking-widest text-white/40">Contact</h4>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white text-lg font-bold hover:text-indigo-400 transition-colors cursor-pointer">+0123-456-789</p>
                                    <p className="text-white text-lg font-bold hover:text-indigo-400 transition-colors cursor-pointer">hello@vectorpic.com</p>
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                    <h4 className="text-lg font-black uppercase tracking-widest text-white/40">Open Time</h4>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-white/5 rounded-lg text-white text-sm font-bold">Mon - Fri</span>
                                    <span className="text-white text-lg font-bold">10:00 - 20:00</span>
                                </div>
                            </div>

                            <div className="space-y-8 pt-8 border-t border-white/5 relative z-10">
                                <h4 className="text-xs font-black uppercase tracking-widest text-white/30">Stay Connected</h4>
                                <div className="flex gap-4">
                                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                        <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-indigo-600 hover:scale-110 transition-all duration-300">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Marquee */}
            <Marquee reverse />

            {/* Bottom CTA Bar */}
            <div className="bg-gray-50 border-y border-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                            Let's <span className="text-indigo-600">Connect</span> there
                        </h2>
                        <p className="text-gray-500 font-medium tracking-tight">Ready to take your brand to the next level?</p>
                    </div>
                    <button className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-full font-bold transition-all flex items-center gap-4 active:scale-95 group shadow-2xl">
                        Contact Us Now
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white transition-transform group-hover:rotate-45">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Form;