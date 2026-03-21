import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/footer";

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-black tracking-[0.4em] text-gray-300 uppercase mb-8 italic">/ CURATED WORKS /</span>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10">
          Selected <br /> <span className="text-[#10B981] rotate-[-2deg] inline-block">Artworks</span>
        </h1>
        <div className="w-16 h-1 bg-black rounded-full mb-10"></div>
        <p className="max-w-2xl text-gray-400 font-bold text-xl leading-relaxed">
          Exploring the boundaries of sophisticated aesthetics and performance.
        </p>
      </div>
      <Footer />
    </main>
  );
}
