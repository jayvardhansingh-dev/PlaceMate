// ==========================================
// PlaceMate Premium Login System
// ==========================================

// Elements
const loginForm = document.getElementById("loginForm");
const rollInput = document.getElementById("rollNo");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.querySelector(".login-btn");
const rememberMe = document.querySelector(".remember input");

// ==========================================
// Password Toggle
// ==========================================

togglePassword.addEventListener("click", () => {

    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});

// ==========================================
// Auto Focus
// ==========================================

window.addEventListener("load", () => {

    rollInput.focus();

});

// ==========================================
// Already Logged In
// ==========================================

if (localStorage.getItem("isLoggedIn") === "true") {

    window.location.href = "dashboard.html";

}

// ==========================================
// Student Database
// ==========================================

const students = [

{
roll:"241272106033",
password:"jay123",
name:"Jayvardhan Singh"
},

{
roll:"241272106002",
password:"aakash123",
name:"Aakash Yadav"
},

{
roll:"241272106053",
password:"uzair123",
name:"Mohammad Uzair"
},

{
roll:"241272106097",
password:"utsav123",
name:"Utsav Saraswat"
}

];

// ==========================================
// Remember Me
// ==========================================

if(localStorage.getItem("savedRoll")){

rollInput.value=localStorage.getItem("savedRoll");
rememberMe.checked=true;

}

// ==========================================
// Toast Notification
// ==========================================

function showToast(message,type){

const toast=document.createElement("div");

toast.className="toast "+type;

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

// ==========================================
// Login
// ==========================================

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();

const roll=rollInput.value.trim();

const password=passwordInput.value.trim();

if(roll===""){

showToast("Please enter Roll Number","error");

rollInput.focus();

return;

}

if(password===""){

showToast("Please enter Password","error");

passwordInput.focus();

return;

}

loginBtn.disabled=true;

loginBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

setTimeout(()=>{

const student=students.find(student=>

student.roll===roll &&
student.password===password

);

if(student){

if(rememberMe.checked){

localStorage.setItem("savedRoll",roll);

}else{

localStorage.removeItem("savedRoll");

}

localStorage.setItem("isLoggedIn","true");

localStorage.setItem("studentName",student.name);

localStorage.setItem("studentRoll",student.roll);

showToast("Welcome "+student.name+" 🎉","success");

setTimeout(()=>{

window.location.href="dashboard.html";

},1200);

}else{

showToast("Invalid Roll Number or Password","error");

loginBtn.disabled=false;

loginBtn.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Login';

passwordInput.value="";

passwordInput.focus();

}

},1200);

});

// ==========================================
// Enter Key
// ==========================================

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

loginForm.requestSubmit();

}

});