"use client";

import { ImageStack } from "./ImageStack";
import GetStarted from "./getstarted";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-6 sm:pt-8 md:pt-10 pb-10 w-full overflow-hidden px-4 sm:px-6">

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-[1.05] mb-6 sm:mb-8">
          {t("Where", "Dimana")} <span className="text-[#4F46E5]">{t("Sophisticated", "Keanggunan")}</span> <br className="hidden sm:block" />
          {t("Meet", "Bertemu")} <span className="text-[#10B981]">{t("Performance.", "Performa.")}</span>
        </h1>

        <p className="max-w-xl mx-auto text-gray-400 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-8 sm:mb-10 px-2">
          {t(
            "Build stunning illustrations, brand identities, and digital assets effortlessly. From concept to masterpiece in minutes, not months.",
            "Bangun ilustrasi menakjubkan, identitas merek, dan aset digital dengan mudah. Dari konsep ke mahakarya dalam hitungan menit, bukan bulan."
          )}
        </p>

        <div className="flex justify-center mb-12 sm:mb-16">
          <button className="group bg-[#111] hover:bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105 shadow-2xl">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="ml-0.5"><path d="M5 3l14 9-14 9V3z" /></svg>
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{t("Watch Demo", "Tonton Demo")} <span className="text-white/40 ml-1">3mins</span></span>
          </button>
        </div>
      </div>

      {/* Modern Glow & Preview Section */}
      <div className="w-full relative px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Colorful Glow Background */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-linear-to-t from-indigo-50/80 via-emerald-50/50 to-transparent blur-[100px] -z-10"></div>

        {/* Preview Image Stack Replacement */}
        <div className="w-full">
          <ImageStack />
        </div>
      </div>
    </section>
  );
}
