import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { prefersReducedMotion } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Transition delay in ms — use for gentle staggers. */
  delay?: number;
  id?: string;
}

/**
 * IntersectionObserver-driven scroll reveal.
 * Fades + rises content once as it enters the viewport.
 * Content is visible by default when JS/motion is reduced — never hidden.
 */
export default function Reveal({ children, className, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
