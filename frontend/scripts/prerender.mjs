import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { blogData } from '../src/data/blogData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://williamsconstruction.si';

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/how-we-work',
  '/blog',
  ...blogData.map((post) => `/blog/${post.slug}`),
  '/faq',
  '/contact',
  '/privacy-policy',
  '/404'
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

function findBrowserExecutable() {
  const candidates = [
    process.env.PRERENDER_BROWSER,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser'
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('[prerender] dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
const browserPath = findBrowserExecutable();

if (!browserPath) {
  console.warn('[prerender] No headless Edge/Chrome binary found; skipping static prerender.');
  process.exit(0);
}

const server = http.createServer((req, res) => {
  const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
  const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(DIST_DIR, safePath);

  if (cleanUrl !== '/' && fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(fullPath).pipe(res);
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(baseTemplate);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const baseOrigin = `http://127.0.0.1:${port}`;

const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'williams-prerender-'));
const browserProc = spawn(
  browserPath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    `--user-data-dir=${tmpProfile}`,
    '--remote-debugging-port=0',
    `${baseOrigin}/`
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);

const wsEndpoint = await new Promise((resolve, reject) => {
  let logs = '';
  const timeout = setTimeout(() => reject(new Error('Headless browser startup timeout')), 20000);
  const onData = (chunk) => {
    logs += chunk.toString();
    const match = logs.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (match) {
      clearTimeout(timeout);
      resolve(match[1]);
    }
  };
  browserProc.stderr.on('data', onData);
  browserProc.stdout.on('data', onData);
  browserProc.on('exit', (code) => {
    clearTimeout(timeout);
    reject(new Error(`Browser exited unexpectedly (${code})`));
  });
});

const targetsRes = await fetch(wsEndpoint.replace(/^ws:/, 'http:').replace(/\/devtools\/browser\/.*$/, '/json/list'));
const targets = await targetsRes.json();
const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

let msgId = 1;
const cdp = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = msgId++;
    const handler = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.id === id) {
        ws.removeEventListener('message', handler);
        if (payload.error) reject(new Error(payload.error.message));
        else resolve(payload.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

await cdp('Page.enable');
await cdp('Runtime.enable');

function buildPrerenderedHtml(template, { rootHtml, headTagsHtml, routeCssHtml, preloadTagsHtml, canonicalHref }) {
  // Strip static fallback SEO tags so only route-specific pre-rendered tags exist
  let html = template
    .replace(/<title[^>]*\bdata-static-seo="true"[^>]*>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<(?:meta|link)[^>]*\bdata-static-seo="true"[^>]*\/?>\s*/gi, '')
    .replace(/<script[^>]*\bdata-static-seo="true"[^>]*>[\s\S]*?<\/script>\s*/gi, '');

  // Keep hero slide 1 image preload strictly on the homepage
  if (canonicalHref && !canonicalHref.endsWith('.si/')) {
    html = html.replace(/<link[^>]*href="\/images\/hero-welding-slovenia\.webp"[^>]*>\s*/gi, '');
  }

  // Inject route SEO tags, route CSS stylesheets, and JS preloads before </head>
  const extraHead = [headTagsHtml, routeCssHtml, preloadTagsHtml].filter(Boolean).join('\n    ');
  html = html.replace('</head>', `    ${extraHead}\n  </head>`);

  // Inject rendered root HTML
  html = html.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
  return html;
}

const baseStylesheets = new Set(
  [...baseTemplate.matchAll(/href="(\/assets\/[^"]+\.css)"/g)].map((m) => m[1])
);
const baseScripts = new Set(
  [...baseTemplate.matchAll(/(?:src|href)="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1])
);

const summary = [];

for (const route of ROUTES) {
  const isBlogArticle = route.startsWith('/blog/');
  const slugSegment = isBlogArticle ? encodeURIComponent(route.slice('/blog/'.length)) : '';
  const canonicalPath = isBlogArticle ? `/blog/${slugSegment}` : route;
  const expectedCanonical = route === '/404'
    ? null
    : route === '/'
      ? `${SITE_URL}/`
      : `${SITE_URL}${canonicalPath}`;

  await cdp('Page.navigate', { url: `${baseOrigin}${canonicalPath}` });

  const evalRes = await cdp('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `
      (async () => {
        const deadline = Date.now() + 12000;
        const expectedCanonical = ${JSON.stringify(expectedCanonical)};
        const isNotFound = ${JSON.stringify(route === '/404')};

        while (Date.now() < deadline) {
          const main = document.getElementById('main-content');
          const text = (main ? main.innerText : '').trim();
          const hasLoader = text.includes('Nalaganje Williams Constructions');
          const staticCleared = document.head.querySelectorAll('[data-static-seo="true"]').length === 0;
          const hasCanonical = [...document.head.querySelectorAll('link[rel="canonical"]')].some((el) => {
            try {
              return new URL(el.href).href === new URL(expectedCanonical).href;
            } catch {
              return el.href === expectedCanonical;
            }
          });
          const hasNoIndex = [...document.head.querySelectorAll('meta[name="robots"]')].some((el) => el.content.includes('noindex'));
          const headReady = isNotFound ? hasNoIndex : hasCanonical;

          if (text.length > 80 && !hasLoader && staticCleared && headReady) {
            break;
          }
          await new Promise((r) => setTimeout(r, 60));
        }

        // Scroll steadily down so all whileInView animations trigger and settle at opacity: 1
        const docHeight = document.body.scrollHeight;
        const step = Math.max(300, Math.floor(window.innerHeight * 0.5));
        for (let y = 0; y <= docHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 110));
        }
        window.scrollTo(0, docHeight);
        await new Promise((r) => setTimeout(r, 950));

        // Multi-pass sweep to guarantee every FadeIn element under #main-content reaches opacity: 1
        for (let pass = 0; pass < 3; pass++) {
          const hiddenFadeEls = Array.from(
            document.querySelectorAll('#main-content .fade-in-element[style*="opacity: 0"], #main-content .fade-in-element[style*="opacity:0"], #main-content [style*="opacity: 0"]')
          ).filter((el) => !el.closest('.swiper-slide'));
          if (hiddenFadeEls.length === 0) break;
          for (const el of hiddenFadeEls) {
            el.scrollIntoView({ behavior: 'instant', block: 'center' });
            await new Promise((r) => setTimeout(r, 160));
          }
          await new Promise((r) => setTimeout(r, 850));
        }

        // Reset scroll to top so sticky Header renders un-scrolled
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 140));

        // Collect all React-rendered SEO head tags and mark with data-static-seo="true"
        const seoSelector = [
          'title',
          'meta[name="description"]',
          'meta[name="robots"]',
          'link[rel="canonical"]',
          'meta[property^="og:"]',
          'meta[name^="twitter:"]',
          'script[type="application/ld+json"]'
        ].join(', ');
        const headTagsHtml = Array.from(document.head.querySelectorAll(seoSelector))
          .map((el) => {
            const clone = el.cloneNode(true);
            clone.setAttribute('data-static-seo', 'true');
            clone.removeAttribute('data-rh');
            return clone.outerHTML;
          })
          .join('\\n    ');

        // Collect dynamic CSS stylesheets and JS chunks injected for this route
        const cssHrefs = Array.from(document.head.querySelectorAll('link[rel="stylesheet"][href^="/assets/"]'))
          .map((el) => el.getAttribute('href'))
          .filter(Boolean);
        const jsSrcs = [
          ...Array.from(document.head.querySelectorAll('script[src^="/assets/"], link[rel="modulepreload"][href^="/assets/"]'))
            .map((el) => el.getAttribute('src') || el.getAttribute('href')),
          ...performance.getEntriesByType('resource')
            .map((entry) => { try { return new URL(entry.name).pathname; } catch { return ''; } })
            .filter((p) => p.startsWith('/assets/') && p.endsWith('.js'))
        ].filter(Boolean);

        // Include page hero LCP preload on inner pages
        const pageHeroImg = document.querySelector('.page-hero-bg-image');
        const lcpHeroSrc = pageHeroImg ? pageHeroImg.getAttribute('src') : null;

        const mainWords = ((document.getElementById('main-content')?.innerText || '').match(/[\\p{L}\\p{N}]+/gu) || []).length;
        const h1Text = document.querySelector('h1')?.innerText?.trim() || '';

        return {
          rootHtml: document.getElementById('root').innerHTML,
          headTagsHtml,
          cssHrefs: [...new Set(cssHrefs)],
          jsSrcs: [...new Set(jsSrcs)],
          lcpHeroSrc,
          title: document.title,
          mainWords,
          h1Text
        };
      })()
    `
  });

  const data = evalRes.result.value;
  const routeCssHtml = data.cssHrefs
    .filter((href) => !baseStylesheets.has(href))
    .map((href) => `<link rel="stylesheet" crossorigin href="${href}" />`)
    .join('\n    ');
  const routePreloads = data.jsSrcs
    .filter((src) => !baseScripts.has(src))
    .map((src) => `<link rel="modulepreload" href="${src}" />`);
  if (data.lcpHeroSrc) {
    routePreloads.push(`<link rel="preload" as="image" href="${data.lcpHeroSrc}" fetchpriority="high" />`);
  }

  const outputHtml = buildPrerenderedHtml(baseTemplate, {
    rootHtml: data.rootHtml,
    headTagsHtml: data.headTagsHtml,
    routeCssHtml,
    preloadTagsHtml: routePreloads.join('\n    '),
    canonicalHref: expectedCanonical
  });

  if (route === '/') {
    fs.writeFileSync(INDEX_HTML_PATH, outputHtml, 'utf-8');
  } else if (route === '/404') {
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), outputHtml, 'utf-8');
  } else {
    const outDir = path.join(DIST_DIR, route.slice(1));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), outputHtml, 'utf-8');
  }

  summary.push({
    route,
    titleLen: data.title.length,
    mainWords: data.mainWords,
    h1Len: data.h1Text.length
  });
}

console.log('[prerender] Pre-rendered static HTML routes:');
console.table(summary);

ws.close();
browserProc.kill();
await new Promise((resolve) => browserProc.once('exit', resolve));
server.close();
try {
  fs.rmSync(tmpProfile, { recursive: true, force: true });
} catch {}
