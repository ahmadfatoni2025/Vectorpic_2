import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function PosterPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-black tracking-[0.4em] text-emerald-300 uppercase mb-8 italic">/ SHOWCASE /</span>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10">
          Visual <br /> <span className="text-[#10B981] rotate-[2deg] inline-block">Artistry</span>
        </h1>
        <p className="max-w-2xl text-gray-400 font-bold text-xl leading-relaxed">
          The art of storytelling through sophisticated poster designs.
        </p>
      </div>
      <Footer />
    </main>
  );
}
