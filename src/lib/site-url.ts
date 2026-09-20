/* ------------------------------------------------------------------ */
/* Site origin — the one place the production URL is defined.          */
/*                                                                     */
/* SOURCE OF TRUTH: `SITE_DEFAULT_ORIGIN` below is the origin written  */
/* into the repo (index.html, public/sitemap.xml, public/feed.xml,     */
/* public/robots.txt, …). Every absolute URL in the app resolves        */
/* through this module instead of repeating a hardcoded host.          */
/*                                                                     */
/* DEPLOYING ELSEWHERE: set the `VITE_SITE_URL` env var at build time  */
/* (e.g. https://verdant-clean.vercel.app) and the origin is rebased   */
/* across the JS bundle, index.html and the static SEO assets — no     */
/* find-and-replace needed. It must be a bare origin: no trailing      */
/* slash, no path.                                                     */
/* ------------------------------------------------------------------ */

import { SITE_DEFAULT_ORIGIN } from "./site-default-origin";

export { SITE_DEFAULT_ORIGIN };

/**
 * Resolved origin for this build. `vite.config.ts` always defines this
 * value (falling back to `SITE_DEFAULT_ORIGIN`), so the `??` below only
 * matters for non-Vite consumers such as tests or scripts.
 */
export const SITE_URL: string = stripTrailingSlash(
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? SITE_DEFAULT_ORIGIN,
);

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/** Absolute URL for a root-relative path, e.g. `absoluteUrl("/images/hero.jpg")`. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Permalink for an in-page section. The site is a single page, so these
 * are the only addressable targets a crawler or feed can be pointed at.
 */
export function sectionUrl(sectionId: string): string {
  return absoluteUrl(`/#${sectionId}`);
}

/** Permalink for a journal article, which opens as a deep-linked reader. */
export function articleUrl(id: number): string {
  return absoluteUrl(`/#${ARTICLE_HASH_PREFIX}${id}`);
}

/** Hash prefix used to deep-link an article into the Journal reader. */
export const ARTICLE_HASH_PREFIX = "article-";
