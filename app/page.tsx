import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import MasonryGrid from "@/components/MasonryGrid";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Link from "next/link";

// Portfolio preview section (static wrapper around MasonryGrid)
function PortfolioPreview() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-overlay opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">
            — Notre Travail —
          </p>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F5F0] mb-5">
            Portfolio
          </h2>
          <p className="text-[#888880] max-w-xl mx-auto leading-relaxed">
            Un aperçu de nos travaux les plus récents.
            Chaque image raconte une histoire unique.
          </p>
        </div>

        <MasonryGrid showFilter={false} limit={8} />

        <div className="flex justify-center mt-14">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase px-10 py-4 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
          >
            Voir tout le Portfolio
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <PortfolioPreview />
        <ServicesSection />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
