import { Navbar } from "../ui/Navbar";

export default function ShowcasePage() {
  const categories = [
    { name: "All Projects", href: "/showcase" },
    { name: "Poster Design", href: "/showcase/visual-artistry" },
    { name: "Bespoke Carpets", href: "/showcase/premium-textiles" },
    { name: "Signature Packaging", href: "/showcase/strategic-packaging" },
    { name: "Graphic Assets", href: "/showcase/brand-identity" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#10B981] uppercase mb-6 inline-block">
            / EXHIBITION /
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-black tracking-tighter leading-none mb-12">
            Curated <span className="bg-[#10B981] text-white px-4 md:px-8 py-2 rounded-sm rotate-[-1deg] inline-block shadow-xl">Works</span>
          </h1>

          {/* In-Page Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-100 pb-4">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className={`text-xs md:text-sm font-bold transition-all relative whitespace-nowrap uppercase tracking-wider ${cat.href === '/showcase' ? "text-[#10B981]" : "text-gray-400 hover:text-black"}`}
              >
                {cat.name}
                {cat.href === '/showcase' && (
                  <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-[#10B981] rounded-t-full transition-all" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="group relative aspect-[4/5] bg-gray-50 rounded-[2rem] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-8 left-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <span className="text-[#10B981] text-[10px] font-black uppercase tracking-widest">Category</span>
                <h3 className="text-white text-xl font-black tracking-tight">Project Name</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
