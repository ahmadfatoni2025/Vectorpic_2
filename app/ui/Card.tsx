"use client";

import Image from "next/image";

interface CardProps {
  id: number | string;
  color: string;
  rotate: string;
  zIndex: number;
  imageUrl?: string; // Add imageUrl to interface
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ id, color, rotate, zIndex, imageUrl, className, style }: CardProps) {
  return (
    <div
      className={`relative w-[110px] h-[140px] md:w-[200px] md:h-[260px] ${color} rounded-xl md:rounded-2xl border-2 md:border-4 border-white transform ${rotate} hover:scale-130 hover:z-50 transition-all duration-500 cursor-pointer overflow-hidden flex items-center justify-center ${className}`}
      style={{ ...style, zIndex }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Artwork ${id}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 110px, 160px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center italic text-white/50 text-xs text-center px-4">
          Visual {id}
        </div>
      )}

      {/* Glossy overlay effect for premium look */}
      <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
