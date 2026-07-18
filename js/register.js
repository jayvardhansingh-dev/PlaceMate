// ======================================
// PlaceMate Registration
// ======================================

const registerForm = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const collegeInput = document.getElementById("college");
const branchInput = document.getElementById("branch");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const toast = document.getElementById("toast");

// ======================================
// Toast
// ======================================

function showToast(message, success = true) {

    toast.innerHTML = message;

    toast.style.background = success
        ? "#16a34a"
        : "#dc2626";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

// ======================================
// Get Registered Users
// ======================================

function getRegisteredUsers() {

    return Storage.get("registeredUsers") || [];

}

// ======================================
// Save Registered Users
// ======================================

function saveRegisteredUsers(users) {

    Storage.save("registeredUsers", users);

}

// ======================================
// Register
// ======================================

registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const phone = phoneInput.value.trim();
    const college = collegeInput.value.trim();
    const branch = branchInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (
        !name ||
        !email ||
        !phone ||
        !college ||
        !branch ||
        !password ||
        !confirmPassword
    ) {

        showToast("Please fill all fields", false);

        return;

    }

    if (password.length < 6) {

        showToast("Password must be at least 6 characters", false);

        return;

    }

    if (password !== confirmPassword) {

        showToast("Passwords do not match", false);

        return;

    }

    let users = getRegisteredUsers();

    const exists = users.find(user => user.email === email);

    if (exists) {

        showToast("Email already registered", false);

        return;

    }

    const newUser = {

        id: Date.now(),

        name,

        email,

        phone,

        college,

        branch,

        password,

        role: "Student",

        image: "images/default-avatar.png",

        score: 0,

        projects: 0,

        certificates: 0,

        companies: 0,

        applications: 0,

        actions: [],

        skills: [],

        projectsList: []

    };

    users.push(newUser);

    saveRegisteredUsers(users);

    showToast("Registration Successful ✅");

    registerForm.reset();

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1500);

});