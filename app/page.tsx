"use client";

import BackgroundPaths from "@/components/BackgroundPaths";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import CardFlip from "@/components/CardFlip";
import FaqAccordion from "@/components/FaqAccordion";
import SmoothTab from "@/components/SmoothTab";

const benefits = [
  "Disciplina: convertís ahorro en hábito.",
  "Sin fricción: comprás sin pensarlo cada semana.",
  "Transparencia: historial de depósitos, compras y envíos.",
  "Custodia opcional: para arrancar sin miedo.",
  "Multi-activo: además de BTC, automatizás compras en ETFs e índices como SPY500.",
  "Referidos: bonificá la renta de bóveda.",
];

const faqs = [
  {
    q: "¿Necesito saber de cripto o finanzas?",
    a: "No es necesario. Nostros te instruimos sobre los principales instrumentos financieros para que puedas decidir lo que mejor se ajuste a tu perfil.",
  },
  {
    q: "¿Tengo que configurar las transferencias desde mi cuenta bancaria?",
    a: "Para una automatizacion completa, si, es necesario, de todas formas, BOVEDA tambien funciona con transferencias manuales si queres agregar montos adicionales.",
  },
  {
    q: "¿Puedo retirar mis inversiones en a pesos directamente?",
    a: "Sí, los activos son tuyos y estan disponibles en todo momento. Al gestionar un retiro, para tus BTC, los mismo vuelven a tu cuenta del exchange, se venden por pesos automaticamente y los tenes listos para ser retirados. Para tus instrumentos financieros, se venden en la primera ventana disponible por pesos y te notificamos para que puedas retirarlos a tu cuenta bancaria.",
  },
  {
    q: "¿Qué pasa si quiero usar mi propia wallet para automatizar mis compras?",
    a: "Si ya posees una billetera fria y solo operas cripto, cambiamos la dirección de destino cuando quieras, y ajustamos la suscripcion a BOVEDA base.",
  },
  {
    q: "¿Cobran comisión por operación?",
    a: "No. Nuestro servicio no viene con cargos adicionales fuera de una suscripción mensual fija y las comisiones propias del broker/exchange.",
  },
  {
    q: "¿Es seguro?",
    a: "Aplicamos controles operativos y buenas prácticas para mantener tus activos libres de riesgo.",
  },
  {
    q: "¿Solo puedo automatizar Bitcoin?",
    a: "No. Además de BTC, también podrás automatizar otros criptoactivos ademas de inversiones en instrumentos financieros como SPY500 y otros activos.",
  },
];

