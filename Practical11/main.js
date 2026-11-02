// main.js - imports the modules and connects them to the page
import { startClock } from "./modules/clock.js";
import { FocusTimer, formatMMSS } from "./modules/focus.js";
import { addReminder, cancelReminder, allReminders } from "./modules/reminder.js";
import { startCountdown } from "./modules/countdown.js";

const $ = id => document.getElementById(id);

// ---- toast message (hidden again with setTimeout) ----
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 4000);
}

// ---- 1. clock ----
startClock($("clockTime"), $("clockDate"));

// ---- 2. focus timer ----
const focus = new FocusTimer(
  (remaining, total) => {
    $("focusDisplay").textContent = formatMMSS(remaining);
    const done = total ? ((total - remaining) / total) * 100 : 0;
    $("focusBar").style.width = done + "%";
  },
  () => {
    $("focusMsg").textContent = "Session complete. Take a short break!";
    toast("Focus session finished");
  }
);
focus.setLength(Number($("focusMinutes").value) || 25);

$("focusMinutes").addEventListener("change", () => {
  const m = Math.min(180, Math.max(1, Number($("focusMinutes").value) || 25));
  $("focusMinutes").value = m;
  focus.setLength(m);
  $("focusMsg").textContent = `Timer set to ${m} minute(s).`;
});
$("startBtn").addEventListener("click", () => {
  focus.start();
  $("focusMsg").textContent = "Focus mode running...";
});
$("pauseBtn").addEventListener("click", () => {
  focus.stop();
  $("focusMsg").textContent = "Paused.";
});
$("resetBtn").addEventListener("click", () => {
  focus.reset();
  $("focusMsg").textContent = "Timer reset.";
});

// ---- 3. reminders ----
function renderReminders() {
  const ul = $("remList");
  ul.innerHTML = "";
  allReminders().forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${r.text} <small>(${r.seconds}s)</small></span>
                    <span class="tag ${r.status.toLowerCase()}">${r.status}</span>`;
    if (r.status === "Waiting") {
      const b = document.createElement("button");
      b.textContent = "Cancel";
      b.className = "mini";
      b.addEventListener("click", () => { cancelReminder(r.id); renderReminders(); });
      li.appendChild(b);
    }
    ul.appendChild(li);
  });
}

$("addRemBtn").addEventListener("click", () => {
  const text = $("remText").value.trim();
  const secs = Number($("remSeconds").value);
  if (!text || !(secs > 0)) { toast("Enter reminder text and seconds"); return; }
  addReminder(text, secs, r => { toast("Reminder: " + r.text); renderReminders(); });
  $("remText").value = "";
  renderReminders();
});

// ---- 4. exam countdown ----
let examTimer = null;
$("examBtn").addEventListener("click", () => {
  const value = $("examDate").value;
  if (!value) { $("examMsg").textContent = "Please choose a date and time."; return; }
  const target = new Date(value);
  if (target <= new Date()) { $("examMsg").textContent = "Choose a future date."; return; }
  clearInterval(examTimer);
  $("examMsg").textContent = `Counting down to ${$("examName").value || "exam"}...`;
  examTimer = startCountdown(
    target,
    p => { $("dd").textContent = p.days; $("hh").textContent = p.hours; $("mm").textContent = p.minutes; $("ss").textContent = p.seconds; },
    () => { $("examMsg").textContent = "Time is up. Best of luck!"; toast("Countdown finished"); }
  );
});
