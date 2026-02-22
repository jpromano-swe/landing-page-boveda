"use client";

import { CalendarCheck, ChevronDown, ChevronLeft, ChevronRight, Clock } from "lucide-react";
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

  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const [minLoaderDone, setMinLoaderDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMinLoaderDone(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/calendar/availability?days=28`, {
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

  const availableDates = useMemo(() => Array.from(slotsByDate.keys()).sort(), [slotsByDate]);

  const addDays = (dateKey: string, amount: number) => {
    const date = new Date(`${dateKey}T00:00:00${tzOffset}`);
    date.setDate(date.getDate() + amount);
    return date.toISOString().slice(0, 10);
  };

  const getWeekdayIndex = (dateKey: string) => {
    const date = new Date(`${dateKey}T00:00:00${tzOffset}`);
    return date.getDay();
  };

  const isWeekend = (dateKey: string) => {
    const day = getWeekdayIndex(dateKey);
    return day === 0 || day === 6;
  };

  const hasSlots = (dateKey: string) => (slotsByDate.get(dateKey)?.length ?? 0) > 0;

  const rangeStartDateKey = useMemo(() => {
    return availability?.range?.start?.slice(0, 10) || availableDates[0] || null;
  }, [availability, availableDates]);

  const rangeEndDateKey = useMemo(() => {
    if (availability?.range?.end) {
      return addDays(availability.range.end.slice(0, 10), -1);
    }
    return availableDates[availableDates.length - 1] ??
      (rangeStartDateKey ? addDays(rangeStartDateKey, 27) : null);
  }, [availability, availableDates, rangeStartDateKey, tzOffset]);

  const calendarStart = useMemo(() => {
    if (!rangeStartDateKey) return null;
    return addDays(rangeStartDateKey, -getWeekdayIndex(rangeStartDateKey));
  }, [rangeStartDateKey, tzOffset]);

  const calendarEnd = useMemo(() => {
    if (!rangeEndDateKey) return null;
    return addDays(rangeEndDateKey, 6 - getWeekdayIndex(rangeEndDateKey));
  }, [rangeEndDateKey, tzOffset]);

  const calendarDates = useMemo(() => {
    if (!calendarStart || !calendarEnd) return [];
    const list: string[] = [];
    let current = calendarStart;
    while (current <= calendarEnd) {
      list.push(current);
      current = addDays(current, 1);
    }
    return list;
  }, [calendarStart, calendarEnd, tzOffset]);

  const weekPages = useMemo(() => {
    const weeks: string[][] = [];
    for (let i = 0; i < calendarDates.length; i += 7) {
      weeks.push(calendarDates.slice(i, i + 7));
    }
    return weeks;
  }, [calendarDates]);

  useEffect(() => {
    if (!weekPages.length) {
      setActiveWeekIndex(0);
      return;
    }
    setActiveWeekIndex((prev) => Math.min(prev, weekPages.length - 1));
  }, [weekPages.length]);

  useEffect(() => {
    if (!selectedDate && availableDates.length) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;
    if (!hasSlots(selectedDate) || isWeekend(selectedDate)) {
      setSelectedDate(availableDates[0] ?? null);
    }
  }, [selectedDate, availableDates]);

  const monthLabel = useMemo(() => {
    const week = weekPages[activeWeekIndex];
    const anchor = week?.find((dateKey) => {
      const day = Number(dateKey.slice(8));
      return day <= 15;
    }) || week?.[0] || rangeStartDateKey;

    if (!anchor) return "Agenda";
    const [year, month] = anchor.split("-");
    return `${monthNames[Number(month) - 1]} ${year}`;
  }, [weekPages, activeWeekIndex, rangeStartDateKey]);

  const dateLabel = useMemo(() => {
    if (!selectedDate) return "";
    const [year, month, day] = selectedDate.split("-");
    return `${Number(day)} de ${monthNames[Number(month) - 1]} ${year}`;
  }, [selectedDate]);

  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return slotsByDate.get(selectedDate) ?? [];
  }, [selectedDate, slotsByDate]);

  const slotGroups = useMemo(() => {
    const groups = [
      { key: "manana", label: "Mañana", slots: [] as Slot[] },
      { key: "tarde", label: "Tarde", slots: [] as Slot[] },
      { key: "noche", label: "Noche", slots: [] as Slot[] },
    ];

    slotsForDate.forEach((slot) => {
      const hour = new Date(slot.start).getHours();
      if (hour < 12) groups[0].slots.push(slot);
      else if (hour < 18) groups[1].slots.push(slot);
      else groups[2].slots.push(slot);
    });

    return groups.filter((group) => group.slots.length > 0);
  }, [slotsForDate]);

  const goToStep = (next: typeof step, dir: number) => {
    setDirection(dir);
    setStep(next);
  };

  const jumpToWeek = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, weekPages.length - 1));
    setActiveWeekIndex(nextIndex);
    const week = weekPages[nextIndex] ?? [];
    if (!week.includes(selectedDate ?? "")) {
      const firstAvailable = week.find((dateKey) => hasSlots(dateKey) && !isWeekend(dateKey)) ?? null;
      setSelectedDate(firstAvailable);
      setSelectedSlot(null);
      setBookingStatus("idle");
      setBookingMessage(null);
      setStep("day");
    }
  };

  const handleSelectDate = (dateKey: string) => {
    if (isWeekend(dateKey) || !hasSlots(dateKey)) return;
    setSelectedDate(dateKey);
    setSelectedSlot(null);
    setBookingStatus("idle");
    setBookingMessage(null);
    if (step !== "day") goToStep("day", -1);
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
        setBookingMessage("Ese horario ya fue tomado. Elegí otro.");
        goToStep("day", -1);
        return;
      }

      setBookingStatus("error");
      setBookingMessage("No pudimos confirmar la cita. Intentá nuevamente.");
    } catch {
      setBookingStatus("error");
      setBookingMessage("No pudimos confirmar la cita. Intentá nuevamente.");
    }
  };

  const renderDayCell = (dateKey: string, compact = false) => {
    const weekday = dayLabels[getWeekdayIndex(dateKey)];
    const disabled = isWeekend(dateKey) || !hasSlots(dateKey);
    const selected = selectedDate === dateKey;
    const dayNumber = Number(dateKey.slice(8));

    return (
      <button
        key={`${compact ? "compact" : "grid"}-${dateKey}`}
        type="button"
        onClick={() => handleSelectDate(dateKey)}
        disabled={disabled}
        className={cn(
          "group flex w-full flex-col items-center justify-center rounded-2xl border transition",
          compact ? "min-h-[72px] gap-0.5 px-1 py-2" : "min-h-[64px] gap-0.5 px-1 py-2",
          "border-white/10",
          disabled && "cursor-not-allowed bg-white/5 text-white/30",
          !disabled && !selected && "bg-transparent text-white hover:border-white/20 hover:bg-white/5",
          selected && "border-[color:var(--accent)] bg-[color:var(--accent)] text-[#0b0b0b] shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
        )}
        aria-pressed={selected}
      >
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.16em]",
            selected ? "text-black/70" : disabled ? "text-white/30" : "text-white/60"
          )}
        >
          {weekday}
        </span>
        <span
          className={cn(
            compact ? "text-xl" : "text-lg",
            "font-semibold leading-none",
            selected ? "text-[#0b0b0b]" : disabled ? "text-white/45" : "text-white"
          )}
        >
          {dayNumber}
        </span>
      </button>
    );
  };

  const activeWeek = weekPages[activeWeekIndex] ?? [];
  const secondExpandedWeek = calendarExpanded ? weekPages[activeWeekIndex + 1] ?? [] : [];
  const loaderVisible = loading || !minLoaderDone;

  return (
    <>
      <AnimatePresence>
        {loaderVisible ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-12 w-12">
                <span className="absolute inset-0 rounded-full border-2 border-white/15" />
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[color:var(--accent)]"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                />
              </div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/80">Cargando agenda</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="mx-auto w-full max-w-6xl rounded-[2rem] bg-black/45 p-2 backdrop-blur-[3px] sm:p-3"
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={
          loaderVisible
            ? { opacity: 0, y: 24, scale: 0.985 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      >
      <motion.div
        className="p-0"
        initial={{ opacity: 0 }}
        animate={loaderVisible ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        <motion.div
          className="rounded-3xl bg-[#111111] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={loaderVisible ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {monthLabel}
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => jumpToWeek(activeWeekIndex - 1)}
                disabled={activeWeekIndex <= 0 || !weekPages.length}
                aria-label="Semana anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => jumpToWeek(activeWeekIndex + 1)}
                disabled={activeWeekIndex >= weekPages.length - 1 || !weekPages.length}
                aria-label="Semana siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <motion.div layout className="mt-4 space-y-2 overflow-hidden">
            <div className="grid grid-cols-7 gap-2">
              {activeWeek.length ? (
                activeWeek.map((dateKey) => renderDayCell(dateKey, true))
              ) : (
                <div className="col-span-7 rounded-xl bg-white/5 p-4 text-center text-sm text-white/65">
                  {loading ? "Cargando días..." : "Sin disponibilidad en este rango"}
                </div>
              )}
            </div>

            <AnimatePresence initial={false}>
              {calendarExpanded && secondExpandedWeek.length ? (
                <motion.div
                  key={`expanded-${activeWeekIndex}`}
                  layout
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-7 gap-2">
                    {secondExpandedWeek.map((dateKey) => renderDayCell(dateKey, true))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <button
            type="button"
            onClick={() => setCalendarExpanded((prev) => !prev)}
            className="mx-auto mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
            aria-expanded={calendarExpanded}
            aria-label={calendarExpanded ? "Mostrar una semana" : "Mostrar dos semanas"}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                calendarExpanded && "rotate-180"
              )}
            />
          </button>

        </motion.div>

        <motion.div
          className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
          initial={{ opacity: 0, y: 22 }}
          animate={loaderVisible ? { opacity: 0, y: 22 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <div className="rounded-3xl bg-[#111111] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)] sm:p-5">
            {loading ? (
              <div className="flex min-h-[220px] items-center justify-center text-sm text-white/65">
                Cargando disponibilidad...
              </div>
            ) : error ? (
              <div className="flex min-h-[220px] items-center justify-center text-sm text-white/65">
                {error}
              </div>
            ) : !selectedDate ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <p className="font-display text-2xl font-semibold text-white">
                  Elegí un día disponible
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">
                  Los días en gris están ocupados o no tenemos reuniones (sábado y domingo).
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                  <Clock className="h-4 w-4" />
                  Disponibilidad
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  {dateLabel}
                </h3>

                <div className="mt-5 space-y-5">
                  {slotGroups.length ? (
                    slotGroups.map((group) => (
                      <div key={group.key}>
                        <p className="mb-3 text-sm font-medium text-white/65">{group.label}</p>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {group.slots.map((slot) => (
                            <button
                              key={slot.start}
                              type="button"
                              className={cn(
                                "rounded-xl border px-3 py-3.5 text-center text-[15px] font-semibold leading-none transition sm:text-sm",
                                "border-white/10 bg-white/5 text-white hover:border-[color:var(--accent)] hover:bg-white/10",
                                selectedSlot?.start === slot.start &&
                                  "border-[color:var(--accent)] bg-[color:var(--accent)] text-[#0b0b0b]"
                              )}
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
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/65">
                      No hay horarios para este día. Elegí otra fecha.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="rounded-3xl bg-[#0d0d0d] p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)] sm:p-5">
            <div className="rounded-2xl bg-white/[0.04] p-4 sm:p-5">
              <AnimatePresence initial={false} custom={direction} mode="wait">
              {step === "day" ? (
                <motion.div
                  key="side-day"
                  custom={direction}
                  initial={{ x: 24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -24, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="flex min-h-[260px] flex-col"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                    <CalendarCheck className="h-4 w-4" />
                    Confirmación
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                    Seleccioná un horario
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                    Elegí un horario disponible para avanzar con la reserva. La reunión dura aprox. 20 minutos.
                  </p>

                  <div className="mt-5 rounded-xl bg-white/[0.06] p-4 text-sm leading-relaxed text-white/90">
                    {selectedDate ? (
                      <p>
                        Día seleccionado: <span className="font-semibold text-white">{dateLabel}</span>
                      </p>
                    ) : (
                      <p>Primero elegí una fecha disponible en el calendario.</p>
                    )}
                    {selectedSlot ? (
                      <p className="mt-2">
                        Horario: <span className="font-semibold text-white">{selectedSlot.label}</span>
                      </p>
                    ) : null}
                  </div>

                  <p className="mt-auto pt-6 text-xs leading-relaxed text-white/60">
                    Este sitio no constituye asesoramiento financiero. Bitcoin y otros activos financieros pueden subir o bajar.
                  </p>
                </motion.div>
              ) : null}

              {step === "confirm" ? (
                <motion.div
                  key="side-confirm"
                  custom={direction}
                  initial={{ x: 24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -24, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="flex min-h-[260px] flex-col"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                    <CalendarCheck className="h-4 w-4" />
                    Confirmá la cita
                  </div>
                  <div className="mt-4 rounded-xl bg-white/[0.06] p-4 text-sm leading-relaxed text-white/95">
                    <p>Fecha: {dateLabel}</p>
                    <p className="mt-2">Horario: {selectedSlot?.label}</p>
                  </div>
                  <div className="mt-4 grid gap-3">
                    <input
                      className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)]/40"
                      placeholder="Nombre"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <input
                      className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)]/40"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <textarea
                      className="min-h-[90px] w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)]/40"
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
                          ? "cursor-not-allowed bg-white/10 text-white/40"
                          : "bg-[color:var(--accent)] text-[#0b0b0b] hover:bg-[color:var(--accent-light)]"
                      )}
                      disabled={!selectedSlot || !email || bookingStatus === "loading"}
                      onClick={handleBook}
                    >
                      {bookingStatus === "loading" ? "Confirmando..." : "Confirmar cita"}
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                      onClick={() => goToStep("day", -1)}
                    >
                      Cambiar
                    </button>
                  </div>
                </motion.div>
              ) : null}

              {step === "success" ? (
                <motion.div
                  key="side-success"
                  custom={direction}
                  initial={{ x: 24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -24, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="flex min-h-[260px] flex-col"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                    <CalendarCheck className="h-4 w-4" />
                    Reserva confirmada
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                    ¡Listo! Te esperamos.
                  </h3>
                  <div className="mt-4 rounded-xl bg-white/[0.06] p-4 text-sm leading-relaxed text-white/95">
                    <p>Fecha: {dateLabel}</p>
                    <p className="mt-2">Horario: {selectedSlot?.label}</p>
                    {name ? <p className="mt-2">Nombre: {name}</p> : null}
                    {email ? <p className="mt-2">Email: {email}</p> : null}
                  </div>
                  <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    Reserva confirmada. Te enviamos el detalle por email.
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[color:var(--accent-light)]"
                    onClick={() => {
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
                </motion.div>
              ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </motion.div>
    </>
  );
}
