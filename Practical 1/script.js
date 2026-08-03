let students = [
  { id: 101, name: "Alice Smith", email: "alice@univ.edu", course: "Computer Science", age: 21 }
];
let nextId = 102;

document.addEventListener("DOMContentLoaded", () => { render(); });

function closePopup() {
  document.getElementById("welcomePopup").style.display = "none";
}

function quickFill() {
  const names = ["Bob Taylor", "Charlie Brown", "Diana Prince", "Ethan Hunt"];
  const courses = ["Computer Science", "Engineering", "Business", "Arts"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  document.getElementById("name").value = randomName;
  document.getElementById("email").value = randomName.toLowerCase().replace(" ", ".") + "@univ.edu";
  document.getElementById("course").value = courses[Math.floor(Math.random() * courses.length)];
  document.getElementById("age").value = Math.floor(18 + Math.random() * 6);
}

document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const age = document.getElementById("age").value;
  students.push({ id: nextId++, name, email, course, age });
  render();
  alert("Welcome " + name + "! Registration fast-completed.");
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("name").focus();
});

function render() {
  document.getElementById("count").textContent = students.length;
  let html = "";
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    html += `<tr>
      <td>${s.id}</td><td>${s.name}</td><td>${s.email}</td>
      <td>${s.course}</td><td>${s.age}</td>
      <td><button onclick="del(${i})">X</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = html;
}

function del(i) { students.splice(i, 1); render(); }
