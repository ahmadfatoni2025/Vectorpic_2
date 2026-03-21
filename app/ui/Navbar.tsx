"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";
import Announcement from "./announcement";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const { lang, toggleLang, t } = useLanguage();

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Showcase mega menu data with icons
  const showcaseItems = [
    {
      name: t("Poster Design", "Desain Poster"),
      sub: t("Visual Artistry", "Seni Visual"),
      href: "/showcase/poster",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-15.6 70.2-40.1 94.8s-58.3 39.7-94.8 40.1c-.9 0-1.8 0-2.7 0H256c-4.4 0-8-3.6-8-8c0-1.6 .5-3.2 1.4-4.5l64-89.6c1.2-1.7 3.2-2.7 5.3-2.7h81.3c2.1 0 4.1-1 5.3-2.7l64-89.6c1.2-1.7 1.4-3.9 .5-5.8s-2.8-3.1-4.8-3.1H312c-4.4 0-8-3.6-8-8s3.6-8 8-8h163.7c4.4 0 8 3.6 8 8c0 1.6-.5 3.2-1.4 4.5l-64 89.6c-1.2 1.7-3.2 2.7-5.3 2.7H331.7c-2.1 0-4.1 1-5.3 2.7l-64 89.6c-1.2 1.7-1.4 3.9-.5 5.8s2.8 3.1 4.8 3.1H496c8.8 0 16 7.2 16 16zM422.4 201.6c-11.4-11.4-27.2-18.4-44.4-19.1c-1.3 0-2.7-.1-4.1-.1H256c-4.4 0-8-3.6-8-8s3.6-8 8-8h117.9c1.4 0 2.8 0 4.1-.1c17.2-.6 33-7.7 44.4-19.1s18.4-27.2 19.1-44.4c0-1.3 .1-2.7 .1-4.1V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V312c0-1.4 0-2.8-.1-4.1c-.6-17.2-7.7-33-19.1-44.4s-27.2-18.4-44.4-19.1c-1.3 0-2.7-.1-4.1-.1V344.1c0-1.4 0-2.8-.1-4.1c-.6-17.2-7.7-33-19.1-44.4zM64 48c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16zM160 88c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zm48 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM128 192a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
        </svg>
      )
    },
    {
      name: t("Vector Graphics", "Grafis Vektor"),
      sub: t("Scalable Assets", "Aset Skalabel"),
      href: "/showcase/graphics",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.7l-64 58.6c-5 4.6-5.4 12.4-.9 17.5l5.9 6.7c17.5 19.9 16 49.8-3.4 67.8l-12.7 11.9c-1.9 1.7-4.1 3-6.1 4c-.2 51.1-23.7 99.2-64.2 131.2c-5.1 4-12.4 4.3-17.8 .8s-7.8-10.3-5.7-16.5c11.7-34.9 8.3-73.4-9.3-105.7l-5.6-10.2c-4.1-7.4-.6-16.8 7.4-19.8l10.8-4c8.4-3.1 11.5-12.9 6.4-20.1l-5.9-8.4c-15-21.4-11.1-51.1 9.1-67.9l12.1-10.1c8.1-6.8 11.4-17.3 8.3-27.3s-12.1-16.1-22.3-15.1l-18 .2c-54.7 .5-106.2-22.6-141.2-63.1c-5.4-6.3-4.8-15.7 1.4-21.2l96.7-85.7c5.8-5.2 7-13.8 2.8-20.3S362.4 2.8 355.7 4.5l-20.7 5.1c-42.5 10.6-87.1 1.7-123-24.3l-10-7.3c-5.3-3.8-12.5-3.8-17.8 .2S177 121 180.7 127c13.7 22.3 18.4 49 13.1 75l-4.1 20.3c-1.5 7.4-8.8 12.1-16.2 10.5l-25.1-5.5c-23.9-5.2-48.8 .4-68.7 15.6l-5.6 4.3c-1.4 1.1-3 2-4.5 2.9c-10.4 44.5-5.9 91.9 13 133.5c3.2 7 1.7 15.3-3.8 20.7l-94 92c-5.8 5.7-6.5 14.8-1.5 21.3s13.8 8.1 20.5 3.8l52.1-33.3c35.4-22.6 78.4-28.9 118.5-17.3l12.1 3.5c46.7 13.4 83.1 49.3 97 95.8c2 6.6 8 11.1 14.8 11.1s12.8-4.5 14.8-11.1c16.3-54.3 60.1-94.8 113.1-104.9c7-.1 13-5.2 14.8-12c5.6-21.5 5.5-44.1-.4-65.5l-3.3-12.1c-2-7.4 2.1-15 9.4-17.3l25.1-8.1c4.5-1.4 8-4.8 9.5-9.1c11.5-33.1 6.5-69.5-13.6-98.3l-7.2-10.3c-2.4-3.4-3.5-7.7-3.1-11.9c1.6-18.4 11.3-34.9 26.6-45.3z" />
        </svg>
      )
    },
    {
      name: t("Bespoke Carpets", "Karpet Eksklusif"),
      sub: t("Premium Textiles", "Tekstil Premium"),
      href: "/showcase/carpets",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M480 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm-32 384H64V96h384v320zm-256-48h128c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16H192c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16zm16-64h96v32h-96v-32zm-16-96h128c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16H192c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16zm16-64h96v32h-96v-32z" />
        </svg>
      )
    },
    {
      name: t("Packaging", "Kemasan"),
      sub: t("Strategic Packaging", "Kemasan Strategis"),
      href: "/showcase/packaging",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M256 32L20 144v224l236 112 236-112V144L256 32zm0 46.72L421.44 156.4 256 230.16 90.56 156.4 256 78.72zM64 191.24l168 75.36V422.4L64 341.76V191.24zm384 150.52l-168 80.64V266.6l168-75.36v150.52z" />
        </svg>
      )
    },
    {
      name: t("Brand Identity", "Identitas Merek"),
      sub: t("Logo & Systems", "Logo & Sistem"),
      href: "/showcase/graphics",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M256 32L32 128l224 96 224-96L256 32zm0 160L85.33 128 256 54.85 426.67 128 256 192zM480 320l-192 84.8V512L512 368v-48h-32zm-224 84.8l-192-84.8H32v48l224 144V404.8zM256 256l-224 96 224 80 224-80-224-96zm0 137.15L118.67 352 256 293.14 393.33 352 256 393.15z" />
        </svg>
      )
    },
    {
      name: t("UI/UX Design", "Desain UI/UX"),
      sub: t("Digital Interfaces", "Antarmuka Digital"),
      href: "/showcase",
      icon: (
        <svg viewBox="0 0 576 512" width="24" height="24" className="fill-current">
          <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z" />
        </svg>
      )
    },
    {
      name: t("Illustration", "Ilustrasi"),
      sub: t("Custom Artwork", "Karya Seni Kustom"),
      href: "/showcase",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M167.02 309.34c-11.47 11.48-11.47 30.08 0 41.55l3.32 3.32c11.48 11.47 30.07 11.47 41.55 0l105.7-105.7c11.47-11.48 11.47-30.08 0-41.55l-3.32-3.32c-11.48-11.47-30.07-11.47-41.55 0l-105.7 105.7zM425.68 181.44l-95.12-95.12c-12.5-12.5-32.76-12.5-45.26 0l-160 160c-12.5 12.5-12.5 32.76 0 45.26l95.12 95.12c12.5 12.5 32.76 12.5 45.26 0l160-160c12.5-12.5 12.5-32.76 0-45.26zm-22.63 67.88l-160 160c-6.25 6.25-16.38 6.25-22.63 0l-95.12-95.12c-6.25-6.25-6.25-16.38 0-22.63l160-160c6.25-6.25 16.38-6.25 22.63 0l95.12 95.12c6.25 6.25 6.25 16.38 0 22.63zM256 0c-141.38 0-256 114.62-256 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm0 464c-114.87 0-208-93.13-208-208S141.13 48 256 48s208 93.13 208 208-93.13 208-208 208z" />
        </svg>
      )
    },
    {
      name: t("Motion Graphics", "Grafis Gerak"),
      sub: t("Animated Assets", "Aset Animasi"),
      href: "/showcase",
      icon: (
        <svg viewBox="0 0 576 512" width="24" height="24" className="fill-current">
          <path d="M0 128C0 92.65 28.65 64 64 64h448c35.35 0 64 28.65 64 64v256c0 35.35-28.65 64-64 64H64c-35.35 0-64-28.65-64-64V128zm48 256c0 8.84 7.16 16 16 16h448c8.84 0 16-7.16 16-16V128c0-8.84-7.16-16-16-16H64c-8.84 0-16 7.16-16 16v256zm128-192c0-17.67 14.33-32 32-32h160c17.67 0 32 14.33 32 32v128c0 17.67-14.33 32-32 32H208c-17.67 0-32-14.33-32-32V192z" />
        </svg>
      )
    },
  ];

  const showcaseDiscover = [
    { name: t("View All Projects", "Lihat Semua Proyek"), href: "/showcase" },
    { name: t("Latest Collection 2026", "Koleksi Terbaru 2026"), href: "/showcase" },
    { name: t("Award-Winning Works", "Karya Pemenang Penghargaan"), href: "/showcase" },
    { name: t("Client Testimonials", "Testimoni Klien"), href: "/showcase" },
    { name: t("Request Custom Work", "Pesan Karya Kustom"), href: "/contact" },
  ];

  // Leadership mega menu data with icons
  const leadershipItems = [
    {
      name: t("Executive", "Eksekutif"),
      sub: t("Board of Directors", "Dewan Direksi"),
      href: "/management/executive",
      icon: (
        <svg viewBox="0 0 448 512" width="24" height="24" className="fill-current">
          <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-48-48-48 48-47.8-191.4c-9.1-1.7-18.1-1.7-27.2 0L96 480l-48-48-48 48 47.8-191.4c-9.6-1.8-19.3-1.8-28.9 0C8.5 290.4 0 305.5 0 322.4V448c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V322.4c0-16.9-8.5-32-19.1-33.8z" />
        </svg>
      )
    },
    {
      name: t("Creative Director", "Direktur Kreatif"),
      sub: t("Art & Vision", "Seni & Visi"),
      href: "/management/creative",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-15.6 70.2-40.1 94.8s-58.3 39.7-94.8 40.1c-.9 0-1.8 0-2.7 0H256c-4.4 0-8-3.6-8-8c0-1.6 .5-3.2 1.4-4.5l64-89.6c1.2-1.7 3.2-2.7 5.3-2.7h81.3c2.1 0 4.1-1 5.3-2.7l64-89.6c1.2-1.7 1.4-3.9 .5-5.8s-2.8-3.1-4.8-3.1H312c-4.4 0-8-3.6-8-8s3.6-8 8-8h163.7c4.4 0 8 3.6 8 8c0 1.6-.5 3.2-1.4 4.5l-64 89.6c-1.2 1.7-3.2 2.7-5.3 2.7H331.7c-2.1 0-4.1 1-5.3 2.7l-64 89.6c-1.2 1.7-1.4 3.9-.5 5.8s2.8 3.1 4.8 3.1H496c8.8 0 16 7.2 16 16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V312c0-35.3-28.7-64-64-64H312c-4.4 0-8 3.6-8 8s3.6 8 8 8H448c8.8 0 16 7.2 16 16v136c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16s16 7.2 16 16v136.1c0 1.4 0 2.8 .1 4.1c.6 17.2 7.7 33 19.1 44.4s27.2 18.4 44.4 19.1c1.3 0 2.7 .1 4.1 .1H256c4.4 0 8-3.6 8-8s-3.6-8-8-8H131.7c-17.2-.6-33-7.7-44.4-19.1s-18.4-27.2-19.1-44.4c0-1.3-.1-2.7-.1-4.1V64z" />
        </svg>
      )
    },
    {
      name: t("Production Lead", "Kepala Produksi"),
      sub: t("Project Management", "Manajemen Proyek"),
      href: "/management/production",
      icon: (
        <svg viewBox="0 0 640 512" width="24" height="24" className="fill-current">
          <path d="M480 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM240 240V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 17.7 14.3 32 32 32s32-14.3 32-32zm400 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V272zM400 480V272c0-17.7-14.3-32-32-32s-32 14.3-32 32V480c0 17.7 14.3 32 32 32s32-14.3 32-32zm-240 0V272c0-17.7-14.3-32-32-32s-32 14.3-32 32V480c0 17.7 14.3 32 32 32s32-14.3 32-32zM16 512h608c8.8 0 16-7.2 16-16s-7.2-16-16-16H16c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
        </svg>
      )
    },
    {
      name: t("Brand Strategist", "Ahli Strategi"),
      sub: t("Market Analysis", "Analisis Pasar"),
      href: "/management/strategy",
      icon: (
        <svg viewBox="0 0 448 512" width="24" height="24" className="fill-current">
          <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM320 176c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48h-32c-26.5 0-48-21.5-48-48V176z" />
        </svg>
      )
    },
    {
      name: t("Technical Division", "Divisi Teknis"),
      sub: t("Digital Logic", "Logika Digital"),
      href: "/management/technical",
      icon: (
        <svg viewBox="0 0 640 512" width="24" height="24" className="fill-current">
          <path d="M392.8 1.2c-17.1-1.7-32.6 10.3-34.4 27.4c-1.8 17.1 10.1 32.6 27.2 34.4C448.9 69.2 512 110.1 512 176c0 14.8-3.1 27.7-8.1 38.6c-5.1 10.9-12.8 20.3-22.1 28.1s-19.9 14.3-31 18.5s-23 6.6-34.8 6.8c-12.1-.2-23.7-2.6-34.8-6.8s-21.7-10.7-31-18.5s-17-17.2-22.1-28.1s-8.1-23.8-8.1-38.6c0-65.9 63.1-106.8 126.4-113c17.1-1.8 29-17.3 27.2-34.4c-1.8-17.1-17.3-29-34.4-27.2C130.6 22 0 152.1 0 312c0 16 12.8 28.8 28.8 28.8H512c16 0 28.8-12.8 28.8-28.8c0-104.9-56.1-196-148-243.6-.1-.1-.1-.1-.2-.1C392.7 6.4 392.7 3.8 392.8 1.2zM256 128a128 128 0 1 0 0 256 128 128 0 1 0 0-256zM512 448H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H512c17.7 0 32-14.3 32-32s-14.3-32-32-32z" />
        </svg>
      )
    },
    {
      name: t("Quality Assurance", "Jaminan Mutu"),
      sub: t("Standards & Review", "Standar & Peninjauan"),
      href: "/management",
      icon: (
        <svg viewBox="0 0 512 512" width="24" height="24" className="fill-current">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
      )
    },
  ];

  const leadershipDiscover = [
    { name: t("Meet the Full Team", "Kenali Tim Lengkap"), href: "/management" },
    { name: t("Our Company Culture", "Budaya Perusahaan Kami"), href: "/about" },
    { name: t("Career Opportunities", "Peluang Karir"), href: "/company/careers" },
    { name: t("Partnership Program", "Program Kemitraan"), href: "/contact" },
  ];

  const navLinks = [
    { name: t("Home", "Beranda"), href: "/" },
    { name: t("Showcase", "Galeri"), href: "/showcase", dropdown: "showcase" },
    { name: t("Our Leadership", "Kepemimpinan"), href: "/management", dropdown: "leadership" },
    { name: t("About", "Tentang"), href: "/about" },
  ];

  const renderMegaDropdown = (
    items: typeof showcaseItems,
    discoverLinks: typeof showcaseDiscover,
    label: string,
    badgeIndices: number[] = []
  ) => (
    <div
      className="absolute top-full left-0 w-full bg-white backdrop-blur-[40px] border-b border-gray-100 shadow-2xl z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-1"
      onMouseEnter={() => handleDropdownEnter(activeDropdown!)}
      onMouseLeave={handleDropdownLeave}
    >
      {/* Dark scrim behind */}
      <div className="fixed inset-0 top-full bg-black/10 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-10 py-10">
        <div className="flex gap-16">
          {/* Left: Icon Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-x-6 gap-y-8">
              {items.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex flex-col items-center text-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all"
                >
                  <div className="relative">
                    {badgeIndices.includes(idx) && (
                      <span className="absolute -top-2 -left-2 text-[8px] font-black text-[#4F46E5] uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded">
                        {t("NEW", "BARU")}
                      </span>
                    )}
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-lg flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 border border-gray-100 group-hover:border-gray-200">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-gray-800 group-hover:text-[#4F46E5] transition-colors leading-tight">{item.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{item.sub}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Discover Links */}
          <div className="w-[260px] border-l border-gray-100 pl-10">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-5 block">
              {t("DISCOVER", "JELAJAHI")}
            </span>
            <div className="flex flex-col gap-1">
              {discoverLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group py-2.5 text-[13px] font-medium text-gray-600 hover:text-[#4F46E5] transition-colors flex items-center gap-2"
                >
                  <span>{link.name}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 w-full z-[100]">
      <Announcement />
      <nav className="w-full bg-white md:bg-white/40 md:backdrop-blur-2xl border-b border-gray-100 py-3 md:py-4 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 max-w-7xl mx-auto relative h-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#4F46E5] rounded-sm transform rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#10B981] rounded-sm transform rotate-12 group-hover:-rotate-12 transition-transform duration-500"></div>
                <div className="absolute center w-3 h-3 md:w-3.5 md:h-3.5 bg-[#F59E0B] rounded-sm transform rotate-12 group-hover:scale-110 transition-transform duration-500"></div>
              </div>
              <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-[#111]">Vectorpic</span>
            </Link>
          </div>

          {/* Centered Desktop Menu */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 h-full">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                  if (link.dropdown) handleDropdownEnter(link.dropdown);
                }}
                onMouseLeave={() => {
                  if (link.dropdown) handleDropdownLeave();
                }}
              >
                <Link
                  href={link.href}
                  className={`text-xs md:text-sm font-bold tracking-tight transition-all relative group flex items-center gap-1 ${pathname.startsWith(link.href) && link.href !== '/' || pathname === link.href ? "text-black" : "text-gray-400 hover:text-black"
                    }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                  )}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${(pathname.startsWith(link.href) && link.href !== '/' || pathname === link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 transition-all text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-600 hover:text-black"
              title={t("Switch to Indonesian", "Ganti ke Bahasa Inggris")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="4" ry="10" />
                <path d="M2 12h20" />
              </svg>
              <span>{lang === 'en' ? 'EN' : 'ID'}</span>
            </button>

            <Link href="/contact" className="text-xs md:text-sm font-bold text-gray-400 hover:text-black transition-colors hidden sm:block">
              {t("Contact", "Kontak")}
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-black focus:outline-none"
            >
              <div className="w-5 h-4 sm:w-6 sm:h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* ═══════════ Full-Width Mega Dropdown (Desktop Only) ═══════════ */}
        {activeDropdown === 'showcase' && (
          renderMegaDropdown(showcaseItems, showcaseDiscover, "showcase", [0, 4])
        )}
        {activeDropdown === 'leadership' && (
          renderMegaDropdown(leadershipItems, leadershipDiscover, "leadership", [1])
        )}
      </nav>

      <div className={`fixed inset-0 bg-white z-200 transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl sm:text-3xl font-black tracking-tighter text-black hover:text-[#4F46E5] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-lg sm:text-xl font-bold text-gray-400 mt-2 sm:mt-4"
          >
            {t("Contact Us", "Hubungi Kami")}
          </Link>

          {/* Language Toggle in Mobile */}
          <button
            onClick={toggleLang}
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-sm font-black uppercase tracking-widest text-gray-500 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <ellipse cx="12" cy="12" rx="4" ry="10" />
              <path d="M2 12h20" />
            </svg>
            {lang === 'en' ? 'Switch to Indonesian' : 'Ganti ke English'}
          </button>
        </div>
      </div>
    </header>
  );
}
