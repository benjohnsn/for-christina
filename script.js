const slides = Array.from(document.querySelectorAll(".slide"));
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const dotsWrap = document.getElementById("dots");
const bar = document.getElementById("bar");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let i = 0;
let unlockedFinal = false;

const finalIndex = slides.length - 1;
const questionIndex = slides.length - 2;

slides.forEach((_, idx) => {
  const d = document.createElement("div");
  d.className = "dotnav" + (idx === 0 ? " on" : "");
  d.addEventListener("click", () => {
    if (!unlockedFinal && idx > questionIndex) return;
    if (!unlockedFinal && i === questionIndex && idx > questionIndex) return;
    go(idx);
  });
  dotsWrap.appendChild(d);
});

function updateUI() {
  slides.forEach((s, idx) => s.classList.toggle("active", idx === i));

  const dots = Array.from(document.querySelectorAll(".dotnav"));
  dots.forEach((d, idx) => {
    d.classList.toggle("on", idx === i);
    if (!unlockedFinal && idx > questionIndex) d.classList.add("locked");
    else d.classList.remove("locked");
  });

  backBtn.disabled = i === 0;

  if (i === questionIndex && !unlockedFinal) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = i === finalIndex;
  }

  bar.style.width = `${(i / (slides.length - 1)) * 100}%`;
}

function go(idx) {
  idx = Math.max(0, Math.min(finalIndex, idx));
  if (!unlockedFinal && idx > questionIndex) idx = questionIndex;
  i = idx;
  updateUI();
}

nextBtn.addEventListener("click", () => go(i + 1));
backBtn.addEventListener("click", () => go(i - 1));

yesBtn.addEventListener("click", () => {
  unlockedFinal = true;
  go(finalIndex);
});

function dodgeNoButton() {
  if (i !== questionIndex) return;

  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const x = Math.random() * (rect.width - btnRect.width - 30);
  const y = 80 + Math.random() * (rect.height - btnRect.height - 140);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  dodgeNoButton();
}, { passive:false });

let lastHeart = 0;
window.addEventListener("mousemove", e => {
  const now = Date.now();
  if (now - lastHeart < 70) return;
  lastHeart = now;

  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = `${e.clientX}px`;
  h.style.top = `${e.clientY}px`;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 900);
});

updateUI();
