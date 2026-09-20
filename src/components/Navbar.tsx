import { useCallback, useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { NAV_LINKS } from "../lib/site";
import { getLenis, scrollToId } from "../lib/motion";
import Logo from "./Logo";
import { WhatsAppButton } from "./WhatsAppCTA";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 28);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Lock scroll while the mobile menu is open */
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  /* Auto-close the sidebar when resizing up to desktop nav */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (): void => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((target: string) => {
    setOpen(false);
    // Let the menu start closing before travelling.
    window.setTimeout(() => scrollToId(target), open ? 120 : 0);
  }, [open ]);

  const solid = scrolled && !open;
  const light = !solid;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-charcoal/10 bg-cream/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <button
            type="button"
            onClick={() => go("top")}
            aria-label="Verdant Clean — back to top"
            className="rounded-lg"
          >
            <Logo tone={light ? "light" : "dark"} />
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => go(link.target)}
                className={cn(
                  "nav-link rounded-sm py-1 text-sm font-medium tracking-wide transition-colors duration-300",
                  light ? "text-cream/85 hover:text-cream" : "text-charcoal/70 hover:text-charcoal",
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <WhatsAppButton
              size="sm"
              variant={light ? "lime" : "forest"}
              label="Book a cleaning with Verdant Clean on WhatsApp"
              className="hidden md:inline-flex"
            >
              Book a Cleaning
            </WhatsAppButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
                light ? "text-cream hover:bg-cream/10" : "text-charcoal hover:bg-charcoal/5",
                open && "text-cream hover:bg-cream/10",
              )}
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-all duration-300",
                    open && "top-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[7px] h-[2px] w-full rounded-full bg-current transition-all duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[14px] h-[2px] w-full rounded-full bg-current transition-all duration-300",
                    open && "top-[7px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-lime-deep transition-opacity duration-500",
            solid ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Sidebar backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 cursor-pointer bg-pine/70 backdrop-blur-sm transition-opacity duration-500 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Sidebar — full-screen on phones, slide-in drawer on larger screens */}
      <aside
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex w-full flex-col overflow-y-auto bg-pine transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-md sm:border-l sm:border-cream/10 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(199,232,106,0.12),transparent_70%)]"
        />
        <nav aria-label="Mobile" className="relative m-auto w-full px-8 py-28 sm:px-10">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.target}
                className={cn(
                  "transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
              >
                <button
                  type="button"
                  onClick={() => go(link.target)}
                  tabIndex={open ? 0 : -1}
                  className="group flex w-full items-baseline gap-4 rounded-lg py-3 text-left"
                >
                  <span className="font-display text-xs font-bold text-lime/70">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[1.65rem] font-extrabold uppercase leading-none tracking-tight text-cream transition-transform duration-300 group-hover:translate-x-2 min-[400px]:text-4xl">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "mt-8 transition-all delay-500 duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <WhatsAppButton size="lg" className="w-full sm:w-auto" label="Book a cleaning with Verdant Clean on WhatsApp">
              Book a Cleaning
            </WhatsAppButton>
            <p className="mt-5 text-sm text-cream/50">Lagos · Available 7 days a week</p>
          </div>
        </nav>
      </aside>
    </>
  );
}
