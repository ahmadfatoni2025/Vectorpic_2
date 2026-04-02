"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Chrome, ArrowRight, User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/dashboard_user');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans text-[#111]">
      {/* Left Side - Dark Sidebar */}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-indigo-500/20"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8"
          >
            Join the elite <br /> creators <br />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-gray-400 text-lg font-medium leading-relaxed"
          >
            Ready to scale your design workflow? Join 50,000+ artists worldwide.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50/30">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <Link href="/" className="flex md:hidden items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-black rounded-lg" />
            <span className="text-xl font-black tracking-tighter">Vectorpic</span>
          </Link>

          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight mb-2">Create Account</h2>
            <p className="text-gray-500 font-medium">Join the most sophisticated asset library.</p>
          </div>

          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all font-bold text-sm text-gray-900">
              <Chrome className="w-5 h-5 text-red-500" /> Sign up with Google
            </button>
          </div>

          <div className="relative flex items-center gap-4 mb-8">
            <div className="grow h-px bg-gray-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">or use email</span>
            <div className="grow h-px bg-gray-100" />
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 py-2">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded-sm border-gray-200 text-indigo-600 focus:ring-indigo-500" required />
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                I agree to the <Link href="#" className="text-indigo-600 font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <button
              className="w-full group mt-4 flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-[#222] transition-all active:scale-95 disabled:opacity-50"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            Already have an account? <Link href="/auth/user/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