const inViewConfig = { once: true, amount: 0.25 };
const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="overflow-x-hidden bg-transparent text-slate-900" id="top">
      <section className="relative overflow-hidden lg:min-h-screen">
        <div className="absolute inset-0 blur-[2px] scale-[1.12]">
          <BackgroundPaths title="" />
        </div>
        <div className="relative z-10 flex flex-col lg:min-h-screen">
          <motion.header
            className="fixed inset-x-0 top-0 z-50 bg-black/95"
            initial={{ opacity: 0, y: -26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <motion.a
                  className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white"
                  href="#top"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.18, ease: easeOutExpo }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img
                    src="/logo-placeholder.png"
                    alt="Logo BOVEDA"
                    className="h-12 w-12 rounded-sm object-cover"
                  />
                  BOVEDA
                </motion.a>

                <motion.nav
                  className="hidden flex-wrap items-center gap-6 text-sm lg:flex"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: easeOutExpo }}
                >
                  <motion.a
                    className="inline-flex items-center py-2 text-white/85 transition hover:text-white"
                    href="#como-funciona"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.26, ease: easeOutExpo }}
                  >
                    Cómo funciona
                  </motion.a>
                  <motion.a
                    className="inline-flex items-center py-2 text-white/85 transition hover:text-white"
                    href="#pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.34, ease: easeOutExpo }}
                  >
                    Precios
                  </motion.a>
                  <motion.a
                    className="inline-flex items-center py-2 text-white/85 transition hover:text-white"
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.42, ease: easeOutExpo }}
                  >
                    FAQ
                  </motion.a>
                  <motion.a
                    className="inline-flex items-center justify-center rounded-full border border-[color:var(--accent-dark)]/40 bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#0b0b0b] shadow-lg shadow-[color:var(--accent)]/25 transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-light)]"
                    href="/reservar"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.5, ease: easeOutExpo }}
                  >
                    Agenda tu reunión
                  </motion.a>
                </motion.nav>

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
                        href="#top"
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
                      <a
                        className="inline-flex items-center py-3 text-base text-white/95"
                        href="#como-funciona"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Cómo funciona
                      </a>
                      <a
                        className="inline-flex items-center py-3 text-base text-white/95"
                        href="#pricing"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Precios
                      </a>
                      <a
                        className="inline-flex items-center py-3 text-base text-white/95"
                        href="#faq"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        FAQ
                      </a>
                    </div>
                    <a
                      className="mt-6 inline-flex items-center justify-center rounded-full border border-[color:var(--accent-dark)]/40 bg-[color:var(--accent)] px-5 py-3 text-base font-semibold text-[#0b0b0b]"
                      href="/reservar"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Agenda tu reunión
                    </a>

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

          <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-28 lg:flex lg:flex-1 lg:items-center lg:pb-20 lg:pt-24">
            <div className="w-full">
              <motion.h1
                className="mx-auto max-w-4xl text-center font-display text-3xl font-semibold leading-[1.12] tracking-tight text-slate-100 sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.95, delay: 0.22, ease: easeOutExpo }}
              >
                <span className="block whitespace-normal sm:whitespace-nowrap">
                  El sistema de{" "}
                  <span className="hero-highlight-glow text-[color:var(--accent)] [font-style:italic]">
                    Automatizacion
                  </span>
                </span>
                <span className="mt-2 block whitespace-normal sm:mt-3 sm:whitespace-nowrap">
                  para invertir con{" "}
                  <span className="hero-highlight-glow hero-highlight-glow-late text-[color:var(--accent)] [font-style:italic]">
                    disciplina
                  </span>
                  .
                </span>
              </motion.h1>
              <motion.p
                className="mx-auto mt-8 max-w-2xl text-center text-lg text-slate-300 sm:mt-10 sm:text-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.48, ease: easeOutExpo }}
              >
                Depositás pesos en tu broker o exchange y BOVEDA ejecuta las compras de forma
                automática segun tu estrategia como inversor o ahorrista.
              </motion.p>

              <motion.div
                className="mt-10 flex justify-center sm:mt-12"
                initial={{ opacity: 0, scale: 0.88, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62, ease: easeOutExpo }}
              >
                <a
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold text-[#0b0b0b] shadow-lg shadow-[color:var(--accent)]/25 transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-light)]"
                  href="#cta"
                >
                  Unirme a la beta
                </a>
              </motion.div>

              {/* <div className="mt-12 overflow-hidden rounded-[1.35rem] border border-white/15">
                <img
                  alt="Imagen principal del hero"
                  className="h-[230px] w-full object-cover object-center contrast-110 sm:h-[300px] lg:h-[360px]"
                  src="/hero_placeholder.png"
                />
              </div> */}

              <motion.p
                className="mt-8 text-center text-xs text-slate-400 sm:mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.82, ease: easeOutExpo }}
              >
                BOVEDA no es un proveedor de asesoramiento financiero. Bitcoin y otros activos
                financieros son volátiles.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-12 lg:min-h-screen lg:pb-20 lg:pt-14" id="como-funciona">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -38 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.75, ease: easeOutExpo }}
            >
              <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                Ahorro con una reserva digital escasa
              </h2>
              <div className="mt-6 space-y-4 text-lg text-slate-700">
                <p>
                  Bitcoin es escaso, existen solo 21 millones y nunca habrá más.
                </p>
                <p>
                  Cuando un bien es escaso y la demanda crece, puede actuar como reserva de
                  valor a largo plazo.
                </p>
                <p>
                  Históricamente, quienes compraron y mantuvieron BTC a largo plazo terminaron
                  con margenes de ganancia, incluso luego de compras en maximos historicos.
                </p>
                <p>
                  Ahora también podés aplicar la misma automatización para construir exposición en
                  instrumentos financieros como SPY500 y otros ETFs.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="h-[220px] w-full overflow-hidden rounded-2xl border border-black/10 bg-black p-2 shadow-lg sm:h-[320px] sm:p-3 lg:h-[420px] lg:p-4 dark:border-white/10"
              initial={{ opacity: 0, x: 34, scale: 0.94, rotate: 0.35 }}
              whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.9, delay: 0.08, ease: easeOutExpo }}
            >
              <img
                alt="Gráfico de rendimiento de Bitcoin y otros activos"
                className="block h-full w-full object-contain object-center"
                src="/btc_chart.png"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 lg:pb-20 lg:pt-10" id="proceso">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.75, ease: easeOutExpo }}
            >
              <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                Ahorrar e invertir deberían ser simples.
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                BOVEDA brinda un sistema diseñado para convertir el ahorro y la inversión
                <br />
                en un hábito de manera sencilla, sin decisiones constantes ni graficas abrumadoras.
              </p>
              <p className="mt-4 text-lg text-slate-700">
                Solo te ocupas de elegir tus instrumentos de preferencia, BOVEDA se ocupa de ayudarte a que incorpores el habito del ahorro y las inversiones.
              </p>
            </motion.div>
            <motion.div
              className="max-w-sm lg:justify-self-end"
              initial={{ opacity: 0, x: 34, rotate: 1.1 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.85, delay: 0.08, ease: easeOutExpo }}
            >
              <SmoothTab
                items={[
                  {
                    id: "menos",
                    title: "Automatico",
                    description:
                      "Compras programadas directamente desde tu cuenta bancaria.",
                    color: "bg-[#c46a1a]",
                    accent: "bg-[#c46a1a]",
                  },
                  {
                    id: "consistencia",
                    title: "Sostenido",
                    description: "Te ayudamos a sistematizar tu portafolio, porque la constancia importa más que el timing.",
                    color: "bg-[color:var(--accent)]",
                    accent: "bg-[color:var(--accent)]",
                  },
                  {
                    id: "control",
                    title: "Transparente",
                    description: "Al hacerlo a traves de tus cuenta, pero sin entregar credenciales, tenes control y supervision de todo lo que ocurre.",
                    color: "bg-[#fad57d]",
                    accent: "bg-[#fad57d]",
                  },
                ]}
              />
            </motion.div>
          </div>
          <div className="mt-16 border-t border-black/10 pt-16 dark:border-white/10">
            <motion.div
              className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <div>
                <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Tres pasos, cero fricción
                </h2>
              </div>
            </motion.div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Depositás ARS en tu\nexchange o broker de confianza",
                  text: "Vos configurás transferencias recurrentes o manuales en pesos a tu cuenta en el exchange o broker.",
                },
                {
                  title: "BOVEDA compra automáticamente",
                  text: "Detectamos depósitos ARS y ejecutamos la compra de los instrumentos elegidos desde tu propia cuenta.",
                },
                {
                  title: "Venta automatica de instrumentos",
                  text: "Al gestionar un retiro, BOVEDA vende los instrumentos que selecciones por ARS para que los tengas disponibles lo antes posibles.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f2ede4] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20 dark:border-white/10 dark:bg-neutral-950 dark:hover:border-white/30"
                  initial={
                    index === 0
                      ? { opacity: 0, y: 28 }
                      : index === 1
                        ? { opacity: 0, scale: 0.86 }
                        : { opacity: 0, x: 28 }
                  }
                  whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  viewport={inViewConfig}
                  transition={{
                    duration: 0.72,
                    delay: index * 0.12,
                    ease: easeOutExpo,
                  }}
                >
                  <div className="absolute bottom-3 right-3 text-2xl font-display leading-none text-[color:var(--accent-light)] opacity-80 md:right-4 md:top-4 md:bottom-auto md:text-3xl">
                    0{index + 1}
                  </div>
                  <h3 className="whitespace-pre-line pr-10 font-display text-xl font-semibold text-slate-900 dark:text-white md:pr-0">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-200">{step.text}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="mt-6 max-w-3xl text-sm text-slate-600"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.62, ease: easeOutExpo }}
            >
              {/* Vos tenes el control de los activos, nosotros automatizamos el proceso. */}
            </motion.p>
            <motion.p
              className="mt-2 max-w-3xl text-sm text-slate-600"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.62, delay: 0.08, ease: easeOutExpo }}
            >
              {/* Hoy el foco incluye BTC y también la automatización de inversiones en activos como
              SPY500 dentro del mismo sistema. */}
            </motion.p>
          </div>
        </div>
      </section>

      <section
        className="border-t border-black/10 px-4 pb-16 pt-12 dark:border-white/10 lg:min-h-screen lg:pb-20 lg:pt-14"
        id="pricing"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewConfig}
            transition={{ duration: 0.68, ease: easeOutExpo }}
          >
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
              Suscripción simple, sin comisiones
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              Los valores se actualizan según tipo de cambio. Siempre avisamos antes de
              cambios.
            </p>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              El esquema de suscripción aplica tanto para la automatización en BTC como para
              estrategias en instrumentos financieros como SPY500.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 34, rotate: -0.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.78, ease: easeOutExpo }}
            >
              <CardFlip
                title="Bóveda Base para usuarios Cripto"
                subtitle="Para usuarios con wallet propia"
                priceArs="ARS 7.500"
                priceUsd="~USD 5"
                ctaLabel="Empezar con Base"
                features={[
                  "Detección de depósitos ARS",
                  "Compra automática ARS→BTC",
                  "Dashboard y seguimiento",
                  "Envío a tu dirección configurada",
                ]}
              />
              <p className="text-xs font-semibold text-slate-700">
                Mantenés el control total de tu wallet.
              </p>
              <p className="text-xs font-semibold text-slate-700">
                También podés usar el mismo flujo para automatizar instrumentos financieros.
              </p>
            </motion.div>
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 26, x: 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.85, delay: 0.1, ease: easeOutExpo }}
            >
              <CardFlip
                title="Bóveda Premium"
                subtitle="Acompañamiento guiado"
                priceArs="ARS 12.000"
                priceUsd="~USD 8"
                ctaLabel="Empezar con Premium"
                badge="Recomendado para principiantes"
                highlight
                includesNote="Incluye todo lo del plan Base."
                extraTitle="Incluye además"
                extraFeatures={[
                  "Custodia temporal en cold wallet",
                  "Asistencia en retiros",
                  "Ideal para quienes recién empiezan",
                ]}
                features={[
                  "Detección de depósitos ARS",
                  "Compra automática ARS→BTC",
                  "Automatización de otros activos financieros (ej. SPY500)",
                  "Dashboard y seguimiento",
                  "Envío a tu dirección configurada",
                ]}
              />
              <p className="text-xs font-semibold text-slate-700">
                Custodia temporal: pasás a self-custody cuando quieras.
              </p>
              <p className="text-xs font-semibold text-slate-700">
                En paralelo, podés gestionar automatizaciones en activos financieros desde el mismo panel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-12 lg:min-h-screen lg:pb-20 lg:pt-14" id="faq">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={inViewConfig}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
              Dudas Frecuentes
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Respondemos dudas sobre automatización en BTC y en otros instrumentos financieros.
            </p>
          </motion.div>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewConfig}
            transition={{ duration: 0.68, delay: 0.08, ease: easeOutExpo }}
          >
            <FaqAccordion items={faqs} />
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-12 lg:pb-10 lg:pt-14" id="cta">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            className="rounded-3xl border border-black/10 bg-[#f2ede4] p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={inViewConfig}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inViewConfig}
                transition={{ duration: 0.68, delay: 0.06, ease: easeOutExpo }}
              >
                <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
                  <span className="block">Agendá una reunión</span>
                  <span className="mt-2 block">
                    con el equipo{" "}
                    <span className="inline-flex rounded-full bg-[color:var(--accent)]/20 px-2 py-1 text-[color:var(--accent)]">
                      SIN CARGO.
                    </span>
                  </span>
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-200">
                  Elegí un día y horario para conocer el flujo, resolver dudas y sumarte a
                  la beta más rápido.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                  <p>• Duración estimada: 20 minutos.</p>
                  <p>• Sin compromiso ni asesoramiento financiero.</p>
                  <p>• Te mostramos el sistema y el dashboard.</p>
                  <p>• Te asesoramos en caso de que necesites abrir una cuenta en un broker o exchange.</p>
                  <p>• Activamos tu BOVEDA acorde a tu perfil como inversor para que puedas empezar a invertir.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24, rotate: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={inViewConfig}
                transition={{ duration: 0.82, delay: 0.12, ease: easeOutExpo }}
              >
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] sm:p-8">
                  <p className="text-base leading-relaxed text-white/85 sm:text-lg">
                    Elegí un día y horario para conocer el flujo, resolver dudas y sumarte a la
                    beta más rápido.
                  </p>
                  <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/75 sm:text-base">
                    <p>• Duración estimada: 20 minutos.</p>
                    <p>• Sin compromiso ni asesoramiento financiero.</p>
                    <p>• Te mostramos el sistema y el dashboard.</p>
                    <p>
                      • Te asesoramos en caso de que necesites abrir una cuenta en un broker o
                      exchange.
                    </p>
                    <p>
                      • Activamos tu BOVEDA acorde a tu perfil como inversor para que puedas
                      empezar a invertir.
                    </p>
                  </div>
                  <a
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-[#0b0b0b] shadow-lg shadow-[color:var(--accent)]/20 transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-light)]"
                    href="/reservar"
                  >
                    Agendar reunión
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-10 text-xs text-slate-500 dark:border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 sm:grid sm:grid-cols-[2.5rem_1fr_2.5rem] sm:items-center">
            <div className="hidden sm:block h-10 w-10" aria-hidden />
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inViewConfig}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <p className="mx-auto max-w-4xl">
              Este sitio no constituye asesoramiento financiero. Bitcoin y otros activos
              financieros pueden subir o bajar. El rendimiento pasado no garantiza resultados
              futuros.
            </p>
          </motion.div>
          <motion.a
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)] text-[#0b0b0b] shadow-lg shadow-[color:var(--accent)]/20 transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-light)] sm:justify-self-end"
            href="#top"
            aria-label="Volver arriba"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={inViewConfig}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
          >
            ↑
          </motion.a>
          </div>
        </div>
      </footer>

    </main>
  );
}
