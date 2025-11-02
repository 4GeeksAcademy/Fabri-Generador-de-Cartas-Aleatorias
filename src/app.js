window.addEventListener("DOMContentLoaded", () => {
  initUI();
  drawCard();
});

const SUITS = ["heart", "diamond", "spade", "club"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SYMBOL = { heart: "♥", diamond: "♦", spade: "♠", club: "♣" };

const byId = (id) => document.getElementById(id);
const randOf = (arr) => arr[Math.floor(Math.random() * arr.length)];
const readVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const setVar = (name, value) => document.documentElement.style.setProperty(name, value);

function drawCard() {
  const app = byId("app");
  if (!app) return;
  app.innerHTML = "";
  const suit = randOf(SUITS);
  const rank = randOf(RANKS);
  app.appendChild(makeCard(suit, rank));
}

function makeCard(suit, rank) {
  const wrap = document.createElement("div");
  wrap.className = "card-wrap";

  const card = document.createElement("div");
  card.className = `card ${suit} flip`;

  const top = document.createElement("div");
  top.className = "corner top";
  top.textContent = SYMBOL[suit];

  const mid = document.createElement("div");
  mid.className = "value";
  mid.textContent = rank;

  const bot = document.createElement("div");
  bot.className = "corner bottom";
  bot.textContent = SYMBOL[suit];

  card.append(top, mid, bot);
  wrap.appendChild(card);
  return wrap;
}

let autoRef = null;

function startAuto() {
  if (autoRef) return;
  autoRef = setInterval(drawCard, 10000);
}

function stopAuto() {
  if (!autoRef) return;
  clearInterval(autoRef);
  autoRef = null;
}

function initUI() {
  const body = document.body;
  const app = byId("app");

  const controls = document.createElement("div");
  controls.className = "controls";

  const wNow = parseInt(readVar("--card-w") || "280px", 10) || 280;
  const wField = document.createElement("div");
  wField.className = "field";
  const wLabel = document.createElement("label");
  wLabel.textContent = "Width (px)";
  const wInput = document.createElement("input");
  wInput.type = "number"; wInput.min = "120"; wInput.max = "700"; wInput.step = "1"; wInput.value = wNow;
  wInput.addEventListener("input", () => {
    const n = Math.max(120, Math.min(700, Number(wInput.value) || 280));
    setVar("--card-w", `${n}px`);
  });
  wField.append(wLabel, wInput);

  const hNow = parseInt(readVar("--card-h") || "420px", 10) || 420;
  const hField = document.createElement("div");
  hField.className = "field";
  const hLabel = document.createElement("label");
  hLabel.textContent = "Height (px)";
  const hInput = document.createElement("input");
  hInput.type = "number"; hInput.min = "160"; hInput.max = "900"; hInput.step = "1"; hInput.value = hNow;
  hInput.addEventListener("input", () => {
    const n = Math.max(160, Math.min(900, Number(hInput.value) || 420));
    setVar("--card-h", `${n}px`);
  });
  hField.append(hLabel, hInput);

  const btnNew = document.createElement("button");
  btnNew.className = "btn";
  btnNew.type = "button";
  btnNew.textContent = "New card";
  btnNew.addEventListener("click", drawCard);

  const btnAuto = document.createElement("button");
  btnAuto.className = "btn";
  btnAuto.type = "button";
  btnAuto.textContent = "Auto (10s): OFF";
  btnAuto.setAttribute("aria-pressed", "false");
  btnAuto.addEventListener("click", () => {
    const running = !!autoRef;
    if (running) {
      stopAuto();
      btnAuto.textContent = "Auto (10s): OFF";
      btnAuto.setAttribute("aria-pressed", "false");
    } else {
      startAuto();
      btnAuto.textContent = "Auto (10s): ON";
      btnAuto.setAttribute("aria-pressed", "true");
    }
  });

  controls.append(wField, hField, btnNew, btnAuto);

  if (app) body.insertBefore(controls, app);
  else body.appendChild(controls);
}
