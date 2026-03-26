"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    tag: "Portraits · Dakar",
    title: "Votre Équipe Photo\nà Dakar",
    subtitle: "Golden Hour · Dakar, Sénégal",
    cta: "Réserver un Shooting",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=80&fit=crop",
    alt: "Portrait femme africaine en boubou blanc, heure dorée, Dakar",
  },
  {
    id: 2,
    tag: "Lifestyle · Lac Rose",
    title: "L'Aventure\nau Bout de l'Objectif",
    subtitle: "Lac Rose · Rufisque, Sénégal",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=1920&q=80&fit=crop",
    alt: "Lac Rose au coucher du soleil, Sénégal",
  },
  {
    id: 3,
    tag: "Portraits Artistes",
    title: "Sublimez\nVotre Image",
    subtitle: "Studio · Dakar, Sénégal",
    cta: "Pack Artiste",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=1920&q=80&fit=crop",
    alt: "Portrait artiste en studio, éclairage dramatique",
  },
  {
    id: 4,
    tag: "Baptêmes · Famille",
    title: "Capturez\nChaque Sourire",
    subtitle: "Cérémonies · Sénégal",
    cta: "Voir nos Offres",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1920&q=80&fit=crop",
    alt: "Joie familiale lors d'un baptême, bokeh doux",
  },
  {
    id: 5,
    tag: "EID MUBARAK 2025",
    title: "Votre Fête,\nNos Souvenirs",
    subtitle: "Événements · Dakar, Sénégal",
    cta: "Réservez Maintenant",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80&fit=crop",
    alt: "Couple lifestyle shoot, Dakar skyline background",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [parallaxY, setParallaxY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (idx: number, dir = 1) => {
      setDirection(dir);
      setCurrent(idx);
    },
    []
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      setParallaxY(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -40 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 scale-110"
            style={{ transform: `translateY(${parallaxY}px) scale(1.1)` }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-5 max-w-4xl"
          >
            {/* Tag */}
            <span className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase font-medium">
              — {slide.tag} —
            </span>

            {/* H1 */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight font-[family-name:var(--font-cormorant)] font-semibold"
              style={{ whiteSpace: "pre-line" }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm tracking-[0.25em] text-[#888880] uppercase">
              {slide.subtitle}
            </p>

            {/* Thin gold rule */}
            <div className="w-16 h-px bg-[#C9A84C] opacity-60 mt-1" />

            {/* CTA */}
            <Link
              href="/#contact"
              className="mt-4 inline-flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 bg-[#C9A84C] text-black font-medium hover:bg-transparent hover:text-[#C9A84C] hover:border-[#C9A84C] border border-transparent transition-all duration-400"
            >
              {slide.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-8 z-10 flex items-center gap-4">
        <span className="text-xs tracking-widest text-[#888880]">
          {String(current + 1).padStart(2, "0")}
          <span className="mx-2 text-[#C9A84C]">/</span>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-1.5 bg-[#C9A84C]"
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Side arrows (desktop) */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] text-white/60 transition-all duration-300"
        aria-label="Précédent"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center border border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C] text-white/60 transition-all duration-300"
        aria-label="Suivant"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.4em] text-[#888880] uppercase rotate-90 origin-center translate-x-5">
          Défiler
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent" />
      </div>
    </section>
  );
}
