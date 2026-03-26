"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Mail, User, Phone, MessageSquare, Briefcase, Clock, Star } from 'lucide-react';

const Marquee = ({ reverse = false }: { reverse?: boolean }) => {
    const items = ["Design", "Website Design", "UX/UI Design", "Graphics Design", "Digital Marketing"];
    return (
        <div className="bg-indigo-600 py-4 overflow-hidden">
            <motion.div
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap items-center gap-12"
            >
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12">
                        {items.map((text, idx) => (
                            <div key={idx} className="flex items-center gap-12">
                                <span className="text-lg md:text-2xl font-semibold uppercase text-white tracking-wide">{text}</span>
                                <span className="text-2xl text-white/30">✦</span>
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
        <section className="bg-white w-full">
            {/* Top Marquee */}
            <Marquee />

            {/* Main Form Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-18 lg:py-22">
                <div className="flex flex-col space-y-12">

                    {/* Form Section */}
                    <div className="space-y-10">
                        {/* Header */}
                        <div className="space-y-4 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Get in touch</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                                Let's create something
                                <span className="text-indigo-600"> extraordinary</span>
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Have a project in mind? We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="max-w-6xl mx-auto lg:mx-0 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                />
                            </div>

                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-gray-400" />
                                <textarea
                                    placeholder="Tell us about your project"
                                    rows={5}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-all"
                                ></textarea>
                            </div>

                            <button
                                onClick={() => alert("Send message!")}
                                className="w-full sm:w-auto mx-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[1.2rem] font-semibold transition-all flex items-center justify-center gap-3 active:scale-[0.98] group shadow-lg shadow-indigo-200">
                                <Send className="w-8 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Form;