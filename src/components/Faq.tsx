import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WhatsAppButton } from "./WhatsAppCTA";
import { PlusIcon } from "./icons";
import { FAQS } from "../lib/site";
import { cn } from "../lib/cn";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-pad scroll-mt-16 bg-cream">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title={<span id="faq-heading">Everything, answered.</span>}
            copy="Supplies, scheduling, rescheduling, short-stays — the things everyone asks before their first clean."
          />
          <Reveal delay={150}>
            <div className="mt-9 rounded-[1.75rem] bg-forest p-7 text-cream">
              <h3 className="font-display text-xl font-extrabold">Still curious?</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-cream/65">
                Message us on WhatsApp — a real person replies, usually within minutes.
              </p>
              <WhatsAppButton size="sm" variant="lime" className="mt-6" label="Ask Verdant Clean a question on WhatsApp">
                Chat with us
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ul className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openIndex === i;
              return (
                <li
                  key={faq.question}
                  className={cn(
                    "overflow-hidden rounded-2xl ring-1 transition-all duration-300",
                    open ? "bg-white/80 ring-forest/25 shadow-[0_18px_40px_-24px_rgba(16,38,29,0.4)]" : "bg-white/50 ring-charcoal/10 hover:ring-charcoal/25",
                  )}
                >
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="font-display text-[1.02rem] font-bold leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        open ? "rotate-45 bg-forest text-lime" : "bg-charcoal/[0.06] text-charcoal",
                      )}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    data-open={open}
                    className="acc-panel"
                  >
                    <div className="acc-inner">
                      <p className="px-6 pb-6 leading-relaxed text-charcoal/65">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
