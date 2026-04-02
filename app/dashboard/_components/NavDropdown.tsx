import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function NavDropdown({ keyId, label, icon, isOpen, isExpanded, onToggle, activeChildren, children }: any) {
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-center py-2.5 rounded-xl transition-all text-[13px] font-medium ${
          isExpanded || activeChildren ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <span className={isExpanded || activeChildren ? 'text-emerald-600' : 'text-gray-400'}>{icon}</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-[13px] font-medium ${
          isExpanded
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={isExpanded ? 'text-emerald-600' : 'text-gray-400'}>{icon}</span>
          <span>{label}</span>
        </div>
        {isExpanded ? <ChevronDown size={14} className="text-emerald-500" /> : <ChevronRight size={14} className="text-gray-400" />}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-5 pl-4 py-1.5 flex flex-col gap-0.5 border-l-2 border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
