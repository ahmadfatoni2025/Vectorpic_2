"use client";

import React from "react";

interface TagProps {
  name: string;
  color?: string;
  textColor?: string;
  rotate?: string;
  className?: string;
}

export function Tag({ 
  name, 
  color = "bg-[#3B82F6]", 
  textColor = "text-white", 
  rotate = "-rotate-12", 
  className = "" 
}: TagProps) {
  return (
    <div className={`absolute z-30 ${color} ${textColor} px-5 py-2 rounded-full text-base font-bold shadow-2xl transform ${rotate} flex items-center gap-1.5 transition-transform hover:scale-110 cursor-default group ${className}`}>
      <span className="opacity-70 font-normal">@</span>
      {name}
      {/* Tooltip Tail */}
      <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-12 border-t-current opacity-100`} style={{ color: 'inherit' }}></div>
      <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-12 pointer-events-none`} style={{ borderTopColor: 'inherit' }}></div>
    </div>
  );
}
