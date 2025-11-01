
window.addEventListener("DOMContentLoaded", () => {
  renderControls();
  drawRandomCard();
});


const SUITS = ["heart", "diamond", "spade", "club"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


function pickRandom(arr) {
  const indx = Math.floor(Math.random() * arr.length);
  return arr[indx];
}


function drawRandomCard() {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const suit = pickRandom(SUITS);
  const value = pickRandom(VALUES);

  const cardEl = createCard(suit, value);
  root.appendChild(cardEl);
}


function createCard(suit, value) {
  const SYMBOL = { heart: "♥", diamond: "♦", spade: "♠", club: "♣" };

  const wrap = document.createElement("div");
  wrap.className = "card-wrap";


  const card = document.createElement("div");

  card.className = `card ${suit} flip`;


  const top = document.createElement("div");
  top.className = "corner top";
  top.textContent = SYMBOL[suit];


  const mid = document.createElement("div");
  mid.className = "value";
  mid.textContent = value;


  const bottom = document.createElement("div");
  bottom.className = "corner bottom";
  bottom.textContent = SYMBOL[suit];


  card.append(top, mid, bottom);
  wrap.appendChild(card);


  return wrap;
}


let autoId = null;

function startAuto() {
  if (autoId !== null) return;
  autoId = setInterval(() => {
    drawRandomCard();
  }, 10000);
}

function stopAuto() {
  if (autoId === null) return;
  clearInterval(autoId);
  autoId = null;
}


function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function setCSSVar(name, value) {
  document.documentElement.style.setProperty(name, value);
}


function renderControls() {
  const body = document.body;
  const appRoot = document.getElementById("app");
  if (!appRoot) return;


  const controls = document.createElement("div");
  controls.className = "controls";


  const currentWpx = getCSSVar("--card-w") || "280px";
  const currentHpx = getCSSVar("--card-h") || "420px";

  const fieldW = document.createElement("div");
  fieldW.className = "field";
  const labelW = document.createElement("label");
  labelW.textContent = "Width (px)";
  const inputW = document.createElement("input");
  inputW.type = "number"; inputW.min = "120"; inputW.max = "700"; inputW.step = "1";
  inputW.value = parseInt(currentWpx, 10);
  inputW.addEventListener("input", () => {
    const n = Number(inputW.value);
    const clamped = Math.max(120, Math.min(700, isNaN(n) ? 280 : n));
    setCSSVar("--card-w", `${clamped}px`);
  });
  fieldW.append(labelW, inputW);

  const fieldH = document.createElement("div");
  fieldH.className = "field";
  const labelH = document.createElement("label");
  labelH.textContent = "Height (px)";
  const inputH = document.createElement("input");
  inputH.type = "number"; inputH.min = "160"; inputH.max = "900"; inputH.step = "1";
  inputH.value = parseInt(currentHpx, 10);
  inputH.addEventListener("input", () => {
    const n = Number(inputH.value);
    const clamped = Math.max(160, Math.min(900, isNaN(n) ? 420 : n));
    setCSSVar("--card-h", `${clamped}px`);
  });
  fieldH.append(labelH, inputH);


  const btnOnce = document.createElement("button");
  btnOnce.className = "btn";
  btnOnce.type = "button";
  btnOnce.textContent = "Nueva carta";
  btnOnce.setAttribute("aria-label", "Generar nueva carta");
  btnOnce.addEventListener("click", () => { drawRandomCard(); });


  const btnAuto = document.createElement("button");
  btnAuto.className = "btn";
  btnAuto.type = "button";
  btnAuto.textContent = "Auto (10s): OFF";
  btnAuto.setAttribute("aria-pressed", "false");
  btnAuto.addEventListener("click", () => {
    const running = autoId !== null;
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


  controls.append(fieldW, fieldH, btnOnce, btnAuto);
  body.insertBefore(controls, appRoot);
}

