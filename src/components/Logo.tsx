import { cn } from "../lib/cn";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

/** Verdant Clean wordmark — lime tile with a forest "V" + droplet. */
export default function Logo({ tone = "dark", className }: LogoProps) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
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
      <span
        className={cn(
          "font-display text-[15px] font-extrabold tracking-[0.16em]",
          light ? "text-cream" : "text-charcoal",
        )}
      >
        VERDANT{" "}
        <span className={light ? "text-cream/60" : "text-charcoal/55"}>CLEAN</span>
      </span>
    </span>
  );
}
