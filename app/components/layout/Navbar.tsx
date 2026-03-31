"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ChevronDown,
  Search,
  Zap,
} from "lucide-react";
import { showcaseItems, showcaseDiscover, leadershipItems, leadershipDiscover } from "./NavbarData";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [prevDropdown, setPrevDropdown] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  const dropdownOrder = ["showcase", "leadership"];

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    if (activeDropdown && activeDropdown !== dropdown) {
      setPrevDropdown(activeDropdown);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
      setPrevDropdown(null);
    }, 150);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Showcase", href: "/showcase", dropdown: "showcase" },
    { name: "Management", href: "/management", dropdown: "leadership" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
  ];

  const getDirection = () => {
    if (!prevDropdown || !activeDropdown) return 0;
    const prevIdx = dropdownOrder.indexOf(prevDropdown);
    const currIdx = dropdownOrder.indexOf(activeDropdown);
    if (prevIdx === -1 || currIdx === -1) return 0;
    return currIdx > prevIdx ? 1 : -1;
  };

  const renderMegaDropdown = (
    items: typeof showcaseItems,
    discoverLinks: typeof showcaseDiscover,
    type: "showcase" | "leadership" | "community"
  ) => {
    const direction = getDirection();

    return (
      <motion.div
        key="dropdown-container"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-4xl border border-gray-100 shadow-2xl z-50 overflow-hidden hidden lg:block"
        onMouseEnter={() => handleDropdownEnter(activeDropdown!)}
        onMouseLeave={handleDropdownLeave}
      >
        <motion.div
          key={type}
          initial={{ opacity: 0, x: direction > 0 ? 20 : direction < 0 ? -20 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -20 : direction < 0 ? 20 : 0 }}
          transition={{ duration: 0.25, ease: "circOut" }}
          className="flex divide-x divide-gray-50 h-[480px]"
        >
          {/* Left Column: Grid */}
          <div className="flex-1 p-8 grid grid-cols-2 gap-x-8 gap-y-2">
            <div className="col-span-1">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-4">
                {type === "showcase" ? "GALLERY" : type === "leadership" ? "LEADERSHIP" : "COMMUNITY"}
              </h3>
              <div className="flex flex-col gap-1">
                {items.slice(0, 4).map((item) => (
                  <Link key={item.name} href={item.href} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all text-gray-600">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 leading-tight mb-1">{item.name}</span>
                      <span className="text-[11px] text-gray-400 leading-snug">{item.sub}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-4">
                {type === "showcase" ? "DISCOVER" : type === "leadership" ? "DIVISIONS" : "RESOURCES"}
              </h3>
              <div className="flex flex-col gap-1">
                {items.slice(4).map((item) => (
                  <Link key={item.name} href={item.href} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all text-gray-600">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 leading-tight mb-1">{item.name}</span>
                      <span className="text-[11px] text-gray-400 leading-snug">{item.sub}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Section */}
          <div className="w-[320px] bg-gray-50/50 p-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">WHAT'S NEW</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 mb-6 flex items-center justify-center">
              <div className="absolute inset-0" />
              <img
                src={type === 'showcase'
                  ? "https://i.pinimg.com/originals/00/05/e1/0005e1c3aab875cb48ef130c55533cbb.gif"
                  : type === 'leadership'
                    ? "https://i.pinimg.com/originals/22/09/5d/22095d8fd02905f537e78a507c7536e0.gif"
                    : "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hpeXR6Z3g5Z3g5Z3g5Z3g5Z3g5Z3g5Z3g5Z3g5Z3g5Z3gmbnA9MSZscD0x/3o7TKVUn7iM8FMEU24/giphy.gif"}
                alt={type === 'showcase' ? "Img showcase" : "Img leadership"}
                className='w-full h-full object-cover'
              />
              {/* <Zap className="w-10 h-10 text-indigo-500 animate-pulse relative z-10" /> */}
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{type === 'showcase' ? 'Visual Flow Builder' : type === 'leadership' ? 'New Strategic Pillar' : 'Community Feed'}</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              {type === 'showcase'
                ? "Build websites through a visual flow where every section connects seamlessly."
                : type === 'leadership'
                  ? "How our new high-value leadership layers lead to assigned success."
                  : "Join over 50,000 creators sharing thoughts and assets daily."}
            </p>
            <div className="space-y-3">
              {discoverLinks.slice(0, 3).map(link => (
                <Link key={link.name} href={link.href} className="block text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors">
                  {link.name} →
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: visible ? 0 : -120,
        opacity: visible ? 1 : 0
      }}
      transition={{
        duration: 0.6,
        ease: [0.8, 1, 0.36, 1]
      }}
      className="fixed top-0 w-full z-100 px-4 sm:px-6 pt-4 sm:pt-6 flex flex-col items-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-7xl flex flex-col items-center gap-4">

        <nav className="relative w-full bg-white border border-gray-100 px-4 sm:px-6 py-2.5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center justify-between pointer-events-auto h-16 sm:h-20">

          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group mr-12 shrink-0">
              <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <div className="absolute top-0 left-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#4F46E5] rounded-sm transform rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#10B981] rounded-sm transform rotate-12 group-hover:-rotate-12 transition-transform duration-500"></div>
                <div className="absolute center w-3 h-3 md:w-3.5 md:h-3.5 bg-[#F59E0B] rounded-sm transform rotate-12 group-hover:scale-110 transition-transform duration-500"></div>
              </div>
              <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-[#111]">Vectorpic</span>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 items-center gap-1 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const isActive = (pathname.startsWith(link.href) && link.href !== '/') || pathname === link.href;
              return (
                <div
                  key={link.name}
                  className="relative group flex items-center"
                  onMouseEnter={() => {
                    if (link.dropdown) handleDropdownEnter(link.dropdown);
                  }}
                  onMouseLeave={() => {
                    if (link.dropdown) handleDropdownLeave();
                  }}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-tight transition-all flex items-center gap-1 whitespace-nowrap ${isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="hidden md:flex w-10 h-10 items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link href="/auth/user/login" className="px-8 py-3 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center gap-2">Login</Link>

            <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-1002 bg-white rounded-full ml-2 shadow-sm border border-gray-100" onClick={() => setIsOpen(!isOpen)}>
              <span className={`w-4 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-4 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeDropdown === 'showcase' && renderMegaDropdown(showcaseItems, showcaseDiscover, "showcase")}
            {activeDropdown === 'leadership' && renderMegaDropdown(leadershipItems, leadershipDiscover, "leadership")}
          </AnimatePresence>

        </nav>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/80 backdrop-blur-xl z-1000 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-white shadow-2xl z-1001 lg:hidden p-8 pt-32 overflow-y-auto"
              >
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-4xl font-black text-gray-900 tracking-tight hover:text-indigo-600 transition-colors" onClick={() => setIsOpen(false)}>
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-20 pt-10 border-t border-gray-100">@
                  <div className="flex flex-col gap-6">
                    <Link href="/contact" className="text-xl font-black text-gray-900 tracking-tight" onClick={() => setIsOpen(false)}>
                      Contact Us
                    </Link>
                    <Link href="/about" className="text-xl font-black text-gray-900 tracking-tight" onClick={() => setIsOpen(false)}>
                      Our Story
                    </Link>
                    <Link href="/auth/user/login" className="px-6 py-4 bg-gray-900 text-white rounded-2xl text-center text-sm font-black uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
