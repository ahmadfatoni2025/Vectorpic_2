"use client";

import React from 'react';
import { FlowingMenu } from "./FlowingMenu";

export default function Track() {
  const steps = [
    {
      link: "/services/branding",
      text: "Branding",
      image: "https://i.pinimg.com/avif/1200x/cc/4a/51/cc4a51556f7440f1768797ff68855ffd.avf",
    },
    {
      link: "/services/ui-ux",
      text: "UI/UX Design",
      image: "https://i.pinimg.com/avif/1200x/f8/51/4a/f8514a4aa0939413a5bf0cd9a963768b.avf",
    },
    {
      link: "/services/illustration",
      text: "Illustration",
      image: "https://i.pinimg.com/avif/1200x/5c/c1/89/5cc189e4ec60557024728d112351960e.avf",
    },
    {
      link: "/services/motion-graphics",
      text: "Motion Graphics",
      image: "https://i.pinimg.com/avif/1200x/09/e4/0a/09e40a3f556058ae2f57ba22bce36f12.avf",
    },
  ];

  return (
    <div className="mx-auto w-full shadow-sm mb-12 sm:mb-20 overflow-hidden">
      <div className="flex flex-col items-center text-center my-10 sm:my-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-black tracking-tighter leading-[1.05] max-w-4xl px-2">
          Everything you need <br />
          to <span className="text-[#0070f3]">scale your brand</span>
        </h2>
        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-gray-500 max-w-xl font-medium px-4">
          We combine art and technology to create visual identities that are not only beautiful, but also high-performing.
        </p>
      </div>

      <FlowingMenu items={steps} />
    </div>
  );
}
