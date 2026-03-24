"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { Button } from "./Button";
import { useLanguage } from "../context/LanguageContext";
import Announcement from "./announcement";
import { gsap } from "gsap";
import {
  Menu,
  X,
  ArrowLeft,
  ChevronDown,
  Globe,
  Layers,
  Shapes,
  Grid3X3,
  Package,
  BadgeCheck,
  Monitor,
  PenTool,
  Video,
  Briefcase,
  Palette,
  Settings,
  BarChart3,
  Code,
  ShieldCheck,
  LayoutGrid
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const { lang, toggleLang, t } = useLanguage();

  // --- Staggered Menu Logic ---
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const position: 'left' | 'right' = 'right';
  const colors = ['#B19EEF', '#4F46E5', '#10B981']; // Adapted from user and project colors
  const menuButtonColor = '#000';
  const openMenuButtonColor = '#000';
  const changeMenuColorOnOpen = false;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === left() ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity text' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === left() ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });

    function left() {
      return 'left';
    }
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setIsOpen(target);

    if (target) {
      playOpen();
    } else {
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setIsOpen(false);
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText]);
  // --- End of Staggered Menu Logic ---

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
      name: t("Vector Art", "Seni Vektor"),
      sub: t("Scalable Assets", "Aset Skalabel"),
      href: "/showcase?category=Vector%20Art",
      icon: <Shapes className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Branding", "Pencitraan"),
      sub: t("Identity & Strategy", "Identitas & Strategi"),
      href: "/showcase?category=Branding",
      icon: <BadgeCheck className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("UI/UX Design", "Desain UI/UX"),
      sub: t("Digital Experience", "Pengalaman Digital"),
      href: "/showcase?category=UI/UX%20Design",
      icon: <Monitor className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Packaging", "Kemasan"),
      sub: t("Product Display", "Tampilan Produk"),
      href: "/showcase?category=Packaging",
      icon: <Package className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Illustration", "Ilustrasi"),
      sub: t("Digital Artwork", "Karya Seni Digital"),
      href: "/showcase?category=Illustration",
      icon: <PenTool className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Motion Graphics", "Grafis Gerak"),
      sub: t("Animated Motion", "Gerakan Animasi"),
      href: "/showcase?category=Motion",
      icon: <Video className="w-6 h-6 text-gray-700" />
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
      icon: <Briefcase className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Creative Director", "Direktur Kreatif"),
      sub: t("Art & Vision", "Seni & Visi"),
      href: "/management/creative",
      icon: <Palette className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Production Lead", "Kepala Produksi"),
      sub: t("Project Management", "Manajemen Proyek"),
      href: "/management/production",
      icon: <Settings className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Brand Strategist", "Ahli Strategi"),
      sub: t("Market Analysis", "Analisis Pasar"),
      href: "/management/strategy",
      icon: <BarChart3 className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Technical Division", "Divisi Teknis"),
      sub: t("Digital Logic", "Logika Digital"),
      href: "/management/technical",
      icon: <Code className="w-6 h-6 text-gray-700" />
    },
    {
      name: t("Quality Assurance", "Jaminan Mutu"),
      sub: t("Standards & Review", "Standar & Peninjauan"),
      href: "/management",
      icon: <ShieldCheck className="w-6 h-6 text-gray-700" />
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
      className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-1"
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
                      <span className="absolute -top-2 -left-2 text-[8px] font-black text-[#4F46E5] uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded z-150">
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
      <nav className="w-full bg-white border-b border-gray-100 py-3 md:py-4 shadow-sm">
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
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`} />
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
              <Globe className="w-3.5 h-3.5 opacity-60" />
              <span>{lang === 'en' ? 'EN' : 'ID'}</span>
            </button>

            <Link href="/contact" className="text-xs md:text-sm font-bold text-gray-400 hover:text-black transition-colors hidden sm:block">
              {t("Contact", "Kontak")}
            </Link>

            {/* Mobile Toggle */}
            <button
              ref={toggleBtnRef}
              className={`lg:hidden sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-bold leading-none overflow-visible pointer-events-auto ${isOpen ? 'text-black' : 'text-black'
                }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              <span
                className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"
                aria-hidden="true"
              >
                <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                  {textLines.map((l, i) => (
                    <span className="sm-toggle-line block h-[1em] leading-none text-[10px] uppercase tracking-widest" key={i}>
                      {t(l, l === 'Menu' ? 'Menu' : 'Tutup')}
                    </span>
                  ))}
                </span>
              </span>

              <span
                ref={iconRef}
                className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
                aria-hidden="true"
              >
                <span
                  ref={plusHRef}
                  className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
                />
                <span
                  ref={plusVRef}
                  className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
                />
              </span>
            </button>
          </div>
        </div>

        {/* ═══════════ Staggered Menu Panel (Mobile & Tablet) ═══════════ */}
        <div className="sm-scope lg:hidden">
          <div
            className="staggered-menu-wrapper pointer-events-none fixed inset-0 w-full h-full z-[1001]"
            style={{ '--sm-accent': '#4F46E5' } as React.CSSProperties}
            data-position="right"
            data-open={isOpen || undefined}
          >
            <div
              ref={preLayersRef}
              className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5] w-full"
              aria-hidden="true"
            >
              {colors.map((c, i) => (
                <div
                  key={i}
                  className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                  style={{ background: c }}
                />
              ))}
            </div>

            <aside
              id="staggered-menu-panel"
              ref={panelRef}
              className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto w-full"
              style={{ WebkitBackdropFilter: 'blur(12px)' }}
              aria-hidden={!isOpen}
            >
              <div className="sm-panel-inner flex-1 flex flex-col items-center justify-center relative pt-[4em]">
                {/* Back Button */}
                <div className="absolute top-0 left-0 w-full flex justify-start px-4 py-8">
                  <button
                    onClick={closeMenu}
                    className="flex items-center gap-3 group transition-all"
                  >
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                      <ArrowLeft className="w-5 h-5 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                      {t("Back", "Kembali")}
                    </span>
                  </button>
                </div>

                <ul
                  className="sm-panel-list list-none m-0 p-0 flex flex-col gap-4 text-center"
                  role="list"
                  data-numbering={true}
                >
                  {navLinks.map((link, idx) => (
                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={link.name + idx}>
                      <Link
                        className="sm-panel-item relative text-black font-black text-[3rem] sm:text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline"
                        href={link.href}
                        onClick={closeMenu}
                        data-index={idx + 1}
                      >
                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none">
                    <Link
                      className="sm-panel-item relative text-black font-black text-[3rem] sm:text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline"
                      href="/contact"
                      onClick={closeMenu}
                      data-index={navLinks.length + 1}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {t("Contact", "Kontak")}
                      </span>
                    </Link>
                  </li>
                </ul>

                <div className="sm-socials mt-8 flex flex-col gap-4 items-center">
                  <h3 className="sm-socials-title m-0 text-sm font-black uppercase tracking-[0.2em] text-[#4F46E5]">{t("Options", "Pilihan")}</h3>
                  <div className="flex flex-col gap-4 items-center">
                    {/* Language Toggle in Mobile Panel */}
                    <button
                      onClick={() => {
                        toggleLang();
                        // Optional: closeMenu();
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all bg-white"
                    >
                      <Globe className="w-4.5 h-4.5" />
                      {lang === 'en' ? 'Switch to Indonesian' : 'Ganti ke English'}
                    </button>

                    <div className="flex gap-4">
                      <a href="#" className="sm-socials-link text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Instagram</a>
                      <a href="#" className="sm-socials-link text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Behance</a>
                      <a href="#" className="sm-socials-link text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Dribbble</a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <style>{`
          .sm-scope .staggered-menu-wrapper { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 1001; pointer-events: none; }
          .sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: black; font-weight: 700; line-height: 1; overflow: visible; }
          .sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.1em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
          .sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
          .sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
          .sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
          .sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
          .sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: 100%; height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }
          .sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: 100%; pointer-events: none; z-index: 5; }
          .sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
          .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
          .sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 0.8; }
          .sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 900; line-height: 0.8; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; }
          .sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
          .sm-scope .sm-panel-item:hover { color: #4F46E5; }
          .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
          .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0; right: -1.2em; font-size: 14px; font-weight: 900; color: #4F46E5; letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
          .sm-scope .sm-socials-link { transition: color 0.3s ease; }
          .sm-scope [data-open] .sm-logo-img { filter: invert(0%); }
        `}</style>

        {/* ═══════════ Full-Width Mega Dropdown (Desktop Only) ═══════════ */}
        {activeDropdown === 'showcase' && (
          renderMegaDropdown(showcaseItems, showcaseDiscover, "showcase", [0, 4])
        )}
        {activeDropdown === 'leadership' && (
          renderMegaDropdown(leadershipItems, leadershipDiscover, "leadership", [1])
        )}
      </nav>

    </header>
  );

  function left() {
    return 'left';
  }
}


