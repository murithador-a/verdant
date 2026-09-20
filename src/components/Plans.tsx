import Reveal from "./Reveal";
import { WhatsAppButton } from "./WhatsAppCTA";
import { CheckIcon } from "./icons";
import { PLANS } from "../lib/site";
import { cn } from "../lib/cn";
import { whatsappLink } from "../lib/whatsapp";

export default function Plans() {
  return (
    <section id="plans" aria-labelledby="plans-heading" className="section-pad scroll-mt-16 bg-cream">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-cream sm:rounded-[2.5rem] sm:px-10 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_50%_at_50%_0%,rgba(199,232,106,0.12),transparent_65%)]"
            />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
                  <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-full bg-lime" />
                  Cleaning plans
                </p>
                <h2
                  id="plans-heading"
                  className="mt-5 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-balance"
                >
                  Make clean part of your routine.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-cream/60 lg:pb-1 lg:text-right">
                Need a one-off deep clean instead?{" "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get a custom cleaning quote on WhatsApp"
                  className="font-semibold text-lime underline decoration-lime/40 underline-offset-4 transition-colors hover:decoration-lime"
                >
                  Get a quote
                </a>{" "}
                — it takes one message.
              </p>
            </div>

            <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
              {PLANS.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 100} className="h-full">
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-[1.75rem] p-8 transition-transform duration-500 hover:-translate-y-1.5",
                      plan.featured
                        ? "bg-lime text-forest shadow-[0_30px_70px_-24px_rgba(199,232,106,0.45)]"
                        : "border border-cream/15 bg-cream/[0.05] text-cream backdrop-blur-sm",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.2em]">
                        {plan.name}
                      </h3>
                      {plan.badge ? (
                        <span className="rounded-full bg-forest px-3.5 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-lime">
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-6 flex items-baseline gap-1.5">
                      <span className="font-display text-5xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span className={cn("text-sm font-medium", plan.featured ? "text-forest/60" : "text-cream/55")}>
                        {plan.period}
                      </span>
                    </p>
                    <p className={cn("mt-3 text-[15px] leading-relaxed", plan.featured ? "text-forest/70" : "text-cream/65")}>
                      {plan.tagline}
                    </p>

                    <ul className={cn("mt-7 space-y-3.5 border-t pt-7", plan.featured ? "border-forest/15" : "border-cream/12")}>
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[15px]">
                          <span
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              plan.featured ? "bg-forest text-lime" : "bg-lime/15 text-lime",
                            )}
                          >
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          <span className={plan.featured ? "text-forest/85" : "text-cream/80"}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex-1" />
                    <WhatsAppButton
                      variant={plan.featured ? "forest" : "cream"}
                      className="w-full"
                      label={`${plan.cta} — ${plan.name} plan at ${plan.price} per month, via WhatsApp`}
                    >
                      {plan.cta}
                    </WhatsAppButton>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="relative mt-8 text-center text-[13px] text-cream/45">
              Indicative pricing — your final quote depends on space size and condition. Every plan
              starts with a conversation on WhatsApp.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
