import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

/** Brief cinematic veil while the hero prepares. Fades away on `done`. */
export default function Loader({ done }: { done: boolean }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setGone(true), 750);
    return () => window.clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pine transition-opacity duration-700",
        done ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <svg viewBox="0 0 32 32" className="h-11 w-11" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#C7E86A" />
        <path
          d="M8.5 10.5 16 21.5 23.5 10.5"
          stroke="#10261D"
          strokeWidth="3.1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23.4" cy="23" r="2" fill="#10261D" />
      </svg>
      <p className="mt-5 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-cream">
        Verdant <span className="text-cream/50">Clean</span>
      </p>
      <div className="mt-6 h-[2px] w-44 overflow-hidden rounded-full bg-cream/15">
        <div className="loader-bar h-full w-full bg-lime" />
      </div>
    </div>
  );
}
