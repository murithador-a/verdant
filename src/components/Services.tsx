import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./icons";
import { SERVICES } from "../lib/site";
import { scrollToId } from "../lib/motion";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section-pad scroll-mt-16 bg-cream">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title={<span id="services-heading">Cleaning that fits your space.</span>}
            copy="Four specialties, one standard: a space that feels completely new when we're done."
          />
          <Reveal delay={150} className="shrink-0">
            <p className="max-w-xs text-sm leading-relaxed text-charcoal/55 lg:pb-1 lg:text-right">
              Every service starts with a conversation about your space — no rigid packages, no
              surprises.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <article className="group relative overflow-hidden rounded-[1.75rem] bg-forest text-cream ring-1 ring-charcoal/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(16,38,29,0.45)] hover:ring-forest/40">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    decoding="async"
                    style={service.objectPosition ? { objectPosition: service.objectPosition } : undefined}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-pine/95 via-pine/30 to-pine/5 transition-opacity duration-500 group-hover:via-pine/20"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 rounded-full border border-cream/25 bg-pine/40 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-cream/90 backdrop-blur-md"
                  >
                    {service.index}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-[1.35rem] font-extrabold uppercase leading-tight tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-cream/70">{service.copy}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-lime">
                      {service.cta}
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToId(service.target)}
                  aria-label={`${service.cta} — ${service.title}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[inherit]"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
