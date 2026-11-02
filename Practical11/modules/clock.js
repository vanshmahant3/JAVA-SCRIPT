// clock.js - live clock module (uses setInterval)

export function formatTime(d) {
  return d.toLocaleTimeString("en-GB");               // 24-hour HH:MM:SS
}

export function formatDate(d) {
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// Starts the clock and returns the interval id so the caller can stop it
export function startClock(timeEl, dateEl) {
  function tick() {
    const now = new Date();
    timeEl.textContent = formatTime(now);
    dateEl.textContent = formatDate(now);
  }
  tick();
  return setInterval(tick, 1000);
}
