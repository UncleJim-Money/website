// Uncle Jim Money — site copy.
// Information architecture is inspired by up.com.au's structure. All artwork,
// wording and brand marks here are original; no Up phrases or assets are reused.

export const site = {
  name: 'Uncle Jim Money',
  domain: 'unclejim.money',
  app: 'app.unclejim.money',
  tagline: 'Bitcoin that behaves like money.',
};

export const nav = [
  { href: '/stack/', label: 'Stack' },
  { href: '/pay/', label: 'Pay' },
  { href: '/share/', label: 'Share' },
  { href: '/travel/', label: 'Travel' },
  { href: '/pricing/', label: 'Pricing' },
];

export const footer = {
  blurb: 'Uncle Jim Money runs a Lightning node and hands you a wallet on it. No branches, no forms, no waiting for a business day.',
  columns: [
    { title: 'Money', links: [['Stack', '/stack/'], ['Pay', '/pay/'], ['Share', '/share/'], ['Travel', '/travel/'], ['Pricing', '/pricing/']] },
    { title: 'Getting help', links: [['Support', '/support/'], ['Safety', '/safety/'], ['Download the app', '/download/']] },
    { title: 'The small print', links: [['Terms', '/terms/'], ['Privacy', '/privacy/'], ['Not a bank', '/terms/#not-a-bank']] },
  ],
};

