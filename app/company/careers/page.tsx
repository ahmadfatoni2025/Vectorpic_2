import { Navbar } from "../../ui/Navbar";
import { Footer } from "../../ui/footer";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-center">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-40 flex flex-col items-center justify-center">
        <span className="text-xs font-black tracking-widest text-[#F59E0B] uppercase mb-8 block italic">/ COMPANY /</span>
        <h1 className="text-5xl md:text-9xl font-black text-black tracking-tighter leading-none mb-12">
          Global <br /> <span className="bg-[#F59E0B] text-white px-6 py-2 rounded-sm rotate-1 inline-block">Careers</span>
        </h1>
        <p className="max-w-xl text-gray-400 font-bold text-xl leading-relaxed mt-4">
          Join a family that values artistic excellence and technical innovation.
        </p>
      </div>
      <Footer />
    </main>
  );
}
