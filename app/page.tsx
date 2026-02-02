import BackgroundPaths from "@/components/BackgroundPaths";
import CardFlip from "@/components/CardFlip";
import BookingCalendar from "@/components/BookingCalendar";
import FaqAccordion from "@/components/FaqAccordion";
import SmoothTab from "@/components/SmoothTab";

const benefits = [
  "Disciplina: convertís ahorro en hábito.",
  "Sin fricción: comprás sin pensarlo cada semana.",
  "Transparencia: historial de depósitos, compras y envíos.",
  "Custodia opcional: para arrancar sin miedo.",
  "Referidos: bonificá la renta de bóveda.",
];

const faqs = [
  {
    q: "¿Necesito saber de cripto?",
    a: "No es necesario. El flujo es guiado y con lenguaje simple, paso a paso.",
  },
  {
    q: "¿Tengo que configurar las transferencias desde mi cuenta bancaria?",
    a: "Para una automatizacion completa, si, es necesario, de todas formas, BOVEDA tambien funciona con transferencias manuales.",
  },
  {
    q: "¿Puedo retirar mi BTCn a pesos?",
    a: "Sí, los activos son tuyos y estan disponibles en todo momento. Al gestionar un retiro, tus BTC vuelven a tu cuenta del exchange, se venden por pesos automaticamente y los tenes listos para ser retirados.",
  },
  {
    q: "¿Qué pasa si quiero usar mi propia wallet?",
    a: "Si ya posees una billetera fria, cambiamos la dirección de destino cuando quieras, y ajustamos la suscripcion a BOVEDA base.",
  },
  {
    q: "¿Cobran comisión por operación?",
    a: "No. Nuestro servicio no viene con cargos adicionales fuera de una suscripción mensual fija.",
  },
  {
    q: "¿Es seguro?",
    a: "Aplicamos controles operativos y buenas prácticas para mantener tus activos libres de riesgo.",
  },
];

