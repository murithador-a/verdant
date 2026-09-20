import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import { WhatsAppButton } from "./WhatsAppCTA";
import { CheckIcon, StarIcon } from "./icons";
import { COMMERCIAL_INDUSTRIES } from "../lib/site";
import { prefersReducedMotion, registerGsap } from "../lib/motion";

export default function Commercial() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Gentle parallax on the editorial imagery */
  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".c-main",
        { y: 34 },
        {
          y: -34,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.fromTo(
        ".c-card",
        { y: 60 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="commercial" aria-labelledby="commercial-heading" className="section-pad scroll-mt-16 overflow-hidden bg-parchment/60">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-forest/70">
              <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-full bg-lime-deep" />
              For business
            </p>
            <h2
              id="commercial-heading"
              className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-balance"
            >
              A cleaner business starts here.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal/65 sm:text-lg">
              From daily office upkeep to high-turnover short-stay properties, Verdant Clean builds
              reliable cleaning routines around the way your business operates.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul aria-label="Industries we serve" className="mt-8 flex flex-wrap gap-2.5">
              {COMMERCIAL_INDUSTRIES.map((industry) => (
                <li
                  key={industry}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-medium text-charcoal/80 ring-1 ring-charcoal/10"
                >
                  <CheckIcon className="h-3.5 w-3.5 text-lime-deep" />
                  {industry}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-col gap-5">
              <WhatsAppButton
                variant="forest"
                size="md"
                className="w-full text-center min-[560px]:w-auto min-[560px]:self-start min-[560px]:px-9 min-[560px]:py-4 min-[560px]:text-base"
                label="Request a commercial cleaning quote on WhatsApp"
              >
                <span className="min-[420px]:hidden">Commercial Quote</span>
                <span className="hidden min-[420px]:inline">Request a Commercial Quote</span>
              </WhatsAppButton>
              <p className="text-sm text-charcoal/50">
                Dedicated account support · Flexible contracts · After-hours available
              </p>
            </div>
          </Reveal>
        </div>

        {/* Editorial imagery */}
        <div className="relative pb-16 pr-4 sm:pr-10 lg:pb-20">
          <Reveal>
            <div className="c-main overflow-hidden rounded-[2rem] ring-1 ring-charcoal/10">
              <img
                src="/images/commercial-restaurant.jpg"
                alt="An immaculate upscale restaurant dining room ready for guests"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full scale-[1.12] object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="absolute -bottom-2 left-0 w-[52%] sm:bottom-2">
            <div className="c-card overflow-hidden rounded-[1.5rem] ring-[6px] ring-cream">
              <img
                src="/images/service-shortstay.jpg"
                alt="A boutique hotel-style room with crisp white linen"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: "50% 60%" }}
                className="aspect-[4/3] w-full scale-[1.12] object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={250} className="absolute -top-5 right-0 sm:top-6">
            <div className="rounded-2xl border border-cream/40 bg-pine/70 px-5 py-4 text-cream shadow-xl backdrop-blur-md">
              <p className="flex items-center gap-1" aria-label="Rated 4.9 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5 text-lime" />
                ))}
              </p>
              <p className="mt-1.5 font-display text-sm font-extrabold">4.9 / 5</p>
              <p className="text-xs text-cream/65">600+ verified reviews</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
