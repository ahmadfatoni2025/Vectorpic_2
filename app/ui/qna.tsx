"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, Search, Filter } from 'lucide-react';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const AccordionItem = ({ item, isOpen, onClick }: { 
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void 
}) => {
  return (
    <div className={`mb-4 transition-all duration-500 rounded-3xl border ${isOpen ? 'bg-white border-blue-100 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-50/50' : 'bg-gray-50/50 border-transparent hover:bg-gray-50'} overflow-hidden`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-7 md:p-8 text-left group"
      >
        <span className={`text-[16px] sm:text-[18px] font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>
          {item.question}
        </span>
        <div className={`shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-50 rotate-180' : 'bg-white shadow-sm'}`}>
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-8 pb-8 pt-0">
              <div className="h-px w-full bg-gray-100 mb-6" />
              <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-4xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Qna() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    { id: 'all', label: "All Categories" },
    { id: 'service', label: "Design Service" },
    { id: 'process', label: "Work Process" },
    { id: 'ownership', label: "Ownership & Data" },
  ];

  const faqData: FAQItem[] = useMemo(() => [
    {
      id: 1,
      category: 'service',
      question: "What design services does Vectorpic specialize in?",
      answer: "Vectorpic focuses on high-quality vector assets, custom illustrations, logo design, and visual identities ready for use across digital and print platforms."
    },
    {
      id: 2,
      category: 'service',
      question: "How do I request a custom design?",
      answer: "You can contact our design team through the inquiry form or email us at design@vectorpic.com with your project brief. We will respond within 24 hours."
    },
    {
      id: 3,
      category: 'service',
      question: "Can Vectorpic designs be customized to my brand?",
      answer: "Sure, our team works collaboratively to ensure every design element, from colors to visual style, aligns with your brand identity. We adapt our aesthetics to your vision."
    },
    {
      id: 4,
      category: 'process',
      question: "What design file formats will I receive?",
      answer: "You will receive master files in AI (Adobe Illustrator), EPS, and SVG formats, as well as ready-to-use formats like transparent PNG and high-resolution JPG."
    },
    {
      id: 5,
      category: 'process',
      question: "How many design revisions can I request?",
      answer: "We provide up to 3 revisions for each project to ensure the final result truly meets your expectations and business needs at no additional cost."
    },
    {
      id: 6,
      category: 'process',
      question: "How long does one design project take?",
      answer: "The turnaround time varies between 3 to 5 business days depending on the complexity level and technical details of the requested design."
    },
    {
      id: 7,
      category: 'ownership',
      question: "Do I get full ownership of the design?",
      answer: "Once payment is complete, you will have exclusive rights and full ownership of the final design we have created for you. You are free to use it for commercial purposes."
    },
    {
      id: 8,
      category: 'ownership',
      question: "Is my project data safe with Vectorpic?",
      answer: "We prioritize confidentiality and use secure storage for all client assets and communication throughout the production process. Your data will not be shared with third parties."
    }
  ], []);

  const filteredData = faqData.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section className="bg-white py-20 sm:py-32 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
              <span className="text-[10px] font-bold text-blue-500 tracking-widest uppercase">/ FAQS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
              Frequently asked question
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Find answers to common questions about our design services, workflow, and how we help your brand grow through high-quality vector assets.
            </p>
          </div>
          
          {/* Category Dropdown Filter */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 px-6 py-3.5 rounded-2xl transition-all group min-w-[220px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-bold text-gray-700">
                  {categories.find(c => c.id === activeCategory)?.label}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden p-2"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        activeCategory === cat.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FAQ List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div className="flex flex-col">
            {filteredData.slice(0, Math.ceil(filteredData.length / 2)).map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
          <div className="flex flex-col">
            {filteredData.slice(Math.ceil(filteredData.length / 2)).map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-20 p-8 md:p-12 bg-gray-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-blue-600/30 transition-all duration-700" />
           <div className="relative z-10 space-y-2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Still have questions?
              </h3>
              <p className="text-gray-400 max-w-md">
                Can't find what you're looking for? Our design specialist is here to help you directly.
              </p>
           </div>
           <button className="relative z-10 bg-white hover:bg-blue-50 text-black px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl">
              Contact Us
           </button>
        </div>

      </div>
    </section>
  );
}