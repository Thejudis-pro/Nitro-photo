"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  tier: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlight?: boolean;
  index: number;
}

export default function ServiceCard({
  tier,
  price,
  priceNote,
  description,
  features,
  highlight = false,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative group flex flex-col gap-6 p-8 border transition-all duration-500 ${
        highlight
          ? "border-[#C9A84C] bg-[#111111]"
          : "border-white/5 bg-[#111111] hover:border-[rgba(201,168,76,0.3)]"
      }`}
      style={
        highlight
          ? { boxShadow: "0 0 40px rgba(201,168,76,0.12), 0 0 80px rgba(201,168,76,0.04)" }
          : undefined
      }
    >
      {/* Top gold rule */}
      <div
        className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${
          highlight ? "bg-[#C9A84C]" : "bg-white/10 group-hover:bg-[rgba(201,168,76,0.5)]"
        }`}
      />

      {/* Badge */}
      {highlight && (
        <span className="absolute -top-3 left-8 text-[9px] tracking-[0.35em] uppercase bg-[#C9A84C] text-black px-3 py-1 font-medium">
          Populaire
        </span>
      )}

      {/* Tier */}
      <div>
        <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase mb-3">{tier}</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F5F0]">
            {price}
          </span>
          {priceNote && (
            <span className="text-xs text-[#888880] mb-1">{priceNote}</span>
          )}
        </div>
        <p className="text-sm text-[#888880] mt-2 leading-relaxed">{description}</p>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-[rgba(201,168,76,0.3)]" />

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#888880]">
            <svg
              className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={`mt-auto text-center text-sm tracking-widest uppercase py-3.5 border transition-all duration-300 ${
          highlight
            ? "bg-[#C9A84C] text-black border-[#C9A84C] hover:bg-transparent hover:text-[#C9A84C]"
            : "border-white/15 text-[#F5F5F0] hover:border-[#C9A84C] hover:text-[#C9A84C]"
        }`}
      >
        Demander un devis
      </a>
    </motion.div>
  );
}
