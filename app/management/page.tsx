"use client";

import React, { Suspense } from 'react';
import ManagementContent from './management';

export default function ManagementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-black text-2xl animate-pulse">VECTORPIC...</div>}>
      <ManagementContent />
    </Suspense>
  );
}
