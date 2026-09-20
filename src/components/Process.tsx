import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { STEPS } from "../lib/site";
import { HowToSchema } from "../lib/seo";

export default function Process() {
  return (
    <>
      <HowToSchema
        name="How to Book a Cleaning with Verdant Clean"
        description="Four simple steps to get your space professionally cleaned by Verdant Clean in Lagos."
        steps={STEPS.map((s) => ({
          name: s.title,
          text: s.copy,
        }))}
      />
      <section id="how-it-works" aria-labelledby="process-heading" className="section-pad scroll-mt-16 bg-parchment/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title={<span id="process-heading">Four steps. One fresh space.</span>}
          copy="From first message to final walkthrough, everything is designed to feel effortless."
        />

        <div className="relative mt-14">
          {/* Connector */}
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-8 hidden border-t-2 border-dashed border-forest/20 lg:block"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="group relative h-full rounded-[1.75rem] bg-cream p-7 ring-1 ring-charcoal/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-24px_rgba(16,38,29,0.4)] hover:ring-forest/30">
                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-forest font-display text-lg font-extrabold text-cream transition-colors duration-500 group-hover:bg-moss">
                      {step.index}
                      <span
                        aria-hidden="true"
                        className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-lime ring-4 ring-cream"
                      />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-extrabold uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-charcoal/60">{step.copy}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
    </>
  );
}
