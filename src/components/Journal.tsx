import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WhatsAppButton } from "./WhatsAppCTA";
import { ArrowIcon } from "./icons";
import { ARTICLES, type Article } from "../lib/site";
import { getLenis } from "../lib/motion";
import { ARTICLE_HASH_PREFIX, SITE_URL, absoluteUrl, articleUrl } from "../lib/site-url";

/**
 * The article reader is a modal rather than a route, so each article is
 * addressable through a hash permalink (`#article-3`). The RSS feed and the
 * Article structured data point at these so subscribers and crawlers reach
 * the right piece instead of the top of the Journal section.
 */
function articleFromHash(): Article | null {
  const match = new RegExp(`^#${ARTICLE_HASH_PREFIX}(\\d+)$`).exec(window.location.hash);
  if (!match) return null;
  return ARTICLES.find((a) => String(a.id) === match[1]) ?? null;
}

/* Article structured data for SEO */
function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verdant Clean Journal — Cleaning Tips & Guides",
    description:
      "Practical cleaning guides, routines and hosting tips from Lagos cleaning professionals.",
    numberOfItems: ARTICLES.length,
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: a.title,
        description: a.excerpt[0],
        image: absoluteUrl(a.image),
        datePublished: "2026-09-01",
        dateModified: "2026-09-20",
        author: {
          "@type": "Organization",
          name: "Verdant Clean",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Verdant Clean",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/favicon.svg"),
          },
        },
        url: articleUrl(a.id),
        mainEntityOfPage: articleUrl(a.id),
        articleSection: a.category,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Journal() {
  const [active, setActive] = useState<Article | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback((article: Article) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setActive(article);
    // `replaceState` keeps the permalink shareable without pushing a history
    // entry, so Back still leaves the page rather than closing the modal.
    history.replaceState(null, "", `#${ARTICLE_HASH_PREFIX}${article.id}`);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    if (articleFromHash()) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    lastFocused.current?.focus?.();
  }, []);

  /* Open the article named by the current hash (deep links, feed clicks). */
  useEffect(() => {
    const sync = (): void => {
      const next = articleFromHash();
      setActive((current) => (current?.id === next?.id ? current : next));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!active) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <>
      <ArticleJsonLd />
      <section id="journal" aria-labelledby="journal-heading" className="section-pad scroll-mt-16 bg-parchment/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Journal"
          title={<span id="journal-heading">The Clean Edit.</span>}
          copy="Practical notes on homes, routines, and short-stay hosting — from the people who clean for a living."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.id} delay={(i % 3) * 90} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream ring-1 ring-charcoal/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-24px_rgba(16,38,29,0.35)]">
                <button
                  type="button"
                  onClick={() => open(article)}
                  aria-label={`Read article: ${article.title}`}
                  className="flex h-full flex-col text-left"
                >
                  <span className="block overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.alt}
                      loading="lazy"
                      decoding="async"
                      style={article.objectPosition ? { objectPosition: article.objectPosition } : undefined}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em]">
                      <span className="text-lime-deep">{article.category}</span>
                      <span aria-hidden="true" className="text-charcoal/25">·</span>
                      <span className="text-charcoal/45">{article.readTime}</span>
                    </span>
                    <span className="mt-3 block font-display text-xl font-extrabold leading-snug tracking-tight">
                      {article.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 pt-1 font-display text-sm font-bold text-forest">
                      Read article
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    </span>
                  </span>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Article reader */}
      {active ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="article-title">
          <button
            type="button"
            aria-label="Close article"
            onClick={close}
            className="absolute inset-0 cursor-pointer bg-pine/75 backdrop-blur-sm"
          />
          <div className="journal-fade relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[1.75rem] bg-cream shadow-2xl sm:rounded-[1.75rem]">
            <div className="relative">
              <img src={active.image} alt={active.alt} className="h-56 w-full object-cover sm:h-64" />
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close article"
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-pine/70 text-cream backdrop-blur-md transition-colors hover:bg-pine"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="p-7 sm:p-10">
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em]">
                <span className="text-forest">{active.category}</span>
                <span aria-hidden="true" className="text-charcoal/25">·</span>
                <span className="text-charcoal/45">{active.readTime}</span>
              </p>
              <h3 id="article-title" className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                {active.title}
              </h3>
              {active.excerpt.map((paragraph, i) => (
                <p key={i} className="mt-4 leading-relaxed text-charcoal/70">
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-charcoal/10 pt-7">
                <WhatsAppButton size="sm" variant="forest" label="Discuss your cleaning needs on WhatsApp">
                  Discuss your space
                </WhatsAppButton>
                <p className="text-sm text-charcoal/50">Prefer it handled for you? Say hello.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
    </>
  );
}
