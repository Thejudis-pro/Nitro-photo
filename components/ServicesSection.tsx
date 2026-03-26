"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const services = [
  {
    tier: "Shooting Basique",
    price: "25 000 F CFA",
    description: "Portrait solo ou en couple, idéal pour vos réseaux sociaux et souvenirs personnels.",
    features: [
      "Portrait solo ou couple",
      "1 heure de shooting",
      "20 photos retouchées",
      "Livraison en 48h",
      "Formats numériques HD",
    ],
    highlight: false,
  },
  {
    tier: "Événement Complet",
    price: "Sur devis",
    description: "Mariage, baptême, EID, soirée de gala — couverture complète par une équipe expérimentée.",
    features: [
      "Mariage, baptême, EID",
      "Équipe 2–3 photographes",
      "Couverture intégrale de l'événement",
      "Vidéo incluse (option)",
      "Album photo premium",
      "Galerie en ligne privée",
    ],
    highlight: true,
  },
  {
    tier: "Portrait Artiste",
    price: "Sur devis",
    description: "Construisez votre image professionnelle avec un shooting moodboard sur-mesure.",
    features: [
      "Moodboard personnalisé",
      "Studio ou extérieur",
      "Kit réseaux sociaux (format IG inclus)",
      "Retouches avancées",
      "Droits d'utilisation commerciale",
    ],
    highlight: false,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 px-6 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-overlay opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">
            — Nos Offres —
          </p>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F5F0] mb-5">
            Services & Tarifs
          </h2>
          <p className="text-[#888880] max-w-xl mx-auto leading-relaxed">
            Des prestations adaptées à chaque moment de votre vie.
            Contactez-nous pour un devis personnalisé.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.tier} {...s} index={i} />
          ))}
        </div>

        {/* Extra note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-[#888880] mt-10 tracking-wider"
        >
          Tous les prix incluent la TVA · Déplacement inclus dans Dakar-Rufisque
        </motion.p>
      </div>
    </section>
  );
}
