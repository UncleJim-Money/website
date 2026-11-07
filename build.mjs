#!/usr/bin/env node
// Dependency-free static site builder: node site/build.mjs
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, pages } from './content.mjs';
import { renderLanding } from './landing.mjs';
import { esc, head, navBar, siteFooter, baseScript } from './chrome.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, 'dist');

// Original geometric art — no external requests, no borrowed artwork.
const art = {
  character: '<img class="art art--char" src="/assets/mark-chip.svg" alt="Uncle Jim mark" width="512" height="512">',
  stack: `<svg class="art" width="320" height="240" viewBox="0 0 320 240" role="img" aria-label="Stacked coins">
    <rect width="320" height="240" rx="24" fill="var(--coral)"/>
    <g fill="var(--gold)" stroke="#141414" stroke-width="6">
      <ellipse cx="160" cy="186" rx="74" ry="20"/><ellipse cx="160" cy="150" rx="74" ry="20"/>
      <ellipse cx="160" cy="114" rx="74" ry="20"/><ellipse cx="160" cy="78" rx="74" ry="20"/>
    </g><path d="M150 60l-8 22h12l-6 20" fill="none" stroke="#141414" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share: `<svg class="art" width="320" height="240" viewBox="0 0 320 240" role="img" aria-label="Three connected wallets">
    <rect width="320" height="240" rx="24" fill="#141414"/>
    <g stroke="var(--coral)" stroke-width="8" stroke-linecap="round"><path d="M96 120h128"/><path d="M160 120V72"/></g>
    <g fill="var(--coral)"><rect x="52" y="96" width="88" height="52" rx="16"/><rect x="180" y="96" width="88" height="52" rx="16"/></g>
    <rect x="116" y="40" width="88" height="52" rx="16" fill="var(--gold)"/>
    <g fill="#141414"><circle cx="120" cy="122" r="9"/><circle cx="248" cy="122" r="9"/><circle cx="184" cy="66" r="9"/></g></svg>`,
  travel: `<svg class="art" width="320" height="240" viewBox="0 0 320 240" role="img" aria-label="Lightning crossing the world">
    <rect width="320" height="240" rx="24" fill="var(--coral)"/>
    <circle cx="160" cy="120" r="72" fill="none" stroke="#141414" stroke-width="7"/>
    <path d="M88 120h144M160 48v144M104 78c32 24 80 24 112 0M104 162c32-24 80-24 112 0" fill="none" stroke="#141414" stroke-width="5"/>
    <path d="M172 74l-26 46h20l-14 42 40-58h-22z" fill="var(--gold)" stroke="#141414" stroke-width="5" stroke-linejoin="round"/></svg>`,
};

const cta = ([href, label]) => `<a class="btn" href="${esc(href)}">${esc(label)}</a>`;
const heroArt = (b) => b.photo
  ? `<figure class="ln-photo"><img src="/assets/img/${esc(b.photo)}.jpg" alt=""></figure>`
  : (art[b.art] || art.character);

const block = {
  hero: (b) => `<section class="hero reveal"><div class="hero__copy"><p class="eyebrow">${esc(b.eyebrow)}</p>
    <h1>${esc(b.h)}</h1><p class="lede">${esc(b.sub)}</p>${b.cta ? cta(b.cta) : ''}</div>
    <div class="hero__art">${heroArt(b)}</div></section>`,

  trio: (b) => `<section class="section reveal"><div class="grid grid--3">${b.items.map((i) =>
    `<article class="card"><h3>${esc(i.h)}</h3><p>${esc(i.p)}</p></article>`).join('')}</div></section>`,

  cards: (b) => `<section class="section reveal"><h2>${esc(b.h)}</h2><div class="grid grid--2">${b.items.map((i) =>
    `<article class="card card--tint"><h3>${esc(i.h)}</h3><p>${esc(i.p)}</p></article>`).join('')}</div></section>`,

  split: (b) => `<section class="section section--tint reveal"><div class="wrap split${b.flip ? ' split--flip' : ''}">
    <div class="split__art">${heroArt(b)}</div>
    <div class="split__copy"><p class="eyebrow">${esc(b.eyebrow)}</p><h2>${esc(b.h)}</h2>
    <p>${esc(b.p)}</p>${b.cta ? cta(b.cta) : ''}</div></div></section>`,

  steps: (b) => `<section class="section reveal"><h2>${esc(b.h)}</h2><ol class="steps">${b.items.map((i, n) =>
    `<li class="step"><span class="step__n">${n + 1}</span><div><h3>${esc(i.h)}</h3><p>${esc(i.p)}</p></div></li>`).join('')}</ol></section>`,

  table: (b) => `<section class="section reveal"><h2>${esc(b.h)}</h2><div class="tablewrap"><table>
    <thead><tr>${b.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
    <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>${b.note ? `<p class="flag">${esc(b.note)}</p>` : ''}</section>`,

  faq: (b) => `<section class="section reveal"><h2>${esc(b.h)}</h2><div class="faq">${b.items.map((i) =>
    `<details><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`).join('')}</div></section>`,

  quotes: (b) => `<section class="section reveal"><div class="grid grid--2">${b.items.map((i) =>
    `<blockquote class="quote">“${esc(i.q)}”<cite>${esc(i.by)}</cite></blockquote>`).join('')}</div>
    ${b.note ? `<p class="flag">${esc(b.note)}</p>` : ''}</section>`,

  note: (b) => `<section class="section reveal"><aside class="note"><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p></aside></section>`,

  cta: (b) => `<section class="bigcta reveal"><h2>${esc(b.h)}</h2>${b.sub ? `<p>${esc(b.sub)}</p>` : ''}${b.cta ? cta(b.cta) : ''}</section>`,
};

function layout(slug, page) {
  const url = slug === 'notfound' ? '/404.html' : `/${slug}/`;
  return `<!doctype html>
<html lang="en-AU">
${head({ title: page.title, desc: page.desc, url })}
<body>
<a class="skip" href="#main">Skip to content</a>
${navBar({ active: slug })}
<main id="main">${page.body.map((b) => block[b.t](b)).join('\n')}</main>
${siteFooter()}
${baseScript()}
</body></html>`;
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'assets', 'img'), { recursive: true });

const built = [];
for (const [slug, page] of Object.entries(pages)) {
  const out = slug === 'index' ? join(dist, 'index.html')
    : slug === 'notfound' ? join(dist, '404.html')
    : join(dist, slug, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, slug === 'index' ? renderLanding() : layout(slug, page));
  built.push(slug === 'index' ? '/' : slug === 'notfound' ? '/404.html' : `/${slug}/`);
}

const tokens = readFileSync(join(here, 'brand', 'tokens.css'));
const styles = readFileSync(join(here, 'styles.css'));
const landing = readFileSync(join(here, 'landing.css'));
writeFileSync(join(dist, 'styles.css'), tokens + '\n' + styles + '\n' + landing);

const logos = join(here, 'brand', 'logos');
const assetMap = {
  'favicon.svg': 'favicon.svg',
  'favicon-16.png': 'favicon-16.png',
  'favicon-32.png': 'favicon-32.png',
  'favicon-48.png': 'favicon-48.png',
  'apple-touch-icon-180.png': 'apple-touch-icon-180.png',
  'mark-chip.svg': 'mark-chip.svg',
  'mark-chip.png': 'mark-chip.png',
  'mark-coral.svg': 'mark-coral.svg',
  'mark-coral.png': 'mark-coral.png',
  'mark-240.png': 'mark-240.png',
  'wordmark-coral.svg': 'wordmark-coral.svg',
  'wordmark-coral.png': 'wordmark-coral.png',
  'text-coral.svg': 'text-coral.svg',
  'web-app-manifest-192.png': 'web-app-manifest-192.png',
  'web-app-manifest-512.png': 'web-app-manifest-512.png',
  'og-image-1200x630.png': 'og-image.png',
};
for (const [src, dest] of Object.entries(assetMap)) {
  cpSync(join(logos, src), join(dist, 'assets', dest));
}
cpSync(join(here, 'assets', 'img'), join(dist, 'assets', 'img'), { recursive: true });

writeFileSync(join(dist, 'site.webmanifest'), JSON.stringify({
  name: site.name, short_name: 'Uncle Jim', start_url: '/', display: 'standalone',
  background_color: '#0a0a0f', theme_color: '#0a0a0f',
  icons: [
    { src: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
    { src: '/assets/web-app-manifest-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/web-app-manifest-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 1));

writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${built.map((u) => `  <url><loc>https://${site.domain}${u}</loc></url>`).join('\n')}
</urlset>`);

console.log(`built ${built.length} pages -> site/dist`);
