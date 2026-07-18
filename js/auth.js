// ========================================
// PlaceMate Authentication
// ========================================

// Demo Login Credentials
const users = [

    {
        email: "jayvardhantech.py@gmail.com",
        password: "1001",
        member: "jay"
    },

    {
        email: "mohammeduzair483@gmail.com",
        password: "uzair123",
        member: "uzair"
    },

    {
        email: "saraswatutsav13@gmail.com",
        password: "utsav123",
        member: "utsav"
    },

    {
        email: "aakashy24-bca@sanskar.org",
        password: "aakash123",
        member: "aakash"
    }

];

// ==========================
// Elements
// ==========================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const remember = document.getElementById("remember");

const loader = document.getElementById("loader");
const toast = document.getElementById("toast");

const togglePassword = document.getElementById("togglePassword");

const demoLogin = document.getElementById("demoLogin");

// ==========================
// Toast
// ==========================

function showToast(message){

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

// ==========================
// Loader
// ==========================

function showLoader(){

    loader.style.display="flex";

}

function hideLoader(){

    loader.style.display="none";

}

// ==========================
// Show Password
// ==========================

if (togglePassword) {
    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {
            password.type = "text";
            togglePassword.classList.replace("fa-eye","fa-eye-slash");
        } else {
            password.type = "password";
            togglePassword.classList.replace("fa-eye-slash","fa-eye");
        }

    });
}

// ==========================
// Login
// ==========================

loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const user = users.find(u=>{

        return(

            u.email===email.value.trim()

            &&

            u.password===password.value

        );

    });

    if(!user){

        showToast("❌ Invalid Email or Password");

        return;

    }

    showLoader();

    setTimeout(()=>{

        setCurrentUser(user.member);

        if(remember.checked){

            Storage.save("rememberUser",user.member);

        }

        else{

            Storage.remove("rememberUser");

        }

        saveNotification("Logged into PlaceMate");

        window.location.href="dashboard.html";

    },1500);

});

// ==========================
// Demo Login
// ==========================

demoLogin.addEventListener("click",()=>{

    showLoader();

    setTimeout(()=>{

        setCurrentUser("jay");

        saveNotification("Demo Login");

        window.location.href="dashboard.html";

    },1200);

});

// ==========================
// Auto Login
// ==========================

window.addEventListener("load",()=>{

    const remembered=

        Storage.get("rememberUser");

    if(remembered){

        setCurrentUser(remembered);

        window.location.href="dashboard.html";

    }

});

// ==========================
// Dashboard Protection
// ==========================

if(

    window.location.pathname.includes(

        "dashboard.html"

    )

){

    if(!getCurrentUser()){

        window.location.href="login.html";

    }

}

// ==========================
// Logout
// ==========================

function logout(){

    logoutUser();

    showToast("Logged Out");

    setTimeout(()=>{

        window.location.href="login.html";

    },800);

}