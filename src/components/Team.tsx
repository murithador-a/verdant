import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { TEAM, type TeamMember } from "../lib/site";
import { cn } from "../lib/cn";

const TONES: Record<TeamMember["tone"], string> = {
  forest: "bg-forest text-lime",
  sage: "bg-sage text-forest",
  lime: "bg-lime text-forest",
  charcoal: "bg-charcoal text-cream",
};

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="section-pad scroll-mt-16 bg-parchment/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our people"
          title={<span id="team-heading">The people behind the clean.</span>}
          copy="A small, supervised crew of specialists — the same trusted faces, visit after visit."
        />

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 90}>
              <article className="group">
                <div
                  className={cn(
                    "relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.75rem] transition-transform duration-500 group-hover:-translate-y-1.5",
                    TONES[member.tone],
                  )}
                >
                  {/* Monogram sits beneath as a graceful fallback while loading */}
                  <span
                    aria-hidden="true"
                    className="font-display text-[7rem] font-extrabold leading-none opacity-90 sm:text-[8.5rem]"
                  >
                    {member.initials}
                  </span>
                  <img
                    src={member.image}
                    alt={member.alt}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => e.currentTarget.remove()}
                    style={{ objectPosition: "50% 18%" }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  {/* Soft editorial grade for brand cohesion */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine/35 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-4 right-4 rounded-full bg-pine/55 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-cream backdrop-blur-md">
                    Lagos
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold">{member.name}</h3>
                <p className="text-sm text-charcoal/55">{member.role}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-sm text-charcoal/50">
            Every specialist is background-checked, trained in the Verdant method, and quality-supervised.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
