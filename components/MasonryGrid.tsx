"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Category = "tous" | "evenements" | "portraits" | "lifestyle" | "baptemes";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, "tous">;
  aspect: "portrait" | "landscape" | "square";
}

const ALL_PHOTOS: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    alt: "Portrait femme en boubou blanc",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=800&q=80",
    alt: "Lac Rose au coucher du soleil",
    category: "lifestyle",
    aspect: "landscape",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&q=80",
    alt: "Portrait artiste en studio",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80",
    alt: "Joie familiale baptême",
    category: "baptemes",
    aspect: "landscape",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    alt: "Couple lifestyle Dakar",
    category: "lifestyle",
    aspect: "portrait",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    alt: "Cérémonie de mariage africaine",
    category: "evenements",
    aspect: "landscape",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    alt: "Portrait beauté féminine",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Mariage cérémonie extérieur",
    category: "evenements",
    aspect: "landscape",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    alt: "Portrait homme professionnel",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    alt: "Famille heureux baptême",
    category: "baptemes",
    aspect: "landscape",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
    alt: "Événement gala soirée",
    category: "evenements",
    aspect: "landscape",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    alt: "Paysage Sénégal coucher de soleil",
    category: "lifestyle",
    aspect: "landscape",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80",
    alt: "Portrait femme artistique",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=800&q=80",
    alt: "Lifestyle mode africaine",
    category: "lifestyle",
    aspect: "portrait",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    alt: "Célébration famille réunion",
    category: "evenements",
    aspect: "landscape",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=800&q=80",
    alt: "Nouveau-né bébé baptême",
    category: "baptemes",
    aspect: "portrait",
  },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "evenements", label: "Événements" },
  { key: "portraits", label: "Portraits" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "baptemes", label: "Baptêmes" },
];

const BATCH = 8;

// ─── Lightbox ────────────────────────────────────────────
interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Regarde cette photo de Nitro Photographie! ${photo.src}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta < -50) onNext();
        else if (delta > 50) onPrev();
        touchStartX.current = null;
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 text-white/60 hover:text-[#C9A84C] transition-colors"
        aria-label="Fermer"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 z-10 text-xs tracking-widest text-[#888880]">
        {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </div>

      {/* Share */}
      <button
        onClick={(e) => { e.stopPropagation(); shareWhatsApp(); }}
        className="absolute top-5 right-16 z-10 text-white/40 hover:text-[#C9A84C] transition-colors"
        aria-label="Partager sur WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </motion.div>

      {/* Alt text */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-widest text-[#888880] text-center">
        {photo.alt}
      </div>

      {/* Prev/Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/40 hover:text-[#C9A84C] transition-colors"
        aria-label="Précédent"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/40 hover:text-[#C9A84C] transition-colors"
        aria-label="Suivant"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}

// ─── Main Grid ───────────────────────────────────────────
interface MasonryGridProps {
  showFilter?: boolean;
  initialCategory?: Category;
  limit?: number;
}

export default function MasonryGrid({
  showFilter = true,
  initialCategory = "tous",
  limit,
}: MasonryGridProps) {
  const [activeFilter, setActiveFilter] = useState<Category>(initialCategory);
  const [visibleCount, setVisibleCount] = useState(limit ?? BATCH);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const observerRef = useRef<Map<number, HTMLDivElement>>(new Map());

  const filtered = ALL_PHOTOS.filter(
    (p) => activeFilter === "tous" || p.category === activeFilter
  );
  const visible = filtered.slice(0, visibleCount);

  // Intersection observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    observerRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visible]);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  );
  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
  );

  const handleFilterChange = (cat: Category) => {
    setActiveFilter(cat);
    setVisibleCount(limit ?? BATCH);
  };

  return (
    <div>
      {/* Filter tabs */}
      {showFilter && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`text-xs tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-300 ${
                activeFilter === f.key
                  ? "border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.08)]"
                  : "border-white/10 text-[#888880] hover:border-[#C9A84C]/40 hover:text-[#F5F5F0]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div layout className="masonry-grid">
        <AnimatePresence>
          {visible.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="masonry-item group relative overflow-hidden cursor-pointer"
              onClick={() => openLightbox(idx)}
              ref={(el) => {
                if (el) observerRef.current.set(photo.id, el);
              }}
            >
              <div
                className={`relative overflow-hidden ${
                  photo.aspect === "portrait"
                    ? "aspect-[3/4]"
                    : photo.aspect === "square"
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[rgba(201,168,76,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                  <span className="text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase">
                    {FILTERS.find((f) => f.key === photo.category)?.label}
                  </span>
                  <p className="text-sm text-white mt-1 font-light">{photo.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more */}
      {!limit && visibleCount < filtered.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + BATCH)}
            className="text-sm tracking-widest uppercase px-10 py-4 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
          >
            Voir plus ({filtered.length - visibleCount} restantes)
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={visible}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
