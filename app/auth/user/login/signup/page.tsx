"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CheckCircle, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans text-[#111]">
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative overflow-hidden bg-gray-50/20">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <Link href="/" className="absolute top-12 left-12 flex items-center gap-2 group z-20">
          <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg group-hover:rotate-12 transition-transform duration-500">
             <div className="w-3 h-3 bg-white/20 rounded-sm" />
             <div className="w-2 h-2 bg-white rounded-sm" />
          </div>
          <span className="text-xl font-black tracking-tighter">Vectorpic</span>
        </Link>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-lg bg-white/70 backdrop-blur-xl p-10 sm:p-16 border border-white/50 rounded-[3rem] shadow-2xl relative z-10">
          <div className="mb-12">
            <h2 className="text-4xl font-black tracking-tight mb-3">Create Account</h2>
            <p className="text-gray-500 font-medium">Join 50k+ vector artists and design professionals.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input type="text" placeholder="Jane Doe" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-hidden focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Username</label>
                <input type="text" placeholder="@janedoe" className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl outline-hidden focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input type="email" placeholder="name@company.com" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-hidden focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input type="password" placeholder="Min 8 characters" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-hidden focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" />
              </div>
            </div>
            <div className="flex items-start gap-4 py-2">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded-sm border-gray-200 text-indigo-600 focus:ring-indigo-500" required />
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                I agree to the <Link href="/company/terms" className="text-indigo-600 font-bold hover:underline">Terms of Service</Link> and <Link href="/company/privacy" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>.
              </p>
            </div>
            <button className="w-full group py-4 bg-[#111] text-white rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2">
              Get Started for Free <CheckCircle className="w-4 h-4 text-emerald-400" />
            </button>
          </form>
          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
      <div className="hidden lg:flex w-[35%] bg-indigo-600 flex-col justify-center items-center p-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
         <div className="relative z-10 text-center">
            <div className="w-24 h-24 rounded-[2rem] bg-white mx-auto flex items-center justify-center shadow-2xl mb-10 transform -rotate-12">
               <div className="w-10 h-10 bg-indigo-600 rounded-lg animate-pulse" />
            </div>
            <h3 className="text-white text-3xl font-black tracking-tight leading-tight">Elevate your <br /> design workspace.</h3>
         </div>
      </div>
    </div>
  );
}
