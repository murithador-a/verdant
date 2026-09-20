import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { whatsappLink } from "../lib/whatsapp";
import { ArrowIcon, WhatsAppIcon } from "./icons";

type Variant = "lime" | "forest" | "cream" | "outline-light" | "outline-dark";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  lime: "bg-lime text-forest shadow-[0_14px_36px_-14px_rgba(163,207,69,0.65)] hover:bg-cream",
  forest: "bg-forest text-cream shadow-[0_14px_36px_-16px_rgba(16,38,29,0.7)] hover:bg-moss",
  cream: "bg-cream text-forest hover:bg-lime",
  "outline-light":
    "border border-cream/35 text-cream backdrop-blur-sm hover:border-cream/70 hover:bg-cream/10",
  "outline-dark": "border border-charcoal/20 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/[0.04]",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-9 py-4 text-base",
};

interface WhatsAppButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Accessible label — defaults to a descriptive WhatsApp label. */
  label?: string;
  showIcon?: boolean;
  /** Pre-filled WhatsApp message — defaults to the brand message. */
  message?: string;
}

/**
 * Reusable conversion button. Every instance opens WhatsApp
 * with the brand's pre-filled message.
 */
export function WhatsAppButton({
  children,
  variant = "lime",
  size = "md",
  className,
  label,
  showIcon = false,
  message,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? "Chat with Verdant Clean on WhatsApp"}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full font-display font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {showIcon ? <WhatsAppIcon className="h-[18px] w-[18px]" /> : null}
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}

/** Floating conversion pill — appears after the hero, always in reach. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVisible(window.scrollY > window.innerHeight * 0.75));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a cleaning with Verdant Clean on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-forest py-3 pl-4 pr-5 text-cream shadow-[0_18px_44px_-12px_rgba(10,28,21,0.65)] transition-all duration-500 hover:bg-moss sm:bottom-6 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
      </span>
      <WhatsAppIcon className="h-5 w-5" />
      <span className="font-display text-sm font-bold">Book a clean</span>
    </a>
  );
}
