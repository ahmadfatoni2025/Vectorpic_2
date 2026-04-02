import React from 'react';

export function NavChild({ active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-[12px] ${
        active
          ? 'bg-gray-100 text-gray-900 font-semibold'
          : 'text-gray-500 hover:text-gray-800 font-medium hover:bg-gray-50'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-3 ${active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
      {label}
    </button>
  );
}
