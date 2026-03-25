"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Chrome, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(false);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin' && password === 'admin') {
      router.push('/dashboard');
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans text-[#111]">
      <div className="hidden md:flex w-1/2 bg-black relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full" />
        <Link href="/" className="relative z-10 flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg group-hover:rotate-12 transition-transform duration-500">
             <div className="w-4 h-4 bg-indigo-600 rounded-sm" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter">Vectorpic</span>
        </Link>
        <div className="relative z-10 max-w-md">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            Design <br /> without <br /> <span className="text-indigo-500 italic font-thin">boundaries.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-gray-400 text-lg font-medium leading-relaxed">
            Access the world's most sophisticated vector asset library and collaborative toolkit.
          </motion.p>
        </div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" />
              </div>
            ))}
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Joined by 50k+ creators</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50/30">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <Link href="/" className="flex md:hidden items-center gap-2 mb-12">
             <div className="w-8 h-8 bg-black rounded-lg" />
             <span className="text-xl font-black tracking-tighter">Vectorpic</span>
          </Link>
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight mb-2">Welcome Back</h2>
            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all font-bold text-sm">
              <Chrome className="w-5 h-5 text-red-500" /> Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#111] text-white rounded-2xl shadow-lg hover:bg-black transition-all font-bold text-sm">
              <Github className="w-5 h-5" /> Continue with GitHub
            </button>
          </div>
          <div className="relative flex items-center gap-4 mb-8">
            <div className="flex-grow h-px bg-gray-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">or use email</span>
            <div className="flex-grow h-px bg-gray-100" />
          </div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Demo Access</span>
              </div>
              <p className="text-[11px] font-medium text-indigo-900/60">Use <span className="font-bold text-indigo-600">admin</span> for both email and password.</p>
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Account / Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin" 
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-hidden focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" 
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 mx-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-hidden focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium" 
                />
              </div>
            </div>
            
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                Invalid credentials. Please use admin / admin.
              </motion.div>
            )}

            <button 
              className="w-full group mt-4 flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            Don't have an account? <Link href="/signup" className="text-indigo-600 font-bold hover:underline">Sign Up</Link>
          </p>
          <div className="mt-16 flex items-center justify-center gap-2 text-gray-400">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure 256-bit SSL connection</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
