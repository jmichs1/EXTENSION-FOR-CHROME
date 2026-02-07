// Break Odds Engine v4 — Injected Overlay
// All-in-one: data + scraper + UI + auto-refresh + revenue tracker

if (window.__boV3 && window.__boV3id === chrome.runtime?.id) {
  // Already loaded
} else {
window.__boV3 = true;
window.__boV3id = chrome.runtime?.id;

(() => {
"use strict";

// ================================================================
// DATA
// ================================================================
const PLAYER_LIST = [
  {n:"Cooper Flagg",w:10},{n:"Kon Knueppel",w:5},{n:"Victor Wembanyama",w:3.5},
  {n:"Aaron Gordon",w:.25},{n:"Aaron Nesmith",w:.25},{n:"Aaron Wiggins",w:.25},
  {n:"Ace Bailey",w:.25},{n:"Adem Bona",w:.25},{n:"Adou Thiero",w:.25},
  {n:"Ajay Mitchell",w:.25},{n:"Al Horford",w:.25},{n:"Alex Caruso",w:.25},
  {n:"Alex Sarr",w:.25},{n:"Alex Toohey",w:.25},{n:"Alijah Martin",w:.25},
  {n:"Allen Iverson",w:.25},{n:"Alonzo Mourning",w:.25},{n:"Alperen Sengun",w:.25},
  {n:"Amari Williams",w:.25},{n:"Amen Thompson",w:.25},{n:"Andrew Nembhard",w:.25},
  {n:"Andrew Wiggins",w:.25},{n:"Anfernee Simons",w:.25},{n:"Anthony Black",w:.25},
  {n:"Anthony Davis",w:.25},{n:"Anthony Edwards",w:.25},{n:"Antonio Reeves",w:.25},
  {n:"Asa Newell",w:.25},{n:"Ausar Thompson",w:.25},{n:"Austin Reaves",w:.25},
  {n:"Ayo Dosunmu",w:.25},{n:"Bam Adebayo",w:.25},{n:"Ben Saraf",w:.25},
  {n:"Ben Sheppard",w:.25},{n:"Ben Wallace",w:.25},{n:"Bennedict Mathurin",w:.25},
  {n:"Bilal Coulibaly",w:.25},{n:"Bobby Portis",w:.25},{n:"Bogdan Bogdanovic",w:.25},
  {n:"Bol Bol",w:.25},{n:"Bones Hyland",w:.25},{n:"Bradley Beal",w:.25},
  {n:"Brandon Clarke",w:.25},{n:"Brandon Miller",w:.25},{n:"Bronny James Jr.",w:.25},
  {n:"Brook Lopez",w:.25},{n:"Brooks Barnhizer",w:.25},{n:"Buddy Hield",w:.25},
  {n:"Cade Cunningham",w:.25},{n:"Caleb Martin",w:.25},{n:"Cam Thomas",w:.25},
  {n:"Cam Whitmore",w:.25},{n:"Cameron Johnson",w:.25},{n:"Carmelo Anthony",w:.25},
  {n:"Carter Bryant",w:.25},{n:"Cason Wallace",w:.25},{n:"Cedric Coward",w:.25},
  {n:"Chaz Lanier",w:.25},{n:"Chet Holmgren",w:.25},{n:"Chris Duarte",w:.25},
  {n:"Chris Paul",w:.25},{n:"Christian Braun",w:.25},{n:"CJ McCollum",w:.25},
  {n:"Clint Capela",w:.25},{n:"Coby White",w:.25},{n:"Cole Anthony",w:.25},
  {n:"Collin Murray-Boyles",w:.25},{n:"Collin Sexton",w:.25},{n:"Dalton Knecht",w:.25},
  {n:"Damian Lillard",w:.25},{n:"D'Angelo Russell",w:.25},{n:"Daniel Gafford",w:.25},
  {n:"Danny Wolf",w:.25},{n:"Dario Saric",w:.25},{n:"Dariq Whitehead",w:.25},
  {n:"Darius Garland",w:.25},{n:"DaRon Holmes II",w:.25},{n:"David Robinson",w:.25},
  {n:"Day'Ron Sharpe",w:.25},{n:"De'Aaron Fox",w:.25},{n:"Deandre Ayton",w:.25},
  {n:"De'Andre Hunter",w:.25},{n:"Dejounte Murray",w:.25},{n:"DeMar DeRozan",w:.25},
  {n:"Dennis Rodman",w:.25},{n:"Dereck Lively II",w:.25},{n:"Derik Queen",w:.25},
  {n:"Derrick White",w:.25},{n:"Desmond Bane",w:.25},{n:"Devin Booker",w:.25},
  {n:"Devin Carter",w:.25},{n:"Devin Vassell",w:.25},{n:"Dillon Brooks",w:.25},
  {n:"Dillon Jones",w:.25},{n:"Dirk Nowitzki",w:.25},{n:"Domantas Sabonis",w:.25},
  {n:"Donovan Mitchell",w:.25},{n:"Donte DiVincenzo",w:.25},{n:"Dorian Finney-Smith",w:.25},
  {n:"Drake Powell",w:.25},{n:"Draymond Green",w:.25},{n:"Dwight Powell",w:.25},
  {n:"Dwyane Wade",w:.25},{n:"Dylan Harper",w:.25},{n:"Dyson Daniels",w:.25},
  {n:"Egor Demin",w:.25},{n:"Eric Gordon",w:.25},{n:"Evan Mobley",w:.25},
  {n:"Franz Wagner",w:.25},{n:"Fred VanVleet",w:.25},{n:"Gabe Vincent",w:.25},
  {n:"Gary Trent Jr.",w:.25},{n:"George Gervin",w:.25},{n:"GG Jackson II",w:.25},
  {n:"Giannis Antetokounmpo",w:.25},{n:"Gradey Dick",w:.25},{n:"Grant Hill",w:.25},
  {n:"Grant Williams",w:.25},{n:"Grayson Allen",w:.25},{n:"Harrison Barnes",w:.25},
  {n:"Harrison Ingram",w:.25},{n:"Herbert Jones",w:.25},{n:"Hugo Gonzalez",w:.25},
  {n:"Immanuel Quickley",w:.25},{n:"Isaiah Hartenstein",w:.25},{n:"Isaiah Joe",w:.25},
  {n:"Ivica Zubac",w:.25},{n:"Ja Morant",w:.25},{n:"Jabari Smith Jr.",w:.25},
  {n:"Jaden Hardy",w:.25},{n:"Jaden Ivey",w:.25},{n:"Jaden McDaniels",w:.25},
  {n:"Jae'Sean Tate",w:.25},{n:"Jaime Jaquez Jr.",w:.25},{n:"Jake LaRavia",w:.25},
  {n:"Jalen Brunson",w:.25},{n:"Jalen Duren",w:.25},{n:"Jalen Green",w:.25},
  {n:"Jalen Johnson",w:.25},{n:"Jalen Suggs",w:.25},{n:"Jalen Williams",w:.25},
  {n:"Jamal Murray",w:.25},{n:"James Harden",w:.25},{n:"Jamir Watkins",w:.25},
  {n:"Jarace Walker",w:.25},{n:"Jaren Jackson Jr.",w:.25},{n:"Jarred Vanderbilt",w:.25},
  {n:"Jarrett Allen",w:.25},{n:"Jase Richardson",w:.25},{n:"Jason Williams",w:.25},
  {n:"Javon Small",w:.25},{n:"Jaxson Hayes",w:.25},{n:"Jaylen Brown",w:.25},
  {n:"Jaylen Wells",w:.25},{n:"Jaylin Williams",w:.25},{n:"Jaylon Tyson",w:.25},
  {n:"Jayson Tatum",w:.25},{n:"Jeremiah Fears",w:.25},{n:"Jeremy Sochan",w:.25},
  {n:"Jerry Stackhouse",w:.25},{n:"Jimmy Butler III",w:.25},{n:"Joan Beringer",w:.25},
  {n:"Joe Ingles",w:.25},{n:"Joel Embiid",w:.25},{n:"John Stockton",w:.25},
  {n:"Johni Broome",w:.25},{n:"Jonas Valanciunas",w:.25},{n:"Jonathan Isaac",w:.25},
  {n:"Jonathan Kuminga",w:.25},{n:"Jordan Poole",w:.25},{n:"Jose Alvarado",w:.25},
  {n:"Josh Giddey",w:.25},{n:"Josh Green",w:.25},{n:"Josh Hart",w:.25},
  {n:"Jrue Holiday",w:.25},{n:"Julius Randle",w:.25},{n:"K.J. Simpson Jr.",w:.25},
  {n:"Kam Jones",w:.25},{n:"Karl-Anthony Towns",w:.25},{n:"Kasparas Jakucionis",w:.25},
  {n:"Kawhi Leonard",w:.25},{n:"Keegan Murray",w:.25},{n:"Keldon Johnson",w:.25},
  {n:"Kel'el Ware",w:.25},{n:"Kelly Oubre Jr.",w:.25},{n:"Kentavious Caldwell-Pope",w:.25},
  {n:"Kevin Durant",w:.25},{n:"Kevin Garnett",w:.25},{n:"Kevin Huerter",w:.25},
  {n:"Kevin Love",w:.25},{n:"Keyonte George",w:.25},{n:"Khaman Maluach",w:.25},
  {n:"Khris Middleton",w:.25},{n:"Klay Thompson",w:.25},{n:"Kobe Brown",w:.25},
  {n:"Kobe Sanders",w:.25},{n:"Koby Brea",w:.25},{n:"Kris Murray",w:.25},
  {n:"Kristaps Porzingis",w:.25},{n:"Kyle Filipowski",w:.25},{n:"Kyle Kuzma",w:.25},
  {n:"Kyle Lowry",w:.25},{n:"Kyrie Irving",w:.25},{n:"Kyshawn George",w:.25},
  {n:"LaMelo Ball",w:.25},{n:"Larry Bird",w:.25},{n:"Lauri Markkanen",w:.25},
  {n:"LeBron James",w:.25},{n:"Liam McNeeley",w:.25},{n:"Lonzo Ball",w:.25},
  {n:"Luguentz Dort",w:.25},{n:"Luke Kennard",w:.25},{n:"Luke Kornet",w:.25},
  {n:"Magic Johnson",w:.25},{n:"Malik Beasley",w:.25},{n:"Marcus Sasser",w:.25},
  {n:"Marcus Smart",w:.25},{n:"Mark Williams",w:.25},{n:"Mason Plumlee",w:.25},
  {n:"Matas Buzelis",w:.25},{n:"Matisse Thybulle",w:.25},{n:"Max Christie",w:.25},
  {n:"Max Strus",w:.25},{n:"Maxi Kleber",w:.25},{n:"Maxime Raynaud",w:.25},
  {n:"Micah Peavy",w:.25},{n:"Michael Porter Jr.",w:.25},{n:"Mike Conley",w:.25},
  {n:"Miles Bridges",w:.25},{n:"Myles Turner",w:.25},{n:"Naji Marshall",w:.25},
  {n:"Naz Reid",w:.25},{n:"Nic Claxton",w:.25},{n:"Nick Smith Jr.",w:.25},
  {n:"Nickeil Alexander-Walker",w:.25},{n:"Nicolas Batum",w:.25},{n:"Nikola Jokic",w:.25},
  {n:"Nikola Jovic",w:.25},{n:"Nikola Topic",w:.25},{n:"Nikola Vucevic",w:.25},
  {n:"Nique Clifford",w:.25},{n:"Noa Essengue",w:.25},{n:"Noah Clowney",w:.25},
  {n:"Noah Penda",w:.25},{n:"Nolan Traore",w:.25},{n:"Norman Powell",w:.25},
  {n:"OG Anunoby",w:.25},{n:"Onyeka Okongwu",w:.25},{n:"Oshae Brissett",w:.25},
  {n:"Oso Ighodaro",w:.25},{n:"P.J. Washington",w:.25},{n:"Pacome Dadiet",w:.25},
  {n:"Paolo Banchero",w:.25},{n:"Pascal Siakam",w:.25},{n:"Pat Connaughton",w:.25},
  {n:"Paul George",w:.25},{n:"Paul Pierce",w:.25},{n:"Payton Pritchard",w:.25},
  {n:"Pelle Larsson",w:.25},{n:"Quentin Grimes",w:.25},{n:"Quinten Post",w:.25},
  {n:"Rasheed Wallace",w:.25},{n:"Rasheer Fleming",w:.25},{n:"Ray Allen",w:.25},
  {n:"Richaun Holmes",w:.25},{n:"Rick Barry",w:.25},{n:"Rip Hamilton",w:.25},
  {n:"RJ Barrett",w:.25},{n:"Rob Dillingham",w:.25},{n:"Robert Parish",w:.25},
  {n:"Rocco Zikarsky",w:.25},{n:"Ron Holland II",w:.25},{n:"Rudy Gobert",w:.25},
  {n:"Rui Hachimura",w:.25},{n:"Russell Westbrook",w:.25},{n:"Ryan Dunn",w:.25},
  {n:"Ryan Kalkbrenner",w:.25},{n:"Sam Hauser",w:.25},{n:"Scoot Henderson",w:.25},
  {n:"Scottie Barnes",w:.25},{n:"Scotty Pippen Jr.",w:.25},{n:"Shaedon Sharpe",w:.25},
  {n:"Shai Gilgeous-Alexander",w:.25},{n:"Shaquille O'Neal",w:.25},{n:"Sidy Cissoko",w:.25},
  {n:"Sion James",w:.25},{n:"Spencer Dinwiddie",w:.25},{n:"Stephen Curry",w:.25},
  {n:"Stephon Castle",w:.25},{n:"Steven Adams",w:.25},{n:"T.J. McConnell",w:.25},
  {n:"Talen Horton-Tucker",w:.25},{n:"Taurean Prince",w:.25},{n:"Taylor Hendricks",w:.25},
  {n:"Terance Mann",w:.25},{n:"Terrence Shannon Jr.",w:.25},{n:"Terry Rozier III",w:.25},
  {n:"Thaddeus Young",w:.25},{n:"Thomas Sorber",w:.25},{n:"Tidjane Salaun",w:.25},
  {n:"Tim Hardaway Jr.",w:.25},{n:"Tobias Harris",w:.25},{n:"Tracy McGrady",w:.25},
  {n:"Trae Young",w:.25},{n:"Tre Johnson III",w:.25},{n:"Trey Murphy III",w:.25},
  {n:"Tristan da Silva",w:.25},{n:"Ty Jerome",w:.25},{n:"Tyler Herro",w:.25},
  {n:"Tyler Kolek",w:.25},{n:"Tyler Smith",w:.25},{n:"Tyrese Haliburton",w:.25},
  {n:"Tyrese Maxey",w:.25},{n:"Tyrese Proctor",w:.25},{n:"Tyus Jones",w:.25},
  {n:"Vince Carter",w:.25},{n:"VJ Edgecombe",w:.25},{n:"Walker Kessler",w:.25},
  {n:"Walter Clayton Jr.",w:.25},{n:"Wendell Carter Jr.",w:.25},{n:"Will Richard",w:.25},
  {n:"Will Riley",w:.25},{n:"Yang Hansen",w:.25},{n:"Yanic Konan-Niederhaeuser",w:.25},
  {n:"Yves Missi",w:.25},{n:"Zaccharie Risacher",w:.25},{n:"Zach Edey",w:.25},
  {n:"Zach LaVine",w:.25},
].map(p => ({ name: p.n, weight: p.w }));

const NBA_TEAMS = [
  {name:"Los Angeles Lakers",tier:1,weight:6.5},{name:"Boston Celtics",tier:1,weight:6},
  {name:"Golden State Warriors",tier:1,weight:5.5},{name:"Milwaukee Bucks",tier:1,weight:5},
  {name:"Denver Nuggets",tier:1,weight:5},{name:"Dallas Mavericks",tier:1,weight:5},
  {name:"Phoenix Suns",tier:2,weight:4.2},{name:"Philadelphia 76ers",tier:2,weight:4},
  {name:"Miami Heat",tier:2,weight:4},{name:"New York Knicks",tier:2,weight:4.5},
  {name:"Minnesota Timberwolves",tier:2,weight:3.8},{name:"Oklahoma City Thunder",tier:2,weight:4.2},
  {name:"Cleveland Cavaliers",tier:2,weight:3.8},{name:"Sacramento Kings",tier:2,weight:3.5},
  {name:"Los Angeles Clippers",tier:3,weight:3},{name:"Indiana Pacers",tier:3,weight:2.8},
  {name:"Atlanta Hawks",tier:3,weight:2.8},{name:"Chicago Bulls",tier:3,weight:3},
  {name:"New Orleans Pelicans",tier:3,weight:2.5},{name:"Toronto Raptors",tier:3,weight:2.5},
  {name:"Memphis Grizzlies",tier:3,weight:3.2},{name:"Houston Rockets",tier:3,weight:2.8},
  {name:"Brooklyn Nets",tier:4,weight:2},{name:"Orlando Magic",tier:4,weight:2.2},
  {name:"Charlotte Hornets",tier:4,weight:1.5},{name:"Portland Trail Blazers",tier:4,weight:1.8},
  {name:"San Antonio Spurs",tier:4,weight:2.5},{name:"Utah Jazz",tier:4,weight:1.5},
  {name:"Detroit Pistons",tier:4,weight:1.5},{name:"Washington Wizards",tier:4,weight:1.5},
];

const NFL_TEAMS = [
  {name:"Kansas City Chiefs",tier:1,weight:6},{name:"San Francisco 49ers",tier:1,weight:5.5},
  {name:"Philadelphia Eagles",tier:1,weight:5.5},{name:"Dallas Cowboys",tier:1,weight:5.5},
  {name:"Buffalo Bills",tier:1,weight:5},{name:"Baltimore Ravens",tier:1,weight:5},
  {name:"Detroit Lions",tier:2,weight:4.5},{name:"Miami Dolphins",tier:2,weight:4},
  {name:"Cincinnati Bengals",tier:2,weight:4},{name:"Houston Texans",tier:2,weight:3.8},
  {name:"Green Bay Packers",tier:2,weight:4},{name:"Pittsburgh Steelers",tier:2,weight:3.5},
  {name:"Los Angeles Chargers",tier:2,weight:3.5},{name:"Los Angeles Rams",tier:2,weight:3.2},
  {name:"Minnesota Vikings",tier:2,weight:3.5},{name:"Jacksonville Jaguars",tier:3,weight:2.5},
  {name:"Tampa Bay Buccaneers",tier:3,weight:2.8},{name:"Seattle Seahawks",tier:3,weight:2.5},
  {name:"Cleveland Browns",tier:3,weight:2.2},{name:"Atlanta Falcons",tier:3,weight:2.5},
  {name:"New Orleans Saints",tier:3,weight:2.5},{name:"Indianapolis Colts",tier:3,weight:2.2},
  {name:"Denver Broncos",tier:3,weight:2.2},{name:"Chicago Bears",tier:3,weight:2.8},
  {name:"Las Vegas Raiders",tier:3,weight:2.2},{name:"Washington Commanders",tier:3,weight:2.5},
  {name:"New York Giants",tier:4,weight:1.8},{name:"New York Jets",tier:4,weight:1.8},
  {name:"Tennessee Titans",tier:4,weight:1.5},{name:"New England Patriots",tier:4,weight:2},
  {name:"Carolina Panthers",tier:4,weight:1.5},{name:"Arizona Cardinals",tier:4,weight:1.5},
];

const PRODUCTS = [
  { id:"sapphire", name:"2025 Topps Chrome Sapphire Basketball - Hobby", box:6000, case:60000 },
  { id:"midnight", name:"2025 Topps Midnight Basketball - Hobby", box:1200, case:9600 },
];

// ================================================================
// STATE  —  geometry is ONLY managed here, never in CSS
// ================================================================
const G = { x: window.innerWidth - 345, y: 0, w: 340, h: window.innerHeight, bx: window.innerWidth - 60, by: 10 };

const S = {
  mode: "player", items: [], view: "open",
  filter: "all", search: "",
  breakName: null, spotsLeft: null, totalSpots: 0, soldSet: new Set(),
  productId: "sapphire", unit: "box", qty: 1,
  revenue: 0, bids: [],   // revenue tracker
  lastPrice: null,         // price captured from "Sold" row
  _wasSold: false,         // was "Sold" visible last scrape?
  _wasAwaiting: false,     // was "Awaiting" visible last scrape?
  _saleCommitted: false,   // already added revenue for this auction cycle?
};

function loadDataset() {
  const src = S.mode === "player" ? PLAYER_LIST : S.mode === "nba" ? NBA_TEAMS : NFL_TEAMS;
  S.items = src.map(s => ({ name: s.name, weight: s.weight, tier: s.tier || null, available: !S.soldSet.has(s.name) }));
}

// ================================================================
// SCRAPER
// ================================================================
function norm(s) { return s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim(); }
function buildNameMap() {
  const m = new Map();
  for (const it of S.items) { const n = norm(it.name); m.set(n, it.name); const p = n.split(" "); if (p.length >= 2 && p[p.length-1].length >= 4) m.set(p[p.length-1], it.name); }
  return m;
}
function matchName(raw, nmap) {
  const n = norm(raw); if (n.length < 3) return null;
  if (nmap.has(n)) return nmap.get(n);
  for (const [k, v] of nmap) { if (k.length >= 5 && (n.includes(k) || k.includes(n))) return v; }
  return null;
}
function isNameCandidate(t) {
  if (t.length < 3 || t.length > 60) return false;
  if (/^(Sold|Available|Coming|How|Random|See|Show|Break|Spot|Ship|\$|\d|Upcoming|Giveaway|Filter|Sort|Auction|Qty|Bid|Custom)/i.test(t)) return false;
  if (/spots?\s*\(/i.test(t) || /^\d+\s+(of|left)/i.test(t) || /Filling|left|Taxes|Search/i.test(t)) return false;
  const lt = (t.match(/[a-zA-Z]/g)||[]).length; return lt >= 3 && lt >= t.length * 0.4;
}

function scrape() {
  const r = { breakName:null, spotsLeft:null, totalSpots:0, availNames:[], soldNames:[], auctionPrice:null };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const texts = []; let nd;
  while ((nd = walker.nextNode())) { const t = nd.textContent.trim(); if (t.length >= 2 && t.length < 500) texts.push({ t, el: nd.parentElement }); }

  for (const {t} of texts) { if (/BREAK|CASE|RANDOM|SAPPHIRE/i.test(t) && t.length > 15 && t.length < 200) { r.breakName = t.substring(0,80); break; } }
  for (const {t} of texts) { const m = t.match(/(\d+)\s+of\s+(\d+)\s+left/i); if (m) { r.spotsLeft = +m[1]; r.totalSpots = +m[2]; break; } }
  if (r.spotsLeft === null) { for (const {t} of texts) { const m = t.match(/(\d+)\s+left/i); if (m) { r.spotsLeft = +m[1]; break; } } }

  // --- Detect auction state from Whatnot stream area ---
  // Lifecycle: bidding ($25 + timer) → sold ($26 + "Sold") → "Awaiting next item"

  // 1. Find "Sold" text in the auction bar (bottom area)
  //    Match: "Sold", "sold", or text containing "Sold" that's short (< 10 chars)
  //    Exclude: "Sold Spots (33)" header (has parentheses)
  let soldRect = null;
  for (const {t, el} of texts) {
    if (/^\s*sold\s*$/i.test(t) || (/sold/i.test(t) && t.length < 10 && !/spots|\(/i.test(t))) {
      const rc = el.getBoundingClientRect();
      if (rc.width > 0 && rc.height > 0 && rc.top > window.innerHeight * 0.3) {
        soldRect = rc; break;
      }
    }
  }

  // 2. If "Sold" visible, grab the price on the same row (final bid amount)
  if (soldRect) {
    r.hasSold = true;
    let bestPrice = null, bestDist = Infinity;
    for (const {t, el} of texts) {
      const pm = t.match(/^\$\s*([\d,]+(?:\.\d{1,2})?)$/);
      if (!pm) continue;
      const price = parseFloat(pm[1].replace(/,/g, ""));
      if (price <= 1) continue;
      const rc = el.getBoundingClientRect();
      if (rc.width === 0) continue;
      const dy = Math.abs(rc.top - soldRect.top);
      if (dy < 30 && dy < bestDist) {
        bestDist = dy;
        bestPrice = price;
      }
    }
    if (bestPrice !== null) r.auctionPrice = bestPrice;
  }

  // 3. Check for "Awaiting next item" (backup trigger)
  for (const {t} of texts) {
    if (/awaiting/i.test(t)) { r.awaiting = true; break; }
  }

  let availHdr = null, availTop = -Infinity, soldHdr = null, soldTop = -Infinity;
  for (const {t,el} of texts) { const rc = el.getBoundingClientRect(); if (rc.width===0) continue; if (/^Available\s+Spots?\s*\(\d+\)/i.test(t)){availHdr=el;availTop=rc.top;} if (/^Sold\s+Spots?\s*\(\d+\)/i.test(t)){soldHdr=el;soldTop=rc.top;} }
  if (availHdr || soldHdr) {
    for (const {t,el} of texts) { if (!isNameCandidate(t)) continue; const rc=el.getBoundingClientRect(); if (rc.width===0||rc.height===0) continue; const y=rc.top;
      if (availHdr && soldHdr) { if (availTop < soldTop) { if (y>availTop&&y<soldTop) r.availNames.push(t); else if (y>soldTop) r.soldNames.push(t); } else { if (y>soldTop&&y<availTop) r.soldNames.push(t); else if (y>availTop) r.availNames.push(t); } }
      else if (availHdr) { if (y>availTop) r.availNames.push(t); } else if (soldHdr) { if (y>soldTop) r.soldNames.push(t); } }
  }
  for (const {t,el} of texts) { if (!isNameCandidate(t)) continue; const st=window.getComputedStyle(el); if (st.textDecoration.includes("line-through")||parseFloat(st.opacity)<0.6) r.soldNames.push(t); }

  // CSS class sold detection
  const soldEls = document.querySelectorAll('[class*="sold" i],[data-sold],[aria-label*="sold" i]');
  for (const el of soldEls) { const t=el.textContent.trim(); if (t.length>2&&t.length<80) { const c=t.replace(/sold/gi,"").trim(); if (c.length>=3&&isNameCandidate(c)) r.soldNames.push(c); } }

  return r;
}

function applyScrape(d) {
  if (d.breakName) S.breakName = d.breakName;
  if (d.spotsLeft !== null) S.spotsLeft = d.spotsLeft;
  if (d.totalSpots > 0) S.totalSpots = d.totalSpots;

  const nmap = buildNameMap();

  // === REVENUE STATE MACHINE ===
  // Capture price whenever "Sold" is visible with a valid amount
  if (d.hasSold && d.auctionPrice && d.auctionPrice > 1) {
    S.lastPrice = d.auctionPrice;
  }

  // TRIGGER: "Sold" just appeared (was NOT sold last scrape → now IS sold)
  // OR: "Awaiting" just appeared as backup
  const soldJustAppeared = d.hasSold && !S._wasSold;
  const awaitJustAppeared = d.awaiting && !S._wasAwaiting;

  if ((soldJustAppeared || awaitJustAppeared) && S.lastPrice && !S._saleCommitted) {
    S.revenue += S.lastPrice;
    S.bids.push({ a: S.lastPrice, t: Date.now(), auto: true });
    console.log("[BO] ✅ Revenue: +$" + S.lastPrice + (soldJustAppeared ? " (sold trigger)" : " (await trigger)"));
    S._saleCommitted = true; // don't double-add for same sale
  }

  // Reset when auction cycle resets (no longer sold or awaiting)
  if (!d.hasSold && !d.awaiting) {
    S._saleCommitted = false;
    S.lastPrice = null;
  }

  // Track state for next scrape
  S._wasSold = !!d.hasSold;
  S._wasAwaiting = !!d.awaiting;

  for (const raw of d.soldNames) { const m = matchName(raw, nmap); if (m) S.soldSet.add(m); }
  if (d.availNames.length >= 5) { for (const raw of d.availNames) { const m = matchName(raw, nmap); if (m) S.soldSet.delete(m); } }
  for (const it of S.items) it.available = !S.soldSet.has(it.name);
}

// ================================================================
// MUTATION OBSERVER
// ================================================================
let _obs = null;
function startObserver() {
  if (_obs) _obs.disconnect();
  _obs = new MutationObserver(muts => {
    try { if (!chrome.runtime?.id) { _obs.disconnect(); return; } } catch { if (_obs) _obs.disconnect(); return; }
    for (const m of muts) { if (m.target.id === "break-odds-root" || m.target.closest?.("#break-odds-root")) return; }
    clearTimeout(_obs._t); _obs._t = setTimeout(() => { if (S.view !== "hidden") doScrape(); }, 1000);
  });
  _obs.observe(document.body, { childList: true, subtree: true });
}

// ================================================================
// ODDS ENGINE
// ================================================================
function calc() {
  const pAvail = S.spotsLeft, pTotal = S.totalSpots || S.items.length;
  const pSold = pAvail !== null ? pTotal - pAvail : S.soldSet.size;
  const product = PRODUCTS.find(p => p.id === S.productId) || PRODUCTS[0];
  const unitPrice = S.unit === "case" ? product.case : product.box;
  const totalValue = unitPrice * S.qty;
  const totalPlayers = S.items.length; // always 328 for player mode
  const remaining = pAvail !== null ? pAvail : S.items.filter(i => i.available).length;

  // VALUE = fixed: totalCost / totalPlayers (never changes)
  // ODDS = 1 / remaining (changes as spots sell)
  // EV = odds × value
  const fixedValue = totalValue / totalPlayers;
  for (const i of S.items) {
    if (i.available && remaining > 0) {
      i.livePct = (1 / remaining) * 100;
      i.dollarVal = fixedValue;
      i.ev = (1 / remaining) * fixedValue;
    } else { i.livePct = 0; i.dollarVal = 0; i.ev = 0; }
  }
  const evPerSpot = remaining > 0 ? ((1 / remaining) * fixedValue) : 0;
  const boxCost = product.box * S.qty, caseCost = product.case * S.qty;
  return {
    avail: pAvail !== null ? pAvail : remaining, sold: pSold, total: pTotal,
    totalValue, remaining, evPerSpot: evPerSpot.toFixed(2),
    revenue: S.revenue, boxCost, caseCost,
  };
}

// ================================================================
// SHADOW DOM ROOT
// ================================================================
let root = null, shadow = null;
function createRoot() {
  root = document.createElement("div");
  root.id = "break-odds-root";
  root.style.cssText = "all:initial;position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none;overflow:visible;";
  document.body.appendChild(root);
  shadow = root.attachShadow({ mode: "open" });
  const st = document.createElement("style"); st.textContent = CSS; shadow.appendChild(st);
  const el = document.createElement("div"); el.id = "bo"; shadow.appendChild(el);
}

// ================================================================
// INTERACTION: DRAG + RESIZE  (one unified system, writes to G{})
// ================================================================
const IX = { type: null, el: null, sx: 0, sy: 0, og: null, edge: "", moved: false };

function geoToStyle(el) { el.style.cssText = `position:fixed;left:${G.x}px;top:${G.y}px;width:${G.w}px;height:${G.h}px;right:auto;bottom:auto;pointer-events:auto;`; }
function bubbleToStyle(el) { el.style.cssText = `position:fixed;left:${G.bx}px;top:${G.by}px;right:auto;pointer-events:auto;`; }

document.addEventListener("mousemove", e => {
  if (!IX.type) return;
  e.preventDefault();
  const dx = e.clientX - IX.sx, dy = e.clientY - IX.sy;
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) IX.moved = true;
  const o = IX.og;

  if (IX.type === "drag") {
    G.x = Math.max(0, Math.min(window.innerWidth - G.w, o.x + dx));
    G.y = Math.max(0, Math.min(window.innerHeight - G.h, o.y + dy));
  } else if (IX.type === "bdrag") {
    G.bx = Math.max(0, Math.min(window.innerWidth - 52, o.bx + dx));
    G.by = Math.max(0, Math.min(window.innerHeight - 52, o.by + dy));
  } else if (IX.type === "resize") {
    let x = o.x, y = o.y, w = o.w, h = o.h;
    const edge = IX.edge;
    if (edge.includes("e")) w = Math.max(280, o.w + dx);
    if (edge.includes("s")) h = Math.max(250, o.h + dy);
    if (edge.includes("w")) { const nw = Math.max(280, o.w - dx); x = o.x + (o.w - nw); w = nw; }
    if (edge.includes("n")) { const nh = Math.max(250, o.h - dy); y = o.y + (o.h - nh); h = nh; }
    if (x < 0) { w += x; x = 0; } if (y < 0) { h += y; y = 0; }
    if (x + w > window.innerWidth) w = window.innerWidth - x;
    if (y + h > window.innerHeight) h = window.innerHeight - y;
    G.x = x; G.y = y; G.w = w; G.h = h;
  }

  if (IX.el) {
    if (IX.type === "bdrag") bubbleToStyle(IX.el);
    else geoToStyle(IX.el);
  }
});

document.addEventListener("mouseup", () => { IX.type = null; });

function beginDrag(e, el) { if (e.target.closest("input,select,button")) return; IX.type="drag"; IX.el=el; IX.moved=false; IX.sx=e.clientX; IX.sy=e.clientY; IX.og={...G}; e.preventDefault(); }
function beginBDrag(e, el) { IX.type="bdrag"; IX.el=el; IX.moved=false; IX.sx=e.clientX; IX.sy=e.clientY; IX.og={...G}; e.preventDefault(); }
function beginResize(e, el, edge) { IX.type="resize"; IX.el=el; IX.edge=edge; IX.moved=false; IX.sx=e.clientX; IX.sy=e.clientY; IX.og={...G}; e.preventDefault(); e.stopPropagation(); }
function wasDrag() { return IX.moved; }

// ================================================================
// RENDER
// ================================================================
function render() {
  if (IX.type) return;  // NEVER re-render during drag/resize

  const bo = shadow.getElementById("bo");
  if (!bo) return;
  const odds = calc();

  // ---- HIDDEN ----
  if (S.view === "hidden") { bo.className = ""; bo.innerHTML = ""; bo.style.cssText = ""; return; }

  // ---- COLLAPSED ----
  if (S.view === "collapsed") {
    bo.className = "collapsed";
    bo.innerHTML = `<button id="xBtn" class="fab">🏀<span class="fab-badge">$${odds.evPerSpot}</span></button>`;
    bubbleToStyle(bo);
    bo.onmousedown = e => beginBDrag(e, bo);
    bo.querySelector("#xBtn").onclick = () => { if (!wasDrag()) { S.view = "open"; render(); } };
    return;
  }

  // ---- OPEN ----
  bo.className = "panel";
  geoToStyle(bo);

  const brkLine = S.breakName ? S.breakName.substring(0, 55) + (S.breakName.length > 55 ? "..." : "") : "Waiting for data...";
  const cntLine = S.spotsLeft !== null ? `${S.spotsLeft} of ${S.totalSpots} left` : "";

  let items = [...S.items];
  items.sort((a, b) => { if (a.available !== b.available) return a.available ? -1 : 1; return a.name.localeCompare(b.name); });
  if (S.filter === "available") items = items.filter(i => i.available);
  else if (S.filter === "sold") items = items.filter(i => !i.available);
  else if (S.filter === "high") items = items.filter(i => i.dollarVal > 50);
  if (S.search) { const q = S.search.toLowerCase(); items = items.filter(i => i.name.toLowerCase().includes(q)); }

  let rows = "";
  for (const it of items) {
    const cls = it.available ? "av" : "sd";
    const valStr = it.available ? "$" + it.dollarVal.toFixed(0) : "—";
    const valCls = it.dollarVal > 500 ? "hot" : it.dollarVal > 50 ? "warm" : "";
    rows += `<div class="r ${cls}" data-n="${it.name.replace(/"/g,"&quot;")}"><span class="d ${it.available?"on":"off"}"></span><span class="rn">${it.name}</span><span class="rw">${it.livePct.toFixed(2)}%</span><span class="rp ${valCls}">${valStr}</span><button class="tb">${it.available?"−":"+"}</button></div>`;
  }
  const fBtn = (f,l) => `<button class="fb${S.filter===f?" fa":""}" data-f="${f}">${l}</button>`;
  const prodOpts = PRODUCTS.map(p=>`<option value="${p.id}"${S.productId===p.id?" selected":""}>${p.name}</option>`).join("");
  const qtyOpts = Array.from({length:10},(_,i)=>`<option value="${i+1}"${S.qty===(i+1)?" selected":""}>${i+1}</option>`).join("");
  const product = PRODUCTS.find(p=>p.id===S.productId)||PRODUCTS[0];
  const unitPrice = S.unit==="case"?product.case:product.box;
  const cost = S.unit === "case" ? odds.caseCost : odds.boxCost;
  const ret = S.revenue - cost;
  const retStr = ret >= 0 ? "+$" + ret.toLocaleString() : "($" + Math.abs(ret).toLocaleString() + ")";
  const retCls = ret >= 0 ? "rvg" : "rvrd";

  bo.innerHTML = `
    <div class="hd" id="dragH"><div class="hl"><span class="lg">🏀 BREAK ODDS</span><span class="bn">${brkLine}</span>${cntLine?`<span class="cl">${cntLine}</span>`:""}</div><div class="hb"><button id="colBtn" class="ib" title="Collapse">◁</button></div></div>
    <div class="psel"><select id="prodSel" class="sel">${prodOpts}</select><div class="prow"><select id="unitSel" class="sel sm"><option value="box"${S.unit==="box"?" selected":""}>Box</option><option value="case"${S.unit==="case"?" selected":""}>Case</option></select><span class="px">×</span><select id="qtySel" class="sel sm">${qtyOpts}</select><span class="ptotal">= $${(unitPrice*S.qty).toLocaleString()}</span></div></div>
    <div class="rvs"><div class="rvh"><span class="rvl">💰 REVENUE (${S.bids.length} sales)</span><span class="rvt ${retCls}">$${S.revenue.toLocaleString()}</span></div><div class="rvr"><div class="rvm"><span class="rvv ${retCls}">${retStr}</span><span class="rvsb">Return on ${S.unit === "case" ? "Case" : "Box"} ($${cost.toLocaleString()})</span></div></div><div class="rvir"><input type="number" id="bidIn" class="si bidi" placeholder="$ amount" min="0" step="1"><button id="addB" class="ftb accent">+ Add</button><button id="undoB" class="ftb">Undo</button><button id="clrB" class="ftb">Clear</button></div></div>
    <div class="mb"><button class="mm${S.mode==="player"?" ma":""}" data-m="player">🃏 Player</button><button class="mm${S.mode==="nba"?" ma":""}" data-m="nba">🏀 NBA</button><button class="mm${S.mode==="nfl"?" ma":""}" data-m="nfl">🏈 NFL</button></div>
    <div class="sb"><div class="s"><span class="sv">${odds.avail}</span><span class="sn">Avail</span></div><div class="s"><span class="sv">${odds.sold}</span><span class="sn">Sold</span></div><div class="s"><span class="sv">${odds.total}</span><span class="sn">Total</span></div><div class="s ev"><span class="sv">$${odds.evPerSpot}</span><span class="sn">EV/Spot</span></div></div>
    <div class="tb2"><input type="text" id="srch" class="si" placeholder="Search..." value="${S.search||""}"><div class="fr">${fBtn("all","All")}${fBtn("available","Avail")}${fBtn("sold","Sold")}${fBtn("high","High$")}</div></div>
    <div class="lh"><span></span><span>Name</span><span>Odds</span><span>Value</span><span></span></div>
    <div id="lb" class="lb">${rows}</div>
    <div class="ft"><button id="syncB" class="ftb accent">⟳ Resync</button><button id="rsB" class="ftb">Reset All</button><button id="clB" class="ftb">Clear All</button></div>
    <div class="rz rz-n" data-e="n"></div><div class="rz rz-s" data-e="s"></div><div class="rz rz-e" data-e="e"></div><div class="rz rz-w" data-e="w"></div>
    <div class="rz rz-ne" data-e="ne"></div><div class="rz rz-nw" data-e="nw"></div><div class="rz rz-se" data-e="se"></div><div class="rz rz-sw" data-e="sw"></div>
  `;

  // ---- WIRE EVENTS ----
  bo.querySelector("#dragH").onmousedown = e => beginDrag(e, bo);
  bo.querySelectorAll(".rz").forEach(h => { h.onmousedown = e => beginResize(e, bo, h.dataset.e); });
  bo.querySelector("#colBtn").onclick = () => { if (!wasDrag()) { S.view="collapsed"; render(); } };
  bo.querySelector("#prodSel").onchange = e => { S.productId=e.target.value; render(); };
  bo.querySelector("#unitSel").onchange = e => { S.unit=e.target.value; render(); };
  bo.querySelector("#qtySel").onchange  = e => { S.qty=parseInt(e.target.value); render(); };

  // Revenue
  bo.querySelector("#addB").onclick = () => { const v=parseFloat(bo.querySelector("#bidIn").value); if (v>0){S.bids.push({a:v,t:Date.now()});S.revenue+=v;render();} };
  bo.querySelector("#bidIn").onkeydown = e => { if (e.key==="Enter") bo.querySelector("#addB").click(); };
  bo.querySelector("#undoB").onclick = () => { if (S.bids.length){const l=S.bids.pop();S.revenue=Math.max(0,S.revenue-l.a);render();} };
  bo.querySelector("#clrB").onclick = () => { S.bids=[];S.revenue=0;render(); };

  bo.querySelectorAll(".mm").forEach(b => b.onclick = () => { if(!wasDrag()){S.mode=b.dataset.m;S.soldSet.clear();loadDataset();doScrape();} });
  bo.querySelectorAll(".fb").forEach(b => b.onclick = () => { if(!wasDrag()){S.filter=b.dataset.f;render();} });
  bo.querySelector("#srch").oninput = e => { S.search=e.target.value; render(); };
  bo.querySelector("#rsB").onclick = () => { S.soldSet.clear(); S.items.forEach(i=>i.available=true); render(); };
  bo.querySelector("#clB").onclick = () => { S.items.forEach(i=>{i.available=false;S.soldSet.add(i.name);}); render(); };
  bo.querySelector("#syncB").onclick = () => { S.soldSet.clear(); S.items.forEach(i=>i.available=true); doScrape(); };
  bo.querySelectorAll(".tb").forEach(btn => { btn.onclick=()=>{ const nm=btn.closest(".r").dataset.n; const it=S.items.find(i=>i.name===nm); if(!it)return; it.available=!it.available; if(it.available)S.soldSet.delete(nm);else S.soldSet.add(nm); render(); }; });

  if (S.search) { const sb=bo.querySelector("#srch"); sb.focus(); sb.setSelectionRange(S.search.length,S.search.length); }
}

function doScrape() {
  try { const d=scrape(); console.log("[BO] spots:",S.spotsLeft,"| sold?:",!!d.hasSold,"| $:",d.auctionPrice,"| await:",!!d.awaiting,"| stored$:",S.lastPrice,"| wasSold:",S._wasSold,"| committed:",S._saleCommitted); applyScrape(d); render(); } catch(e){console.error("[BO] err:",e);}
}

// ================================================================
// AUTO-REFRESH
// ================================================================
let _at=null;
function startAuto() {
  if (_at) clearInterval(_at);
  _at = setInterval(() => { try{if(!chrome.runtime?.id){clearInterval(_at);return;}}catch{clearInterval(_at);return;} if(S.view==="hidden")return; doScrape(); }, 2000);
}

// ================================================================
// TOGGLE from extension icon
// ================================================================
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === "TOGGLE_PANEL") { S.view = S.view==="open"?"collapsed":S.view==="collapsed"?"open":"open"; render(); }
});

// ================================================================
// CSS  —  panel has NO default position/size in CSS (all inline via JS)
// ================================================================
const CSS = `
:host{all:initial}*{margin:0;padding:0;box-sizing:border-box}

.collapsed{position:fixed;cursor:grab;user-select:none;pointer-events:auto;z-index:2147483647}
.fab{width:48px;height:48px;border-radius:50%;background:#0a0e17;border:2px solid #00ff87;font-size:22px;cursor:grab;box-shadow:0 4px 24px rgba(0,0,0,.6);transition:transform .15s;position:relative;display:flex;align-items:center;justify-content:center}
.fab:hover{transform:scale(1.1)}
.fab-badge{position:absolute;bottom:-6px;right:-8px;background:#00ff87;color:#080c14;font-size:9px;font-weight:800;padding:2px 5px;border-radius:8px;font-family:monospace;white-space:nowrap}

.panel{position:fixed;background:#080c14;border:1px solid #1e2a45;border-radius:8px;display:flex;flex-direction:column;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;font-size:13px;color:#e8ecf4;box-shadow:0 8px 40px rgba(0,0,0,.6);user-select:none;overflow:hidden;z-index:2147483647}

.rz{position:absolute;z-index:20}
.rz-n{top:-4px;left:12px;right:12px;height:8px;cursor:n-resize}
.rz-s{bottom:-4px;left:12px;right:12px;height:8px;cursor:s-resize}
.rz-e{right:-4px;top:12px;bottom:12px;width:8px;cursor:e-resize}
.rz-w{left:-4px;top:12px;bottom:12px;width:8px;cursor:w-resize}
.rz-ne{top:-4px;right:-4px;width:16px;height:16px;cursor:ne-resize}
.rz-nw{top:-4px;left:-4px;width:16px;height:16px;cursor:nw-resize}
.rz-se{bottom:-4px;right:-4px;width:16px;height:16px;cursor:se-resize}
.rz-sw{bottom:-4px;left:-4px;width:16px;height:16px;cursor:sw-resize}

.hd{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 12px 8px;background:#0f1520;border-bottom:1px solid #1e2a45;cursor:grab;border-radius:8px 8px 0 0}
.hd:active{cursor:grabbing}
.hl{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
.psel{padding:8px 12px;background:#0b1018;border-bottom:1px solid #1e2a45;display:flex;flex-direction:column;gap:5px}
.sel{width:100%;padding:5px 8px;background:#161f32;border:1px solid #1e2a45;border-radius:4px;color:#e8ecf4;font-size:11px;font-family:inherit;outline:none;cursor:pointer;appearance:auto}
.sel:focus{border-color:#00ff87}.sel.sm{width:auto;min-width:60px}
.prow{display:flex;align-items:center;gap:6px}
.px{color:#4a5568;font-size:12px}
.ptotal{font-family:monospace;font-weight:700;font-size:13px;color:#00ff87;margin-left:auto}
.lg{font-weight:800;font-size:14px;letter-spacing:2px;color:#00ff87;text-shadow:0 0 16px rgba(0,255,135,.15);font-family:monospace}
.bn{font-size:11px;color:#7b8ba8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cl{font-size:11px;color:#00ff87;font-family:monospace;font-weight:600}
.hb{display:flex;gap:4px}
.ib{width:28px;height:28px;background:#161f32;border:1px solid #1e2a45;border-radius:5px;color:#7b8ba8;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
.ib:hover{border-color:#00ff87;color:#00ff87}

.rvs{padding:8px 12px;background:#0d1118;border-bottom:1px solid #1e2a45}
.rvh{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.rvl{font-size:10px;font-weight:700;letter-spacing:1px;color:#7b8ba8}
.rvt{font-family:monospace;font-weight:800;font-size:16px;color:#ffcc00;text-shadow:0 0 8px rgba(255,204,0,.2)}
.rvr{display:flex;gap:8px;margin-bottom:6px}
.rvm{flex:1;background:#111827;border:1px solid #1e2a45;border-radius:5px;padding:5px 8px;text-align:center}
.rvv{font-family:monospace;font-weight:700;font-size:14px;display:block}
.rvg{color:#00ff87}.rvrd{color:#ff6b6b}
.rvsb{font-size:9px;color:#4a5568}
.rvir{display:flex;gap:4px;align-items:center}
.bidi{width:90px;padding:4px 8px;font-family:monospace}
.bidi::-webkit-inner-spin-button{-webkit-appearance:none}

.mb{display:flex;gap:4px;padding:6px 12px;background:#080c14;border-bottom:1px solid #1e2a45}
.mm{flex:1;padding:5px 6px;background:#161f32;border:1px solid #1e2a45;border-radius:5px;color:#7b8ba8;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:inherit}
.mm:hover{border-color:#7b8ba8}
.mm.ma{background:rgba(0,255,135,.12);border-color:#00ff87;color:#00ff87}

.sb{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#1e2a45;border-bottom:1px solid #1e2a45}
.s{display:flex;flex-direction:column;align-items:center;padding:7px 4px;background:#0f1520}
.sv{font-family:monospace;font-weight:700;font-size:17px;color:#00ff87}
.sn{font-size:9px;color:#4a5568;text-transform:uppercase;letter-spacing:.5px}
.s.ev{background:#0d1a12}.s.ev .sv{font-size:15px;color:#00ff87;text-shadow:0 0 10px rgba(0,255,135,.25)}

.tb2{display:flex;gap:6px;align-items:center;padding:6px 12px;border-bottom:1px solid #1e2a45;flex-wrap:wrap}
.si{flex:1;min-width:80px;padding:4px 8px;background:#161f32;border:1px solid #1e2a45;border-radius:4px;color:#e8ecf4;font-size:12px;outline:none;font-family:inherit}
.si:focus{border-color:#00ff87}.si::placeholder{color:#4a5568}
.fr{display:flex;gap:3px}
.fb{padding:2px 7px;background:#161f32;border:1px solid #1e2a45;border-radius:8px;color:#4a5568;font-size:10px;cursor:pointer;transition:all .12s;font-family:inherit}
.fb:hover{border-color:#7b8ba8;color:#7b8ba8}
.fb.fa{background:rgba(0,255,135,.12);border-color:#00ff87;color:#00ff87}

.lh{display:grid;grid-template-columns:16px 1fr 52px 58px 24px;gap:4px;padding:3px 12px;background:#0f1520;border-bottom:1px solid #1e2a45;font-size:9px;color:#4a5568;text-transform:uppercase;letter-spacing:.4px}
.lb{flex:1;overflow-y:auto;min-height:0}
.lb::-webkit-scrollbar{width:4px}.lb::-webkit-scrollbar-thumb{background:#1e2a45;border-radius:2px}

.r{display:grid;grid-template-columns:16px 1fr 52px 58px 24px;gap:4px;padding:4px 12px;border-bottom:1px solid #1e2a45;align-items:center;transition:background .1s}
.r:hover{background:#1c2742}.r.av{background:rgba(0,255,135,.02)}
.r.sd{background:rgba(255,71,87,.06);opacity:.45}.r.sd .rn{text-decoration:line-through}

.d{width:6px;height:6px;border-radius:50%;justify-self:center}
.d.on{background:#00ff87;box-shadow:0 0 5px rgba(0,255,135,.3)}.d.off{background:#ff4757;opacity:.4}
.rn{font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rw,.rp{font-family:monospace;font-size:11px;text-align:right;color:#7b8ba8}.rp{font-weight:700}
.rp.hot{color:#00ff87;text-shadow:0 0 6px rgba(0,255,135,.2)}.rp.warm{color:#7dffba}
.tb{width:20px;height:20px;background:none;border:none;color:#4a5568;font-size:14px;cursor:pointer;border-radius:3px;display:flex;align-items:center;justify-content:center;transition:all .1s}
.tb:hover{background:#1c2742;color:#00ff87}

.ft{display:flex;gap:6px;padding:6px 12px;background:#0f1520;border-top:1px solid #1e2a45;justify-content:flex-end;border-radius:0 0 8px 8px}
.ftb{padding:3px 10px;background:#161f32;border:1px solid #1e2a45;border-radius:4px;color:#7b8ba8;font-size:10px;cursor:pointer;transition:all .12s;font-family:inherit;white-space:nowrap}
.ftb:hover{border-color:#00ff87;color:#00ff87}
.ftb.accent{border-color:#00ff87;color:#00ff87}
`;

// ================================================================
// INIT
// ================================================================
loadDataset();
createRoot();
doScrape();
render();
startAuto();
startObserver();
console.log("[Break Odds v4] Overlay loaded.");

})();
}
