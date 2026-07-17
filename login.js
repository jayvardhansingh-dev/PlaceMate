// ==============================
// CareerConnect Login System
// ==============================

// Show / Hide Password
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }

});

// Student Data
const students = [

    {
        roll: "241272106033",
        password: "jay123",
        name: "Jayvardhan Singh"
    },

    {
        roll: "BCA002",
        password: "akash123",
        name: "Aakash Yadav"
    },

    {
        roll: "BCA003",
        password: "uzair123",
        name: "Mohammad Uzair"
    },

    {
        roll: "BCA004",
        password: "utsav123",
        name: "Utsav Saraswat"
    }

];

// Login Form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const roll = document.getElementById("rollNo").value.trim();
    const password = document.getElementById("password").value.trim();

    const student = students.find(student =>
        student.roll === roll &&
        student.password === password
    );

    if (student) {

        alert("Welcome, " + student.name + "!");

        // Save student info
        localStorage.setItem("studentName", student.name);
        localStorage.setItem("studentRoll", student.roll);

        // Open Dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Roll Number or Password!");

    }

});