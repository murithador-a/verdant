import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { StarIcon } from "./icons";
import { TESTIMONIALS } from "../lib/site";
import { cn } from "../lib/cn";

const TONES = ["bg-forest text-cream", "bg-sage text-forest", "bg-charcoal text-cream"];

export default function Testimonials() {
  return (
    <>
      <section aria-labelledby="stories-heading" className="section-pad bg-cream">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client stories"
          title={<span id="stories-heading">Trusted in homes & workplaces.</span>}
          copy="Real routines, real relief — from family homes to busy short-stay calendars."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 100}
              className={cn("h-full", i === 2 && "sm:col-span-2 xl:col-span-1")}
            >
              <figure className="flex h-full flex-col rounded-[1.75rem] bg-white/70 p-8 ring-1 ring-charcoal/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-24px_rgba(16,38,29,0.35)]">
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} className="h-4 w-4 text-lime-deep" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-charcoal/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-charcoal/10 pt-6">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-extrabold",
                      TONES[i % TONES.length],
                    )}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold">{t.name}</span>
                    <span className="block text-sm text-charcoal/55">{t.area}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-center text-sm text-charcoal/50">
            4.9/5 average rating across 600+ verified cleanings in Lagos.
          </p>
        </Reveal>
      </div>
    </section>
    </>
  );
}
