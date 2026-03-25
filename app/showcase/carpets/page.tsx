import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function CarpetsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-black tracking-[0.4em] text-indigo-300 uppercase mb-8 italic">/ SHOWCASE /</span>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10">
          Premium <br /> <span className="text-[#4F46E5] rotate-[-2deg] inline-block">Textiles</span>
        </h1>
        <p className="max-w-2xl text-gray-400 font-bold text-xl leading-relaxed">
          Bespoke carpets designed for top-tier architectural spaces.
        </p>
      </div>
      <Footer />
    </main>
  );
}
