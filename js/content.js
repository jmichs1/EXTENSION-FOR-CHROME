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

const NFL_PLAYERS = []; // placeholder — NFL player data TBD

// Comprehensive alias map: official name → common abbreviations / nicknames
// Handles multi-word city abbreviations (LA, NY, OKC, etc.) and nickname variants
const TEAM_ALIASES = {
  // NBA — 30 teams
  "Los Angeles Lakers": ["LA Lakers"],
  "Los Angeles Clippers": ["LA Clippers"],
  "Golden State Warriors": ["GS Warriors", "Bay Area Warriors"],
  "New York Knicks": ["NY Knicks"],
  "Oklahoma City Thunder": ["OKC Thunder", "OKC"],
  "San Antonio Spurs": ["SA Spurs"],
  "New Orleans Pelicans": ["NO Pelicans", "NOLA Pelicans"],
  "Portland Trail Blazers": ["Portland Blazers"],
  "Minnesota Timberwolves": ["Minnesota Wolves", "Minnesota T-Wolves"],
  "Philadelphia 76ers": ["Philly 76ers", "Sixers", "Philadelphia Sixers"],
  "Cleveland Cavaliers": ["Cleveland Cavs", "Cavs"],
  "Dallas Mavericks": ["Dallas Mavs", "Mavs"],
  // NFL — 32 teams
  "Kansas City Chiefs": ["KC Chiefs"],
  "San Francisco 49ers": ["SF 49ers", "Niners", "SF Niners"],
  "New England Patriots": ["NE Patriots", "Pats"],
  "New York Giants": ["NY Giants"],
  "New York Jets": ["NY Jets"],
  "Green Bay Packers": ["GB Packers"],
  "Tampa Bay Buccaneers": ["TB Buccaneers", "Tampa Bay Bucs", "TB Bucs", "Bucs"],
  "Las Vegas Raiders": ["LV Raiders", "Vegas Raiders"],
  "Los Angeles Chargers": ["LA Chargers"],
  "Los Angeles Rams": ["LA Rams"],
  "New Orleans Saints": ["NO Saints", "NOLA Saints"],
};

// Midnight allocation percentages (decimal fractions) — from Topps Midnight checklist
// Teams: price-weighted allocation out of 9,000 total
const MIDNIGHT_TEAM_ALLOC = {
  "Atlanta Hawks":0.0078,"Boston Celtics":0.0256,"Brooklyn Nets":0.0256,
  "Charlotte Hornets":0.1111,"Chicago Bulls":0.0067,"Cleveland Cavaliers":0.0067,
  "Dallas Mavericks":0.2667,"Denver Nuggets":0.0222,"Detroit Pistons":0.0089,
  "Golden State Warriors":0.0333,"Houston Rockets":0.0067,"Indiana Pacers":0.0111,
  "Los Angeles Clippers":0.0067,"Los Angeles Lakers":0.0333,"Memphis Grizzlies":0.0222,
  "Miami Heat":0.0111,"Milwaukee Bucks":0.0222,"Minnesota Timberwolves":0.0167,
  "New Orleans Pelicans":0.0333,"New York Knicks":0.0222,"Oklahoma City Thunder":0.0278,
  "Orlando Magic":0.0111,"Philadelphia 76ers":0.0389,"Phoenix Suns":0.0111,
  "Portland Trail Blazers":0.0111,"Sacramento Kings":0.0056,"San Antonio Spurs":0.1333,
  "Toronto Raptors":0.0111,"Utah Jazz":0.0389,"Washington Wizards":0.0111,
};

// Players: price-weighted allocation out of 25,936 total (168 players)
const MIDNIGHT_PLAYER_ALLOC = {
  "Ace Bailey":0.032349,"Adem Bona":0.001041,"Adou Thiero":0.001157,
  "Alex Sarr":0.002390,"Alijah Martin":0.005359,"Allen Iverson":0.004820,
  "Alonzo Mourning":0.001272,"Anthony Edwards":0.013225,"Antonio Reeves":0.000347,
  "Asa Newell":0.006979,"Ben Saraf":0.003085,"Bogdan Bogdanovic":0.000347,
  "Brandon Miller":0.003779,"Bronny James":0.001851,"Brooks Barnhizer":0.001157,
  "Cade Cunningham":0.005128,"Calvin Murphy":0.000231,"Cam Christie":0.000887,
  "Cam Spencer":0.001002,"Cam Thomas":0.000193,"Carmelo Anthony":0.001427,
  "Cedric Coward":0.012145,"Chaz Lanier":0.002275,"Christian Laettner":0.000270,
  "Colby Jones":0.000231,"Cole Anthony":0.000771,"Collin Murray-Boyles":0.014844,
  "Collin Sexton":0.000308,"Cooper Flagg":0.173465,"Daniel Gafford":0.000231,
  "Danny Wolf":0.002776,"Day'Ron Sharpe":0.000231,"De'Aaron Fox":0.001272,
  "De'Andre Hunter":0.000733,"Dejounte Murray":0.000617,"Dennis Rodman":0.002005,
  "Dereck Lively II":0.001041,"Derik Queen":0.026951,"Derrick White":0.001041,
  "Desmond Bane":0.000733,"Dillon Brooks":0.001002,"Domantas Sabonis":0.001157,
  "Donte DiVincenzo":0.001349,"Drake Powell":0.002352,"Dwyane Wade":0.003354,
  "Dylan Harper":0.032349,"Egor Demin":0.010256,"Fred VanVleet":0.000655,
  "Giannis Antetokounmpo":0.009446,"Gradey Dick":0.001889,"Grant Williams":0.000193,
  "Harrison Ingram":0.000347,"Hugo Gonzalez":0.008058,"Isaiah Collier":0.001080,
  "Jae'Sean Tate":0.000270,"Jaime Jaquez Jr.":0.000733,"Jake LaRavia":0.000655,
  "Jalen Brunson":0.008058,"Jalen Green":0.000771,"Jalen Pickett":0.000231,
  "Jalen Wilson":0.000193,"Jamir Watkins":0.001427,"Jaren Jackson Jr.":0.000887,
  "Jarred Vanderbilt":0.000617,"Jason Kidd":0.000925,"Jaylen Wells":0.001195,
  "Jaylon Tyson":0.001696,"Jayson Tatum":0.009986,"Jeremiah Fears":0.005128,
  "Jett Howard":0.000308,"Jimmy Butler III":0.001041,"Joan Beringer":0.003239,
  "Joel Embiid":0.000925,"John Stockton":0.002930,"Johni Broome":0.001041,
  "Jordan Walsh":0.000771,"Josh Giddey":0.001041,"Josh Hart":0.000733,
  "Julius Randle":0.000733,"Juwan Howard":0.000231,"Kam Jones":0.002082,
  "Karl-Anthony Towns":0.001581,"Kawhi Leonard":0.001118,"Kel'el Ware":0.001002,
  "Kevin Durant":0.005398,"Kevin Huerter":0.000347,"Kevin McCullar Jr":0.000231,
  "Koby Brea":0.001311,"Kon Knueppel":0.064775,"Kyrie Irving":0.002660,
  "Kyshawn George":0.004280,"LaMelo Ball":0.004897,"LeBron James":0.043145,
  "Liam McNeeley":0.002082,"Lonzo Ball":0.000733,"Magic Johnson":0.005783,
  "Maurice Cheeks":0.001002,"Max Strus":0.000887,"Metta World Peace":0.000617,
  "Micah Peavy":0.001041,"Michael Porter Jr.":0.001696,"Multi Player Bundle":0.001157,
  "Naz Reid":0.000733,"Nic Claxton":0.000193,"Nicolas Batum":0.000270,
  "Nikola Jokic":0.018893,"Nikola Topic":0.001041,"Nikola Vucevic":0.001696,
  "Nique Clifford":0.003162,"Noa Essengue":0.004974,"Noah Penda":0.001851,
  "Nolan Traore":0.003316,"OG Anunoby":0.000925,"Onyeka Okongwu":0.001157,
  "Oso Ighodaro":0.000655,"Paolo Banchero":0.002622,"Pascal Siakam":0.001272,
  "Patrick Ewing":0.000810,"Paul George":0.000733,"Paul Pierce":0.002699,
  "Payton Pritchard":0.001581,"Pelle Larsson":0.001118,"Quentin Grimes":0.000771,
  "Rasheed Wallace":0.002159,"Rasheer Fleming":0.001619,"Ray Allen":0.001966,
  "Reggie Jackson":0.000231,"Richard Jefferson":0.000347,"Rob Dillingham":0.000771,
  "Robert Parish":0.000655,"Rudy Gobert":0.000655,"Ryan Kalkbrenner":0.002159,
  "Saddiq Bey":0.000270,"Scoot Henderson":0.003046,
  "Shai Gilgeous-Alexander":0.014844,"Shaquille O'Neal":0.005591,
  "Sion James":0.001735,"Stephen Curry":0.043145,"Stephon Castle":0.010796,
  "Thomas Sorber":0.004935,"Tim Duncan":0.001041,"Tim Hardaway":0.000308,
  "Tony Parker":0.001041,"Tracy McGrady":0.004820,"Trae Young":0.001157,
  "Tre Johnson III":0.004858,"Tristan da Silva":0.000617,"Tristen Newton":0.000270,
  "Tyler Herro":0.001581,"Tyler Kolek":0.000771,"Tyler Smith":0.000193,
  "Tyrese Haliburton":0.010102,"Tyrese Maxey":0.001080,
  "Victor Wembanyama":0.124152,"Vince Carter":0.003779,
  "Walter Clayton Jr.":0.017235,"Will Riley":0.004858,"Yang Hansen":0.006824,
  "Yanic Konan-Niederhauser":0.002390,
  "Aaron Gordon":0.000810,"Aaron Nesmith":0.000231,"Ajay Mitchell":0.001157,
  "Alex English":0.000231,"Amen Thompson":0.000771,"Andrew Wiggins":0.000617,
  "Anfernee Hardaway":0.000964,"Anfernee Simons":0.000231,"Anthony Davis":0.000231,
  "Ausar Thompson":0.000771,"Austin Reaves":0.001735,"Ayo Dosunmu":0.000270,
  "Ben Sheppard":0.000463,"Ben Wallace":0.000154,"Bones Hyland":0.000231,
  "Carter Bryant":0.001349,"Chet Holmgren":0.003470,"Christian Braun":0.000231,
  "CJ McCollum":0.000733,"Clyde Drexler":0.000887,"Damian Lillard":0.000655,
  "DaRon Holmes II":0.000231,"David Robinson":0.001002,"David Thompson":0.000308,
  "Deron Williams":0.000270,"Devin Booker":0.000540,"Dirk Nowitzki":0.001928,
  "Dominique Wilkins":0.000733,"Donovan Mitchell":0.001504,"Eric Gordon":0.000231,
  "Evan Mobley":0.000887,"Franz Wagner":0.000925,"George Gervin":0.000270,
  "Hakeem Olajuwon":0.000810,"Isaiah Hartenstein":0.000887,"Ja Morant":0.001542,
  "Jalen Williams":0.000193,"Jamal Murray":0.000771,"Jase Richardson":0.002545,
  "Jaylen Brown":0.000617,"Johnny Furphy":0.000231,"Kasparas Jakucionis":0.003200,
  "Kevin Garnett":0.001851,"Khaman Maluach":0.002892,"Kristaps Porzingis":0.000925,
  "Larry Bird":0.003856,"Latrell Sprewell":0.000193,"Maxime Raynaud":0.003470,
  "Mikal Bridges":0.001002,"Quinten Post":0.000270,"Rip Hamilton":0.000231,
  "Ron Holland II":0.001542,"Jonathan Mogbo":0.002121,"Tyrese Proctor":0.001041,
  "VJ Edgecombe":0.012222,"Walker Kessler":0.001002,"Zaccharie Risacher":0.001118,
  "Zach Edey":0.000925,
};

