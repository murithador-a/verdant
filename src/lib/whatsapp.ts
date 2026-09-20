/**
 * Central WhatsApp conversion system.
 * Every major conversion CTA on the site points here — Verdant Clean
 * takes bookings and quotes conversationally over WhatsApp.
 */
export const WHATSAPP_MESSAGE =
  "Hey Murking! I love this website and I want to build something similar for my business. I'd like to discuss it with you.";

export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/** Pre-filled order message for a specific cleaning plan. */
export function planOrderMessage(name: string, price: string, rhythm: string): string {
  return `Hello Verdant Clean! I want to order the ${name} plan (${price}/month — ${rhythm}). Please share the next steps.`;
}
