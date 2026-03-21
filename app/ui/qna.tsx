"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  title: string;
  description: string;
  items: FAQItem[];
}

const AccordionItem = ({ question, answer, isOpen, onClick }: { 
  question: string, 
  answer: string, 
  isOpen: boolean, 
  onClick: () => void 
}) => {
  return (
    <div 
      className={`group border-b border-gray-100 last:border-0 transition-all duration-300 ${isOpen ? 'bg-blue-50/30 rounded-2xl px-4 sm:px-6 -mx-4 sm:-mx-6 mb-4' : 'hover:bg-gray-50/50 rounded-2xl px-4 sm:px-6 -mx-4 sm:-mx-6'}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 sm:py-6 text-left gap-3"
      >
        <span className={`text-sm sm:text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#0070f3]' : 'text-zinc-800'}`}>
          {question}
        </span>
        <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#0070f3] border-[#0070f3] rotate-45' : 'bg-white border-gray-200 group-hover:border-[#0070f3]'}`}>
           <svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`sm:w-5 sm:h-5 ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-[#0070f3]'}`}
           >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
           </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 sm:pb-6 text-gray-500 leading-relaxed text-xs sm:text-sm">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Qna() {
  const { t } = useLanguage();
  
  const [openStates, setOpenStates] = useState<Record<string, number | null>>({
    "general": 0,
    "service": null,
    "support": null,
  });

  const faqData: FAQGroup[] = [
    {
      title: t("General Information", "Informasi Umum"),
      description: t(
        "General information about our services and how we help you create scalable visual assets.",
        "Informasi umum tentang layanan kami dan bagaimana kami membantu Anda menciptakan aset visual yang skalabel."
      ),
      items: [
        {
          question: t("What is the difference between SVG and PNG at Vectorpic?", "Apa perbedaan antara SVG dan PNG di Vectorpic?"),
          answer: t(
            "SVG is a vector format that scales without quality loss, while PNG is a pixel-based raster format. Our core service focuses on pure vector assets that are print-ready and high-performance.",
            "SVG adalah format vektor yang bisa diskalakan tanpa kehilangan kualitas, sementara PNG adalah format raster berbasis pixel. Layanan utama kami berfokus pada aset vektor murni yang siap cetak dan performa tinggi."
          )
        },
        {
          question: t("How does the queue system work at Vectorpic?", "Bagaimana cara kerja sistem antrian di Vectorpic?"),
          answer: t(
            "Each order is processed based on a priority queue. You can monitor the progress status in real-time through your account dashboard.",
            "Setiap pesanan diproses berdasarkan antrian prioritas. Anda dapat memantau status pengerjaan secara real-time melalui dashboard akun Anda."
          )
        },
        {
          question: t("Do I get access to source files?", "Apakah saya mendapatkan akses ke file sumber (source code)?"),
          answer: t(
            "Yes, every premium package purchase includes raw Adobe Illustrator (.ai), EPS, and cleanly compiled SVG files.",
            "Ya, setiap pembelian paket premium mencakup file mentah Adobe Illustrator (.ai), EPS, serta SVG yang dikompilasi secara bersih."
          )
        }
      ]
    },
    {
      title: t("Our Service", "Layanan Kami"),
      description: t(
        "Learn more about how we run your design project from start to finish.",
        "Pelajari lebih lanjut tentang bagaimana kami menjalankan proyek desain Anda dari awal hingga akhir pengerjaan."
      ),
      items: [
        {
          question: t("How can I provide feedback on the design I received?", "Bagaimana cara memberikan masukan pada desain yang saya terima?"),
          answer: t(
            "You can provide feedback directly through our platform using the built-in annotation tool on every draft we send.",
            "Anda dapat memberikan feedback langsung melalui platform kami menggunakan tool anotasi bawaan pada setiap draf yang kami kirimkan."
          )
        },
        {
          question: t("Are there additional fees for revisions?", "Apakah ada biaya tambahan untuk revisi?"),
          answer: t(
            "Each package includes a certain number of free revisions. If exceeded, additional fees apply based on the complexity of the changes.",
            "Setiap paket memiliki jumlah revisi gratis tertentu. Jika melebihi kuota, akan ada biaya tambahan berdasarkan tingkat kompleksitas perubahan."
          )
        },
        {
          question: t("How can I schedule a consultation?", "Bagaimana cara memesan jadwal konsultasi?"),
          answer: t(
            "You can click the 'Start Project' button on the homepage or contact our team directly via live chat for a 1-on-1 session.",
            "Anda bisa memilih tombol 'Mulai Proyek' di beranda atau langsung menghubungi tim kami melalui live chat untuk jadwal 1-on-1."
          )
        }
      ]
    },
    {
      title: t("Support", "Dukungan"),
      description: t(
        "Need technical help or having payment issues? Our support team is here to ensure a smooth process.",
        "Butuh bantuan teknis atau ada kendala pembayaran? Tim bantuan kami ada di sini untuk memastikan proses Anda lancar."
      ),
      items: [
        {
          question: t("How can I contact customer support?", "Bagaimana saya menghubungi dukungan pelanggan?"),
          answer: t(
            "We are available via email at support@vectorpic.com or 24/7 live chat for Gold membership accounts.",
            "Kami tersedia melalui email support@vectorpic.com atau obrolan langsung 24/7 untuk akun membership Gold."
          )
        },
        {
          question: t("What are your support operating hours?", "Kapan jam operasional dukungan Anda?"),
          answer: t(
            "Our design team works on weekdays (09:00 - 18:00 WIB), but emergency support is available 24 hours every day.",
            "Tim desain kami bekerja di hari kerja (09:00 - 18:00 WIB), namun dukungan darurat tersedia 24 jam setiap hari."
          )
        },
        {
          question: t("Can I cancel my order?", "Bisakah saya membatalkan pesanan saya?"),
          answer: t(
            "Cancellation can be made as long as the project status is still in the 'Ideation' stage. Once in the production stage, a partial refund policy applies.",
            "Pembatalan dapat dilakukan selama status proyek masih dalam tahap 'Ideasi'. Jika sudah masuk tahap pengerjaan, kebijakan pengembalian dana sebagian akan berlaku."
          )
        }
      ]
    }
  ];

  const groupKeys = ["general", "service", "support"];

  const toggleItem = (groupKey: string, index: number) => {
    setOpenStates(prev => ({
      ...prev,
      [groupKey]: prev[groupKey] === index ? null : index
    }));
  };

  return (
    <section className="bg-white py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20 md:mb-24">
          <span className="text-[#0070f3] font-mono font-bold tracking-[0.2em] text-[10px] uppercase mb-4 px-4 py-1.5 border border-blue-100 rounded-full bg-blue-50/50">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-tight mb-4 sm:mb-6 px-2">
            {t("Frequently asked questions", "Pertanyaan yang sering diajukan")}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed px-4">
            {t(
              "Trusted by hundreds of brands and designers for scalable visual solutions.",
              "Dipercayai oleh lebih dari ratusan brand dan desainer untuk solusi visual skalabel."
            )}
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-14 sm:space-y-20 md:space-y-24">
          {faqData.map((group, groupIdx) => (
            <div key={group.title} className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 sm:gap-12 lg:gap-24">
              
              {/* Left Column: Label */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase border-l-4 border-[#0070f3] pl-4 sm:pl-6">
                  {group.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs pl-5 sm:pl-7">
                  {group.description}
                </p>
              </div>

              {/* Right Column: Accordions */}
              <div className="space-y-1 sm:space-y-2">
                {group.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openStates[groupKeys[groupIdx]] === idx}
                    onClick={() => toggleItem(groupKeys[groupIdx], idx)}
                  />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}