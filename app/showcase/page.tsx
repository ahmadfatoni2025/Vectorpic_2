"use client";

import React, { Suspense } from 'react';
import ShowcaseContent from './showcase';

export default function ShowcasePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center font-black text-2xl animate-pulse">SHOWCASE...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}