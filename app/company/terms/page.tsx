import { Navbar } from "../../ui/Navbar";
import { Footer } from "../../ui/footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-40">
        <h1 className="text-5xl font-black text-black tracking-tighter leading-none mb-12">
          Terms & Condition
        </h1>
        <div className="text-gray-400 font-bold text-lg leading-relaxed flex flex-col gap-8">
            <p>Collaborating degan Vectorpic means agreeing to our studio guidelines for artistic and technical excellence.</p>
            <p>Project timelines and deliverables are defined per contract agreeement.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
