import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function GraphicsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-8 italic">/ SHOWCASE /</span>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10">
          Digital <br /> <span className="text-zinc-500 rotate-[-1deg] inline-block">Assets</span>
        </h1>
        <p className="max-w-2xl text-gray-400 font-bold text-xl leading-relaxed">
          Logos, brand guidebooks, and creative graphic resources.
        </p>
      </div>
      <Footer />
    </main>
  );
}
