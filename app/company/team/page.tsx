import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-40">
        <span className="text-xs font-black tracking-widest text-[#10B981] uppercase mb-8 block italic">/ COMPANY /</span>
        <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-12">
          The Creative <br /> <span className="text-[#10B981] rotate-[-2deg] inline-block">Elite Team</span>
        </h1>
        <p className="max-w-xl text-gray-400 font-bold text-xl leading-relaxed mt-4">
          A global studio of designers, art directors, and technical leads.
        </p>
      </div>
      <Footer />
    </main>
  );
}