// Midnight player list derived from allocation keys
const MIDNIGHT_PLAYER_LIST = Object.keys(MIDNIGHT_PLAYER_ALLOC).map(n => ({ name: n, weight: MIDNIGHT_PLAYER_ALLOC[n] }));

// Sapphire allocations: computed from existing weights
const _pSum = PLAYER_LIST.reduce((s, p) => s + p.weight, 0);
const SAPPHIRE_PLAYER_ALLOC = Object.fromEntries(PLAYER_LIST.map(p => [p.name, p.weight / _pSum]));
// Sapphire team allocations: from Topps Chrome Sapphire checklist (total 39,590)
const SAPPHIRE_TEAM_ALLOC = {
  "Atlanta Hawks":0.0066,"Boston Celtics":0.0126,"Brooklyn Nets":0.0200,
  "Charlotte Hornets":0.1516,"Chicago Bulls":0.0101,"Cleveland Cavaliers":0.0051,
  "Dallas Mavericks":0.2594,"Denver Nuggets":0.0088,"Detroit Pistons":0.0088,
  "Golden State Warriors":0.0379,"Houston Rockets":0.0101,"Indiana Pacers":0.0063,
  "Los Angeles Clippers":0.0051,"Los Angeles Lakers":0.0581,"Memphis Grizzlies":0.0227,
  "Miami Heat":0.0076,"Milwaukee Bucks":0.0096,"Minnesota Timberwolves":0.0101,
  "New Orleans Pelicans":0.0253,"New York Knicks":0.0093,"Oklahoma City Thunder":0.0152,
  "Orlando Magic":0.0099,"Philadelphia 76ers":0.0429,"Phoenix Suns":0.0071,
  "Portland Trail Blazers":0.0126,"Sacramento Kings":0.0076,"San Antonio Spurs":0.1642,
  "Toronto Raptors":0.0114,"Utah Jazz":0.0328,"Washington Wizards":0.0114,
};

function getAllocMap(productId, league, submode) {
  if (league === "nba" && submode === "team") return productId === "midnight" ? MIDNIGHT_TEAM_ALLOC : SAPPHIRE_TEAM_ALLOC;
  if (league === "nba" && submode === "player") return productId === "midnight" ? MIDNIGHT_PLAYER_ALLOC : SAPPHIRE_PLAYER_ALLOC;
  return null; // NFL — no allocation data yet
}

const PRODUCTS = [
  { id:"sapphire", name:"2025 Topps Chrome Sapphire Basketball - Hobby", box:6000, case:60000 },
  { id:"midnight", name:"2025 Topps Midnight Basketball - Hobby", box:1200, case:9600 },
];

// ================================================================
// STATE  —  geometry is ONLY managed here, never in CSS
// ================================================================
const G = { x: 0, y: 0, w: 340, h: window.innerHeight, bx: 10, by: 70 };

const S = {
  league: "nba", submode: "player", _manualLeague: false, _manualSubmode: false, items: [], view: "open",
  filter: "all", search: "", sort: "value-desc",
  breakName: null, spotsLeft: null, totalSpots: 0, soldSet: new Set(), availSet: new Set(),
  productId: "sapphire", unit: "box", qty: 1,
  _manualProduct: false,   // user manually selected product type
  _manualUnit: false,      // user manually selected box/case
  _manualQty: false,       // user manually selected quantity
  revenue: 0, bids: [],   // revenue tracker
  lastPrice: null,         // price captured from "Sold" row
  _wasSold: false,         // was "Sold" visible last scrape?
  _wasAwaiting: false,     // was "Awaiting" visible last scrape?
  _saleCommitted: false,   // already added revenue for this auction cycle?
  _lastNetworkScrape: null, // timestamp of last successful API data
  _breakId: null,           // current break ID from intercepted API
  _gqlUrl: null,            // captured GraphQL endpoint URL from interceptor
  _hasApiData: false,       // true once API data received — locks out DOM overwrite
  spotOrder: [],            // string[] — names in pick order
  currentBid: null,         // current auction bid price
};

function loadDataset() {
  let src;
  if (S.league === "nba" && S.submode === "player") src = S.productId === "midnight" ? MIDNIGHT_PLAYER_LIST : PLAYER_LIST;
  else if (S.league === "nba" && S.submode === "team") src = NBA_TEAMS;
  else if (S.league === "nfl" && S.submode === "player") src = NFL_PLAYERS;
  else src = NFL_TEAMS;
  S.items = src.map(s => ({ name: s.name, weight: s.weight, tier: s.tier || null, available: !S.soldSet.has(s.name), spotNum: 0, dollarVal: 0 }));
}

