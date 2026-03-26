"use client";

import React, { useState } from "react";
import { ImageStack } from "./ImageStack";
import { motion } from "framer-motion";
import RotatingText from "./RotatingText";

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bgColors = ["bg-blue-600", "bg-emerald-600", "bg-indigo-600", "bg-teal-600", "bg-purple-600"];

  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-6 sm:pt-8 md:pt-10 pb-10 w-full overflow-hidden px-4 sm:px-6">

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-[1.05] mb-6 sm:mb-8">
          Where{" "}
          <RotatingText
            texts={[
              "Sophisticated",
              "Beautiful",
              "Clean",
              "Modern",
              "Minimalist"
            ]}
            mainClassName={`px-4 sm:px-5 text-white overflow-hidden py-0.5 sm:py-1 justify-center rounded-2xl md:rounded-3xl shadow-2xl inline-flex transition-colors duration-700 items-center leading-none ${bgColors[currentIndex]}`}
            staggerFrom={"first"}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            staggerDuration={0.04}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 25, stiffness: 150 }}
            rotationInterval={4000}
            onNext={(index) => setCurrentIndex(index)}
            animatePresenceMode="popLayout"
          />{" "}
          <br className="hidden sm:block" />
          Meet <span>Performance.</span>
        </h1>

        <p className="max-w-xl mx-auto text-gray-400 text-xs sm:text-sm md:text-base font-medium leading-relaxed mb-8 sm:mb-10 px-2">
          Build stunning illustrations, brand identities, and digital assets effortlessly. From concept to masterpiece in minutes, not months.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Watch Demo Button */}
          <div className="flex justify-center">
            <button
              onClick={() => alert("Video demo")}
              className="group w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-wide">
                Watch Demo
                <span className="text-gray-400 ml-2 font-normal text-xs">3 mins</span>
              </span>
            </button>
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center">
            <button
              onClick={() => alert("Get started!")}
              className="group w-full sm:w-auto bg-gradient-to-r from-[#04cce7] to-[#04b8d0] hover:from-[#04b8d0] hover:to-[#04a4bc] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-wide">
                Get Started
              </span>
            </button>
          </div>
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
