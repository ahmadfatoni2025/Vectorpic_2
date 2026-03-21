import { Navbar } from "../ui/Navbar";

export default function ManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-black tracking-[0.3em] text-[#F59E0B] uppercase mb-6 animate-pulse">
            / LEADERSHIP IN PROGRESS /
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-8">
          The <br /> <span className="bg-[#F59E0B] text-white px-4 md:px-8 py-2 rounded-sm rotate-[1deg] inline-block shadow-xl underline-offset-8">Leadership</span>
        </h1>
        <p className="max-w-xl text-gray-500 text-lg leading-relaxed mt-4">
          A introduction to the visionaries driving Vectorpic’s mission forward.
          Our management team’s full profile will be available soon.
        </p>
        <div className="mt-16 flex gap-12 opacity-30">
             {[...Array(3)].map((_, i) => (
                 <div key={i} className="flex flex-col gap-4 items-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full animate-pulse border-2 border-gray-100"></div>
                      <div className="w-20 h-4 bg-gray-100 rounded-full animate-pulse"></div>
                 </div>
             ))}
        </div>
      </div>
    </main>
  );
}
