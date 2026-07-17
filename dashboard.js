// ==============================
// CareerConnect Dashboard
// ==============================

// Get Student Data
const studentName = localStorage.getItem("studentName");
const studentRoll = localStorage.getItem("studentRoll");

// Show Student Information
document.getElementById("studentName").innerText =
    studentName || "Student";

document.getElementById("studentRoll").innerText =
    studentRoll || "Roll Number";

// Logout Button
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("studentName");
        localStorage.removeItem("studentRoll");

        window.location.href = "index.html";

    }

});