import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}

/** Consistent editorial heading block used across sections. */
export default function SectionHeading({
  eyebrow,
  title,
  copy,
  dark = false,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
          align === "center" && "justify-center",
          dark ? "text-sage" : "text-forest/70",
        )}
      >
        <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-full bg-lime-deep" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-balance",
          dark ? "text-cream" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p className={cn("mt-5 max-w-xl text-base leading-relaxed sm:text-lg", dark ? "text-cream/70" : "text-charcoal/65", align === "center" && "mx-auto")}>
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}
