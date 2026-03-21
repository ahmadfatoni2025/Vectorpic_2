"use client";

import React from "react";
import { Card } from "./Card";
import { Tag } from "./Tag";

export function ImageStack() {
  const cards = [
    { id: 1, color: "bg-rose-400", imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5" },
    { id: 2, color: "bg-blue-300", imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42" },
    { id: 3, color: "bg-amber-400", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5" },
    { id: 4, color: "bg-orange-300", imageUrl: "https://images.unsplash.com/photo-1554188248-986adbb73be4" },
    { id: 5, color: "bg-red-500", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab" },
    { id: 6, color: "bg-indigo-600", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853" },
    { id: 7, color: "bg-emerald-500", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9" },
  ];

  return (
    <div className="relative flex items-center justify-center h-[280px] sm:h-[320px] md:h-[420px] mb-4 w-full overflow-hidden sm:overflow-visible">

      {/* Image Cards */}
      <div className="flex -space-x-16 sm:-space-x-12 md:-space-x-16 lg:-space-x-12 px-10">
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            id={card.id}
            color={card.color}
            imageUrl={card.imageUrl}
            rotate={`rotate(${idx * 4 - 12}deg)`}
            zIndex={idx}
            className={`transition-transform duration-500 scale-130 sm:scale-140 md:scale-150`}
            style={{
              transform: `rotate(${idx * 4 - 12}deg) translateY(${Math.abs(idx - 3) * (typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 5)}px)`
            } as React.CSSProperties}
          />
        ))}
      </div>

    </div>
  );
}
