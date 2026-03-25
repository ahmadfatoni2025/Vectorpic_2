import { Navbar } from "../components/layout/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-black tracking-[0.3em] text-[#3B82F6] uppercase mb-6 animate-pulse">
            / SECTION IN PROGRESS /
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-8">
          About <br /> <span className="text-gray-200 italic">Vectorpic.id</span>
        </h1>
        <p className="max-w-xl text-gray-500 text-lg leading-relaxed">
          We're currently crafting a deep dive into our vision for digital art and technology. 
          Stay tuned as we reveal the story behind our craft.
        </p>
        <div className="mt-12 flex gap-4">
             <div className="w-3 h-3 bg-[#4F46E5] rounded-full animate-bounce delay-0"></div>
             <div className="w-3 h-3 bg-[#10B981] rounded-full animate-bounce delay-150"></div>
             <div className="w-3 h-3 bg-[#F59E0B] rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </main>
  );
}
