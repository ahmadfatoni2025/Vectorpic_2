import { Navbar } from "../../ui/Navbar";

export default function CreativeDirectorPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-black tracking-[0.3em] text-[#10B981] uppercase mb-6">
            / LEADERSHIP /
        </span>
        <h1 className="text-4xl md:text-8xl font-black text-black tracking-tighter leading-none mb-8">
          Creative <br /> <span className="bg-[#10B981] text-white px-4 md:px-8 py-2 rounded-sm rotate-[-1deg] inline-block shadow-xl">Director</span>
        </h1>
        <p className="max-w-xl text-gray-400 font-bold text-lg leading-relaxed mt-4">
          The art and aesthetic visionaries leading our creative studio.
        </p>
      </div>
    </main>
  );
}
