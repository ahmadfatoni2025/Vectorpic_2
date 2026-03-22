"use client";

import React from 'react';
import { useLanguage } from "../../context/LanguageContext";

export default function MotionGraphics() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row h-full p-8 md:p-12 gap-8 md:gap-16 items-center">
      <div className="w-full md:w-1/2 aspect-4/3 rounded-2xl overflow-hidden shadow-lg bg-cyan-50 flex items-center justify-center">
        <div className="text-cyan-200 text-6xl font-black uppercase opacity-20 transform -rotate-12 translate-x-4">MOTION</div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h3 className="text-3xl md:text-5xl font-black text-black mb-6 tracking-tight">
          {t("Motion Graphics", "Motion Graphics")}
        </h3>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 font-medium">
          {t(
            "Detailed Motion content goes here. You can customize this file fully.",
            "Konten motion yang detail ada di sini. Anda dapat mengubah file ini sepenuhnya."
          )}
        </p>
        <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all w-fit">
          {t("See Animation", "Lihat Animasi")}
        </button>
      </div>
    </div>
  );
}
