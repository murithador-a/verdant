import Logo from "./Logo";
import { ArrowUpRightIcon, SocialIcon } from "./icons";
import { BRAND, FOOTER_COLUMNS, SOCIALS } from "../lib/site";
import { scrollToId } from "../lib/motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pine text-cream/75">
      <div className="container-x pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div>
            <button
              type="button"
              onClick={() => scrollToId("top")}
              aria-label="Verdant Clean — back to top"
              className="rounded-lg"
            >
              <Logo tone="light" />
            </button>
            <p className="mt-5 font-display text-lg font-bold text-cream">{BRAND.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/55">
              Premium home, office, short-stay and commercial cleaning in Lagos — since 2021.
            </p>
            <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold text-cream/70">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
              Available 7 days a week
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={`Footer — ${col.heading}`}>
              <h2 className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-cream/40">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollToId(link.target)}
                      className="rounded-sm py-1 text-[15px] text-cream/70 transition-colors duration-300 hover:text-lime"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Social */}
          <nav aria-label="Footer — social media">
            <h2 className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-cream/40">
              Social
            </h2>
            <ul className="mt-5 space-y-3.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verdant Clean on ${social.label} (opens in a new tab)`}
                    className="group inline-flex items-center gap-2.5 rounded-sm py-1 text-[15px] text-cream/70 transition-colors duration-300 hover:text-lime"
                  >
                    <SocialIcon name={social.icon} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-[13px] text-cream/45 sm:flex-row">
          <p>© 2026 Verdant Clean. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <a
              href={BRAND.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website built by MurkingDev — view portfolio (opens in a new tab)"
              className="group inline-flex items-center gap-1.5 rounded-sm transition-colors duration-300 hover:text-cream"
            >
              Built by <span className="font-semibold text-cream/70 group-hover:text-lime">MurkingDev</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={BRAND.developerLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MurkingDev on LinkedIn (opens in a new tab)"
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors duration-300 hover:text-lime"
            >
              <SocialIcon name="linkedin" className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </p>
        </div>
      </div>

      {/* Watermark */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.23em] text-center font-display text-[19.5vw] font-extrabold uppercase leading-none tracking-[-0.03em] text-cream/[0.05]">
          Verdant
        </p>
      </div>
    </footer>
  );
}
