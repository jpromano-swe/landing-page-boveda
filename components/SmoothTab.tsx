"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  title: string;
  description: string;
  color: string; // bg color for active tab
  accent: string; // accent color for content
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

const transition = {
  duration: 0.25,
  ease: [0.32, 0.72, 0, 1],
};

export default function SmoothTab({ items }: { items: TabItem[] }) {
  const [selected, setSelected] = React.useState(items[0]?.id ?? "");
  const [direction, setDirection] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });
  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected);
      const container = containerRef.current;
      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    requestAnimationFrame(updateDimensions);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selected]);

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected);
    const newIndex = items.findIndex((item) => item.id === tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(tabId);
  };

  const selectedItem = items.find((item) => item.id === selected);

  return (
    <div className="flex flex-col">
      <div className="relative mb-5 h-[190px] w-full rounded-2xl border border-black/10 bg-[#f4efe6] p-6">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={selected}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-4"
          >
            <div className="space-y-2">
              <div
                className={cn(
                  "h-1 w-10 rounded-full",
                  selectedItem?.accent ?? "bg-[color:var(--accent)]"
                )}
              />
              <p className="text-lg font-semibold text-slate-900">
                {selectedItem?.title}
              </p>
              <p className="text-sm text-slate-600">{selectedItem?.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        ref={containerRef}
        role="tablist"
        aria-label="Resumen de beneficios"
        className="relative grid grid-cols-3 gap-3 rounded-xl border border-black/10 bg-[#f4efe6] p-2"
      >
        <motion.div
          className={cn(
            "absolute z-[1] rounded-lg",
            selectedItem?.color ?? "bg-[color:var(--accent)]"
          )}
          animate={{
            width: Math.max(dimensions.width - 8, 0),
            x: dimensions.left + 4,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{ height: "calc(100% - 8px)", top: "4px" }}
        />

        {items.map((item) => {
          const isSelected = selected === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                if (el) buttonRefs.current.set(item.id, el);
                else buttonRefs.current.delete(item.id);
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleTabClick(item.id)}
              className={cn(
                "relative z-[2] rounded-lg px-3 py-3 text-sm font-semibold transition",
                isSelected
                  ? "text-[#0b0b0b]"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
