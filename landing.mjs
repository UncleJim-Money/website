// Landing — dark neobank app template (Meltline-style structure), original Uncle Jim copy.
import { site } from './content.mjs';
import { esc, head, navBar, siteFooter, baseScript } from './chrome.mjs';

const ic = {
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>',
  recv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/></svg>',
  jar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8"/><path d="M9 3v3h6V3"/><path d="M6 6h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M6 13h12"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M17.5 14.7c2.3.6 3.7 2.3 4 5.3"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12 12 20 3 11V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
};
const icon = (n, cls = '') => `<span class="ic ${cls}">${ic[n]}</span>`;

const promises = ['Settles instantly', 'Round-ups on autopilot', 'Wallets for your people', 'No account fees', 'Fees published up front', 'Works overseas', 'Open source'];
const marquee = `<div class="ln-marquee" aria-label="What you get"><div class="ln-marquee__track">${[...promises, ...promises].map((p) => `<span class="ln-proto">${icon('bolt')}${esc(p)}</span>`).join('')}</div></div>`;

const phone = `
<div class="ln-phone-wrap reveal">
  <div class="phone" id="demo" aria-label="Interactive wallet preview">
    <div class="phone__notch"></div>
    <div class="phone__screen">
      <div class="ph-status"><span id="ph-time">9:41</span><span class="ph-sig">●●● ⌁ ▮</span></div>
      <div class="ph-head">
        <img src="/assets/mark-chip.svg" alt="" width="34" height="34">
        <div><p class="ph-hi">G'day</p><p class="ph-name">Jim's wallet</p></div>
        <span class="ph-bell">${ic.bell}</span>
      </div>
      <div class="ph-balance">
        <p class="ph-label">Total balance <span class="ph-demo">demo</span></p>
        <p class="ph-sats"><span id="ph-sats">1,250,000</span><small> sats</small></p>
        <p class="ph-fiat">≈ A$ <span id="ph-fiat">1,875.00</span> <span class="ph-demo">illustrative rate</span></p>
      </div>
      <div class="ph-actions" role="tablist" aria-label="Wallet actions">
        <button class="ph-act active" data-ph="send" role="tab" aria-selected="true">${ic.send}<span>Send</span></button>
        <button class="ph-act" data-ph="receive" role="tab" aria-selected="false">${ic.recv}<span>Receive</span></button>
        <button class="ph-act" data-ph="stack" role="tab" aria-selected="false">${ic.jar}<span>Stack</span></button>
      </div>
      <div class="ph-panel" id="ph-panel"></div>
      <div class="ph-activity">
        <p class="ph-label">Recent</p>
        <ul id="ph-list"></ul>
      </div>
    </div>
  </div>
  <p class="ln-phone-note">Interactive preview · seeded demo data, not a live account.</p>
</div>`;

const connectionCard = `
<div class="ln-card3d reveal" id="card3d">
  <div class="ln-card3d__in">
    <div class="ln-card3d__top"><img src="/assets/mark-chip.svg" alt="" width="44" height="44"><span class="ln-card3d__net">${ic.bolt} Lightning</span></div>
    <p class="ln-card3d__addr">jim@unclejim.money</p>
    <div class="ln-card3d__bot"><span class="mono">Uncle Jim Money · invite</span><span class="ln-card3d__chip">${ic.bolt}</span></div>
  </div>
  <button class="btn btn--sm ln-card3d__copy" id="copy-invite">${ic.copy} Copy invite</button>
</div>`;

