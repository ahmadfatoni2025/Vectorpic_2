"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export function ImageStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoothen the scroll progress - tuned for maximum 'lightness'
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.3,
    restDelta: 0.001
  });

  const [windowWidth, setWindowWidth] = React.useState(0);
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth > 0 && windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Optimized image set with size constraints
  const cards = [
    { id: 1, label: t("Modern Vector Art", "Seni Vektor Modern"), imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&q=70" },
    { id: 2, label: t("Brand Identity", "Identitas Merek"), imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=70" },
    { id: 3, label: t("Illustration", "Ilustrasi"), imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=70" },
    { id: 4, label: t("Logo System", "Sistem Logo"), imageUrl: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=400&q=70" },
    { id: 5, label: t("Motion Graphics", "Grafis Gerak"), imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=70" },
    { id: 6, label: t("UI/UX Concept", "Konsep UI/UX"), imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=70" },
    { id: 7, label: t("Print Assets", "Aset Cetak"), imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&q=70" },
  ];

  return (
    <section ref={containerRef} className="relative h-[100vh] -mt-16 sm:-mt-54 flex flex-col items-center bg-white overflow-hidden sm:overflow-visible">

      <div className="sticky top-0 h-screen flex items-center justify-center w-full">
        <div className="relative flex items-center justify-center w-full max-w-screen-2xl mx-auto h-full px-4 sm:px-10">
          {cards.map((card, idx) => {
            const count = cards.length;
            const middle = Math.floor(count / 2);
            const offset = idx - middle;

            // INITIAL STATE (Partially visible at start)
            const initialRotation = offset * (isMobile ? 2 : 4);
            const initialX = offset * (isMobile ? -15 : -35);
            const initialY = Math.abs(offset) * (isMobile ? 6 : 12) + (isMobile ? 40 : 80); // Pushed down but visible
            const initialScale = 0.9;

            // TARGET STATE (Wide curved arc)
            const targetX = offset * (isMobile ? 35 : (isTablet ? 120 : 180));
            const targetRotation = offset * (isMobile ? 4 : 8);
            const targetScale = (isMobile ? 1.0 : 1.25) - (Math.abs(offset) * (isMobile ? 0.05 : 0.08));
            const targetY = Math.abs(offset) * (isMobile ? 10 : (isTablet ? 30 : 45));

            // Transform progress: 0.1 to 0.5 for the main animation
            const x = useTransform(smoothProgress, [0, 0.5], [initialX, targetX]);
            const rotate = useTransform(smoothProgress, [0, 0.5], [initialRotation, targetRotation]);
            const y = useTransform(smoothProgress, [0, 0.5], [initialY, targetY]);
            const scale = useTransform(smoothProgress, [0, 0.5], [initialScale, targetScale]);

            // Opacity: Visible (0.6) at start, becoming 1.0, and STAYING at 1.0
            const opacity = useTransform(smoothProgress, [0, 0.2], [0.5, 1]);

            return (
              <motion.div
                key={card.id}
                style={{
                  x,
                  y,
                  rotate,
                  scale,
                  opacity,
                  zIndex: count - Math.abs(offset),
                }}
                className="absolute w-[140px] h-[190px] sm:w-[170px] sm:h-[230px] md:w-[210px] md:h-[280px] rounded-3xl md:rounded-4xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] bg-white border border-gray-100 group cursor-pointer will-change-transform"
              >
                {/* Image Component */}
                <div className="w-full h-full relative bg-gray-50">
                  <img
                    src={card.imageUrl}
                    alt={card.label}
                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />

                  {/* Premium overlay label */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-linear-to-t from-black/60 via-black/10 to-transparent">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest block mb-0.5">{t("Showcase", "Karya")}</span>
                    <h3 className="text-xs md:text-sm font-bold text-white tracking-tight leading-tight truncate">
                      {card.label}
                    </h3>
                  </div>
                </div>

                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
