"use client";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import ScrollReveal from "../components/ui/ScrollReveal";
import { ChevronRight, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Vectorpic.id completely transformed my creative workflow! The AI-powered assets are top-tier, and I've reached new heights in my design projects.",
    name: "Emma Rodriguez",
    role: "Digital Artist",
    avatar: "/about/avatars.png",
    bg: "bg-gray-50"
  },
  {
    quote: "Finally, a platform that truly understands the intersection of art and tech. The curated collection saves me hours of searching.",
    name: "Sarah Chen",
    role: "Creative Director",
    avatar: "/about/avatars.png",
    bg: "bg-gray-100"
  },
  {
    quote: "The quality of the vector illustrations is incredible. Every piece I've downloaded has become a core part of my portfolio.",
    name: "Maria Santos",
    role: "UI/UX Designer",
    avatar: "/about/avatars.png",
    bg: "bg-gray-50"
  },
  {
    quote: "Vectorpic's AI knows exactly what I need. It's like having a personal curator who never misses the mark.",
    name: "Jessica Park",
    role: "Design Lead",
    avatar: "/about/avatars.png",
    bg: "bg-gray-100"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Innovation Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              Innovation
            </span>
            <div className="max-w-3xl mx-auto">
              <ScrollReveal as="h1" baseRotation={0} containerClassName="!my-0">
                Why creators choose Vectorpic.id
              </ScrollReveal>
              <p className="text-gray-500 text-lg md:text-xl font-medium mt-4">
                Exceptional assets and unparalleled technology that <br className="hidden md:block" />
                set the standard for modern digital art.
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px] md:auto-rows-[320px]">
            {/* Item 1: Large Vertical */}
            <div className="md:row-span-2 bg-[#F6F6F8] rounded-4xl flex flex-col group overflow-hidden relative">
              <div className="relative aspect-4/5 w-full overflow-hidden shadow-sm">
                <Image
                  src="/about/hand_jewelry.png"
                  alt="Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 space-y-6 flex-1 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Handcrafted by master artists to deliver timeless elegance.
                </h3>
                <Button variant="primary" className="rounded-full shadow-none w-fit group/btn">
                  Explore Collection
                  <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Item 2: Handshake */}
            <div className="bg-[#F6F6F8] rounded-4xl flex flex-col group overflow-hidden relative">
              <div className="relative aspect-video w-full overflow-hidden shadow-sm">
                <Image
                  src="/about/handshake.png"
                  alt="Trust"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <p className="text-2xl font-bold leading-tight tracking-tight">
                  Trusted by <span className="text-gray-400 font-medium">industry leaders worldwide.</span>
                </p>
              </div>
            </div>

            {/* Item 3: Info Card */}
            <div className="bg-[#F6F6F8] rounded-4xl p-8 flex flex-col items-center justify-center text-center group">
              <span className="text-6xl md:text-7xl font-bold text-gray-900 mb-2">50%</span>
              <p className="text-sm font-medium text-gray-500 max-w-[140px]">
                Reduction in design time for our users.
              </p>
              <div className="relative w-24 h-24 mt-6">
                <Image src="/about/chess_piece.png" alt="Excellence" fill className="object-contain group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>

            {/* Item 4: Large Horizontal */}
            <div className="md:col-span-2 bg-[#F6F6F8] rounded-4xl flex flex-col md:flex-row items-stretch group overflow-hidden">
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-gray-900">
                  Elevates personal style and transforms your vision into a <span className="text-gray-400 font-medium">statement of luxury.</span>
                </h3>
              </div>
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden shadow-2xl">
                <Image
                  src="/about/stylish_person.png"
                  alt="Style"
                  fill
                  className="object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              Testimonials
            </span>
            <div className="max-w-3xl mx-auto">
              <ScrollReveal baseRotation={0} containerClassName="!my-0">
                What our clients say
              </ScrollReveal>
              <p className="text-gray-500 text-lg font-medium mt-4">
                Hear from creative leaders who trust Vectorpic.id for their <br className="hidden md:block" />
                most important digital projects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className={`${item.bg} rounded-4xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-gray-200`}>
                <div className="space-y-6">
                  <Quote className="text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity" size={32} />
                  <p className="text-gray-700 leading-relaxed font-medium">
                    "{item.quote}"
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                    {/* We use a single avatars image and object-position to simulate different avatars if we had them, 
                         but for now let's just use the image we generated. 
                         In a real app, these would be separate files. */}
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover scale-150"
                      style={{ objectPosition: `${idx * 33}% 50%` }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center gap-4">
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all group">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
