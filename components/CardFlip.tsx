"use client";

/**
 * @author: @dorianbaffier
 * @description: Card Flip (customized for pricing)
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardFlipProps {
  title: string;
  subtitle?: string;
  priceArs: string;
  priceUsd?: string;
  ctaLabel: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
  includesNote?: string;
  extraTitle?: string;
  extraFeatures?: string[];
}

export default function CardFlip({
  title,
  subtitle,
  priceArs,
  priceUsd,
  ctaLabel,
  features,
  badge,
  highlight = false,
  includesNote,
  extraTitle,
  extraFeatures = [],
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggle = () => setIsFlipped((prev) => !prev);

  return (
    <div
      className="group relative h-[420px] w-full [perspective:2000px] sm:h-[380px] md:h-[330px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "border border-white/10",
            "shadow-lg",
            "transition-all duration-700",
            "group-hover:shadow-xl",
            highlight
              ? "bg-gradient-to-br from-[#0b0b0b] via-[#2a1708] to-[#c46a1a] border-[color:var(--accent)]/70 shadow-[0_0_60px_rgba(245,166,35,0.32)]"
              : "bg-zinc-950",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="absolute inset-0 flex items-center justify-start p-6">
            <div className="w-full max-w-[72%] space-y-3 text-left">
              {badge ? (
                <span className="inline-flex rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-light)]">
                  {badge}
                </span>
              ) : null}
              <h3
                className={cn(
                  "font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl",
                  highlight ? "text-[color:var(--accent)]" : "text-white"
                )}
              >
                {title}
              </h3>
              {subtitle ? <p className="text-base text-white/60">{subtitle}</p> : null}
              <div className="flex items-end gap-2">
                <span className="text-4xl font-semibold text-white md:text-5xl">
                  {priceArs}
                </span>
                <span className="text-base text-white/60">/ mes</span>
              </div>
              {priceUsd ? <p className="text-base text-white/60">{priceUsd}</p> : null}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-5",
            "border border-white/10",
            "shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-xl",
            "overflow-hidden",
            highlight
              ? "bg-gradient-to-br from-[#0b0b0b] via-[#2a1708] to-[#c46a1a] border-[color:var(--accent)]/70 shadow-[0_0_60px_rgba(245,166,35,0.32)]"
              : "bg-zinc-950",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex-1">
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-semibold text-white leading-snug tracking-tight md:text-xl">
                {title}
              </h3>
              <p className="text-xs text-white/60">
                {priceArs} / mes {priceUsd ? `· ${priceUsd}` : ""}
              </p>
              {includesNote ? <p className="text-[10px] text-white/50">{includesNote}</p> : null}
            </div>

            <div
              className={cn(
                "mt-3 grid gap-3",
                extraTitle && extraFeatures.length ? "md:grid-cols-[1fr_0.9fr]" : ""
              )}
            >
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    className="flex items-center gap-2 text-[12px] leading-snug text-white/80 transition-all duration-500"
                    key={feature}
                    style={{
                      transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 90 + 160}ms`,
                    }}
                  >
                    <ArrowRight className="h-3 w-3 text-[color:var(--accent)]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {extraTitle && extraFeatures.length ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-light)]">
                    {extraTitle}
                  </p>
                  <div className="mt-2 space-y-1">
                    {extraFeatures.map((extra) => (
                      <div
                        key={extra}
                        className="flex items-start gap-2 text-[11px] leading-snug text-white/80"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                        <span>{extra}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={(event) => event.stopPropagation()}
              className={cn(
                "group/start relative flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                highlight
                  ? "bg-[color:var(--accent)] text-[#0b0b0b] hover:bg-[color:var(--accent-light)]"
                  : "bg-white/10 text-white hover:bg-white/15"
              )}
            >
              <span>{ctaLabel}</span>
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform group-hover/start:translate-x-0.5",
                  highlight ? "text-[#0b0b0b]" : "text-[color:var(--accent)]"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