// ================================================================
// SCRAPER
// ================================================================
function norm(s) { return s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim(); }
function buildNameMap() {
  const m = new Map();
  for (const it of S.items) {
    const n = norm(it.name); m.set(n, it.name);
    const p = n.split(" "); if (p.length >= 2 && p[p.length-1].length >= 4) m.set(p[p.length-1], it.name);
    const noSuffix = n.replace(/\s+(jr|sr|iii|ii|iv)\s*$/g, "").trim();
    if (noSuffix !== n && noSuffix.length >= 5) m.set(noSuffix, it.name);
    // Add team abbreviation aliases (LA Lakers → Los Angeles Lakers, OKC → Oklahoma City Thunder, etc.)
    const aliases = TEAM_ALIASES[it.name];
    if (aliases) { for (const a of aliases) { const na = norm(a); if (na.length >= 2) m.set(na, it.name); } }
  }
  return m;
}
function matchName(raw, nmap) {
  // Strip parenthetical suffixes: (SS), (INF), (AUTO x3), etc.
  const stripped = raw.replace(/\s*\([^)]*\)/g, '').trim();
  const n = norm(stripped.length >= 3 ? stripped : raw); if (n.length < 3) return null;
  // 1. Exact match
  if (nmap.has(n)) return nmap.get(n);
  // 2. Substring match (both directions)
  for (const [k, v] of nmap) { if (k.length >= 5 && (n.includes(k) || k.includes(n))) return v; }
  // 3. Try splitting on separators: " - ", " / ", " | ", leading "#N "
  const parts = stripped.replace(/^#?\d+\s+/, '').split(/\s*[-\/|]\s*/);
  for (const part of parts) {
    const pn = norm(part); if (pn.length < 3 || pn === n) continue;
    if (nmap.has(pn)) return nmap.get(pn);
    for (const [k, v] of nmap) { if (k.length >= 5 && (pn.includes(k) || k.includes(pn))) return v; }
  }
  // 4. Token overlap: match if 2+ words overlap with a name map key (for "First Last Extra" or "Extra First Last")
  const tokens = n.split(' ').filter(t => t.length >= 3);
  if (tokens.length >= 2) {
    for (const [k, v] of nmap) {
      const kTokens = k.split(' ');
      if (kTokens.length < 2) continue;
      const overlap = tokens.filter(t => kTokens.includes(t)).length;
      if (overlap >= 2) return v;
    }
  }
  return null;
}
function isNameCandidate(t) {
  if (t.length < 3 || t.length > 60) return false;
  if (/^(Sold|Available|Coming|How|Random|See|Show|Break|Spot|Ship|\$|\d|Upcoming|Giveaway|Filter|Sort|Auction|Qty|Bid|Custom|Follow|Chat|Watch)/i.test(t)) return false;
  if (/spots?\s*\(/i.test(t) || /^\d+\s+(of|left)/i.test(t) || /Filling|left|Taxes|Search|Shipping/i.test(t)) return false;
  const lt = (t.match(/[a-zA-Z]/g)||[]).length; return lt >= 3 && lt >= t.length * 0.4;
}

function scrape() {
  const r = { breakName:null, spotsLeft:null, totalSpots:0, availNames:[], soldNames:[], auctionPrice:null, currentBid:null, currentSoldName:null, revealName:null };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const texts = []; let nd;
  while ((nd = walker.nextNode())) { const t = nd.textContent.trim(); if (t.length >= 2 && t.length < 500) texts.push({ t, el: nd.parentElement }); }

  for (const {t} of texts) { if (/BREAK|CASE|RANDOM|SAPPHIRE|MIDNIGHT/i.test(t) && t.length > 15 && t.length < 200) { r.breakName = t.substring(0,80); break; } }
  // Also detect "Random Team" / "Random Player" label
  for (const {t} of texts) { if (/^Random\s+(Team|Player)$/i.test(t)) { r.breakType = t; break; } }
  // Collect all product/sport/mode-related text snippets for auto-detect
  r.productTexts = [];
  for (const {t} of texts) {
    if (t.length > 3 && t.length < 300 && /SAPPHIRE|MIDNIGHT|TOPPS|CHROME|HOBBY|\bBOX\b|\bCASE\b|\d+\s*[X×]|[X×]\s*\d+|\bNBA\b|\bNFL\b|BASKETBALL|FOOTBALL|\bTEAM\b|\bPLAYER\b/i.test(t)) {
      r.productTexts.push(t);
    }
  }
  for (const {t} of texts) { const m = t.match(/(\d+)\s+of\s+(\d+)\s+left/i); if (m) { r.spotsLeft = +m[1]; r.totalSpots = +m[2]; break; } }
  if (r.spotsLeft === null) { for (const {t} of texts) { const m = t.match(/(\d+)\s+left/i); if (m) { r.spotsLeft = +m[1]; break; } } }

  // --- Detect current bid price near "Bids" text ---
  let bidsRect = null;
  for (const {t, el} of texts) {
    if (/^\d+\s+Bids?$/i.test(t) || /^Bid/i.test(t)) {
      const rc = el.getBoundingClientRect();
      if (rc.width > 0 && rc.height > 0 && rc.top > window.innerHeight * 0.3) { bidsRect = rc; break; }
    }
  }
  let bestBidPrice = null, bestBidDist = Infinity;
  for (const {t, el} of texts) {
    const pm = t.match(/^\$\s*([\d,]+(?:\.\d{1,2})?)$/);
    if (!pm) continue;
    const price = parseFloat(pm[1].replace(/,/g, ""));
    if (price <= 1 || price > 100000) continue;
    const rc = el.getBoundingClientRect();
    if (rc.width === 0 || rc.height === 0) continue;
    if (el.closest("#break-odds-root")) continue;
    if (bidsRect) {
      const dy = Math.abs(rc.top - bidsRect.top);
      if (dy < 80 && dy < bestBidDist) { bestBidDist = dy; bestBidPrice = price; }
    } else {
      const inAuctionZone = rc.top > window.innerHeight * 0.55 && rc.top < window.innerHeight * 0.95
        && rc.left > window.innerWidth * 0.15 && rc.left < window.innerWidth * 0.85;
      if (inAuctionZone) {
        const fontSize = parseFloat(window.getComputedStyle(el).fontSize) || 12;
        const score = fontSize * 10 - Math.abs(rc.top - window.innerHeight * 0.8);
        if (score > bestBidDist * -1 || bestBidPrice === null) { bestBidDist = -score; bestBidPrice = price; }
      }
    }
  }
  if (bestBidPrice !== null) r.currentBid = bestBidPrice;

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

  // 2b. If "Sold" visible, also find the item name near the auction bar
  if (soldRect) {
    const nmap = buildNameMap();
    let bestName = null, bestDist = Infinity;
    for (const {t, el} of texts) {
      if (!isNameCandidate(t)) continue;
      const matched = matchName(t, nmap);
      if (!matched) continue;
      const rc = el.getBoundingClientRect();
      if (rc.width === 0 || rc.height === 0) continue;
      // Look for names near the sold bar (within 100px vertically)
      const dy = Math.abs(rc.top - soldRect.top);
      if (dy < 100 && dy < bestDist) {
        bestDist = dy;
        bestName = matched;
      }
    }
    if (bestName) r.auctionName = bestName;

    // Dash-pattern sold name extraction: "Cooper Flagg - $125 (Auto)" → "Cooper Flagg"
    for (const {t, el} of texts) {
      if (t.length < 10 || t.length > 200) continue;
      const rc = el.getBoundingClientRect();
      if (rc.width === 0) continue;
      if (Math.abs(rc.top - soldRect.top) > 80) continue;
      const dashIdx = t.lastIndexOf(" - ");
      if (dashIdx >= 0) {
        const tail = t.substring(dashIdx + 3).replace(/\s*\(Auto\)\s*/gi,"").replace(/,\s*$/,"").trim();
        if (tail.length >= 3 && tail.length <= 50) r.currentSoldName = tail;
      }
    }
  }

  // 2c. Also detect "Coming Up" item — the item currently being shown/auctioned
  for (const {t, el} of texts) {
    if (/^Coming\s*Up$/i.test(t)) {
      // The item name is usually a sibling or nearby element
      const parent = el.parentElement;
      if (parent) {
        const siblings = parent.querySelectorAll('*');
        const nmap = buildNameMap();
        for (const sib of siblings) {
          const st = sib.textContent.trim();
          if (st !== t && isNameCandidate(st)) {
            const matched = matchName(st, nmap);
            if (matched) { r.comingUp = matched; break; }
          }
        }
        // Also check parent's parent
        if (!r.comingUp && parent.parentElement) {
          for (const sib of parent.parentElement.children) {
            const st = sib.textContent.trim();
            if (isNameCandidate(st)) {
              const matched = matchName(st, nmap);
              if (matched) { r.comingUp = matched; break; }
            }
          }
        }
      }
      break;
    }
  }

  // 3. Check for "Awaiting next item" (backup trigger)
  for (const {t} of texts) {
    if (/awaiting/i.test(t)) { r.awaiting = true; break; }
  }

  // 4. Stream reveal: detect "X's spot is ... [Team Name]" overlay on stream
  for (const {t, el} of texts) {
    let m = t.match(/spot\s+is\s*(?:\.{2,}|\u2026)?\s*(.+)/i);
    if (!m && /spot\s+is/i.test(t)) {
      // Check parent element's full text (handles split text nodes)
      const tc = el.textContent.trim();
      if (tc.length <= 200) m = tc.match(/spot\s+is\s*(?:\.{2,}|\u2026)?\s*(.+)/i);
    }
    if (m) {
      const candidate = m[1].trim();
      if (candidate.length >= 2 && candidate.length <= 60 && !/spot/i.test(candidate)) {
        r.revealName = candidate;
        break;
      }
    }
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

  // "Coming Up" items = available spots (player break modal format)
  // Each "Coming Up" element has a sibling/nearby element with the player name
  if (r.availNames.length === 0) {
    const nmap = buildNameMap();
    for (const {t, el} of texts) {
      if (!/^Coming\s*Up$/i.test(t)) continue;
      // Walk up to the row container and look for a player name
      let found = false;
      let container = el.parentElement;
      for (let depth = 0; depth < 4 && container && !found; depth++) {
        const kids = container.querySelectorAll('*');
        for (const kid of kids) {
          if (kid.children.length > 0) continue; // leaf nodes only
          const kt = kid.textContent.trim();
          if (kt === t || kt.length < 3 || kt.length > 100) continue;
          const matched = matchName(kt, nmap);
          if (matched) { if (!r.availNames.includes(matched)) r.availNames.push(matched); found = true; break; }
        }
        container = container.parentElement;
      }
    }
  }

  return r;
}

// Auto-detect product, unit, qty, league, submode from break title
function parseBreakTitle(title) {
  if (!title) return;
  const t = title.toUpperCase();

  // Product detection (skip if user manually selected)
  if (!S._manualProduct) {
    if (/MIDNIGHT/i.test(t) && S.productId !== "midnight") {
      S.productId = "midnight"; loadDataset();
    } else if (/SAPPHIRE/i.test(t) && S.productId !== "sapphire") {
      S.productId = "sapphire"; loadDataset();
    }
  }

  // Unit detection: "CASE" or "BOX" (skip if user manually selected)
  if (!S._manualUnit) {
    if (/\bCASE\b/i.test(t)) S.unit = "case";
    else if (/\bBOX\b/i.test(t)) S.unit = "box";
  }

  // Quantity: look for patterns like "2 CASE", "x3", "3x", "× 2" (skip if user manually selected)
  if (!S._manualQty) {
    const qm = t.match(/(\d+)\s*(?:CASE|BOX)/i) || t.match(/[X×]\s*(\d+)/i) || t.match(/(\d+)\s*[X×]/i);
    if (qm) { const q = parseInt(qm[1]); if (q >= 1 && q <= 10) S.qty = q; }
  }

  // League detection (skip if user manually selected)
  if (!S._manualLeague) {
    if ((/\bNBA\b/i.test(t) || /\bBASKETBALL\b/i.test(t)) && S.league !== "nba") {
      S.league = "nba"; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset();
    } else if ((/\bNFL\b/i.test(t) || /\bFOOTBALL\b/i.test(t)) && S.league !== "nfl") {
      S.league = "nfl"; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset();
    }
  }

  // Submode detection: "RANDOM TEAM" / "Team Break" → team, "RANDOM PLAYER" / "Player Break" → player
  // Skip if user manually toggled submode
  if (!S._manualSubmode) {
    if (/\bTEAM\s*(BREAK|RANDOM)|\bRANDOM\s*TEAM\b|\bTEAM\b/i.test(t) && S.submode !== "team") {
      S.submode = "team"; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset();
    } else if (/\bPLAYER\s*(BREAK|RANDOM)|\bRANDOM\s*PLAYER\b|\bPLAYER\b/i.test(t) && S.submode !== "player") {
      S.submode = "player"; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset();
    }
  }
}

function applyScrape(d) {
  // Only run parseBreakTitle when API data hasn't been received yet (prevents resetting _hasApiData)
  if (!S._hasApiData) {
    if (d.breakName) { S.breakName = d.breakName; parseBreakTitle(d.breakName); }
    if (d.breakType) parseBreakTitle(d.breakType);
    if (d.productTexts) { for (const pt of d.productTexts) parseBreakTitle(pt); }
  } else {
    if (d.breakName) S.breakName = d.breakName;
  }
  // Always allow spotsLeft/totalSpots updates from any source — these counters
  // are most accurate from DOM ("X of Y left") and should not be blocked
  if (d.spotsLeft !== null) S.spotsLeft = d.spotsLeft;
  if (d.totalSpots > 0) S.totalSpots = d.totalSpots;
  S.currentBid = d.currentBid;

  const nmap = buildNameMap();

  // === REVENUE STATE MACHINE ===
  if (d.hasSold && d.auctionPrice && d.auctionPrice > 1) {
    S.lastPrice = d.auctionPrice;
  }
  const soldJustAppeared = d.hasSold && !S._wasSold;
  const awaitJustAppeared = d.awaiting && !S._wasAwaiting;
  if (d.auctionName) S._currentAuctionItem = d.auctionName;
  else if (d.comingUp) S._currentAuctionItem = d.comingUp;

  if ((soldJustAppeared || awaitJustAppeared) && !S._saleCommitted) {
    if (S._currentAuctionItem) {
      S.soldSet.add(S._currentAuctionItem);
      S.availSet.delete(S._currentAuctionItem);
      if (!S.spotOrder.includes(S._currentAuctionItem)) S.spotOrder.push(S._currentAuctionItem);
      console.log("[BO] Pick #" + S.spotOrder.length + ": " + S._currentAuctionItem + (S.lastPrice ? " for $" + S.lastPrice : ""));
    }
    if (S.lastPrice) {
      S.revenue += S.lastPrice;
      S.bids.push({ a: S.lastPrice, t: Date.now(), auto: true });
    }
    S._saleCommitted = true;
    S._currentAuctionItem = null;
  }
  if (!d.hasSold && !d.awaiting) {
    S._saleCommitted = false;
    S.lastPrice = null;
  }
  S._wasSold = !!d.hasSold;
  S._wasAwaiting = !!d.awaiting;

  // === SOLD/AVAILABLE DETECTION ===
  if (d._source === 'api') {
    // API data is authoritative — lock in and prevent DOM overwrite
    S._hasApiData = true;
    const apiSold = new Set();
    const apiAvail = new Set();
    const unmatchedSold = [];
    const unmatchedAvail = [];
    for (const raw of d.soldNames) { const m = matchName(raw, nmap); if (m) apiSold.add(m); else unmatchedSold.push(raw); }
    for (const raw of d.availNames) { const m = matchName(raw, nmap); if (m) apiAvail.add(m); else unmatchedAvail.push(raw); }
    if (unmatchedSold.length > 0 || unmatchedAvail.length > 0) {
      console.log('[BO] Unmatched API names — sold(' + unmatchedSold.length + '):', unmatchedSold.slice(0,5).join(', '), unmatchedAvail.length > 0 ? '| avail(' + unmatchedAvail.length + '): ' + unmatchedAvail.slice(0,3).join(', ') : '');
    }
    for (const name of apiSold) { if (!S.spotOrder.includes(name)) S.spotOrder.push(name); }
    S.spotOrder = S.spotOrder.filter(n => apiSold.has(n));
    S.soldSet = apiSold;
    S.availSet = apiAvail;
  } else {
    // DOM-based tracking — ADDITIVE ONLY to prevent flickering
    // Names only get added to sets, never removed. Only API/resync/manual can flip status.
    if (!S._hasApiData) {
      for (const raw of d.soldNames) {
        const m = matchName(raw, nmap);
        if (m && !S.availSet.has(m) && !S.soldSet.has(m)) {
          S.soldSet.add(m); if (!S.spotOrder.includes(m)) S.spotOrder.push(m);
        }
      }
      for (const raw of d.availNames) {
        const m = matchName(raw, nmap);
        if (m && !S.soldSet.has(m) && !S.availSet.has(m)) {
          S.availSet.add(m);
        }
      }
    }
    // Live auction detection — high confidence, CAN move from avail to sold
    if (d.currentSoldName) {
      const soldPlayer = matchName(d.currentSoldName, nmap);
      if (soldPlayer && !S.soldSet.has(soldPlayer)) {
        S.soldSet.add(soldPlayer); S.availSet.delete(soldPlayer);
        if (!S.spotOrder.includes(soldPlayer)) S.spotOrder.push(soldPlayer);
        console.log("[BO] Sold (live): " + soldPlayer);
      }
    }
  }

  // === STREAM OVERLAY REVEAL (always runs — only adds, never removes) ===
  if (d.revealName) {
    const revealed = matchName(d.revealName, nmap);
    if (revealed && !S.soldSet.has(revealed)) {
      S.soldSet.add(revealed);
      S.availSet.delete(revealed);
      if (!S.spotOrder.includes(revealed)) S.spotOrder.push(revealed);
      console.log("[BO] Stream reveal: " + revealed);
    }
  }

  // === SET ITEM STATUS ===
  // When we have an authoritative available list (API data or DOM "Available Spots"),
  // teams not in either set should default to SOLD (the available list is exhaustive).
  // Without any data, default to available so we don't show everything as sold erroneously.
  const hasAuthoritativeData = S._hasApiData || S.availSet.size > 0;
  for (const it of S.items) {
    if (S.soldSet.has(it.name)) { it.available = false; }
    else if (S.availSet.has(it.name)) { it.available = true; }
    else { it.available = !hasAuthoritativeData; }
  }

  // === ASSIGN PICK NUMBERS ===
  for (const it of S.items) {
    it.spotNum = S.spotOrder.indexOf(it.name) >= 0 ? S.spotOrder.indexOf(it.name) + 1 : 0;
  }
}

// ================================================================
// NETWORK API INTERCEPTION — primary data source (API + stream screen)
// ================================================================

// GraphQL query for fetching all break spots (simplified from Whatnot's own query)
const QUERY_BREAK_GQL = `query QueryBreak($id:ID!$getAllSpotOptions:Boolean=true){getBreak(breakId:$id){...Break description spotOptions@include(if:$getAllSpotOptions){...BreakSpotOption __typename}__typename}}fragment Money on Money{amount currency amountSafe __typename}fragment BreakListing on ListingNode{id status price{...Money __typename}transactionType __typename}fragment BreakColors on BreakSpotColors{primaryBackground secondaryBackground title checkbox __typename}fragment Break on Break{id title format status soldSpotCount totalBreakSpots filledBreakSpots spotType defaultTransactionType __typename}fragment BreakSpotOption on BreakSpotOption{id title breakId available description assignedBreakSpot{id title buyer{id username __typename}listing{...BreakListing __typename}__typename}colors{...BreakColors __typename}__typename}`;

// Process API data from either passive interception or active fetch
function processApiBreakData(breakData, breakId) {
  if (!breakData) return;

  const _spots = breakData.spotOptions || breakData.paginatedSpotOptions?.edges?.map(e => e.node) || [];
  console.log('[BO] processApiBreakData: breakId=' + (breakId || breakData.id) + ' spots=' + _spots.length + ' total=' + (breakData.totalBreakSpots || '?') + ' hasApiData=' + S._hasApiData);

  // Store break ID for active fetching
  if (breakId) S._breakId = breakId;
  else if (breakData.id) S._breakId = breakData.id;

  // Build scrape-compatible result object
  const d = {
    breakName: breakData.title || null,
    spotsLeft: null,
    totalSpots: breakData.totalBreakSpots || 0,
    availNames: [],
    soldNames: [],
    auctionPrice: null,
    currentBid: null,
    currentSoldName: null,
    productTexts: breakData.title ? [breakData.title] : [],
    hasSold: false,
    awaiting: false,
    auctionName: null,
    comingUp: null,
  };

  // Extract spots from either spotOptions (getAllSpotOptions) or paginatedSpotOptions
  const spots = breakData.spotOptions
    || breakData.paginatedSpotOptions?.edges?.map(e => e.node)
    || [];

  for (const spot of spots) {
    const name = spot.title;
    if (!name) continue;
    if (spot.available && !spot.assignedBreakSpot) {
      d.availNames.push(name);
    } else {
      d.soldNames.push(name);
    }
  }

  // Auto-detect spotType → submode
  if (breakData.spotType && !S._manualSubmode) {
    const st = breakData.spotType.toLowerCase();
    if (st === 'team' && S.submode !== 'team') { S.submode = 'team'; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset(); }
    else if (st === 'player' && S.submode !== 'player') { S.submode = 'player'; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset(); }
  }

  // Guard: if response had no spot data, only update metadata — don't wipe sold/avail
  if (spots.length === 0) {
    if (breakData.title) { S.breakName = breakData.title; parseBreakTitle(breakData.title); }
    if (breakData.totalBreakSpots) S.totalSpots = breakData.totalBreakSpots;
    if (typeof breakData.soldSpotCount === 'number' && S.totalSpots > 0) {
      S.spotsLeft = S.totalSpots - breakData.soldSpotCount;
    }
    console.log('[BO] API metadata only (no spots) — breakId=' + S._breakId);
    render(true);
    return;
  }

  // Partial response handling: API may return only a subset of spots (e.g. 100/328 due to pagination)
  // Still process partial data additively for name matching, but use metadata for accurate counts
  const isPartial = breakData.totalBreakSpots && spots.length < breakData.totalBreakSpots;
  if (isPartial && S._hasApiData) {
    // Merge partial spot data additively — add newly sold/available names without clearing existing sets
    if (breakData.title) S.breakName = breakData.title;
    if (breakData.totalBreakSpots) S.totalSpots = breakData.totalBreakSpots;
    if (typeof breakData.soldSpotCount === 'number' && S.totalSpots > 0) {
      S.spotsLeft = S.totalSpots - breakData.soldSpotCount;
    }
    const nmap = buildNameMap();
    for (const raw of d.soldNames) { const m = matchName(raw, nmap); if (m && !S.soldSet.has(m)) { S.soldSet.add(m); S.availSet.delete(m); if (!S.spotOrder.includes(m)) S.spotOrder.push(m); } }
    for (const raw of d.availNames) { const m = matchName(raw, nmap); if (m && !S.soldSet.has(m)) { S.availSet.add(m); } }
    for (const it of S.items) {
      if (S.soldSet.has(it.name)) it.available = false;
      else if (S.availSet.has(it.name)) it.available = true;
      else it.available = false; // default unknown to sold when we have data
    }
    S._lastNetworkScrape = Date.now();
    console.log('[BO] Partial API (' + spots.length + '/' + breakData.totalBreakSpots + '), merged additively — sold:' + S.soldSet.size + ' avail:' + S.availSet.size);
    render(true);
    return;
  }

  // Use API metadata (soldSpotCount) for accurate spotsLeft when available
  if (typeof breakData.soldSpotCount === 'number' && breakData.totalBreakSpots) {
    d.spotsLeft = breakData.totalBreakSpots - breakData.soldSpotCount;
  } else {
    d.spotsLeft = d.availNames.length;
  }
  d._source = 'api';

  applyScrape(d);
  render(true);
  S._lastNetworkScrape = Date.now();
  console.log('[BO] API data: ' + d.soldNames.length + ' sold, ' + d.availNames.length + ' available (breakId=' + S._breakId + ')');
}

// Handle a single intercepted message (from postMessage or queued)
function handleApiMessage(data) {
  if (!data) return;
  if (data.type === 'BO_API_DATA') {
    const { breakData, breakId } = data.payload || {};
    processApiBreakData(breakData, breakId);
  }
  if (data.type === 'BO_BREAK_ID') {
    const { breakId } = data.payload || {};
    if (breakId) {
      const isNew = !S._breakId || S._breakId !== breakId;
      S._breakId = breakId;
      if (isNew) {
        S._hasApiData = false; // new break — reset API lock
        _fetchRetryCount = 0; // reset retry counter for new break
        console.log('[BO] Break ID discovered:', breakId);
        fetchBreakSpots();
      }
    }
  }
  if (data.type === 'BO_GQL_URL') {
    const { url } = data.payload || {};
    if (url && !S._gqlUrl) {
      S._gqlUrl = url;
      console.log('[BO] GraphQL URL captured:', url);
    }
  }
}

// Listen for intercepted data from the MAIN world script
function setupApiListener() {
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    handleApiMessage(event.data);
  });
  // Ask MAIN world interceptor to replay any queued messages
  window.postMessage({ type: 'BO_DRAIN_QUEUE' }, '*');
}

