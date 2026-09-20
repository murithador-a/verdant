import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import { CheckIcon } from "./icons";
import { prefersReducedMotion, registerGsap, usePrefersReducedMotion } from "../lib/motion";

const STAGES = [
  { stage: "Stage 01", title: "Lived-in", copy: "Real life, in progress. Shoes by the door, stories on the sofa." },
  { stage: "Stage 02", title: "Being cleaned", copy: "Checklists, detail, care — every surface gets attention." },
  { stage: "Stage 03", title: "Completely refreshed", copy: "Light, order, calm. The room breathes again." },
];

const CHIPS = ["Declutter", "Deep detail", "Polish & reset"];

/**
 * The signature scroll moment — a room transforms from lived-in
 * to looking new, driven entirely by scroll progress.
 */
export default function Transformation() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <StaticTransformation />;
  return <PinnedTransformation />;
}

function StaticTransformation() {
  return (
    <section aria-label="From lived-in to looking new" className="section-pad bg-cream">
      <div className="container-x">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-forest/70">
            <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-full bg-lime-deep" />
            The Verdant effect
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em]">
            From lived-in
            <br />
            to looking new.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { src: "/images/transform-lived.jpg", alt: "A cozy lived-in apartment living room", label: "01 · Lived-in" },
            { src: "/images/transform-cleaning.jpg", alt: "A Verdant specialist detailing a marble countertop", label: "02 · Being cleaned" },
            { src: "/images/transform-fresh.jpg", alt: "A pristine living room flooded with morning light", label: "03 · Refreshed" },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 100}>
              <figure className="overflow-hidden rounded-3xl">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="bg-forest px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-cream">
                  {img.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedTransformation() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      gsap.set(q(".t-cleaning"), { clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(q(".t-fresh"), { autoAlpha: 0, scale: 1.07 });
      gsap.set(q(".t-caption"), { autoAlpha: 0, y: 24 });
      gsap.set(q(".t-caption-0"), { autoAlpha: 1, y: 0 });
      gsap.set(q(".t-chip"), { autoAlpha: 0, y: 18 });
      gsap.set(q(".t-final-line"), { yPercent: 115 });
      gsap.set(q(".t-final"), { autoAlpha: 0 });
      gsap.set(q(".t-sweep"), { xPercent: -220 });
      gsap.set(q(".t-dim"), { opacity: 0 });
      gsap.set(q(".t-bar"), { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      /* Progress runs across the whole journey */
      tl.fromTo(".t-bar", { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0);

      /* Phase 1 — the clean begins (wipe reveal) */
      tl.to(".t-cleaning", { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }, 0.05);
      tl.to(".t-caption-0", { autoAlpha: 0, y: -20, duration: 0.25 }, 0.15);
      tl.to(".t-caption-1", { autoAlpha: 1, y: 0, duration: 0.3 }, 0.35);
      tl.fromTo(".t-sweep", { xPercent: -220 }, { xPercent: 420, duration: 1 }, 0.1);
      tl.to(".t-chip-0", { autoAlpha: 1, y: 0, duration: 0.25 }, 0.4);
      tl.to(".t-chip-1", { autoAlpha: 1, y: 0, duration: 0.25 }, 0.65);

      /* Phase 2 — the room becomes new */
      tl.to(".t-fresh", { autoAlpha: 1, scale: 1, duration: 0.9 }, 1.1);
      tl.to(".t-caption-1", { autoAlpha: 0, y: -20, duration: 0.25 }, 1.2);
      tl.to(".t-caption-2", { autoAlpha: 1, y: 0, duration: 0.3 }, 1.4);
      tl.to(".t-chip-2", { autoAlpha: 1, y: 0, duration: 0.25 }, 1.55);

      /* Phase 3 — the statement */
      tl.to(".t-dim", { opacity: 0.62, duration: 0.5 }, 2.1);
      tl.to(".t-captions", { autoAlpha: 0, y: -26, duration: 0.35 }, 2.15);
      tl.to(".t-chips", { autoAlpha: 0, y: -18, duration: 0.35 }, 2.15);
      tl.to(".t-final", { autoAlpha: 1, duration: 0.2 }, 2.3);
      tl.to(".t-final-line", { yPercent: 0, duration: 0.5, stagger: 0.12 }, 2.3);
      tl.fromTo(
        ".t-final-sub",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.35 },
        2.6,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="Watch a room transform as you scroll" className="relative bg-pine">
      <div className="relative flex h-svh flex-col overflow-hidden">
        {/* Layer 1 — lived in */}
        <img
          src="/images/transform-lived.jpg"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Layer 2 — being cleaned */}
        <div className="t-cleaning absolute inset-0 will-change-[clip-path]" aria-hidden="true">
          <img
            src="/images/transform-cleaning.jpg"
            alt=""
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Layer 3 — refreshed */}
        <div className="t-fresh absolute inset-0 will-change-transform" aria-hidden="true">
          <img
            src="/images/transform-fresh.jpg"
            alt=""
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Travelling light */}
        <div
          aria-hidden="true"
          className="t-sweep pointer-events-none absolute -top-[15%] left-0 h-[130%] w-40 rotate-[14deg] bg-gradient-to-r from-transparent via-cream/30 to-transparent blur-md will-change-transform sm:w-64"
        />
        {/* Legibility grades */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-pine/85 via-pine/10 to-pine/45" />
        <div aria-hidden="true" className="t-dim absolute inset-0 bg-pine" />

        {/* Top row */}
        <div className="container-x relative z-10 flex items-center justify-between pt-24 sm:pt-28">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 bg-pine/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream backdrop-blur-md">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime" />
            The Verdant effect
          </p>
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/60 sm:block">
            Scroll to transform
          </p>
        </div>

        {/* Floating process chips */}
        <div className="t-chips container-x relative z-10 mt-auto hidden flex-col items-end gap-3 pb-2 sm:flex" aria-hidden="true">
          {CHIPS.map((chip, i) => (
            <span
              key={chip}
              className={`t-chip t-chip-${i} inline-flex items-center gap-2 rounded-full border border-cream/20 bg-pine/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-md`}
            >
              <CheckIcon className="h-3.5 w-3.5 text-lime" />
              {chip}
            </span>
          ))}
        </div>

        {/* Bottom narrative */}
        <div className="container-x relative z-10 pb-12 sm:pb-16">
          <div className="t-captions relative h-40 min-[400px]:h-36 sm:h-32" aria-hidden="true">
            {STAGES.map((s, i) => (
              <div key={s.stage} className={`t-caption t-caption-${i} absolute inset-x-0 bottom-0 max-w-md`}>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-lime">{s.stage}</p>
                <p className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-cream sm:text-4xl">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-cream/70 sm:text-base">{s.copy}</p>
              </div>
            ))}
          </div>

          {/* Finale headline */}
          <div className="t-final pointer-events-none absolute inset-x-0 bottom-12 sm:bottom-16" aria-hidden="true">
            <div>
              <p className="font-display text-[clamp(2.2rem,6.5vw,5.2rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-cream">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="t-final-line block">From lived-in</span>
                </span>
                <span className="block overflow-hidden pb-[0.1em]">
                  <span className="t-final-line block">
                    to looking new<span className="text-lime">.</span>
                  </span>
                </span>
              </p>
              <p className="t-final-sub mt-4 max-w-md text-sm text-cream/70 sm:text-base">
                Every Verdant visit follows the same journey — declutter, detail, polish — until
                your space feels new again.
              </p>
            </div>
          </div>

          {/* Screen-reader summary of the visual story */}
          <p className="sr-only">
            A room transforms from lived-in, to being cleaned, to completely refreshed.
          </p>

          {/* Progress */}
          <div className="mt-8 flex items-center gap-4" aria-hidden="true">
            <div className="h-[3px] w-44 overflow-hidden rounded-full bg-cream/20 sm:w-64">
              <div className="t-bar h-full w-full origin-left rounded-full bg-lime" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-cream/60">
              01 — 03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
