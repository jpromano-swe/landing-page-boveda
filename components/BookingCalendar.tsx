//@note Falta integrar feature de conexion a Google Calendar para que consulte y agregue directamente. Tanto endpoints para back como conexion con API de GC.

"use client";

import { ChevronLeft, ChevronRight, Clock, CalendarCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const availableDays = new Set([1, 2, 9, 12, 13, 20, 21, 29, 30]);
const times = ["18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00"];

export default function BookingCalendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"day" | "time" | "confirm">("day");
  const [direction, setDirection] = useState(1);

  const monthLabel = "Octubre 2024";
  const dateLabel = useMemo(
    () => (selectedDay ? `${selectedDay} de Octubre 2024` : ""),
    [selectedDay]
  );

  const goToStep = (next: typeof step, dir: number) => {
    setDirection(dir);
    setStep(next);
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
            if (step === "time") goToStep("day", -1);
            if (step === "confirm") goToStep("time", -1);
          }}
          disabled={step === "day"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">{monthLabel}</p>
          <p className="text-2xl font-semibold text-[color:var(--accent)]">Agenda tu reunión</p>
        </div>
        <button
          className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mt-6 min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:min-h-[320px]">
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
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium text-white/40 sm:text-xs sm:tracking-[0.15em]">
                {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1.5">
                {days.map((day) => {
                  const isActive = availableDays.has(day);
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      className={cn(
                        "flex h-9 items-center justify-center rounded-lg text-sm transition sm:h-10 sm:rounded-xl",
                        isActive
                          ? "border border-white/20 text-white hover:border-[color:var(--accent)]"
                          : "text-white/20",
                        isSelected &&
                          "bg-[color:var(--accent)] text-[#0b0b0b] border-transparent"
                      )}
                      disabled={!isActive}
                      type="button"
                      onClick={() => {
                        setSelectedDay(day);
                        setSelectedTime(null);
                        goToStep("time", 1);
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}

          {step === "time" ? (
            <motion.div
              key="step-time"
              custom={direction}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                <Clock className="h-4 w-4" />
                Seleccioná un horario
              </div>
              <p className="mt-2 text-xs text-white/50">Día seleccionado: {dateLabel}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {times.map((time) => (
                  <button
                    key={time}
                    className={cn(
                      "rounded-xl border border-white/15 px-4 py-3 text-[13px] text-white/80 transition whitespace-nowrap",
                      "hover:border-[color:var(--accent)] hover:text-white",
                      selectedTime === time &&
                        "border-transparent bg-[color:var(--accent)] text-[#0b0b0b]"
                    )}
                    type="button"
                    onClick={() => {
                      setSelectedTime(time);
                      goToStep("confirm", 1);
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
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
                <p className="mt-2 text-sm text-white">Horario: {selectedTime}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  className="w-full rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[color:var(--accent-light)]"
                >
                  Confirmar cita
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white/70 transition hover:text-white"
                  onClick={() => goToStep("time", -1)}
                >
                  Cambiar horario
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
