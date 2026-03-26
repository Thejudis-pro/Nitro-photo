"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "fr" | "wo";

const labels: Record<string, { fr: string; wo: string }> = {
  reserver: { fr: "Réserver", wo: "Bind" },
  portfolio: { fr: "Portfolio", wo: "Xool Portfolio bi" },
  contact: { fr: "Contactez-nous", wo: "Waxtaan ak nun" },
  services: { fr: "Services", wo: "Liggéey yi" },
};

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", labelKey: "services" },
  { href: "/portfolio", labelKey: "portfolio" },
  { href: "/#about", label: "À Propos" },
  { href: "/#contact", labelKey: "contact" },
];

const portfolioDropdown = [
  { href: "/portfolio?cat=evenements", label: "Événements" },
  { href: "/portfolio?cat=portraits", label: "Portraits" },
  { href: "/portfolio?cat=lifestyle", label: "Lifestyle" },
  { href: "/portfolio?cat=baptemes", label: "Baptêmes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const t = (key: string, fallback?: string) =>
    labels[key] ? labels[key][lang] : fallback ?? key;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-2xl lg:text-3xl tracking-[0.15em] text-[#C9A84C] font-[family-name:var(--font-cormorant)] font-semibold"
            >
              NITRO
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.3em] text-[#888880] uppercase mt-1">
              Photographie
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-wider text-[#888880] hover:text-[#C9A84C] transition-colors"
            >
              Accueil
            </Link>

            {/* Portfolio dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-1 text-sm tracking-wider text-[#888880] hover:text-[#C9A84C] transition-colors"
              >
                {t("portfolio")}
                <svg
                  className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-sm shadow-2xl overflow-hidden"
                  >
                    {portfolioDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-3 text-sm text-[#888880] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] transition-all border-b border-white/5 last:border-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/services"
              className="text-sm tracking-wider text-[#888880] hover:text-[#C9A84C] transition-colors"
            >
              {t("services")}
            </Link>

            <Link
              href="/#about"
              className="text-sm tracking-wider text-[#888880] hover:text-[#C9A84C] transition-colors"
            >
              À Propos
            </Link>

            <Link
              href="/#contact"
              className="text-sm tracking-wider text-[#888880] hover:text-[#C9A84C] transition-colors"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Right: Lang toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Lang toggle */}
            <button
              onClick={() => setLang((l) => (l === "fr" ? "wo" : "fr"))}
              className="text-xs tracking-widest text-[#888880] hover:text-[#C9A84C] transition-colors border border-white/10 hover:border-[#C9A84C]/30 px-3 py-1 rounded-sm"
            >
              {lang === "fr" ? "WO" : "FR"}
            </button>

            {/* CTA */}
            <Link
              href="/#contact"
              className="text-sm tracking-wider px-5 py-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
            >
              {t("reserver")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-[#C9A84C] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#C9A84C] transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#C9A84C] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {/* Mobile lang toggle */}
            <button
              onClick={() => setLang((l) => (l === "fr" ? "wo" : "fr"))}
              className="absolute top-6 right-20 text-xs tracking-widest text-[#888880] hover:text-[#C9A84C] transition-colors border border-white/10 px-3 py-1"
            >
              {lang === "fr" ? "WO" : "FR"}
            </button>

            {[
              { href: "/", label: "Accueil" },
              { href: "/portfolio", label: t("portfolio") },
              { href: "/services", label: t("services") },
              { href: "/#about", label: "À Propos" },
              { href: "/#contact", label: t("contact") },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl tracking-[0.15em] text-[#F5F5F0] hover:text-[#C9A84C] transition-colors font-[family-name:var(--font-cormorant)]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 text-sm tracking-wider px-8 py-3 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300 inline-block"
              >
                {t("reserver")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
