import { defineConfig, loadEnv, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { SITE_DEFAULT_ORIGIN } from './src/lib/site-default-origin.ts'

/**
 * Text assets that carry absolute, crawler-facing URLs and are copied
 * verbatim out of `public/`, so Vite never processes them for us.
 */
const REBASED = /\.(html|xml|txt|json|webmanifest)$/i

/**
 * Rebase the site origin.
 *
 * Absolute URLs in the SEO surface (`index.html`, `sitemap.xml`,
 * `feed.xml`, `robots.txt`, `manifest.json`, …) are authored against
 * `SITE_DEFAULT_ORIGIN`. At build time every occurrence is rewritten to the
 * origin the deployment actually lives on, so a preview URL or an alternative
 * domain never emits cross-origin canonicals — a canonical pointing at
 * another host tells Google not to index this deployment.
 *
 * Set `VITE_SITE_URL` to a bare origin (no path, no trailing slash) to
 * override. When it already equals the default, this plugin does nothing.
 */
function siteOrigin(origin: string): Plugin {
  const from = SITE_DEFAULT_ORIGIN
  let outDir = 'dist'
  let config: ResolvedConfig

  const rebase = (text: string): string => text.split(from).join(origin)

  const walk = async (dir: string): Promise<number> => {
    let touched = 0
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      // JS/CSS already receive the value through `define`; rewriting a
      // bundle would also desynchronise its sourcemap.
      if (entry.isDirectory() && entry.name === 'assets') continue
      if (entry.isDirectory()) {
        touched += await walk(full)
      } else if (REBASED.test(entry.name)) {
        const text = await readFile(full, 'utf8')
        if (text.includes(from)) {
          await writeFile(full, rebase(text))
          touched += 1
        }
      }
    }
    return touched
  }

  return {
    name: 'verdant:site-origin',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      if (origin === from) return
      const touched = await walk(outDir)
      config.logger.info(
        `[site-origin] rebased ${from} → ${origin} in ${touched} built file(s)`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origin = (env.VITE_SITE_URL || SITE_DEFAULT_ORIGIN).replace(/\/+$/, '')

  return {
    plugins: [react(), tailwindcss(), siteOrigin(origin)],
    // One resolved origin for both the bundle and `import.meta.env`.
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(origin),
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
  }
})
