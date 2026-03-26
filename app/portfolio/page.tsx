import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MasonryGrid from "@/components/MasonryGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | Nitro Photographie — Dakar, Sénégal",
  description:
    "Explorez notre portfolio : événements, portraits, lifestyle, baptêmes. Photographe professionnel à Dakar et Rufisque.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero banner */}
        <div className="relative py-24 px-6 bg-[#111111] overflow-hidden">
          <div className="absolute inset-0 bg-grid-overlay opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-30" />
          <div className="relative text-center">
            <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">
              — Nos Réalisations —
            </p>
            <h1 className="text-5xl lg:text-6xl font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F5F0]">
              Portfolio Complet
            </h1>
            <div className="w-16 h-px bg-[#C9A84C] opacity-60 mx-auto mt-6" />
          </div>
        </div>

        {/* Grid */}
        <section className="py-20 px-6 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            <MasonryGrid showFilter={true} initialCategory="tous" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
