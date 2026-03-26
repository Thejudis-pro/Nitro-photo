"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const team = [
  {
    name: "Nitro Alpha",
    role: "Directeur Artistique",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "10 ans d'expérience en photographie événementielle et portrait.",
  },
  {
    name: "Aïssatou Diallo",
    role: "Photographe Senior",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    bio: "Spécialiste portraits féminins et mode africaine contemporaine.",
  },
  {
    name: "Moussa Sow",
    role: "Vidéaste & Drone",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    bio: "Opérateur drone certifié, expert en vidéo aérienne au Sénégal.",
  },
];

const testimonials = [
  {
    quote:
      "Nitro Photographie a capturé notre mariage avec une sensibilité rare. Chaque photo raconte une histoire.",
    author: "Fatou & Ibrahima",
    event: "Mariage · Dakar, 2024",
  },
  {
    quote:
      "Mon shooting portrait artiste a transformé ma présence en ligne. Des photos dignes des plus grands magazines.",
    author: "MC Zak",
    event: "Portrait Artiste · 2024",
  },
  {
    quote:
      "Le baptême de notre petit Ousmane immortalisé à la perfection. Merci à toute l'équipe Nitro !",
    author: "Famille Ndiaye",
    event: "Baptême · Rufisque, 2025",
  },
];

const stats = [
  { value: 200, label: "Événements", suffix: "+" },
  { value: 500, label: "Portraits", suffix: "+" },
  { value: 5, label: "Ans d'Expérience", suffix: "" },
  { value: 98, label: "Clients Satisfaits", suffix: "%" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let start = 0;
          const duration = 1800;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">
            — Notre Histoire —
          </p>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F5F0] mb-6">
            À Propos de Nitro
          </h2>
          <p className="text-[#888880] max-w-2xl mx-auto leading-relaxed text-base">
            Nitro Photographie, c&apos;est une équipe passionnée basée à Rufisque,
            couvrant vos moments inoubliables à Dakar et partout au Sénégal.
            Nous croyons que chaque instant mérite d&apos;être transformé en œuvre d&apos;art.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-20"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0A0A0A] py-10 flex flex-col items-center gap-2 text-center"
            >
              <span className="text-4xl lg:text-5xl font-[family-name:var(--font-cormorant)] font-semibold text-gradient-gold">
                <Counter target={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#888880] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Team */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden bg-[#111111] border border-white/5 hover:border-[rgba(201,168,76,0.2)] transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[#F5F5F0]">
                  {member.name}
                </h3>
                <p className="text-[10px] tracking-[0.25em] text-[#C9A84C] uppercase mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-[#888880] leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-8">
            — Ce que disent nos clients —
          </p>

          {/* Quote icon */}
          <svg
            className="w-10 h-10 text-[rgba(201,168,76,0.2)] mx-auto mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-xl lg:text-2xl font-[family-name:var(--font-cormorant)] font-light text-[#F5F5F0] leading-relaxed italic mb-6">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </blockquote>
              <cite className="not-italic">
                <span className="text-sm font-medium text-[#C9A84C]">
                  {testimonials[activeTestimonial].author}
                </span>
                <span className="mx-3 text-[#888880]">·</span>
                <span className="text-xs text-[#888880] tracking-wider">
                  {testimonials[activeTestimonial].event}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeTestimonial
                    ? "w-5 h-1.5 bg-[#C9A84C]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
