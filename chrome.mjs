// Shared chrome for the dark neobank site: head, fixed nav, drawer, footer, base scripts.
import { site, nav, footer } from './content.mjs';

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function head({ title, desc, url }) {
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="https://${site.domain}${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://${site.domain}${url}">
<meta property="og:image" content="https://${site.domain}/assets/og-image.png">
<meta name="theme-color" content="#0a0a0f">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/styles.css">
</head>`;
}

// On the landing the nav doubles as in-page section anchors (scroll-spy);
// on inner pages it links across pages and marks the current one.
export function navBar({ active = '', anchors = false } = {}) {
  const links = nav.map((n) => {
    const href = anchors && n.href !== '/pricing/' ? n.href.replace(/\/$/, '').replace('/', '#') : n.href;
    const isActive = !anchors && n.href === `/${active}/`;
    return `<a href="${esc(href)}" data-spy="${esc(href.slice(1))}" class="${isActive ? 'active' : ''}">${esc(n.label)}</a>`;
  }).join('');
  return `<header class="nav" id="nav">
  <div class="nav__in">
    <a class="nav__brand" href="/"><img src="/assets/mark-chip.svg" alt="" width="38" height="38"><span>${esc(site.name)}</span></a>
    <nav class="nav__links" aria-label="Main">${links}</nav>
    <div class="nav__cta">
      <a class="btn btn--ghost btn--sm" href="https://${site.app}" rel="noopener">Open wallet</a>
      <a class="btn btn--sm" href="/download/">Get the app</a>
    </div>
    <button class="nav__burger" id="drawer-open" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span></button>
  </div>
</header>
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="drawer__panel">
    <div class="drawer__head">
      <a class="nav__brand" href="/"><img src="/assets/mark-chip.svg" alt="" width="34" height="34"><span>${esc(site.name)}</span></a>
      <button class="drawer__close" id="drawer-close" aria-label="Close menu">×</button>
    </div>
    ${nav.map((n) => `<a class="drawer__link" href="${esc(n.href)}">${esc(n.label)}</a>`).join('')}
    <a class="drawer__link" href="/support/">Support</a>
    <a class="drawer__link" href="/safety/">Safety</a>
    <a class="btn" href="/download/">Get the app</a>
  </div>
</div>`;
}

export function siteFooter() {
  return `<footer class="foot">
  <div class="wrap foot__in">
    <div class="foot__blurb">
      <p class="foot__brand"><img src="/assets/mark-chip.svg" alt="" width="34" height="34">${esc(site.name)}</p>
      <p>${esc(footer.blurb)}</p>
    </div>
    ${footer.columns.map((c) => `<div><h4>${esc(c.title)}</h4><ul>${c.links.map(([l, h]) => `<li><a href="${esc(h)}">${esc(l)}</a></li>`).join('')}</ul></div>`).join('')}
  </div>
  <div class="wrap foot__legal"><p>Uncle Jim Money is not a bank and does not take deposits. No government guarantee applies to balances. Hosted wallets are custodial: see <a href="/terms/">terms</a>. ${esc(site.domain)}</p></div>
</footer>`;
}

export function baseScript() {
  return `<script>
(function () {
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var drawer = document.getElementById('drawer');
  var open = document.getElementById('drawer-open');
  var close = document.getElementById('drawer-close');
  function setDrawer(v) {
    drawer.classList.toggle('open', v);
    open.setAttribute('aria-expanded', String(v));
    document.body.style.overflow = v ? 'hidden' : '';
    if (v) close.focus(); else open.focus();
  }
  open.addEventListener('click', function () { setDrawer(true); });
  close.addEventListener('click', function () { setDrawer(false); });
  drawer.addEventListener('click', function (e) { if (e.target === drawer) setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  // Anchor jumps must never land on hidden content.
  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) { t.classList.add('in'); t.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); }); }
  }
  // Fail-open: never leave content invisible if observers are throttled or unsupported.
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
  }, 700);

  var spy = document.querySelectorAll('[data-spy]');
  if (spy.length && document.body.hasAttribute('data-landing')) {
    var map = {};
    spy.forEach(function (a) { var id = a.getAttribute('data-spy'); var sec = document.getElementById(id); if (sec) map[id] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          spy.forEach(function (a) { a.classList.remove('active'); });
          var a = map[en.target.id]; if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { so.observe(document.getElementById(id)); });
  }
})();
</script>`;
}