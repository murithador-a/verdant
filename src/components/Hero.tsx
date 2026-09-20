import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import HeroCanvas from "./HeroCanvas";
import { WhatsAppButton } from "./WhatsAppCTA";
import { ArrowIcon, CheckIcon, SparkleIcon, StarIcon } from "./icons";
import { prefersReducedMotion, registerGsap, scrollToId } from "../lib/motion";

const TRUST = [
  { icon: "sparkle", strong: "2,500+", label: "cleanings" },
  { icon: "star", strong: "4.9/5", label: "average rating" },
  { icon: "check", strong: "7 days", label: "a week, available" },
] as const;

function TrustIcon({ name }: { name: (typeof TRUST)[number]["icon"] }) {
  if (name === "star") return <StarIcon className="h-4 w-4 text-lime" />;
  if (name === "check") return <CheckIcon className="h-4 w-4 text-lime" />;
  return <SparkleIcon className="h-4 w-4 text-lime" />;
}

export default function Hero({ started }: { started: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!started || prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-bg", { scale: 1.1, duration: 2.4, ease: "power2.out" }, 0)
        .from(".hero-shade", { autoAlpha: 0, duration: 1.6 }, 0)
        .from(".hero-eyebrow", { y: 22, autoAlpha: 0, duration: 0.9 }, 0.25)
        .from(".hero-line-inner", { yPercent: 115, duration: 1.15, stagger: 0.13 }, 0.35)
        .from(".hero-sub", { y: 26, autoAlpha: 0, duration: 1 }, 0.85)
        .from(".hero-cta", { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, 1)
        .from(".hero-trust", { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 1.15)
        .from(".hero-cue", { autoAlpha: 0, duration: 1 }, 1.4);

      /* Cinematic drift as the hero leaves the viewport */
      gsap.to(".hero-bg", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        y: -70,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "72% top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, [started]);

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-svh items-end overflow-hidden bg-pine text-cream">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero.jpg"
          alt=""
          fetchPriority="high"
          className="hero-bg h-full w-full object-cover"
        />
        <div className="hero-shade absolute inset-0 bg-gradient-to-t from-pine/95 via-pine/25 to-pine/50" />
        <div className="hero-shade absolute inset-0 bg-gradient-to-r from-pine/55 via-transparent to-transparent" />
      </div>

      <HeroCanvas />

      {/* Content */}
      <div className="hero-content container-x relative z-10 w-full pb-16 pt-36 sm:pb-24">
        <p className="hero-eyebrow inline-flex items-center gap-2.5 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/90 backdrop-blur-md">
          <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
          Premium cleaning · Lagos
        </p>

        <h1 className="mt-6 font-display text-[clamp(2.7rem,8.2vw,6.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line-inner block will-change-transform">Your space.</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="hero-line-inner block will-change-transform">
              Completely refreshed<span className="text-lime">.</span>
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
          Professional home, office and commercial cleaning designed around your space, your
          schedule and your standards.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <span className="hero-cta inline-flex">
            <WhatsAppButton size="lg" label="Book a cleaning with Verdant Clean on WhatsApp">
              Book a Cleaning
            </WhatsAppButton>
          </span>
          <span className="hero-cta inline-flex">
            <button
              type="button"
              onClick={() => scrollToId("services")}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/35 px-9 py-4 font-display text-base font-bold text-cream backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/70 hover:bg-cream/10 active:translate-y-0"
            >
              Explore Services
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </button>
          </span>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-6">
          {TRUST.map((item) => (
            <div key={item.label} className="hero-trust flex items-center gap-3">
              <TrustIcon name={item.icon} />
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-display text-lg font-extrabold">{item.strong}</dd>
                <dd className="text-sm text-cream/65">{item.label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue absolute bottom-24 right-8 z-10 hidden flex-col items-center gap-4 md:flex lg:right-14" aria-hidden="true">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/60 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-cream/20">
          <span className="absolute inset-x-0 h-full animate-scroll-cue bg-lime" />
        </span>
      </div>
    </section>
  );
}