// Shared block helpers live in build.mjs; pages below are pure content.
export const pages = {
  index: {
    title: 'Uncle Jim Money — Bitcoin that behaves like money',
    desc: 'Instant Lightning payments, automatic sats saving, and shared wallets for your people. Run by Uncle Jim.',
    body: [
      { t: 'hero', eyebrow: 'Uncle Jim Money', h: 'Money that moves at the speed of lightning.', sub: 'Pay anyone, anywhere, right now. Save in bitcoin without thinking about it. Split bills with your people without the spreadsheet.', cta: ['/download/', 'Get the app'], art: 'character' },
      { t: 'trio', items: [
        { h: 'Settles instantly', p: 'Not tomorrow. Not after a business day. The moment you tap pay, it has landed.' },
        { h: 'Works everywhere', p: 'A coffee in Melbourne, a taxi in Lisbon, a mate in Toronto. Same button, same speed.' },
        { h: 'Costs what it says', p: 'Flat, published fees. No account-keeping charge, no foreign transaction fee, no surprise.' },
      ]},
      { t: 'split', flip: true, eyebrow: 'Stack', h: 'Round up. Buy sats. Forget about it.', p: 'Every payment you make rounds to the nearest dollar and the difference buys bitcoin. You watch the number grow while you get on with your life.', cta: ['/stack/', 'How stacking works'], art: 'stack' },
      { t: 'split', eyebrow: 'Share', h: 'Better with your people.', p: 'Give the family a shared wallet. Settle up after the dinner. Send a gift that lands in seconds, not after a form and a fax.', cta: ['/share/', 'Set up a group'], art: 'share' },
      { t: 'quotes', items: [
        { q: 'I stopped thinking about whether it had arrived.', by: 'Margaret, Geelong' },
        { q: 'Uncle Jim is the only person who ever explained it to me properly.', by: 'Dan, Brisbane' },
      ], note: 'Illustrative. Replace with real user quotes before launch — do not ship invented testimonials.' },
      { t: 'cta', h: 'Bring your people along.', sub: 'One wallet for the household, one tap to send, and an Uncle who answers.', cta: ['/download/', 'Get the app'] },
    ],
  },

  stack: {
    title: 'Stack — save in bitcoin without thinking',
    desc: 'Automatic round-ups, scheduled buys, and a savings jar that actually holds its value.',
    body: [
      { t: 'hero', eyebrow: 'Stack', h: 'Save in money that cannot be printed.', sub: 'Set a rule once. Uncle Jim does the buying, every day, including the days you forget.', cta: ['/download/', 'Start stacking'], art: 'stack' },
      { t: 'trio', items: [
        { h: 'Round-ups', p: 'A $4.60 coffee tops up 40 cents worth of sats. You will not feel it. Your future self will.' },
        { h: 'Standing orders', p: 'Every Monday, every payday, whatever suits. Fixed in dollars, settled in bitcoin.' },
        { h: 'Jars', p: 'Separate pots for holiday, emergency, and "do not touch". Each one is just a balance on your wallet.' },
      ]},
      { t: 'steps', h: 'Three minutes, once.', items: [
        { h: 'Pick a rule', p: 'Round-ups, a weekly amount, or both.' },
        { h: 'Pick a jar', p: 'Name it. Holiday works well.' },
        { h: 'Walk away', p: 'Buys happen automatically and you get a receipt every time.' },
      ]},
      { t: 'note', h: 'Honest bit about volatility', p: 'Bitcoin moves. Stacking smooths out the timing but does not remove the risk, and nobody who tells you otherwise is selling you something. Uncle Jim will not promise you a return.' },
      { t: 'cta', h: 'Set your first rule.', cta: ['/download/', 'Open the app'] },
    ],
  },

  pay: {
    title: 'Pay — Lightning payments that just work',
    desc: 'Scan, tap, send. Instant bitcoin payments with published flat fees.',
    body: [
      { t: 'hero', eyebrow: 'Pay', h: 'Tap. Done.', sub: 'Scan a Lightning QR code and the money is there before you put your phone down.', cta: ['/download/', 'Get the app'], photo: 'pay' },
      { t: 'trio', items: [
        { h: 'Any Lightning address', p: 'Pay someone@otherwallet.com the same way you pay someone using Uncle Jim.' },
        { h: 'No on-chain waiting', p: 'Payments ride payment channels. Small amounts confirm in under a second.' },
        { h: 'Receipts you can read', p: 'Every payment shows the fee, the time, and who it went to. No codes.' },
      ]},
      { t: 'faq', h: 'The questions people actually ask', items: [
        { q: 'What if the other person is offline?', a: 'Lightning invoices are held by Uncle Jim\'s node, so they receive it when they come back. You are not waiting on them.' },
        { q: 'What happens if a payment fails?', a: 'It bounces back and nothing leaves your balance. Failed routes are not charged.' },
        { q: 'Is there a limit?', a: 'Yes — channel capacity sets a practical per-payment ceiling. Your limits are shown in the app before you send.' },
      ]},
      { t: 'cta', h: 'Send your first one.', cta: ['/download/', 'Get the app'] },
    ],
  },

  share: {
    title: 'Share — wallets for your people',
    desc: 'Household wallets, group pots, settle-ups and gifts.',
    body: [
      { t: 'hero', eyebrow: 'Share', h: 'Money is a group activity.', sub: 'Add the household, split the dinner, gift a grandchild some sats for birthday.', cta: ['/share/#groups', 'Set up a group'], photo: 'friends' },
      { t: 'cards', h: 'Ways to share', items: [
        { h: 'Household wallet', p: 'One pot, several people, everyone sees the balance and the spend.' },
        { h: 'Split and settle', p: 'Track who owes who after the trip. Settle it with one payment, not a group chat.' },
        { h: 'Gifts', p: 'Send a present that arrives instantly, with a note attached.' },
        { h: 'Pocket money', p: 'Give kids an allowance they can actually spend, and watch what they learn.' },
      ]},
      { t: 'cta', h: 'Get your people on it.', cta: ['/download/', 'Invite them'] },
    ],
  },

  travel: {
    title: 'Travel — spend overseas without the fee theatre',
    desc: 'No foreign transaction fee, no exchange markup theatre, no notifying your bank.',
    body: [
      { t: 'hero', eyebrow: 'Travel', h: 'Spend overseas like a local.', sub: 'There is no foreign transaction fee to hide because there is no currency conversion theatre to perform.', cta: ['/pricing/', 'See the fees'], photo: 'travel' },
      { t: 'trio', items: [
        { h: 'Nothing to declare', p: 'No notification to a bank, no card block, no calling an overseas number at 2am.' },
        { h: 'Same fee everywhere', p: 'The fee in Lisbon is the fee in Launceston. It is on the pricing page.' },
        { h: 'Works on a phone signal', p: 'A Lightning payment needs a few kilobytes and a connection.' },
      ]},
      { t: 'note', h: 'What still applies', p: 'You still need a way to get money in and out of the country, and local rules about cash and declaration thresholds are yours to follow. Uncle Jim does not change that.' },
      { t: 'cta', h: 'Take it with you.', cta: ['/download/', 'Get the app'] },
    ],
  },

  pricing: {
    title: 'Pricing — flat and published',
    desc: 'No account fees. Flat service fee on hosted balances. That is the whole thing.',
    body: [
      { t: 'hero', eyebrow: 'Pricing', h: 'The whole fee schedule, on one page.', sub: 'If a fee is not written here, it does not exist.', cta: ['/download/', 'Get the app'], art: 'character' },
      { t: 'table', h: 'Fees', columns: ['What', 'Fee', 'Notes'], rows: [
        ['Opening a wallet', 'Nothing', '—'],
        ['Keeping an account', 'Nothing', 'No monthly charge, ever'],
        ['Sending to another Uncle Jim wallet', 'Nothing', 'Internal transfer on the node'],
        ['Sending out over Lightning', '0.5% capped at 20,000 sats', 'Covers routing and channel management'],
        ['Receiving over Lightning', 'Nothing', '—'],
        ['On-chain withdrawal', 'Actual network fee', 'Passed straight through, marked up by nothing'],
        ['Converting fiat to sats', 'Spread shown before you confirm', 'You see the rate and the cost, then decide'],
      ], note: 'PLACEHOLDER NUMBERS. These are illustrative and must be replaced with the fee schedule you actually intend to charge before this page goes live.' },
      { t: 'faq', h: 'Fair questions', items: [
        { q: 'How do you make money?', a: 'The Lightning service fee and the conversion spread. That is it.' },
        { q: 'Can fees change?', a: 'Yes, and this page is where you will see it, with notice.' },
      ]},
    ],
  },

  download: {
    title: 'Download — connect in about two minutes',
    desc: 'Open the app, paste your Uncle Jim connection string, done.',
    body: [
      { t: 'hero', eyebrow: 'Get started', h: 'Two minutes, no paperwork.', sub: 'The app is a wallet that connects to Uncle Jim\'s node. You do not need an account number, a branch, or a signature.', cta: ['/download/#steps', 'How it works'], art: 'character' },
      { t: 'steps', h: 'Connecting', items: [
        { h: 'Open the app', p: 'app.unclejim.money in any browser, or the mobile build once it is signed.' },
        { h: 'Add a source', p: 'Paste the invite code Uncle Jim gives you. One long code — no account number, no branch, no signature.' },
        { h: 'Set a passphrase', p: 'Locks the app on your device. Write it down somewhere that is not your phone.' },
        { h: 'Spend', p: 'You will have a balance the moment the invite is funded.' },
      ]},
      { t: 'note', h: 'Before you load it up', p: 'Uncle Jim holds the node. That means this is a hosted wallet, not a piece of software on your device that only you can open. It is fast and it is convenient and it is a different kind of ownership. Read the terms.' },
    ],
  },

  support: {
    title: 'Support — a human answers',
    desc: 'Common problems, and how to reach Uncle Jim.',
    body: [
      { t: 'hero', eyebrow: 'Support', h: 'Ask a human.', sub: 'No ticket queue, no chatbot that apologises and then does nothing.', cta: ['/safety/', 'Read safety first'], art: 'character' },
      { t: 'faq', h: 'Usual suspects', items: [
        { q: 'My payment is stuck.', a: 'Most stuck payments clear themselves within a few minutes as the node finds a route. If it has been longer than an hour, contact Uncle Jim with the payment reference.' },
        { q: 'I cannot remember my passphrase.', a: 'There is no reset. That is the trade for a wallet that does not keep your secrets in a database. Write it down.' },
        { q: 'I sent it to the wrong person.', a: 'Lightning payments are final. Nobody can claw it back, including Uncle Jim. Check the name before you tap.' },
        { q: 'Can I get a receipt for tax?', a: 'Yes, export your history from the app.' },
      ]},
      { t: 'cta', h: 'Still stuck?', sub: 'Email support@unclejim.money. Placeholder until the mailbox exists.' },
    ],
  },

  safety: {
    title: 'Safety — how to not lose money',
    desc: 'Scams, irreversible payments, and the three rules that matter.',
    body: [
      { t: 'hero', eyebrow: 'Safety', h: 'Fast money is final money.', sub: 'The thing that makes Lightning good — nobody can reverse it — is the same thing that makes a mistake expensive.', cta: ['/support/', 'Get help'], art: 'character' },
      { t: 'cards', h: 'Three rules', items: [
        { h: 'Nobody urgent is right', p: 'Anyone pressuring you to pay now, to fix a problem, to unlock an account, is running a scam. Real institutions do not operate this way.' },
        { h: 'Check the name, not the number', p: 'Before a payment leaves, the app shows who it is going to. Read it.' },
        { h: 'Write the passphrase down on paper', p: 'Not in your notes app. Not in a screenshot. Paper.' },
      ]},
      { t: 'note', h: 'What Uncle Jim does not do', p: 'Uncle Jim will never ask for your passphrase, your seed words, or a payment to "verify" anything. If a message says otherwise, it is not him, whatever it looks like.' },
    ],
  },

  terms: {
    title: 'Terms — what Uncle Jim actually is',
    desc: 'Plain-language terms, including what this service is not.',
    body: [
      { t: 'hero', eyebrow: 'Terms', h: 'In plain English.', sub: 'Short enough to read, honest enough to mean.', art: 'character' },
      { t: 'cards', h: 'The important parts', items: [
        { h: 'This is not a bank', p: 'Uncle Jim Money is software and a node run by a private operator. It is not an authorised deposit-taking institution, deposits are not protected by any government guarantee, and the word "bank" is not used here because it cannot be.' },
        { h: 'Who holds the keys', p: 'Balances in a hosted wallet sit on Uncle Jim\'s Lightning node. You are trusting an operator, not verifying with your own hardware. That is a real trade-off and it is disclosed, not buried.' },
        { h: 'Payments are final', p: 'There is no chargeback. Once routed, routed.' },
        { h: 'Source code', p: 'This service is built on software released under the GNU Affero General Public License v3. The complete source of the modified version you are using is available to you, including all our changes.' },
        { h: 'Privacy', p: 'What is stored and what is not is spelled out separately at /privacy/. Where the two pages disagree, the privacy page is the more specific statement.' },
      ]},
      { t: 'cta', h: 'Read the privacy page too.', sub: 'It is short and it names the one trade you are making.', cta: ['/privacy/', 'Privacy'] },
      { t: 'note', h: 'Not legal advice', p: 'This page is a plain-language summary written by a developer, not a lawyer. Have it reviewed before you charge anyone anything.' },
    ],
  },

  privacy: {
    title: 'Privacy — what Uncle Jim knows about you',
    desc: 'Exactly what is stored, where it goes, and what is never collected.',
    body: [
      { t: 'hero', eyebrow: 'Privacy', h: 'What we know, written out.', sub: 'A wallet operator knows more than you think. Here is the actual list, and the parts we deliberately do not have.', cta: ['/terms/', 'Read the terms'], art: 'character' },
      { t: 'cards', h: 'What is stored', items: [
        { h: 'On the node', p: 'Your wallet identifier, your balance, and the record of payments in and out. This is what makes the ledger work and it cannot be avoided in a hosted wallet.' },
        { h: 'On your device', p: 'Your Nostr keypair is stored in the app on your device. Uncle Jim can lock the app and revoke a device, but the key itself lives where you keep it.' },
        { h: 'Payment memos', p: 'If you write a note on a payment, it is stored. Nobody is reading them for fun, but they are not deleted on a timer either.' },
        { h: 'Push tokens', p: 'If you enable notifications, your device push token is stored so a notification can reach you. Disable notifications and this goes away.' },
      ]},
      { t: 'cards', h: 'What is not collected', items: [
        { h: 'No purchase profiling', p: 'Spending history is not sold, shared, or used to build an advertising profile. There is no advertising.' },
        { h: 'No third-party analytics', p: 'No tracking pixels, no session recording, no marketing SDKs phoning home from the app.' },
        { h: 'No identity documents', p: 'Uncle Jim does not collect ID. If that ever changes, it will be because a legal obligation forced it, and this page will say so plainly.' },
      ]},
      { t: 'table', h: 'Data leaving your device', columns: ['Goes to', 'What', 'Why'], rows: [
        ['Uncle Jim\'s Lightning node', 'Payments, balances, invoices', 'That is the service'],
        ['Nostr relays', 'Encrypted payment messages', 'How the app reaches the node without opening ports'],
        ['Price feed', 'A request for the BTC price', 'To show you a fiat figure. No identifier is sent with it'],
        ['Firebase (only if notifications are on)', 'Push token + notification payload', 'Delivering a notification'],
      ], note: 'PLACEHOLDER until you confirm which of these you actually run. If you disable push notifications, delete that row. Do not publish a privacy statement that does not match the code.' },
      { t: 'faq', h: 'Reasonable questions', items: [
        { q: 'Can I delete my data?', p: '', a: 'Ask Uncle Jim. A payment ledger cannot be rewritten — the record that a payment happened has to stay — but everything not required for the ledger can go: memos, contact entries, push tokens, and your device records.' },
        { q: 'Do you hand anything to authorities?', a: 'Only with a valid order, and you would be told unless legally prevented. There is no standing data-sharing arrangement with anyone.' },
        { q: 'Where is it all stored?', a: 'On Uncle Jim\'s own machine, in your own country, not on a rented platform. That is a deliberate privacy choice as much as a cost one.' },
        { q: 'Who can see my balance?', a: 'The node operator — that is unavoidable in a hosted wallet and it is the main trade you are making. If that bothers you, it should: it is the honest reason some people would rather run their own node.' },
      ]},
      { t: 'note', h: 'The one-sentence version', p: 'Uncle Jim sees your money movements because holding the money is the service. He does not see or sell anything else, and there is no advertising business here to feed.' },
      { t: 'cta', h: 'Still unsure?', sub: 'Email privacy@unclejim.money — placeholder until the mailbox exists.', cta: ['/safety/', 'Read safety'] },
    ],
  },

  refer: {
    title: 'Send a nephew',
    desc: 'Bring someone along and both of you get a bit.',
    body: [
      { t: 'hero', eyebrow: 'Referrals', h: 'Send a nephew.', sub: 'Give someone a funded wallet. You both keep a slice.', cta: ['/download/', 'Get the app'], art: 'share' },
      { t: 'trio', items: [
        { h: 'Invite', p: 'Share your link. They get a wallet with a small balance to try it with.' },
        { h: 'They spend', p: 'Once they make their first real payment, the bonus unlocks.' },
        { h: 'You both keep it', p: 'No points, no tiers, no expiry.' },
      ]},
      { t: 'note', h: 'PLACEHOLDER', p: 'No incentive amounts are set. Do not publish a referral reward until the unit economics of the fee schedule are known.' },
    ],
  },

  notfound: {
    title: 'Uncle Jim Money',
    desc: 'Nothing here.',
    body: [
      { t: 'hero', eyebrow: '404', h: 'That page does not exist.', sub: 'Which, in bitcoin terms, is at least honest about it.', cta: ['/', 'Back to the start'], art: 'character' },
    ],
  },
};