// Actively fetch break spots via GraphQL (no UI interaction needed)
// Delegates to MAIN world script which has Whatnot's auth context + headers
let _fetchRetryTimer = null;
let _fetchRetryCount = 0;
function fetchBreakSpots() {
  if (!S._breakId) return;
  console.log('[BO] Requesting fetch for breakId=' + S._breakId + ' (attempt ' + (_fetchRetryCount + 1) + ')');
  window.postMessage({ type: 'BO_FETCH_BREAK', payload: { breakId: S._breakId, query: QUERY_BREAK_GQL } }, '*');
  // Auto-retry if API data doesn't arrive within 3 seconds (up to 3 retries)
  if (_fetchRetryCount < 3) {
    if (_fetchRetryTimer) clearTimeout(_fetchRetryTimer);
    _fetchRetryTimer = setTimeout(() => {
      if (!S._hasApiData && S._breakId) {
        _fetchRetryCount++;
        console.log('[BO] API data not received, retrying fetch (attempt ' + (_fetchRetryCount + 1) + ')');
        fetchBreakSpots();
      } else {
        _fetchRetryCount = 0;
      }
    }, 3000);
  }
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

  // VALUE = allocation-weighted: totalCost × alloc% per spot
  // ODDS = 1 / remaining (changes as spots sell)
  // EV = odds × value
  const allocMap = getAllocMap(S.productId, S.league, S.submode);
  let remainingValue = 0;
  for (const i of S.items) {
    const alloc = allocMap?.[i.name] || (1 / totalPlayers);
    i.dollarVal = totalValue * alloc;
    if (i.available && remaining > 0) {
      i.livePct = (1 / remaining) * 100;
      i.ev = (1 / remaining) * i.dollarVal;
      remainingValue += i.dollarVal;
    } else { i.livePct = 0; i.ev = 0; }
  }
  const evPerSpot = remaining > 0 ? (remainingValue / remaining) : 0;
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
    G.bx = Math.max(0, Math.min(window.innerWidth - 77, o.bx + dx));
    G.by = Math.max(0, Math.min(window.innerHeight - 77, o.by + dy));
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

document.addEventListener("mouseup", () => { IX.type = null; requestAnimationFrame(() => { IX.moved = false; }); });

function beginDrag(e, el) { if (e.target.closest("input,select,button")) return; IX.type="drag"; IX.el=el; IX.moved=false; IX.sx=e.clientX; IX.sy=e.clientY; IX.og={...G}; e.preventDefault(); }
function beginBDrag(e, el) { IX.type="bdrag"; IX.el=el; IX.moved=false; IX.sx=e.clientX; IX.sy=e.clientY; IX.og={...G}; e.preventDefault(); }
function beginResize(e, el, edge) { IX.type="resize"; IX.el=el; IX.edge=edge; IX.moved=false; IX.sx=e.clientX; IX.sy=e.clientY; IX.og={...G}; e.preventDefault(); e.stopPropagation(); }
function wasDrag() { return IX.moved; }

// ================================================================
// RENDER
// ================================================================
function render(force) {
  if (IX.type) return;  // NEVER re-render during drag/resize
  if (!force) {
    const active = shadow.activeElement || shadow.querySelector(":focus");
    if (active && (active.tagName === "INPUT" || active.tagName === "SELECT")) return;
  }

  // Save scroll position
  const lb = shadow.getElementById("lb");
  const scrollY = lb ? lb.scrollTop : 0;

  const bo = shadow.getElementById("bo");
  if (!bo) return;
  const odds = calc();

  // ---- HIDDEN ----
  if (S.view === "hidden") { bo.className = ""; bo.innerHTML = ""; bo.style.cssText = ""; return; }

  // ---- COLLAPSED ----
  if (S.view === "collapsed") {
    bo.className = "collapsed";
    const fabIcon = S.league === "nfl" ? "\uD83C\uDFC8" : "\uD83C\uDFC0";
    const badgeText = S.currentBid !== null ? (() => {
      const ev = parseFloat(odds.evPerSpot);
      const diff = ev - S.currentBid;
      return diff >= 0 ? "+$" + diff.toFixed(0) : "-$" + Math.abs(diff).toFixed(0);
    })() : "$" + odds.evPerSpot;
    bo.innerHTML = `<button id="xBtn" class="fab">${fabIcon}<span class="fab-badge">${badgeText}</span></button>`;
    bubbleToStyle(bo);
    bo.onmousedown = e => beginBDrag(e, bo);
    bo.querySelector("#xBtn").onclick = () => { if (!wasDrag()) { G.x = Math.max(0, Math.min(G.bx + 77 - G.w, window.innerWidth - G.w)); G.y = Math.max(0, Math.min(G.by, window.innerHeight - G.h)); S.view = "open"; render(true); } };
    return;
  }

  // ---- OPEN ----
  bo.className = "panel";
  bo.onmousedown = null;
  geoToStyle(bo);

  const brkLine = S.breakName ? S.breakName.substring(0, 55) + (S.breakName.length > 55 ? "..." : "") : "Waiting for data...";
  const cntLine = S.spotsLeft !== null ? `${S.spotsLeft} of ${S.totalSpots} left` : "";

  let items = [...S.items];

  // Sort by value descending (highest value first)
  items.sort((a, b) => b.dollarVal - a.dollarVal);

  if (S.filter === "available") items = items.filter(i => i.available);
  else if (S.filter === "sold") items = items.filter(i => !i.available);
  else if (S.filter === "high") items = items.filter(i => i.dollarVal > 100);
  if (S.search) { const q = S.search.toLowerCase(); items = items.filter(i => i.name.toLowerCase().includes(q)); }

  let rows = "";
  for (const it of items) {
    const cls = it.available ? "av" : "sd";
    const valStr = "$" + (it.dollarVal >= 1000 ? it.dollarVal.toLocaleString(undefined,{maximumFractionDigits:0}) : it.dollarVal.toFixed(0));
    const valCls = it.dollarVal > 500 ? "hot" : it.dollarVal > 100 ? "warm" : "";
    rows += `<div class="r ${cls}" data-n="${it.name.replace(/"/g,"&quot;")}"><span class="d ${it.available?"on":"off"}"></span><span class="rn">${it.name}</span><span class="rp ${valCls}">${valStr}</span><button class="tb">${it.available?"\u2212":"+"}</button></div>`;
  }
  const fBtn = (f,l) => `<button class="fb${S.filter===f?" fa":""}" data-f="${f}">${l}</button>`;
  const prodOpts = PRODUCTS.map(p=>`<option value="${p.id}"${S.productId===p.id?" selected":""}>${p.name}</option>`).join("");
  const qtyOpts = Array.from({length:10},(_,i)=>`<option value="${i+1}"${S.qty===(i+1)?" selected":""}>${i+1}</option>`).join("");
  const product = PRODUCTS.find(p=>p.id===S.productId)||PRODUCTS[0];
  const unitPrice = S.unit==="case"?product.case:product.box;

  bo.innerHTML = `
    <div class="hd" id="dragH"><div class="hl"><span class="lg">\uD83C\uDFC0 BREAK ODDS</span><span class="bn">${brkLine}</span>${cntLine?`<span class="cl">${cntLine}</span>`:""}</div><div class="hb"><button id="colBtn" class="ib" title="Collapse">\u25C1</button></div></div>
    <div class="psel"><select id="prodSel" class="sel">${prodOpts}</select><div class="prow"><select id="unitSel" class="sel sm"><option value="box"${S.unit==="box"?" selected":""}>Box</option><option value="case"${S.unit==="case"?" selected":""}>Case</option></select><span class="px">\u00D7</span><select id="qtySel" class="sel sm">${qtyOpts}</select><span class="ptotal">= $${(unitPrice*S.qty).toLocaleString()}</span></div></div>
    <div class="mb"><button class="lg-btn${S.league==="nba"?" ma":""}" data-lg="nba">\uD83C\uDFC0 NBA</button><button class="lg-btn${S.league==="nfl"?" ma":""}" data-lg="nfl">\uD83C\uDFC8 NFL</button></div>
    <div class="mb sub"><button class="sm-btn${S.submode==="player"?" ma":""}" data-sm="player">\uD83C\uDCCF Player</button><button class="sm-btn${S.submode==="team"?" ma":""}" data-sm="team">\uD83C\uDFC5 Team</button></div>
    <div class="sb"><div class="s"><span class="sv">${odds.avail}</span><span class="sn">Avail</span></div><div class="s"><span class="sv">${odds.sold}</span><span class="sn">Sold</span></div><div class="s"><span class="sv">${odds.total}</span><span class="sn">Total</span></div><div class="s ev"><span class="sv">$${odds.evPerSpot}</span><span class="sn">EV/Spot</span></div></div>
    ${S.currentBid !== null ? (() => {
      const ev = parseFloat(odds.evPerSpot);
      const diff = ev - S.currentBid;
      const isGood = diff >= 0;
      const diffStr = isGood ? "+$" + diff.toFixed(0) : "-$" + Math.abs(diff).toFixed(0);
      const cls2 = isGood ? "deal-good" : "deal-bad";
      const icon = isGood ? "\u2705" : "\u26A0\uFE0F";
      return `<div class="deal ${cls2}"><span class="deal-bid">BID: $${S.currentBid}</span><span class="deal-vs">vs</span><span class="deal-ev">EV: $${ev.toFixed(0)}</span><span class="deal-diff">${icon} ${diffStr}</span></div>`;
    })() : '<div class="deal deal-wait">Waiting for bid...</div>'}
    <div class="tb2"><input type="text" id="srch" class="si" placeholder="Search..." value="${S.search||""}"><div class="fr">${fBtn("all","All")}${fBtn("available","Avail")}${fBtn("sold","Sold")}${fBtn("high","High$")}</div></div>
    <div class="lh"><span></span><span>NAME</span><span>VALUE</span><span></span></div>
    <div id="lb" class="lb">${rows}</div>
    <div class="ft"><button id="syncB" class="ftb accent">\u27F3 Resync</button><button id="rsB" class="ftb">Reset All</button><button id="clB" class="ftb">Clear All</button></div>
    <div class="rz rz-n" data-e="n"></div><div class="rz rz-s" data-e="s"></div><div class="rz rz-e" data-e="e"></div><div class="rz rz-w" data-e="w"></div>
    <div class="rz rz-ne" data-e="ne"></div><div class="rz rz-nw" data-e="nw"></div><div class="rz rz-se" data-e="se"></div><div class="rz rz-sw" data-e="sw"></div>
  `;

  // ---- WIRE EVENTS ----
  bo.querySelector("#dragH").onmousedown = e => beginDrag(e, bo);
  bo.querySelectorAll(".rz").forEach(h => { h.onmousedown = e => beginResize(e, bo, h.dataset.e); });
  bo.querySelector("#colBtn").onclick = () => { if (!wasDrag()) { G.bx = Math.max(10, Math.min(G.x + G.w - 90, window.innerWidth - 100)); G.by = Math.max(60, Math.min(G.y + 6, window.innerHeight - 100)); S.view="collapsed"; render(true); } };
  bo.querySelector("#prodSel").onchange = e => { S.productId=e.target.value; S._manualProduct=true; S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; loadDataset(); render(true); };
  bo.querySelector("#unitSel").onchange = e => { S.unit=e.target.value; S._manualUnit=true; render(true); };
  bo.querySelector("#qtySel").onchange  = e => { S.qty=parseInt(e.target.value); S._manualQty=true; render(true); };

  bo.querySelectorAll(".lg-btn").forEach(b => b.onclick = () => { if(!wasDrag()){S.league=b.dataset.lg;S._manualLeague=true;S.soldSet.clear();S.availSet.clear();S.spotOrder=[];loadDataset();doScrape();} });
  bo.querySelectorAll(".sm-btn").forEach(b => b.onclick = () => { if(!wasDrag()){S.submode=b.dataset.sm;S._manualSubmode=true;S.soldSet.clear();S.availSet.clear();S.spotOrder=[];loadDataset();doScrape();} });
  bo.querySelectorAll(".fb").forEach(b => b.onclick = () => { if(!wasDrag()){S.filter=b.dataset.f;render(true);} });
  bo.querySelector("#srch").oninput = e => { S.search=e.target.value; render(true); };
  bo.querySelector("#rsB").onclick = () => { S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; S.items.forEach(i=>{i.available=true;i.spotNum=0;}); render(true); };
  bo.querySelector("#clB").onclick = () => { S.availSet.clear(); S.items.forEach(i=>{i.available=false;S.soldSet.add(i.name);}); render(true); };
  bo.querySelector("#syncB").onclick = () => { S._hasApiData=false; S.soldSet.clear(); S.availSet.clear(); S.spotOrder=[]; S.items.forEach(i=>{i.available=true;i.spotNum=0;}); fetchBreakSpots(); doScrape(); };
  // Toggle buttons in rows
  bo.querySelectorAll(".tb").forEach(btn => { btn.onclick=()=>{ const nm=btn.closest(".r").dataset.n; const it=S.items.find(i=>i.name===nm); if(!it)return; it.available=!it.available; if(it.available){S.soldSet.delete(nm);S.availSet.add(nm);const idx=S.spotOrder.indexOf(nm);if(idx>=0)S.spotOrder.splice(idx,1);}else{S.soldSet.add(nm);S.availSet.delete(nm);if(!S.spotOrder.includes(nm))S.spotOrder.push(nm);} it.spotNum=S.spotOrder.indexOf(nm)>=0?S.spotOrder.indexOf(nm)+1:0; render(true); }; });

  // Restore scroll position
  const newLb = bo.querySelector("#lb");
  if (newLb && scrollY > 0) newLb.scrollTop = scrollY;

  if (S.search) { const sb=bo.querySelector("#srch"); sb.focus(); sb.setSelectionRange(S.search.length,S.search.length); }
}

function doScrape() {
  if (!S._breakId) discoverBreakId();
  try { const d=scrape(); const apiAge=S._lastNetworkScrape?Math.round((Date.now()-S._lastNetworkScrape)/1000)+"s":"none"; console.log("[BO] spots:",S.spotsLeft,"| soldSet:",S.soldSet.size,"| availSet:",S.availSet.size,"| bid:$"+d.currentBid,"| api:",apiAge,"| breakId:",S._breakId||"none"); applyScrape(d); render(); } catch(e){console.error("[BO] err:",e);}
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
  if (msg.type === "TOGGLE_PANEL") { S.view = S.view==="open"?"collapsed":S.view==="collapsed"?"open":"open"; render(true); }
});

