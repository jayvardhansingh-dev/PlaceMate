/* ==========================================
   PlaceMate Dashboard
========================================== */

// ---------- Login Check ----------

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {

    window.location.href = "login.html";

}

// ---------- Student Data ----------

const studentName = localStorage.getItem("studentName") || "Student";

const studentRoll = localStorage.getItem("studentRoll") || "Roll Number";

// ---------- Update Student Name ----------

const name1 = document.getElementById("studentName");
const name2 = document.getElementById("studentName2");
const name3 = document.getElementById("studentName3");
const name4 = document.getElementById("studentName4");

if(name1) name1.innerText = studentName;
if(name2) name2.innerText = studentName;
if(name3) name3.innerText = studentName;
if(name4) name4.innerText = studentName;

// ---------- Update Roll Number ----------

const roll = document.getElementById("studentRoll");

if(roll){

    roll.innerText = studentRoll;

}

// ---------- Logout ----------

function logout(){

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentRoll");

    window.location.href = "index.html";

}

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",logout);

}

const logoutBtn2 = document.getElementById("logoutBtn2");

if(logoutBtn2){

    logoutBtn2.addEventListener("click",function(e){

        e.preventDefault();

        logout();

    });

}

// ---------- Notification ----------

const notifyBtn=document.getElementById("notifyBtn");

const notificationBox=document.getElementById("notificationBox");

if(notifyBtn){

notifyBtn.addEventListener("click",function(e){

e.stopPropagation();

notificationBox.classList.toggle("show");

profileDropdown.classList.remove("show");

});

}

// ---------- Profile Dropdown ----------

const profileMenu=document.getElementById("profileMenu");

const profileDropdown=document.getElementById("profileDropdown");

if(profileMenu){

profileMenu.addEventListener("click",function(e){

e.stopPropagation();

profileDropdown.classList.toggle("show");

notificationBox.classList.remove("show");

});

}

// ---------- Close Dropdown ----------

document.addEventListener("click",function(){

if(notificationBox){

notificationBox.classList.remove("show");

}

if(profileDropdown){

profileDropdown.classList.remove("show");

}

});

// ---------- Sidebar Active ----------

const menuItems=document.querySelectorAll(".sidebar li");

menuItems.forEach(item=>{

item.addEventListener("click",function(){

menuItems.forEach(i=>i.classList.remove("active"));

this.classList.add("active");

});

});

// ---------- Counter Animation ----------

const counters=document.querySelectorAll(".card h2");

counters.forEach(counter=>{

const target=parseInt(counter.innerText);

let count=0;

const speed=30;

const update=()=>{

if(count<target){

count++;

counter.innerText=count;

setTimeout(update,speed);

}

};

update();

});

// ---------- Progress Bar ----------

const progress=document.querySelector(".progress-fill");

if(progress){

progress.style.width="0";

setTimeout(()=>{

progress.style.width="80%";

},300);

}

// ---------- Welcome Animation ----------

const cards=document.querySelectorAll(

".welcome-card,.card,.job-card,.recommend-card,.profile-card,.panel-card"

);

cards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(20px)";

setTimeout(()=>{

card.style.opacity="1";

card.style.transform="translateY(0)";

card.style.transition=".6s";

},index*120);

});

// ---------- Apply Buttons ----------

const applyButtons=document.querySelectorAll(".job-card button");

applyButtons.forEach(button=>{

button.addEventListener("click",function(){

alert("Application Submitted Successfully!");

});

});

// ---------- Recommended Buttons ----------

const viewButtons=document.querySelectorAll(".recommend-card button");

viewButtons.forEach(button=>{

button.addEventListener("click",function(){

alert("Opening Job Details...");

});

});

console.log("PlaceMate Dashboard Loaded Successfully");