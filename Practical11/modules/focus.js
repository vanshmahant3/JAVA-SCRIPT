// focus.js - focus (study) timer module: setInterval / clearInterval

export const pad = n => String(n).padStart(2, "0");

export function formatMMSS(totalSeconds) {
  return `${pad(Math.floor(totalSeconds / 60))}:${pad(totalSeconds % 60)}`;
}

export class FocusTimer {
  constructor(onTick, onDone) {
    this.onTick = onTick;     // called every second with (remaining, total)
    this.onDone = onDone;     // called when time is over
    this.total = 0;
    this.remaining = 0;
    this.id = null;
  }

  setLength(minutes) {
    this.stop();
    this.total = this.remaining = minutes * 60;
    this.onTick(this.remaining, this.total);
  }

  get running() { return this.id !== null; }

  start() {
    if (this.running || this.remaining <= 0) return;
    this.id = setInterval(() => {
      this.remaining--;
      this.onTick(this.remaining, this.total);
      if (this.remaining <= 0) {
        this.stop();
        this.onDone();
      }
    }, 1000);
  }

  stop() {                    // pause
    clearInterval(this.id);
    this.id = null;
  }

  reset() {
    this.stop();
    this.remaining = this.total;
    this.onTick(this.remaining, this.total);
  }
}
