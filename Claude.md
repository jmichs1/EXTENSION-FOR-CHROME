# Break Odds Engine

Chrome extension for Whatnot live stream auctions that calculates real-time odds and expected value (EV) in random team/player break auctions (sports card collecting).

## Tech Stack

- Pure JavaScript (ES6+), CSS, HTML — no frameworks or dependencies
- Chrome Extension Manifest V3
- Shadow DOM for style isolation from the host page
- No build process — load unpacked directly in Chrome

## Project Structure

```
├── manifest.json       # Extension config (v3), targets whatnot.com
├── icons/              # Extension icons (16/48/128px)
└── js/
    ├── background.js   # Service worker — handles icon click, injects content script
    └── content.js      # Main app (~630 lines, all-in-one)
```

## Architecture (content.js)

The entire app lives in `content.js`, organized into sections:

- **DATA** — Static datasets: 328 NBA players with weights, 29 NBA teams, 32 NFL teams, 2 products (Sapphire/Midnight)
- **STATE** (`S` object) — Centralized global state (UI mode, break data, product selection, revenue tracking)
- **SCRAPER** — TreeWalker-based page scanner: detects break names, spots, sold items, auction state, bid prices via fuzzy matching
- **MutationObserver** — Monitors DOM changes, triggers scraper every ~1s
- **ODDS ENGINE** — Calculates probability, fixed dollar value, and EV per spot
- **UI** — Shadow DOM panel: draggable/resizable, collapsible FAB, product selectors, revenue tracker, sortable player list
- **INTERACTION** — Unified drag/resize handler (panel dragging, 8-direction resize, FAB bubble drag)
- **AUTO-REFRESH** — Runs scraper every 2s

## Key Patterns

- **Shadow DOM isolation** prevents CSS conflicts with Whatnot's page
- **Single state object** (`S`) for all app state; geometry in `G` object
- **Duplicate prevention**: `window.__boV3` flag prevents double-injection
- **Text normalization**: lowercase, strip special chars, collapse whitespace for fuzzy name matching
- **Revenue state machine**: `[Bidding] → [Sold] → capture price → [Awaiting next] → reset`

## Running / Testing

1. `chrome://extensions/` → Enable Developer mode → Load unpacked → select this folder
2. Navigate to any Whatnot stream → click extension icon to toggle overlay
3. No automated tests — manual testing on live Whatnot streams

## Permissions

- `activeTab`, `storage`, `scripting`
- Host: `https://www.whatnot.com/*`
