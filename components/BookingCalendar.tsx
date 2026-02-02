"use client";

import { CalendarCheck, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Slot = {
  start: string;
  end: string;
  label: string;
};

type AvailabilityResponse = {
  tz: string;
  range: { start: string; end: string };
  week: { start: string; end: string };
  slots: Slot[];
};

const dayLabels = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];


export default function BookingCalendar() {
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [step, setStep] = useState<"day" | "confirm" | "success">("day");
  const [direction, setDirection] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success" | "taken" | "error"
  >("idle");
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/calendar/availability?days=15`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("No se pudo cargar disponibilidad");
        }
        const data = (await response.json()) as AvailabilityResponse;
        setAvailability(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("No pudimos cargar la disponibilidad. Intentá más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
    return () => controller.abort();
  }, []);

  const tzOffset = useMemo(() => {
    const fromRange = availability?.range?.start?.slice(19);
    const fromSlot = availability?.slots?.[0]?.start?.slice(19);
    return fromRange || fromSlot || "-03:00";
  }, [availability]);

  const slotsByDate = useMemo(() => {
    const map = new Map<string, Slot[]>();
    if (!availability?.slots) return map;
    availability.slots.forEach((slot) => {
      const dateKey = slot.start.slice(0, 10);
      const list = map.get(dateKey) ?? [];
      list.push(slot);
      map.set(dateKey, list);
    });
    return map;
  }, [availability]);

  const availableDates = useMemo(() => {
    return Array.from(slotsByDate.keys()).sort();
  }, [slotsByDate]);

  const getWeekdayIndex = (dateKey: string) => {
    const date = new Date(`${dateKey}T00:00:00${tzOffset}`);
    return date.getDay(); // 0=Sun
  };

  const addDays = (dateKey: string, amount: number) => {
    const date = new Date(`${dateKey}T00:00:00${tzOffset}`);
    date.setDate(date.getDate() + amount);
    return date.toISOString().slice(0, 10);
  };

  const weekStarts = useMemo(() => {
    const base = availability?.week?.start?.slice(0, 10) || availableDates[0];
    if (!base) return [];
    return [base, addDays(base, 7)];
  }, [availability, availableDates, tzOffset]);

  const monthLabel = useMemo(() => {
    const base = availability?.week?.start?.slice(0, 10) || availableDates[0];
    if (!base) return "";
    const [year, month] = base.split("-");
    const monthName = monthNames[Number(month) - 1] || "";
    return `${monthName} ${year}`;
  }, [availability, availableDates]);

  const dateLabel = useMemo(() => {
    if (!selectedDate) return "";
    const [year, month, day] = selectedDate.split("-");
    const monthName = monthNames[Number(month) - 1] || "";
    return `${Number(day)} de ${monthName} ${year}`;
  }, [selectedDate]);

  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return slotsByDate.get(selectedDate) ?? [];
  }, [selectedDate, slotsByDate]);

  const getWeekdayColumn = (dateKey: string) => getWeekdayIndex(dateKey) + 1;

  const goToStep = (next: typeof step, dir: number) => {
    setDirection(dir);
    setStep(next);
  };

  const handleBook = async () => {
    if (!selectedSlot || !email) return;
    setBookingStatus("loading");
    setBookingMessage(null);

    try {
      const response = await fetch(`/api/calendar/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: selectedSlot.start,
          end: selectedSlot.end,
          name: name || "",
          email,
          notes: notes || "",
        }),
      });

      if (response.ok) {
        setBookingStatus("success");
        setBookingMessage("Reserva confirmada. Te enviamos el detalle por email.");
        goToStep("success", 1);
        return;
      }

      if (response.status === 409) {
        setBookingStatus("taken");
        setBookingMessage("Horario ocupado, elegí otro.");
        return;
      }

      setBookingStatus("error");
      setBookingMessage("No pudimos confirmar la cita. Intentá nuevamente.");
    } catch {
      setBookingStatus("error");
      setBookingMessage("No pudimos confirmar la cita. Intentá nuevamente.");
    }
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <button
          className={cn(
            "rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white",
            step === "day" && "opacity-50 cursor-default"
          )}
          type="button"
          onClick={() => {
            if (step === "confirm" || step === "success") goToStep("day", -1);
          }}
          disabled={step === "day"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center">
          <p className="text-2xl font-semibold text-[color:var(--accent)]">
            Agenda tu reunión
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            {monthLabel || "Agenda"}
          </p>
        </div>
        <button
          className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
          type="button"
          aria-hidden
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mt-6 min-h-[337px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:min-h-[337px]">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-white/60">
            Cargando disponibilidad...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-sm text-white/60">
            {error}
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {step === "day" ? (
              <motion.div
                key="step-day"
                custom={direction}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium text-white/40 sm:text-xs sm:tracking-[0.15em]">
                    {dayLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                  {weekStarts.map((weekStart, index) => {
                    const weekEnd = addDays(weekStart, 7);
                    const weekDates = availableDates.filter((dateKey) => {
                      if (dateKey < weekStart || dateKey >= weekEnd) return false;
                      return true;
                    });

                    return (
                      <div
                        key={weekStart}
                        className={cn(
                          "grid min-h-[40px] grid-cols-7 gap-1.5",
                          index === 0 ? "mt-3" : "mt-2"
                        )}
                      >
                        {weekDates.map((dateKey) => {
                          const dayNumber = Number(dateKey.slice(8));
                          const isSelected = selectedDate === dateKey;
                          return (
                            <button
                              key={dateKey}
                              style={{ gridColumnStart: getWeekdayColumn(dateKey) }}
                              className={cn(
                                "flex h-9 items-center justify-center rounded-lg text-sm transition sm:h-10 sm:rounded-xl",
                                "border border-white/20 text-white hover:border-[color:var(--accent)]",
                                isSelected &&
                                  "bg-[color:var(--accent)] text-[#0b0b0b] border-transparent"
                              )}
                              type="button"
                              onClick={() => {
                                setSelectedDate(dateKey);
                                setSelectedSlot(null);
                                setBookingStatus("idle");
                                setBookingMessage(null);
                              }}
                            >
                              {dayNumber}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                  {!availableDates.length ? (
                    <p className="mt-6 text-center text-sm text-white/50">
                      No hay horarios disponibles por ahora.
                    </p>
                  ) : null}
                </div>

                <AnimatePresence initial={false}>
                  {selectedDate ? (
                    <motion.div
                      key="times-panel"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                      className="mt-6 mx-auto w-full max-w-[360px] rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                        <Clock className="h-4 w-4" />
                        Seleccioná un horario
                      </div>
                      <p className="mt-2 text-xs text-white/50">
                        Día seleccionado: {dateLabel}
                      </p>
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={selectedDate}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                          className="mt-4 flex flex-wrap justify-center gap-2 md:grid md:grid-cols-3 md:justify-items-center md:gap-2"
                        >
                          {slotsForDate.map((slot) => (
                            <button
                              key={slot.start}
                              className={cn(
                                "min-w-[100px] rounded-xl border border-white/15 px-3 py-2 text-center text-[11px] text-white/80 transition whitespace-nowrap md:w-full md:max-w-[110px] md:px-3 md:py-2 md:text-[11px]",
                                "hover:border-[color:var(--accent)] hover:text-white",
                                selectedSlot?.start === slot.start &&
                                  "border-transparent bg-[color:var(--accent)] text-[#0b0b0b]"
                              )}
                              type="button"
                              onClick={() => {
                                setSelectedSlot(slot);
                                setBookingStatus("idle");
                                setBookingMessage(null);
                                goToStep("confirm", 1);
                              }}
                            >
                              {slot.label}
                            </button>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            ) : null}

            {step === "confirm" ? (
              <motion.div
                key="step-confirm"
                custom={direction}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  <CalendarCheck className="h-4 w-4" />
                  Confirmá la cita
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white">Fecha: {dateLabel}</p>
                  <p className="mt-2 text-sm text-white">
                    Horario: {selectedSlot?.label}
                  </p>
                </div>
                <div className="mt-4 grid gap-3">
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/40"
                    placeholder="Nombre"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/40"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <textarea
                    className="min-h-[90px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/40"
                    placeholder="Notas (opcional)"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </div>
                {bookingMessage ? (
                  <p
                    className={cn(
                      "mt-3 text-sm",
                      bookingStatus === "success" && "text-green-400",
                      bookingStatus === "taken" && "text-amber-400",
                      bookingStatus === "error" && "text-red-400"
                    )}
                  >
                    {bookingMessage}
                  </p>
                ) : null}
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    type="button"
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
                      !selectedSlot || !email
                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                        : "bg-[color:var(--accent)] text-[#0b0b0b] hover:bg-[color:var(--accent-light)]"
                    )}
                    disabled={!selectedSlot || !email || bookingStatus === "loading"}
                    onClick={handleBook}
                  >
                    {bookingStatus === "loading" ? "Confirmando..." : "Confirmar cita"}
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white/70 transition hover:text-white"
                    onClick={() => goToStep("day", -1)}
                  >
                    Cambiar horario
                  </button>
                </div>
              </motion.div>
            ) : null}

            {step === "success" ? (
              <motion.div
                key="step-success"
                custom={direction}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  <CalendarCheck className="h-4 w-4" />
                  Reserva confirmada
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white">Fecha: {dateLabel}</p>
                  <p className="mt-2 text-sm text-white">
                    Horario: {selectedSlot?.label}
                  </p>
                  {name ? (
                    <p className="mt-2 text-sm text-white">Nombre: {name}</p>
                  ) : null}
                  {email ? (
                    <p className="mt-2 text-sm text-white">Email: {email}</p>
                  ) : null}
                </div>
                <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Reserva confirmada. Te enviamos el detalle por email.
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[color:var(--accent-light)]"
                    onClick={() => {
                      setSelectedDate(null);
                      setSelectedSlot(null);
                      setName("");
                      setEmail("");
                      setNotes("");
                      setBookingStatus("idle");
                      setBookingMessage(null);
                      goToStep("day", -1);
                    }}
                  >
                    Agendar otra reunión
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white/70 transition hover:text-white"
                    onClick={() => goToStep("day", -1)}
                  >
                    Volver
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
