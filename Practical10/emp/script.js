// Practical 10b: Manage Employee Information using JavaScript & JSON
const STORAGE_KEY = "employeeRecords";
let employees = [];

const form = document.getElementById("empForm");
const body = document.getElementById("empBody");

// Escape text before inserting it into HTML
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Draw table, total badge, total salary and the JSON.stringify output
function render(note) {
  body.innerHTML = "";
  let total = 0;
  employees.forEach((e, i) => {
    total += Number(e.salary);
    body.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td><b>${esc(e.id)}</b></td>
        <td>${esc(e.name)}</td>
        <td><span class="dept">${esc(e.department)}</span></td>
        <td>₹${Number(e.salary).toLocaleString("en-IN")}</td>
      </tr>`;
  });
  document.getElementById("totalBadge").textContent = `Total: ${employees.length} Employees`;
  document.getElementById("totalSalary").textContent = "₹" + total.toLocaleString("en-IN");

  // JavaScript object -> JSON string
  document.getElementById("jsonOutput").textContent =
    (note ? note + "\n" : "") + JSON.stringify(employees, null, 2);
}

// Save the array in localStorage as a JSON string
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

// Add Employee (Save to JSON)
form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const id = document.getElementById("empId").value.trim();
  const name = document.getElementById("empName").value.trim();
  const department = document.getElementById("empDept").value;
  const salary = parseFloat(document.getElementById("empSalary").value);
  const error = document.getElementById("error");

  if (!id || !name || !department || isNaN(salary) || salary < 0) {
    error.textContent = "Please fill all fields with valid values.";
    return;
  }
  if (employees.some(e => e.id.toLowerCase() === id.toLowerCase())) {
    error.textContent = "Employee ID already exists.";
    return;
  }
  error.textContent = "";
  employees.push({ id, name, department, salary });
  save();
  render("// New employee added and saved:");
  form.reset();
});

// Load Employees (fetch JSON) - read employees.json, then keep locally added ones
document.getElementById("loadBtn").addEventListener("click", function () {
  fetch("employees.json")
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(fileData => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");   // JSON string -> object
      const extra = saved.filter(s => !fileData.some(f => f.id === s.id));
      employees = fileData.concat(extra);
      save();
      render(`// Data loaded from employees.json (${employees.length} records):`);
    })
    .catch(err => {
      document.getElementById("error").textContent =
        "Could not load employees.json. Run the page through a local server.";
      console.error(err);
    });
});

// Clear Table View
document.getElementById("clearBtn").addEventListener("click", function () {
  employees = [];
  localStorage.removeItem(STORAGE_KEY);
  render("// Table cleared.");
});

// Restore saved data on page load
employees = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
render("");
