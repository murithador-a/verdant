import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import { WhatsAppButton } from "./WhatsAppCTA";
import { prefersReducedMotion, registerGsap } from "../lib/motion";

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".final-bg",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="book" aria-labelledby="book-heading" className="relative scroll-mt-16 overflow-hidden bg-pine text-cream">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/final.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="final-bg h-full w-full scale-[1.2] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine/80 via-pine/55 to-pine/90" />
      </div>

      <div className="container-x relative py-28 text-center sm:py-40">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/90 backdrop-blur-md">
            <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
            Booking for this week
          </p>
          <h2
            id="book-heading"
            className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.3rem,10vw,5.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-balance"
          >
            Come home
            <br />
            to clean<span className="text-lime">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            A cleaner space gives you more room to live, work and breathe.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton size="lg" showIcon label="Talk to Verdant Clean on WhatsApp">
              Talk to Verdant Clean
            </WhatsAppButton>
          </div>
          <p className="mt-6 text-sm text-cream/60">Available 7 days a week · Replies within minutes</p>
        </Reveal>
      </div>
    </section>
  );
}
