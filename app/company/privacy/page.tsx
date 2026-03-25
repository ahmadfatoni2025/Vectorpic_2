import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-40">
        <h1 className="text-5xl font-black text-black tracking-tighter leading-none mb-12">
          Privacy Policy
        </h1>
        <div className="text-gray-400 font-bold text-lg leading-relaxed flex flex-col gap-8">
            <p>Your privacy is non-negotiable at Vectorpic. We store minimal data to provide you degan the best artistic experience.</p>
            <p>We do not share your project details or contact information degan third parties without explicit consent.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
