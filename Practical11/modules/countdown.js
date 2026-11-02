// countdown.js - countdown to a future date (setInterval)

export function breakDown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60
  };
}

// Calls update() every second; returns the interval id
export function startCountdown(target, update, finished) {
  function tick() {
    const diff = target.getTime() - Date.now();
    update(breakDown(diff));
    if (diff <= 0) {
      clearInterval(id);
      finished();
    }
  }
  const id = setInterval(tick, 1000);
  tick();
  return id;
}
