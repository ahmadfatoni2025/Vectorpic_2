"use client";

import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "./_components/Hero";
import { Sponsor } from "./_components/Sponsor";
import { OurDesign } from "../components/sections/OurDesign";
import { VideoProfile } from "./_components/VideoProfile";
import { Footer } from "../components/layout/Footer";
import Track from "./_components/Track";
import Statistik from "./_components/Statistics";
import Services from "./_components/Services";
import Rateing from "./_components/Rating";
import ScrollReveal from "../components/ui/ScrollReveal";
import Form from "./_components/Form";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-white flex flex-col relative overflow-x-hidden">
      <Navbar />

      <div className="grow pt-28 sm:pt-32 flex flex-col items-center">
        <Hero />
        <Sponsor />
        <OurDesign />
        <VideoProfile />
        <Track />
        <Statistik />
        <Services />
        <Rateing />
        <Form />
      </div>

      <Footer />

      {/* Decorative background elements - optimized for performance */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-linear-to-br from-blue-100/20 to-green-100/20 rounded-full blur-[80px] -z-10 pointer-events-none opacity-40 will-change-transform"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-purple-100/20 to-orange-100/20 rounded-full blur-[60px] -z-10 pointer-events-none opacity-40 will-change-transform"></div>
    </main>
  );
}