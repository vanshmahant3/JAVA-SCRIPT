// reminder.js - reminder module: setTimeout / clearTimeout

let nextId = 1;
const reminders = new Map();      // id -> { id, text, seconds, status, timer }

export function addReminder(text, seconds, onFire) {
  const id = nextId++;
  const r = { id, text, seconds, status: "Waiting" };
  r.timer = setTimeout(() => {
    r.status = "Done";
    onFire(r);
  }, seconds * 1000);
  reminders.set(id, r);
  return r;
}

export function cancelReminder(id) {
  const r = reminders.get(id);
  if (r && r.status === "Waiting") {
    clearTimeout(r.timer);
    r.status = "Cancelled";
  }
  return r;
}

export function allReminders() {
  return [...reminders.values()];
}
