import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LOCATIONS } from "../lib/site";

/** Stylised, illustrative coverage map — calm, abstract, on-brand. */
function LagosMap() {
  const spots = [
    { name: "Ikeja", x: 296, y: 128, lx: 312, ly: 132, pulse: false },
    { name: "Yaba", x: 232, y: 238, lx: 248, ly: 242, pulse: false },
    { name: "Surulere", x: 148, y: 292, lx: 84, ly: 296, pulse: false },
    { name: "Lagos Island", x: 258, y: 332, lx: 274, ly: 336, pulse: true },
    { name: "Ikoyi", x: 306, y: 348, lx: 322, ly: 352, pulse: false },
    { name: "Victoria Island", x: 342, y: 384, lx: 358, ly: 388, pulse: true },
    { name: "Lekki", x: 402, y: 428, lx: 418, ly: 432, pulse: false },
    { name: "Ajah", x: 452, y: 470, lx: 428, ly: 492, pulse: false },
  ];
  return (
    <svg
      viewBox="0 0 520 560"
      role="img"
      aria-label="Illustrative map of Verdant Clean coverage across Lagos"
      className="h-auto w-full"
    >
      <rect x="0" y="0" width="520" height="560" rx="28" fill="#DDE6DA" />
      {/* Lagoon */}
      <path
        d="M-20 300 C 90 268, 170 330, 300 308 S 470 282, 540 306 L 540 392 C 430 418, 280 372, 150 398 L -20 408 Z"
        fill="#B7C9B5"
        opacity="0.7"
      />
      <path
        d="M-20 336 C 110 310, 220 362, 340 342 S 470 322, 540 340"
        fill="none"
        stroke="#F7F5EF"
        strokeWidth="3"
        opacity="0.65"
      />
      <text x="120" y="356" fontSize="11" letterSpacing="4" fill="#10261D" opacity="0.5" fontStyle="italic">
        LAGOS LAGOON
      </text>
      {/* Suggestion of roads */}
      <g stroke="#F7F5EF" strokeWidth="5" opacity="0.8" fill="none" strokeLinecap="round">
        <path d="M60 40 C 140 120, 200 180, 296 128" />
        <path d="M296 128 C 280 190, 250 220, 232 238" />
        <path d="M148 292 C 190 300, 220 320, 258 332" />
        <path d="M258 332 C 320 350, 380 390, 452 470" />
        <path d="M342 384 C 360 430, 420 460, 480 520" />
      </g>
      <g stroke="#F7F5EF" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M40 480 C 160 440, 300 470, 470 430" />
        <path d="M420 60 C 440 150, 430 260, 402 428" />
      </g>
      {/* Coverage spots */}
      {spots.map((spot) => (
        <g key={spot.name}>
          {spot.pulse ? (
            <circle cx={spot.x} cy={spot.y} r="10" fill="#A3CF45" opacity="0.45" className="animate-pulse-dot" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          ) : null}
          <circle cx={spot.x} cy={spot.y} r="7" fill="#10261D" stroke="#F7F5EF" strokeWidth="2.5" />
          <circle cx={spot.x} cy={spot.y} r="2.2" fill="#C7E86A" />
          <text x={spot.lx} y={spot.ly} fontSize="12.5" fontWeight="700" fill="#10261D">
            {spot.name}
          </text>
        </g>
      ))}
      {/* North marker */}
      <g transform="translate(472 44)">
        <circle r="17" fill="#F7F5EF" opacity="0.9" />
        <text y="5.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#10261D">
          N
        </text>
      </g>
    </svg>
  );
}

export default function Locations() {
  return (
    <section id="locations" aria-labelledby="locations-heading" className="section-pad scroll-mt-16 bg-cream">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Service areas"
            title={<span id="locations-heading">Cleaning across Lagos.</span>}
            copy="From the Island to the Mainland, our crews start early and show up on time — seven days a week."
          />
          <Reveal delay={120}>
            <ul aria-label="Areas we serve" className="mt-9 grid grid-cols-2 gap-2.5 sm:grid-cols-2">
              {LOCATIONS.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2.5 rounded-2xl bg-charcoal/[0.045] px-4 py-3 text-[15px] font-medium ring-1 ring-transparent transition-colors duration-300 hover:bg-sage-soft hover:ring-forest/15"
                >
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-lime-deep" />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
              Expanding across Nigeria.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-charcoal/10">
            <LagosMap />
            <figcaption className="bg-forest px-6 py-4 text-[13px] text-cream/60">
              Illustrative coverage map — selected surrounding areas served on request.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
