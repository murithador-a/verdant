import Reveal from "./Reveal";
import { ArrowIcon } from "./icons";
import { BENEFITS } from "../lib/site";
import { scrollToId } from "../lib/motion";

export default function WhyVerdant() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-16 overflow-hidden bg-forest text-cream">
      {/* Ambient texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_85%_10%,rgba(199,232,106,0.1),transparent_65%),radial-gradient(60%_50%_at_10%_95%,rgba(183,201,181,0.12),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(247,245,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(247,245,239,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(75%_70%_at_50%_35%,black,transparent)]"
      />

      <div className="container-x section-pad relative">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
            <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-full bg-lime" />
            Why Verdant
          </p>
          <h2
            id="about-heading"
            className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-balance"
          >
            More than clean.
            <br />
            Consistently better.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
            Anyone can clean once. We built Verdant around the harder thing — showing up with the
            same care, every single visit.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 100}>
              <div className="group border-t border-cream/15 pt-7 transition-colors duration-500 hover:border-lime/50">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
                    {benefit.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-bold text-cream/30 transition-colors duration-500 group-hover:text-lime"
                  >
                    {benefit.index}
                  </span>
                </div>
                <p className="mt-3 max-w-md leading-relaxed text-cream/65">{benefit.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-14">
          <button
            type="button"
            onClick={() => scrollToId("how-it-works")}
            className="group inline-flex items-center gap-2.5 font-display text-[15px] font-bold text-lime"
          >
            See how it works
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
              <ArrowIcon className="h-4 w-4" />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
