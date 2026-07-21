// In-Memory Fast Array
let students = [
  { id: 101, name: "Alice Smith", email: "alice@univ.edu", course: "Computer Science", age: 21 }
];

let nextId = 102;

// Fast Page Load
document.addEventListener("DOMContentLoaded", () => {
  render();
});

function closePopup() {
  document.getElementById("welcomePopup").style.display = "none";
}

// Instant Quick Fill for rapid testing
function quickFill() {
  const names = ["Bob Taylor", "Charlie Brown", "Diana Prince", "Ethan Hunt"];
  const courses = ["Computer Science", "Engineering", "Business", "Arts"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];

  document.getElementById("name").value = randomName;
  document.getElementById("email").value = randomName.toLowerCase().replace(" ", ".") + "@univ.edu";
  document.getElementById("course").value = randomCourse;
  document.getElementById("age").value = Math.floor(18 + Math.random() * 6);
}

// Fast Form Submission
document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const age = document.getElementById("age").value;

  students.push({ id: nextId++, name, email, course, age });
  render();

  // Instant notification
  alert("Welcome " + name + "! Registration fast-completed.");

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("name").focus();
});

// Fast Direct Table Render
function render() {
  const tbody = document.getElementById("tableBody");
  document.getElementById("count").textContent = students.length;

  let html = "";
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    html += `<tr>
      <td>${s.id}</td>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${escapeHtml(s.course)}</td>
      <td>${s.age}</td>
      <td><button onclick="del(${i})">X</button></td>
    </tr>`;
  }
  tbody.innerHTML = html;
}

function del(i) {
  students.splice(i, 1);
  render();
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;'>, '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
