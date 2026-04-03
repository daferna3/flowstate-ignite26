// ── breathing.js ───────────────────────────────────────────────────────────
// Guided 4-6 breathing animation.

(function () {
  const ring      = document.getElementById("breath-ring");
  const label     = document.getElementById("breath-label");
  const startBtn  = document.getElementById("breath-btn");

  let isRunning = false;
  let timer     = null;

  const INHALE_MS  = 4000;
  const EXHALE_MS  = 6000;

  function inhale() {
    ring.classList.remove("exhale");
    ring.classList.add("inhale");
    label.textContent = "breathe in…";

    timer = setTimeout(() => {
      if (isRunning) exhale();
    }, INHALE_MS);
  }

  function exhale() {
    ring.classList.remove("inhale");
    ring.classList.add("exhale");
    label.textContent = "breathe out…";

    timer = setTimeout(() => {
      if (isRunning) inhale();
    }, EXHALE_MS);
  }

  function stop() {
    isRunning = false;
    clearTimeout(timer);
    ring.classList.remove("inhale", "exhale");
    label.textContent = "tap to start";
    startBtn.textContent = "Start Breathing";
    startBtn.classList.remove("active");
  }

  function start() {
    isRunning = true;
    startBtn.textContent = "Stop";
    startBtn.classList.add("active");
    inhale();
  }

  startBtn.addEventListener("click", () => {
    isRunning ? stop() : start();
  });

  ring.addEventListener("click", () => {
    isRunning ? stop() : start();
  });
})();