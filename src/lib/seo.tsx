/* ------------------------------------------------------------------ */
/* SEO Head — manages document meta dynamically for SPA sections       */
/* ------------------------------------------------------------------ */

import { useEffect } from "react";
import { SITE_URL, absoluteUrl } from "./site-url";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
}

const DEFAULT_TITLE =
  "Verdant Clean — Premium Cleaning Services in Lagos | Home, Office & Commercial";
const DEFAULT_DESCRIPTION =
  "Verdant Clean is Lagos's top-rated cleaning company. Professional home, office, short-stay Airbnb and commercial cleaning services. 4.9★ rating, 2,500+ cleanings. Book via WhatsApp today.";

export function updateMeta(name: string, content: string): void {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function updatePropertyMeta(
  property: string,
  content: string,
): void {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEOHead({
  title,
  description,
  url,
  type = "website",
}: SEOProps) {
  useEffect(() => {
    const t = title ? `${title} | Verdant Clean` : DEFAULT_TITLE;
    const d = description || DEFAULT_DESCRIPTION;
    const u = url || absoluteUrl();

    // Standard
    document.title = t;
    updateMeta("description", d);

    // Open Graph
    updatePropertyMeta("og:title", t);
    updatePropertyMeta("og:description", d);
    updatePropertyMeta("og:url", u);
    updatePropertyMeta("og:type", type);

    // Twitter
    updateMeta("twitter:title", t);
    updateMeta("twitter:description", d);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", u);
  }, [title, description, url, type]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Article JSON-LD — for journal / blog posts                          */
/* ------------------------------------------------------------------ */

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumb JSON-LD                                                  */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* HowTo JSON-LD — for the Process section                             */
/* ------------------------------------------------------------------ */

interface HowToProps {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}

export function HowToSchema({ name, description, steps }: HowToProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}