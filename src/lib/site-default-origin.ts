/**
 * The origin committed to the repo. This is the single literal that the
 * rest of the codebase and the static SEO assets are written against, and
 * the value `vite.config.ts` rebases away from when `VITE_SITE_URL` is set.
 *
 * Kept in its own module so that `vite.config.ts` (which runs in Node, where
 * `import.meta.env` is unavailable) and the client bundle read one value.
 *
 * Changing this constant is also a *source* change: the hardcoded URLs in
 * `index.html`, `public/sitemap.xml`, `public/feed.xml` and `public/robots.txt`
 * must be updated to match, because those files are authored against it.
 */
export const SITE_DEFAULT_ORIGIN = "https://verdantclean.ng";