export function renderLanding() {
  return `<!doctype html>
<html lang="en-AU">
${head({ title: 'Uncle Jim Money — Bitcoin that behaves like money', desc: 'A Lightning wallet that feels like a neobank: instant payments, round-up stacking and shared wallets, run on an open self-hosted node.', url: '/' })}
<body data-landing>
<a class="skip" href="#main">Skip to content</a>
${navBar({ anchors: true })}
<main id="main">

<section class="ln-hero">
  <div class="ln-hero__bg" aria-hidden="true"></div>
  <div class="wrap ln-hero__in">
    <div class="ln-hero__copy">
      <p class="eyebrow">Uncle Jim Money · Lightning wallet</p>
      <h1>Money that moves at the <em>speed of lightning.</em></h1>
      <p class="lede">Pay anyone, anywhere, right now. Save in sats without thinking about it. Split the bill with your people — no spreadsheet, no waiting for a business day.</p>
      <div class="ln-hero__cta">
        <a class="btn" href="/download/">Get the app ${icon('bolt')}</a>
        <a class="linkarrow" href="#demo">See it in action <span class="ar">→</span></a>
      </div>
      <ul class="ln-trust">
        <li>${icon('code')} Open source</li>
        <li>${icon('tag')} No account fees</li>
        <li>${icon('users')} A human answers</li>
      </ul>
    </div>
    ${phone}
  </div>
</section>

${marquee}

<section class="section reveal">
  <div class="grid grid--4 ln-benefits">
    <article class="card">${icon('bolt', 'ic--coral')}<h3>Settles instantly</h3><p>Not tomorrow, not after a business day. The moment you tap pay, it has landed.</p></article>
    <article class="card">${icon('jar', 'ic--gold')}<h3>Stacks on autopilot</h3><p>Round-ups and standing orders buy sats on a rule you set once and forget.</p></article>
    <article class="card">${icon('users', 'ic--pink')}<h3>Built for your people</h3><p>Household wallets, group pots and settle-ups that take one tap, not a group chat.</p></article>
    <article class="card">${icon('tag', 'ic--teal')}<h3>Costs what it says</h3><p>Published fees, shown before you confirm. No account-keeping charge, ever.</p></article>
  </div>
</section>

<section class="section--tint">
  <div class="wrap split">
    <div class="split__copy reveal">
      <p class="eyebrow">One address</p>
      <h2>Your money, one address anyone can pay.</h2>
      <p>Every wallet gets a Lightning address and a shareable invite. Hand it out like a phone number — people pay you from any Lightning wallet, no app install required on their side.</p>
      <ul class="ln-bullets">
        <li>${icon('bolt')} Gets paid from any lightning wallet</li>
        <li>${icon('shield')} Private by default, encrypted end to end</li>
        <li>${icon('users')} Invite the household with one link</li>
      </ul>
      <a class="linkarrow" href="/share/">Set up your people <span class="ar">→</span></a>
    </div>
    <div class="split__art">${connectionCard}</div>
  </div>
</section>

<section class="section" id="pay">
  <div class="split">
    <div class="split__copy reveal">
      <p class="eyebrow">Pay</p>
      <h2>Tap. Done.</h2>
      <p>Scan a Lightning QR and the money is there before you put your phone down. Payments ride payment channels, so small amounts confirm in under a second — and every receipt shows the fee, the time and who it went to.</p>
      <a class="linkarrow" href="/pay/">How paying works <span class="ar">→</span></a>
    </div>
    <div class="split__art reveal">
      <figure class="ln-photo">
        <img src="/assets/img/pay.jpg" alt="Paying with a phone at a cafe counter">
        <figcaption class="ln-receipt"><span class="ln-receipt__dot"></span><div><strong>Coffee · Melbourne</strong><span>− 4,600 sats · settled 0.4s</span></div>${icon('bolt')}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section--tint" id="stack">
  <div class="wrap split split--flip">
    <div class="split__copy reveal">
      <p class="eyebrow">Stack</p>
      <h2>Round up. Buy sats. Forget about it.</h2>
      <p>Every payment rounds to the nearest dollar and the difference buys bitcoin. Or set a standing order — every Monday, every payday. You watch the jar fill while you get on with your life.</p>
      <a class="linkarrow" href="/stack/">How stacking works <span class="ar">→</span></a>
    </div>
    <div class="split__art reveal">
      <div class="ln-jar">
        <div class="ln-jar__head"><span>Holiday jar</span><span class="mono" id="jar-amt">86,400 sats</span></div>
        <div class="ln-jar__tube"><div class="ln-jar__fill" id="jar-fill"></div><span class="ln-jar__coin" id="jar-coin">${ic.bolt}</span></div>
        <div class="ln-jar__ctrl">
          <button class="ln-chipbtn active" id="jar-round" aria-pressed="true">Round-ups</button>
          <button class="ln-chipbtn" id="jar-week" aria-pressed="false">Weekly buy</button>
        </div>
        <p class="ln-jar__note" id="jar-note">A $4.60 coffee tops up 40c of sats.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="share">
  <div class="split">
    <div class="split__copy reveal">
      <p class="eyebrow">Share</p>
      <h2>Better with your people.</h2>
      <p>Give the family a shared wallet, settle up after the dinner, send a gift that lands in seconds. Splitting gets easier the more people are on it — that is the point.</p>
      <div class="ln-splitcalc">
        <label class="ln-field"><span>Bill (A$)</span><input type="range" id="sc-amt" min="10" max="400" step="5" value="120"></label>
        <label class="ln-field"><span>People</span><input type="range" id="sc-n" min="2" max="10" step="1" value="4"></label>
        <p class="ln-splitcalc__out">Each pays <strong id="sc-out">A$ 30.00</strong> <span id="sc-meta">4 ways · settles in one tap</span></p>
      </div>
      <a class="linkarrow" href="/share/">Set up a group <span class="ar">→</span></a>
    </div>
    <div class="split__art reveal">
      <figure class="ln-photo"><img src="/assets/img/friends.jpg" alt="Friends with arms around each other at sunset"></figure>
    </div>
  </div>
</section>

<section class="section--tint" id="travel">
  <div class="wrap split split--flip">
    <div class="split__copy reveal">
      <p class="eyebrow">Travel</p>
      <h2>Spend overseas like a local.</h2>
      <p>No foreign transaction fee to hide, because there is no currency-conversion theatre to perform. The fee in Lisbon is the fee in Launceston, and it needs a few kilobytes and a phone signal.</p>
      <a class="linkarrow" href="/travel/">Travelling with Uncle Jim <span class="ar">→</span></a>
    </div>
    <div class="split__art reveal">
      <figure class="ln-photo ln-photo--tall">
        <img src="/assets/img/travel.jpg" alt="Canal and buildings in Venice">
        <figcaption class="ln-board"><span class="ln-board__title">Network pulse <em>illustrative</em></span><ul id="pulse"></ul></figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section reveal">
  <div class="ln-sectionhead"><p class="eyebrow">Proof, not promises</p><h2>Built in the open.</h2><p class="lede">No black box. The whole service is public code you can read, audit, or run yourself — and a person, not a ticket queue, when you need one.</p></div>
  <div class="grid grid--3">
    <article class="card ln-proof">${icon('code', 'ic--coral')}<h3>Open source</h3><p>Every line we run is published, including our changes. Trust it because you can check it, not because we say so.</p><a class="linkarrow" href="/terms/#source">Read the terms <span class="ar">→</span></a></article>
    <article class="card ln-proof">${icon('shield', 'ic--gold')}<h3>Run it yourself</h3><p>Prefer to hold your own keys? Host your own node and point the same app at it. Nothing locks you in.</p><a class="linkarrow" href="/download/">See how <span class="ar">→</span></a></article>
    <article class="card ln-proof">${icon('users', 'ic--teal')}<h3>A human answers</h3><p>Support is a product surface here. When something looks wrong, you reach a person who can actually fix it.</p><a class="linkarrow" href="/support/">Meet support <span class="ar">→</span></a></article>
  </div>
</section>

<section class="section--tint">
  <div class="wrap split">
    <div class="split__copy reveal">
      <p class="eyebrow">Stay informed</p>
      <h2>Always know where it landed.</h2>
      <p>A receipt the second a payment settles, a nudge when a round-up buys, an alert when a jar hits its goal. Notifications are a product surface here, not an afterthought — and a human is one tap away when something looks wrong.</p>
      <a class="btn btn--ghost" href="/support/">Meet support</a>
    </div>
    <div class="split__art reveal">
      <figure class="ln-photo"><img src="/assets/img/phone.jpg" alt="A phone in hand beside a coffee">
        <figcaption class="ln-notif">${ic.bell}<div><strong>Payment received</strong><span>+ 25,000 sats from Dan · just now</span></div></figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section reveal">
  <div class="ln-sectionhead"><p class="eyebrow">FAQ</p><h2>The questions people actually ask.</h2></div>
  <div class="faq">
    <details><summary>Is this a bank?</summary><p>No. Uncle Jim Money is a hosted Lightning wallet run by a private operator on open-source software. It is not an authorised deposit-taking institution and no government guarantee applies. Balances sit on our node — that trade-off is disclosed in the terms, not buried.</p></details>
    <details><summary>Who holds the keys?</summary><p>Uncle Jim runs the node your balance sits on, so a hosted wallet is custodial — that trade-off is disclosed up front, not buried. Your sign-in key stays on your device. If you want full control, run your own node and connect the same app to it.</p></details>
    <details><summary>What if the other person is offline?</summary><p>Invoices are held by the node, so they receive it when they come back. You are not waiting on them.</p></details>
    <details><summary>What does it cost?</summary><p>Opening and keeping a wallet is free. Outbound Lightning payments carry a published service fee that covers routing; the exact schedule is on the pricing page before you sign up to anything.</p></details>
    <details><summary>Can I take my money elsewhere?</summary><p>Yes. Send to any Lightning address or invoice, or withdraw on-chain at the actual network fee with no markup.</p></details>
  </div>
</section>

<section class="section reveal">
  <div class="ln-sectionhead"><p class="eyebrow">Guides</p><h2>Start with the thing you came for.</h2></div>
  <div class="grid grid--3 ln-guides">
    <a class="ln-guide" href="/pay/"><img src="/assets/img/pay.jpg" alt=""><div><h3>Pay anyone</h3><p>Scan, tap, send. Receipts you can read.</p></div></a>
    <a class="ln-guide" href="/share/"><img src="/assets/img/dinner.jpg" alt=""><div><h3>Split with your people</h3><p>Household wallets, pots and settle-ups.</p></div></a>
    <a class="ln-guide" href="/travel/"><img src="/assets/img/travel.jpg" alt=""><div><h3>Take it overseas</h3><p>Same fee everywhere, no card blocks.</p></div></a>
  </div>
</section>

<section class="bigcta reveal">
  <h2>Bring your people along.</h2>
  <p>One wallet for the household, one tap to send, and an Uncle who answers.</p>
  <div class="ln-stores">
    <a class="btn" href="https://${site.app}" rel="noopener">${ic.bolt} Open the web app</a>
    <a class="btn btn--ink" href="/download/">Android &amp; iOS</a>
  </div>
  <p class="ln-stores__note">Web app live now · mobile builds in signing · <a href="/download/">all download options</a></p>
</section>

</main>
${siteFooter()}
${baseScript()}
${landingScript()}
</body></html>`;
}

