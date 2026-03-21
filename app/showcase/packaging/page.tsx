import { Navbar } from "../../ui/Navbar";
import { Footer } from "../../ui/footer";

export default function PackagingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-black tracking-[0.4em] text-amber-300 uppercase mb-8 italic">/ SHOWCASE /</span>
        <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10">
          Signature <br /> <span className="text-[#F59E0B] rotate-[2deg] inline-block">Packaging</span>
        </h1>
        <p className="max-w-2xl text-gray-400 font-bold text-xl leading-relaxed">
          Strategic product identities and mascot evolution.
        </p>
      </div>
      <Footer />
    </main>
  );
}