export default function Home() {
  return (
    <main className="bg-transparent text-slate-900" id="top">
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <BackgroundPaths title="" />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl">
            <div className="rounded-2xl border border-black/10 bg-[#f2ede4]/80 p-8 shadow backdrop-blur-md md:p-12 dark:border-white/10 dark:bg-neutral-950/70">
              <div className="space-y-6 text-left">
                  <div className="inline-flex w-fit flex-col gap-1 rounded-full border border-black/10 bg-[#f4efe6]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-white/10 dark:bg-neutral-950/60 dark:text-slate-200">
                    <span className="text-[color:var(--accent)]">B.O.V.E.D.A</span>
                    <span>
                      <span className="text-[color:var(--accent)]">B</span>ase de{" "}
                      <span className="text-[color:var(--accent)]">O</span>rganizacion y{" "}
                      <span className="text-[color:var(--accent)]">Ve</span>rificacion{" "}
                      <span className="text-[color:var(--accent)]">d</span>el{" "}
                      <span className="text-[color:var(--accent)]">A</span>horro.
                    </span>
                  </div>
                  <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                    Ahorrá en Bitcoin,
                    <br />
                    automático y sin fricción.
                  </h1>
                  <p className="text-lg text-slate-700 sm:text-xl dark:text-slate-200">
                    Depositás pesos en exchange. BOVEDA los convierte a BTC y los envía a tu
                    billetera designada.
                  </p>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                    {[
                      "Compras automáticas cuando entra tu depósito en pesos.",
                      "Seguimiento de tus BTC desde tu dashboard.",
                      "Custodia temporal y asistencia para principiantes.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-white" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-[#0b0b0b] shadow-lg shadow-[color:var(--accent)]/20 transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-light)]"
                      href="#cta"
                    >
                      Unirme a la beta
                    </a>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-slate-900/60 bg-[#f4efe6]/90 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 dark:border-white/60 dark:bg-white/10 dark:text-white"
                      href="#como-funciona"
                    >
                      Cómo funciona
                    </a>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-slate-900/30 bg-slate-900/10 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 dark:border-white/30 dark:bg-white/10 dark:text-white/90"
                      href="#pricing"
                    >
                      Ver precios
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    BOVEDA no es un proveedor de asesoramiento financiero. Bitcoin es un activo volátil.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-24" id="por-que">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
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
              </div>
            </div>
            <div className="aspect-[16/10] min-h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-black p-4 shadow-lg lg:min-h-[420px] dark:border-white/10">
              <img
                alt="Gráfico de rendimiento de Bitcoin"
                className="h-full w-full object-contain"
                src="/btc_chart.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20" id="como-funciona">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                Ahorrar en Bitcoin debería ser simple.
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                BOVEDA brinda un sistema diseñado para convertir el ahorro y la inversión
                <br />
                en un hábito de manera sencilla, sin decisiones constantes ni graficas abrumadoras.
              </p>
            </div>
            <div className="max-w-sm lg:justify-self-end">
              <SmoothTab
                items={[
                  {
                    id: "menos",
                    title: "Automatico",
                    description: "Compras programadas de BTC desde tu cuenta bancaria.",
                    color: "bg-[#c46a1a]",
                    accent: "bg-[#c46a1a]",
                  },
                  {
                    id: "consistencia",
                    title: "Sostenido",
                    description: "A la hora de ahorrar, la constancia importa más que el timing.",
                    color: "bg-[color:var(--accent)]",
                    accent: "bg-[color:var(--accent)]",
                  },
                  {
                    id: "control",
                    title: "Transparente",
                    description: "Ves depósitos, compras, y tenes control total sobre los retiros.",
                    color: "bg-[#fad57d]",
                    accent: "bg-[#fad57d]",
                  },
                ]}
              />
            </div>
          </div>
          <div className="mt-16 border-t border-black/10 pt-16 dark:border-white/10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Tres pasos, cero fricción
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Depositás ARS en tu\nexchange de confianza",
                  text: "Vos configurás transferencias recurrentes o manuales en pesos a tu cuenta en el exchange.",
                },
                {
                  title: "BOVEDA compra BTC automáticamente",
                  text: "Detectamos depósitos ARS y ejecutamos la compra ARS→BTC en tu cuenta.",
                },
                {
                  title: "Envío desde BOVEDA a billtera",
                  text: "El BTC se envía automaticamente a una billetera fria y segura. Podés ver tus movimientos y monitorear tus activos desde el panel del usuario.",
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f2ede4] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20 dark:border-white/10 dark:bg-neutral-950 dark:hover:border-white/30"
                >
                  <div className="absolute right-4 top-4 text-3xl font-display text-[color:var(--accent-light)] opacity-70">
                    0{index + 1}
                  </div>
                  <h3 className="whitespace-pre-line font-display text-xl font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-200">{step.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-slate-600">
              Vos tenes el control de los activos, nosotros automatizamos el proceso.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-16 border-t border-black/10 dark:border-white/10" id="pricing">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
                Suscripción simple, sin comisiones
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600">
                Los valores se actualizan según tipo de cambio. Siempre avisamos antes de
                cambios.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <CardFlip
                title="Bóveda Base"
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
            </div>
            <div className="space-y-3">
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
                  "Dashboard y seguimiento",
                  "Envío a tu dirección configurada",
                ]}
              />
              <p className="text-xs font-semibold text-slate-700">
                Custodia temporal: pasás a self-custody cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24" id="faq">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
              Dudas Frecuentes
            </h2>
          </div>
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-24" id="cta">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-3xl border border-black/10 bg-[#f2ede4] p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
                  Agendá una reunión con el equipo
                  <span className="ml-2 inline-flex rounded-full bg-[color:var(--accent)]/20 px-2 py-1 text-[color:var(--accent)]">
                    SIN CARGO.
                  </span>
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-200">
                  Elegí un día y horario para conocer el flujo, resolver dudas y sumarte a
                  la beta más rápido.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                  <p>• Duración estimada: 20 minutos.</p>
                  <p>• Te mostramos la bóveda y el dashboard.</p>
                  <p>• Sin compromiso ni asesoramiento financiero.</p>
                </div>
              </div>
              <BookingCalendar />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-10 text-xs text-slate-500 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <div className="flex-1 text-center">
            <p className="mx-auto max-w-4xl">
              Este sitio no constituye asesoramiento financiero. Bitcoin es volátil y puede subir
              o bajar. El rendimiento pasado no garantiza resultados futuros.
            </p>
          </div>
          <a
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)] text-[#0b0b0b] shadow-lg shadow-[color:var(--accent)]/20 transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-light)]"
            href="#top"
            aria-label="Volver arriba"
          >
            ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
