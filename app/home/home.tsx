"use client";

import React from "react";
import { Navbar } from "../ui/Navbar";
import { Hero } from "../ui/Hero";
import { Sponsor } from "../ui/sponsor";
import { OurDesign } from "../ui/our";
import { VideoProfile } from "../ui/videoProfile";
import { Footer } from "../ui/footer";
import Track from "../ui/track";
import Statistik from "../ui/statistik";
import Services from "../ui/servics";
import Qna from "../ui/qna";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-white flex flex-col relative overflow-x-hidden">
      {/* Navbar is fixed, so we don't need to wrap it specifically in the 'grow' container for its position, 
          but the 'grow' container will handle the padding for its content. */}
      <Navbar />

      <div className="grow pt-28 sm:pt-32 flex flex-col items-center">
        <Hero />
        <Sponsor />
        <OurDesign />
        <VideoProfile />
        <Track />
        <Statistik />
        <Services />
        <Qna />
      </div>

      <Footer />

      {/* Decorative background elements - optimized for performance */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-linear-to-br from-blue-100/20 to-green-100/20 rounded-full blur-[80px] -z-10 pointer-events-none opacity-40 will-change-transform"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-purple-100/20 to-orange-100/20 rounded-full blur-[60px] -z-10 pointer-events-none opacity-40 will-change-transform"></div>
    </main>
  );
}