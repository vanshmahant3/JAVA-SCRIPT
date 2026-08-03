// Document ready
document.addEventListener("DOMContentLoaded", () => {
  // Real-time visual feedback as user types marks
  document.getElementById("marks").addEventListener("input", updateResult);
});

// Run calculation using conditional statements
function calculateGrade(marks) {
  let grade = "";
  
  // Conditional statements matching logic rules
  if (marks > 90) {
    grade = "A+";
  } else if (marks >= 80 && marks <= 90) {
    grade = "A";
  } else if (marks >= 66 && marks <= 80) {
    grade = "B";
  } else if (marks >= 50 && marks <= 65) {
    grade = "C";
  } else {
    grade = "Fail";
  }
  
  return grade;
}

// Live feedback update helper
function updateResult() {
  const marksInput = document.getElementById("marks").value;
  const resultBox = document.getElementById("resultBox");
  
  if (marksInput === "" || isNaN(marksInput)) {
    resultBox.classList.remove("show");
    return;
  }
  
  const marks = parseFloat(marksInput);
  if (marks < 0 || marks > 100) {
    resultBox.classList.remove("show");
    return;
  }
  
  const grade = calculateGrade(marks);
  
  // Show result box with values
  document.getElementById("gradeOutput").textContent = "Grade: " + grade;
  document.getElementById("marksOutput").textContent = "Marks: " + marks;
  resultBox.classList.add("show");
}

// Submit handler to trigger final calculation
document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const marks = parseFloat(document.getElementById("marks").value);
  
  if (marks < 0 || marks > 100) {
    alert("Marks must be between 0 and 100.");
    return;
  }
  
  updateResult();
});
