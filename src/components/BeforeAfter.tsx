import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { COMPARE_ROOMS } from "../lib/site";
import { cn } from "../lib/cn";

/**
 * Interactive before/after comparison. A real range input drives
 * the divider, so the interaction is fully keyboard accessible.
 */
export default function BeforeAfter() {
  const [roomId, setRoomId] = useState(COMPARE_ROOMS[0]?.id ?? "kitchen");
  const [pos, setPos] = useState(50);
  const room = COMPARE_ROOMS.find((r) => r.id === roomId) ?? COMPARE_ROOMS[0]!;

  return (
    <section aria-labelledby="results-heading" className="section-pad bg-cream">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proof, not promises"
          title={<span id="results-heading">See the difference.</span>}
          copy="Same room, same angle — grime and clutter on the left, the way it is handed back on the right."
        />

        {/* Room selector */}
        <Reveal delay={100} className="mt-9">
          <div role="group" aria-label="Choose a room to compare" className="flex flex-wrap gap-2.5">
            {COMPARE_ROOMS.map((r) => {
              const active = r.id === roomId;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRoomId(r.id)}
                  className={cn(
                    "rounded-full px-5 py-3 font-display text-sm font-bold transition-all duration-300 min-[400px]:px-6",
                    active
                      ? "bg-forest text-cream shadow-[0_10px_26px_-12px_rgba(16,38,29,0.7)]"
                      : "bg-charcoal/[0.06] text-charcoal/70 hover:bg-charcoal/[0.1] hover:text-charcoal",
                  )}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Comparison frame */}
        <Reveal delay={150} className="mt-7">
          <div className="overflow-hidden rounded-[1.75rem] bg-forest ring-1 ring-charcoal/10 sm:rounded-[2.25rem]">
            <div className="group/ba relative aspect-[4/5] select-none overflow-hidden sm:aspect-[16/9]">
              {/* AFTER (base layer) */}
              <img
                key={`after-${room.id}`}
                src={room.image}
                alt={`After: ${room.alt}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="journal-fade absolute inset-0 h-full w-full object-cover"
              />

              {/* BEFORE (clipped layer) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 will-change-[clip-path]"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  key={`before-${room.id}`}
                  src={room.beforeImage}
                  alt={`Before: ${room.beforeAlt}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="ba-before absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Labels */}
              <span className="absolute left-4 top-4 rounded-full bg-pine/60 px-4 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream backdrop-blur-md sm:left-6 sm:top-6">
                Before
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-lime/90 px-4 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest sm:right-6 sm:top-6">
                After
              </span>

              {/* Divider + handle */}
              <div aria-hidden="true" className="absolute inset-y-0" style={{ left: `${pos}%` }}>
                <div className="absolute inset-y-0 -translate-x-1/2">
                  <div className="h-full w-[3px] -translate-x-1/2 rounded-full bg-lime shadow-[0_0_20px_rgba(199,232,106,0.55)]" />
                  <div className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-lime text-forest shadow-xl ring-4 ring-pine/25 transition-all duration-300 group-focus-within/ba:scale-110 group-focus-within/ba:ring-lime-deep">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 6-4 6 4 6" />
                      <path d="m15 6 4 6-4 6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Accessible control */}
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(pos)}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label={`Reveal before and after for the ${room.label.toLowerCase()}`}
                aria-valuetext={`${Math.round(pos)} percent after`}
                className="ba-range absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
              />
            </div>

            <div className="flex flex-col gap-1.5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm font-medium text-cream/85">
                <span className="font-display font-bold uppercase tracking-[0.12em] text-lime">{room.label}</span>
                <span aria-hidden="true" className="mx-2.5 text-cream/30">·</span>
                {room.note}
              </p>
              <p className="shrink-0 text-xs text-cream/45">Staged example — not a photograph of a completed job</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