function landingScript() {
  return `<script>
(function () {
  var RATE = 0.0015; // illustrative demo A$/sat
  var sats = 1250000;
  var jar = 86400;
  var list = [
    { n: 'Coffee · Melbourne', a: -4600, t: '0.4s' },
    { n: 'From Dan', a: 25000, t: '2m' },
    { n: 'Round-up buy', a: -400, t: '9m' },
    { n: 'Groceries · split', a: -18200, t: '1h' }
  ];
  var fmt = function (n) { return n.toLocaleString('en-AU'); };
  function paint() {
    document.getElementById('ph-sats').textContent = fmt(sats);
    document.getElementById('ph-fiat').textContent = (sats * RATE).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('ph-list').innerHTML = list.slice(0, 4).map(function (r) {
      return '<li><span class="ph-row__ic">' + (r.a > 0 ? '+' : '−') + '</span><span class="ph-row__n">' + r.n + '</span><span class="ph-row__a ' + (r.a > 0 ? 'pos' : '') + '">' + (r.a > 0 ? '+' : '−') + fmt(Math.abs(r.a)) + '</span></li>';
    }).join('');
  }
  var panel = document.getElementById('ph-panel');
  var contacts = ['Dan', 'Margaret', 'Household'];
  var sel = 0, amount = 12000;
  function render(tab) {
    if (tab === 'send') {
      panel.innerHTML = '<div class="ph-send">' +
        '<div class="ph-contacts">' + contacts.map(function (c, i) { return '<button class="ph-contact' + (i === sel ? ' active' : '') + '" data-c="' + i + '">' + c + '</button>'; }).join('') + '</div>' +
        '<label class="ph-amt"><span>Amount</span><input type="range" id="ph-range" min="1000" max="100000" step="1000" value="' + amount + '"><output id="ph-out">' + fmt(amount) + ' sats</output></label>' +
        '<button class="ph-go" id="ph-sendbtn">Send now</button></div>';
      panel.querySelectorAll('.ph-contact').forEach(function (b) { b.addEventListener('click', function () { sel = +b.dataset.c; render('send'); }); });
      var rg = panel.querySelector('#ph-range');
      rg.addEventListener('input', function () { amount = +rg.value; panel.querySelector('#ph-out').textContent = fmt(amount) + ' sats'; });
      panel.querySelector('#ph-sendbtn').addEventListener('click', function () {
        if (amount > sats) return;
        sats -= amount; list.unshift({ n: 'To ' + contacts[sel], a: -amount, t: 'now' }); paint();
        panel.querySelector('#ph-sendbtn').textContent = 'Sent ✓';
        setTimeout(function () { render('send'); }, 900);
      });
    } else if (tab === 'receive') {
      panel.innerHTML = '<div class="ph-recv"><p class="ph-addr">jim@unclejim.money</p>' +
        '<div class="ph-qr" aria-hidden="true"></div>' +
        '<button class="ph-go" id="ph-recvbtn">Simulate incoming</button></div>';
      panel.querySelector('#ph-recvbtn').addEventListener('click', function () {
        sats += 25000; list.unshift({ n: 'From ' + contacts[sel], a: 25000, t: 'now' }); paint();
        panel.querySelector('#ph-recvbtn').textContent = 'Received ✓';
        setTimeout(function () { render('receive'); }, 900);
      });
    } else {
      panel.innerHTML = '<div class="ph-stack"><div class="ph-jarmini"><div id="ph-jarfill"></div></div>' +
        '<p class="ph-stackamt"><span id="ph-jaramt">' + fmt(jar) + '</span> sats stacked</p>' +
        '<button class="ph-go" id="ph-stackbtn">Run a round-up</button></div>';
      var f = panel.querySelector('#ph-jarfill'); f.style.height = Math.min(100, jar / 2000) + '%';
      panel.querySelector('#ph-stackbtn').addEventListener('click', function () {
        jar += 400; sats -= 400; list.unshift({ n: 'Round-up buy', a: -400, t: 'now' }); paint();
        panel.querySelector('#ph-jaramt').textContent = fmt(jar);
        f.style.height = Math.min(100, jar / 2000) + '%';
      });
    }
  }
  document.querySelectorAll('.ph-act').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.ph-act').forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
      b.classList.add('active'); b.setAttribute('aria-selected', 'true');
      render(b.dataset.ph);
    });
  });
  paint(); render('send');

  // clock
  function tick() { var d = new Date(); document.getElementById('ph-time').textContent = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); }
  tick(); setInterval(tick, 30000);

  // copy invite
  var cp = document.getElementById('copy-invite');
  cp.addEventListener('click', function () {
    var txt = 'jim@unclejim.money';
    function done() { var old = cp.innerHTML; cp.innerHTML = 'Copied ✓'; setTimeout(function () { cp.innerHTML = old; }, 1400); }
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
  });

  // card tilt
  var card = document.getElementById('card3d');
  card.addEventListener('pointermove', function (e) {
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = 'perspective(900px) rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 12) + 'deg)';
  });
  card.addEventListener('pointerleave', function () { card.style.transform = ''; });

  // jar toggle + coin animation
  var jr = document.getElementById('jar-round'), jw = document.getElementById('jar-week');
  var jn = document.getElementById('jar-note'), jf = document.getElementById('jar-fill'), jc = document.getElementById('jar-coin');
  jf.style.height = '43%';
  function drop() { jc.classList.remove('drop'); void jc.offsetWidth; jc.classList.add('drop'); }
  setInterval(drop, 3200);
  jr.addEventListener('click', function () { jr.classList.add('active'); jw.classList.remove('active'); jr.setAttribute('aria-pressed', 'true'); jw.setAttribute('aria-pressed', 'false'); jn.textContent = 'A $4.60 coffee tops up 40c of sats.'; });
  jw.addEventListener('click', function () { jw.classList.add('active'); jr.classList.remove('active'); jw.setAttribute('aria-pressed', 'true'); jr.setAttribute('aria-pressed', 'false'); jn.textContent = 'A$ 50 every Monday, settled in sats.'; });

  // split calculator
  var sa = document.getElementById('sc-amt'), sn = document.getElementById('sc-n');
  function calc() {
    var each = (+sa.value) / (+sn.value);
    document.getElementById('sc-out').textContent = 'A$ ' + each.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('sc-meta').textContent = sn.value + ' ways · settles in one tap';
  }
  sa.addEventListener('input', calc); sn.addEventListener('input', calc); calc();

  // illustrative network pulse
  var routes = [['Lisbon', 'Lisbon → Melbourne', '0.6s'], ['Toronto', 'Toronto → Brisbane', '0.8s'], ['Tokyo', 'Tokyo → Geelong', '0.5s'], ['Berlin', 'Berlin → Perth', '0.7s']];
  var pi = 0;
  function pulse() {
    var r = routes[pi % routes.length]; pi++;
    document.getElementById('pulse').innerHTML = '<li><span>' + r[1] + '</span><em>' + r[2] + '</em></li>' +
      routes.slice(0, 3).map(function (x) { return '<li class="dim"><span>' + x[1] + '</span><em>' + x[2] + '</em></li>'; }).join('');
  }
  pulse(); setInterval(pulse, 2600);
})();
</script>`;
}