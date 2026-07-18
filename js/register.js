// ==========================================
// PlaceMate Registration
// ==========================================

const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const roll = document.getElementById("roll").value.trim();

    const email = document.getElementById("email").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const course = document.getElementById("course").value;

    const semester = document.getElementById("semester").value;

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    // =========================
    // Validation
    // =========================

    if (
        name === "" ||
        roll === "" ||
        email === "" ||
        mobile === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email.");

        return;

    }

    if (mobile.length !== 10 || isNaN(mobile)) {

        alert("Enter a valid 10-digit mobile number.");

        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    // =========================
    // Existing Students
    // =========================

    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Duplicate Roll Number

    const rollExists = students.find(student => student.roll === roll);

    if (rollExists) {

        alert("Roll Number already registered.");

        return;

    }

    // Duplicate Email

    const emailExists = students.find(student => student.email === email);

    if (emailExists) {

        alert("Email already registered.");

        return;

    }

    // =========================
    // Save Student
    // =========================

    const student = {

        name,

        roll,

        email,

        mobile,

        course,

        semester,

        password

    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Registration Successful!");

    form.reset();

    window.location.href = "login.html";

});