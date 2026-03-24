import { LayoutGrid, Palette, Box, Smartphone, Play, Zap, ShieldCheck, Briefcase, Globe, Target, Terminal, Camera, Layers, Users } from "lucide-react";

export const showcaseItems = [
  { name: "Vector Art", icon: <Palette className="w-5 h-5" />, sub: "Premium vector illustrations", href: "/showcase?category=Vector%20Art" },
  { name: "Branding", icon: <Zap className="w-5 h-5" />, sub: "Modern visual identity", href: "/showcase?category=Branding" },
  { name: "UI/UX Design", icon: <Smartphone className="w-5 h-5" />, sub: "Digital experience design", href: "/showcase?category=UI/UX%20Design" },
  { name: "Illustration", icon: <Palette className="w-5 h-5" />, sub: "Bespoke digital artwork", href: "/showcase?category=Illustration" },
  { name: "Motion", icon: <Play className="w-5 h-5" />, sub: "Engaging animation", href: "/showcase?category=Motion" },
  { name: "Packaging", icon: <Box className="w-5 h-5" />, sub: "Luxury product packaging", href: "/showcase?category=Packaging" },
];

export const showcaseDiscover = [
  { name: "Latest Works", href: "/showcase" },
  { name: "Popular Assets", href: "/showcase" },
  { name: "Our Process", href: "/about" },
];

export const leadershipItems = [
  { name: "Executive", icon: <ShieldCheck className="w-5 h-5" />, sub: "Company board & vision", href: "/management/executive" },
  { name: "Creative", icon: <Palette className="w-5 h-5" />, sub: "Artistic direction", href: "/management/creative" },
  { name: "Technical", icon: <Terminal className="w-5 h-5" />, sub: "Systems & Engineering", href: "/management/technical" },
  { name: "Strategy", icon: <Globe className="w-5 h-5" />, sub: "Market & Growth", href: "/management/strategy" },
  { name: "Production", icon: <Briefcase className="w-5 h-5" />, sub: "Execution lead", href: "/management/production" },
  { name: "Operations", icon: <Target className="w-5 h-5" />, sub: "Efficiency & Quality", href: "/management" },
];

export const leadershipDiscover = [
  { name: "Meet the Team", href: "/management" },
  { name: "Join Us", href: "/company/careers" },
  { name: "Strategic Partners", href: "/about" },
];
