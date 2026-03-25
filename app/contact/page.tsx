import { Navbar } from "../components/layout/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-black tracking-[0.3em] text-[#4F46E5] uppercase mb-6 animate-pulse">
            / ENQUIRIES OPEN /
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none mb-8">
          Get in <br /> <span className="bg-[#4F46E5] text-white px-4 md:px-8 py-2 rounded-sm rotate-[-1deg] inline-block shadow-xl">Contact</span>
        </h1>
        <p className="max-w-xl text-gray-500 text-lg leading-relaxed mt-4">
          Ready to start your next digital masterpiece? Our team is standing by to help you bring your ideas to life. 
          The full contact form and details will be live here very soon.
        </p>
        <div className="mt-16 w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40 text-left">
             <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="w-3/4 h-3 bg-gray-100 rounded-full animate-pulse"></div>
             </div>
             <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="w-3/4 h-3 bg-gray-100 rounded-full animate-pulse"></div>
             </div>
        </div>
      </div>
    </main>
  );
}
