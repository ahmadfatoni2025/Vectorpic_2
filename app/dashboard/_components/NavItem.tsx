import React from 'react';

export function NavItem({ active, label, icon, isOpen, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${isOpen ? 'px-3' : 'justify-center'} gap-3 py-2.5 rounded-xl transition-all text-[13px] relative group ${
        active
          ? 'bg-gray-900 text-white font-medium shadow-sm'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium'
      }`}
    >
      <span className={`shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>{icon}</span>
      {isOpen && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="whitespace-nowrap truncate">{label}</span>
          {count !== undefined && count > 0 && (
            <span className={`min-w-[20px] text-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500 border border-red-100'}`}>{count}</span>
          )}
        </div>
      )}
      {!isOpen && count !== undefined && count > 0 && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">{count}</div>
      )}
    </button>
  );
}