// ================================================================
// CSS  —  panel has NO default position/size in CSS (all inline via JS)
// ================================================================
const CSS = `
:host{all:initial}*{margin:0;padding:0;box-sizing:border-box}

.collapsed{position:fixed;cursor:grab;user-select:none;pointer-events:auto;z-index:2147483647}
.fab{width:77px;height:77px;border-radius:50%;background:#0a0e17;border:3px solid #00ff87;font-size:35px;cursor:grab;box-shadow:0 0 8px rgba(0,255,135,.4);transition:transform .15s;position:relative;display:flex;align-items:center;justify-content:center;animation:breathe 14s linear infinite;will-change:border-color,box-shadow;-webkit-font-smoothing:antialiased}
.fab:hover{transform:scale(1.1);animation-play-state:paused}
@keyframes breathe{0%{border-color:#00ff87;box-shadow:0 0 10px rgba(0,255,135,.6),0 0 25px rgba(0,255,135,.2),0 0 50px rgba(0,255,135,.08)}8%{border-color:#10efaa;box-shadow:0 0 12px rgba(16,239,170,.65),0 0 28px rgba(16,239,170,.22),0 0 52px rgba(16,239,170,.09)}16%{border-color:#30c9dd;box-shadow:0 0 16px rgba(48,201,221,.75),0 0 34px rgba(48,201,221,.28),0 0 58px rgba(48,201,221,.11)}25%{border-color:#40b9ff;box-shadow:0 0 18px rgba(64,185,255,.8),0 0 38px rgba(64,185,255,.3),0 0 65px rgba(64,185,255,.12)}33%{border-color:#68acfe;box-shadow:0 0 19px rgba(104,172,254,.82),0 0 40px rgba(104,172,254,.31),0 0 68px rgba(104,172,254,.13)}42%{border-color:#8fa0fe;box-shadow:0 0 20px rgba(143,160,254,.85),0 0 42px rgba(143,160,254,.32),0 0 70px rgba(143,160,254,.14)}50%{border-color:#CEA2FD;box-shadow:0 0 22px rgba(206,162,253,.9),0 0 45px rgba(206,162,253,.35),0 0 75px rgba(206,162,253,.15)}58%{border-color:#e6a4c8;box-shadow:0 0 20px rgba(230,164,200,.85),0 0 42px rgba(230,164,200,.32),0 0 70px rgba(230,164,200,.14)}67%{border-color:#f0b460;box-shadow:0 0 19px rgba(240,180,96,.82),0 0 40px rgba(240,180,96,.31),0 0 68px rgba(240,180,96,.13)}75%{border-color:#ffcc00;box-shadow:0 0 18px rgba(255,204,0,.8),0 0 38px rgba(255,204,0,.3),0 0 65px rgba(255,204,0,.12)}83%{border-color:#c0e622;box-shadow:0 0 16px rgba(192,230,34,.75),0 0 34px rgba(192,230,34,.28),0 0 58px rgba(192,230,34,.11)}92%{border-color:#60f064;box-shadow:0 0 12px rgba(96,240,100,.65),0 0 28px rgba(96,240,100,.22),0 0 52px rgba(96,240,100,.09)}100%{border-color:#00ff87;box-shadow:0 0 10px rgba(0,255,135,.6),0 0 25px rgba(0,255,135,.2),0 0 50px rgba(0,255,135,.08)}}

.fab-badge{position:absolute;bottom:-7px;right:-10px;background:#CEA2FD;color:#080c14;font-size:13px;font-weight:800;padding:3px 6px;border-radius:10px;font-family:monospace;white-space:nowrap}

.panel{position:fixed;background:#080c14;border:1px solid #1e2a45;border-radius:8px;display:flex;flex-direction:column;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;font-size:13px;color:#e8ecf4;box-shadow:0 8px 40px rgba(0,0,0,.6);user-select:none;overflow:hidden;z-index:2147483647}

.rz{position:absolute;z-index:20}
.rz-n{top:-4px;left:12px;right:12px;height:8px;cursor:n-resize}
.rz-s{bottom:-4px;left:12px;right:12px;height:8px;cursor:s-resize}
.rz-e{right:-4px;top:12px;bottom:12px;width:8px;cursor:e-resize}
.rz-w{left:-4px;top:12px;bottom:12px;width:8px;cursor:w-resize}
.rz-ne{top:0;right:0;width:24px;height:24px;cursor:ne-resize}
.rz-nw{top:0;left:0;width:24px;height:24px;cursor:nw-resize}
.rz-se{bottom:0;right:0;width:24px;height:24px;cursor:se-resize}
.rz-sw{bottom:0;left:0;width:24px;height:24px;cursor:sw-resize}
.rz-ne::after,.rz-nw::after,.rz-se::after,.rz-sw::after{content:'';position:absolute;width:14px;height:14px;border-color:#7b8ba8;border-style:solid;border-width:0;transition:border-color .15s}
.rz-ne::after{top:4px;right:4px;border-top-width:2.5px;border-right-width:2.5px;border-radius:0 4px 0 0}
.rz-nw::after{top:4px;left:4px;border-top-width:2.5px;border-left-width:2.5px;border-radius:4px 0 0 0}
.rz-se::after{bottom:4px;right:4px;border-bottom-width:2.5px;border-right-width:2.5px;border-radius:0 0 4px 0}
.rz-sw::after{bottom:4px;left:4px;border-bottom-width:2.5px;border-left-width:2.5px;border-radius:0 0 0 4px}
.rz-ne:hover::after,.rz-nw:hover::after,.rz-se:hover::after,.rz-sw:hover::after{border-color:#00ff87}

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
.mb.sub{padding-top:0}
.lg-btn,.sm-btn{flex:1;padding:5px 6px;background:#161f32;border:1px solid #1e2a45;border-radius:5px;color:#7b8ba8;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:inherit}
.lg-btn:hover,.sm-btn:hover{border-color:#7b8ba8}
.lg-btn.ma{background:rgba(0,255,135,.12);border-color:#00ff87;color:#00ff87}
.sm-btn.ma{background:rgba(100,180,255,.12);border-color:#64b4ff;color:#64b4ff}

.sb{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#1e2a45;border-bottom:1px solid #1e2a45}
.s{display:flex;flex-direction:column;align-items:center;padding:7px 4px;background:#0f1520}
.sv{font-family:monospace;font-weight:700;font-size:17px;color:#00ff87}
.sn{font-size:9px;color:#4a5568;text-transform:uppercase;letter-spacing:.5px}
.s.ev{background:#0d1a12}.s.ev .sv{font-size:15px;color:#00ff87;text-shadow:0 0 10px rgba(0,255,135,.25)}

.deal{display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 12px;border-bottom:1px solid #1e2a45;font-family:monospace;font-weight:700;font-size:13px;transition:background .3s}
.deal-good{background:rgba(0,255,135,.08);color:#00ff87}
.deal-bad{background:rgba(255,71,87,.08);color:#ff4757}
.deal-wait{color:#4a5568;font-size:11px;font-weight:400;font-family:inherit}
.deal-bid{color:#e8ecf4}
.deal-vs{color:#4a5568;font-size:10px;font-weight:400}
.deal-ev{color:#7b8ba8}
.deal-diff{font-size:15px;font-weight:800;letter-spacing:0.5px}
.deal-good .deal-diff{color:#00ff87;text-shadow:0 0 8px rgba(0,255,135,.3)}
.deal-bad .deal-diff{color:#ff4757;text-shadow:0 0 8px rgba(255,71,87,.3)}

.tb2{display:flex;gap:6px;align-items:center;padding:6px 12px;border-bottom:1px solid #1e2a45;flex-wrap:wrap}
.si{flex:1;min-width:80px;padding:4px 8px;background:#161f32;border:1px solid #1e2a45;border-radius:4px;color:#e8ecf4;font-size:12px;outline:none;font-family:inherit}
.si:focus{border-color:#00ff87}.si::placeholder{color:#4a5568}
.fr{display:flex;gap:3px}
.fb{padding:2px 7px;background:#161f32;border:1px solid #1e2a45;border-radius:8px;color:#4a5568;font-size:10px;cursor:pointer;transition:all .12s;font-family:inherit}
.fb:hover{border-color:#7b8ba8;color:#7b8ba8}
.fb.fa{background:rgba(0,255,135,.12);border-color:#00ff87;color:#00ff87}

.lh{display:grid;grid-template-columns:16px 1fr 64px 24px;gap:4px;padding:3px 12px;background:#0f1520;border-bottom:1px solid #1e2a45;font-size:9px;color:#4a5568;text-transform:uppercase;letter-spacing:.4px}
.lb{flex:1;overflow-y:auto;min-height:0}
.lb::-webkit-scrollbar{width:4px}.lb::-webkit-scrollbar-thumb{background:#1e2a45;border-radius:2px}

.r{display:grid;grid-template-columns:16px 1fr 64px 24px;gap:4px;padding:4px 12px;border-bottom:1px solid #1e2a45;align-items:center;transition:background .1s}
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
// Discover break ID from page DOM elements (no UI interaction)
function discoverBreakId() {
  if (S._breakId) return;
  // Look for links/buttons with break-related URLs
  const links = document.querySelectorAll('a[href*="break"], a[href*="Break"]');
  for (const a of links) {
    const m = a.href.match(/break[/_](\d+)/i);
    if (m) { S._breakId = m[1]; console.log('[BO] Break ID from DOM link:', S._breakId); fetchBreakSpots(); return; }
  }
  // Look for data attributes
  const els = document.querySelectorAll('[data-break-id], [data-breakid]');
  for (const el of els) {
    const id = el.getAttribute('data-break-id') || el.getAttribute('data-breakid');
    if (id && /^\d+$/.test(id)) { S._breakId = id; console.log('[BO] Break ID from data attr:', S._breakId); fetchBreakSpots(); return; }
  }
  // Ask MAIN world to scan __NEXT_DATA__
  window.postMessage({ type: 'BO_SCAN_NEXT_DATA' }, '*');
}

loadDataset();
createRoot();
render(true);
startObserver();
startAuto();

// Network API interception — primary data source (no UI disruption)
// intercept-main.js runs in MAIN world via manifest, so just set up the listener
setupApiListener();

// Give interceptor time to discover break ID from GraphQL calls
setTimeout(() => {
  if (S._breakId) {
    fetchBreakSpots();
  } else {
    console.log('[BO] No break ID after 3s, trying DOM + __NEXT_DATA__ discovery');
    discoverBreakId();
  }
}, 3000);

// Retry break ID discovery every 5s until found
const _discoverInterval = setInterval(() => {
  if (S._breakId) { clearInterval(_discoverInterval); return; }
  discoverBreakId();
}, 5000);

// Periodic API refresh every 5s when break ID is known
setInterval(() => {
  if (S._breakId) fetchBreakSpots();
}, 5000);
console.log("[Break Odds v4] Overlay loaded.");

})();
}
