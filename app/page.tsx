"use client";

import { Navbar } from "./ui/Navbar";
import { Hero } from "./ui/Hero";
import { Sponsor } from "./ui/sponsor";
import { OurDesign } from "./ui/our";
import { VideoProfile } from "./ui/videoProfile";
import { Footer } from "./ui/footer";
import Track from "./ui/track";
import Statistik from "./ui/statistik";
import Qna from "./ui/qna";
import { LanguageProvider } from "./context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-white flex flex-col relative">
        <Navbar />

        <div className="flex-1 flex flex-col items-center justify-center py-10">
          <Hero />
          <Sponsor />
          <OurDesign />
          <VideoProfile />
          <Track />
          <Statistik />
          <Qna />
          <Footer />
        </div>

        {/* Decorative background elements */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-linear-to-br from-blue-100/30 to-green-100/30 rounded-full blur-[120px] -z-10 pointer-events-none opacity-60"></div>
        <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-purple-100/30 to-orange-100/30 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60"></div>
      </main>
    </LanguageProvider>
  );
}

