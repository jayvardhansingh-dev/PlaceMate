// ======================================
// PlaceMate Admin Login
// ======================================

const form = document.getElementById("adminLoginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const toast = document.getElementById("toast");

// ======================================
// Default Admin
// ======================================

const ADMIN = {

    email: "admin@placemate.com",

    password: "admin123",

    name: "Placement Officer",

    role: "Administrator"

};

// ======================================
// Toast
// ======================================

function showToast(message, success = true){

    toast.innerHTML = message;

    toast.style.background = success
        ? "#16a34a"
        : "#dc2626";

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

// ======================================
// Login
// ======================================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const adminEmail = email.value.trim();

    const adminPassword = password.value.trim();

    if(

        adminEmail===ADMIN.email

        &&

        adminPassword===ADMIN.password

    ){

        Storage.save("admin",ADMIN);

        showToast("Login Successful");

        setTimeout(()=>{

            window.location.href="admin-dashboard.html";

        },1200);

    }

    else{

        showToast("Invalid Email or Password",false);

    }

});

// ======================================
// Auto Login
// ======================================

if(Storage.exists("admin")){

    window.location.href="admin-dashboard.html";

}