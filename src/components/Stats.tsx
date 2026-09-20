import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { STATS, type Stat } from "../lib/site";
import { prefersReducedMotion } from "../lib/motion";

function format(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Gentle count-up — eases out, never spins aggressively. */
function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<string>(format(0, stat.decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDisplay(format(stat.value, stat.decimals));
      return;
    }
    let raf = 0;
    let started = false;
    const run = (): void => {
      const duration = 1500;
      const t0 = performance.now();
      const step = (now: number): void => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(2, -10 * p);
        setDisplay(format(stat.value * (p === 1 ? 1 : eased), stat.decimals));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [stat.value, stat.decimals]);

  return (
    <div
      ref={ref}
      className="border-l border-charcoal/10 px-6 py-8 text-center first:border-l-0 sm:py-10 max-lg:odd:border-l-0 max-lg:[&:nth-child(n+3)]:border-t"
    >
      <p className="font-display text-[clamp(1.9rem,8vw,3.6rem)] font-extrabold tracking-tight text-forest">
        {stat.prefix}
        {display}
        <span className="text-lime-deep">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-charcoal/55">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section aria-label="Verdant Clean in numbers" className="border-y border-charcoal/10 bg-cream">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 divide-x divide-charcoal/10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} />
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
