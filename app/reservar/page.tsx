"use client";

import BackgroundPaths from "@/components/BackgroundPaths";
import BookingCalendar from "@/components/BookingCalendar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export default function ReservarPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black" id="top-reservar">
      <div className="absolute inset-0 blur-[2px] opacity-90 scale-[1.08]">
        <BackgroundPaths title="" />
      </div>

      <div className="relative z-10 min-h-screen">
        <motion.header
          className="fixed inset-x-0 top-0 z-50 bg-black/95"
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <a
                className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white"
                href="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src="/logo-placeholder.png"
                  alt="Logo BOVEDA"
                  className="h-12 w-12 rounded-sm object-cover"
                />
                BOVEDA
              </a>

              <nav className="hidden flex-wrap items-center gap-6 text-sm lg:flex">
                <a className="inline-flex items-center py-2 text-white/85 transition hover:text-white" href="/#como-funciona">
                  Cómo funciona
                </a>
                <a className="inline-flex items-center py-2 text-white/85 transition hover:text-white" href="/#pricing">
                  Precios
                </a>
                <a className="inline-flex items-center py-2 text-white/85 transition hover:text-white" href="/#faq">
                  FAQ
                </a>
              </nav>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                {mobileMenuOpen ? (
                  <span className="text-2xl leading-none text-white" aria-hidden>
                    ×
                  </span>
                ) : (
                  <span className="flex flex-col gap-1.5" aria-hidden>
                    <span className="block h-0.5 w-5 bg-white" />
                    <span className="block h-0.5 w-5 bg-white" />
                    <span className="block h-0.5 w-5 bg-white" />
                  </span>
                )}
              </button>
            </div>

            <AnimatePresence>
              {mobileMenuOpen ? (
                <motion.nav
                  className="fixed inset-0 z-[60] flex h-screen w-screen flex-col overflow-y-auto bg-[#090909] px-6 pb-8 pt-8 shadow-2xl lg:hidden"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <a
                      className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white"
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src="/logo-placeholder.png"
                        alt="Logo BOVEDA"
                        className="h-12 w-12 rounded-sm object-cover"
                      />
                      BOVEDA
                    </a>
                    <button
                      type="button"
                      aria-label="Cerrar menú"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/5 text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-2xl leading-none" aria-hidden>
                        ×
                      </span>
                    </button>
                  </div>

                  <p className="mb-4 mt-8 text-xs uppercase tracking-[0.28em] text-white/40">Menú</p>
                  <div className="grid gap-1">
                    <a className="inline-flex items-center py-3 text-base text-white/95" href="/#como-funciona" onClick={() => setMobileMenuOpen(false)}>
                      Cómo funciona
                    </a>
                    <a className="inline-flex items-center py-3 text-base text-white/95" href="/#pricing" onClick={() => setMobileMenuOpen(false)}>
                      Precios
                    </a>
                    <a className="inline-flex items-center py-3 text-base text-white/95" href="/#faq" onClick={() => setMobileMenuOpen(false)}>
                      FAQ
                    </a>
                  </div>
                  <p className="mt-auto pt-8 text-xs leading-relaxed text-white/60">
                    Este sitio no constituye asesoramiento financiero. Bitcoin y otros activos
                    financieros pueden subir o bajar. El rendimiento pasado no garantiza resultados
                    futuros.
                  </p>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.header>

        <div className="px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8 lg:pt-28">
          <BookingCalendar />
        </div>
      </div>
    </main>
  );
}
