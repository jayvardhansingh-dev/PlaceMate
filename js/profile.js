/* ==========================================
   PlaceMate V2 - profile.js (Part 4A)
==========================================*/

// -------------------------
// LOGIN CHECK
// -------------------------

if(localStorage.getItem("isLoggedIn")!=="true"){

    window.location.href="login.html";

}

// -------------------------
// CURRENT USER
// -------------------------

const studentRoll=localStorage.getItem("studentRoll");

const studentName=localStorage.getItem("studentName");

let students=
JSON.parse(localStorage.getItem("students"))||[];

let currentStudent=
students.find(s=>s.roll===studentRoll);

// Create default student

if(!currentStudent){

    currentStudent={

        roll:studentRoll,

        name:studentName,

        bio:"",

        location:"India",

        profilePhoto:"images/default-profile.png",

        coverPhoto:"",

        skills:[],

        certificates:[],

        projects:[],

        followers:[],

        following:[],

        resume:"",

        theme:"light"

    };

    students.push(currentStudent);

    saveStudents();

}

// -------------------------
// SAVE
// -------------------------

function saveStudents(){

    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );

}

// -------------------------
// LOAD PROFILE
// -------------------------

function loadProfile(){

    document.getElementById("studentName").innerHTML=
    currentStudent.name;

    document.getElementById("bio").innerHTML=
    currentStudent.bio||"No Bio Added";

    document.querySelector(".location").innerHTML=
    `<i class="fa-solid fa-location-dot"></i> ${currentStudent.location}`;

    document.querySelector(".profile-image").src=
    currentStudent.profilePhoto;

    document.querySelector(".nav-profile").src=
    currentStudent.profilePhoto;

    if(currentStudent.coverPhoto){

        document.querySelector(".cover-photo").style.background=
        `url(${currentStudent.coverPhoto}) center/cover`;

    }

}

loadProfile();

// -------------------------
// THEME
// -------------------------

const body=document.body;

const themeBtn=document.getElementById("themeBtn");

const savedTheme=
localStorage.getItem("theme")||"light";

body.classList.remove("light-theme","dark-theme");

body.classList.add(savedTheme+"-theme");

updateThemeIcon();

themeBtn.onclick=()=>{

    if(body.classList.contains("light-theme")){

        body.classList.replace(

            "light-theme",

            "dark-theme"

        );

        localStorage.setItem(

            "theme",

            "dark"

        );

    }else{

        body.classList.replace(

            "dark-theme",

            "light-theme"

        );

        localStorage.setItem(

            "theme",

            "light"

        );

    }

    updateThemeIcon();

}

function updateThemeIcon(){

    if(body.classList.contains("dark-theme")){

        themeBtn.innerHTML=

        `<i class="fa-solid fa-sun"></i>`;

    }else{

        themeBtn.innerHTML=

        `<i class="fa-solid fa-moon"></i>`;

    }

}

// -------------------------
// CAREER SCORE
// -------------------------

function updateCareerScore(){

    let score=0;

    if(currentStudent.bio) score+=10;

    if(currentStudent.profilePhoto) score+=10;

    if(currentStudent.coverPhoto) score+=10;

    if(currentStudent.resume) score+=20;

    score+=Math.min(

        currentStudent.skills.length*5,

        20

    );

    score+=Math.min(

        currentStudent.projects.length*10,

        20

    );

    score+=Math.min(

        currentStudent.certificates.length*5,

        10

    );

    document.getElementById("careerScore").innerHTML=

    score+"%";

    const progress=document.querySelector(".progress-bar");

    progress.style.width=score+"%";

    progress.innerHTML=score+"%";

}

updateCareerScore();

// -------------------------
// LOGOUT
// -------------------------

const logout=document.getElementById("logoutBtn");

if(logout){

logout.onclick=()=>{

localStorage.removeItem("isLoggedIn");

localStorage.removeItem("studentRoll");

localStorage.removeItem("studentName");

window.location.href="login.html";

}

}

/* ==========================================
   PlaceMate V2 - profile.js (Part 4B)
   Edit Profile • Upload Images • Skills
==========================================*/

// =============================
// EDIT PROFILE
// =============================

const editBtn = document.querySelector(".edit-profile");

if(editBtn){

editBtn.onclick = () => {

    const name = prompt(
        "Enter Your Name",
        currentStudent.name
    );

    if(name!==null && name.trim()!==""){
        currentStudent.name=name.trim();
        localStorage.setItem(
            "studentName",
            currentStudent.name
        );
    }

    const bio = prompt(
        "Enter Bio",
        currentStudent.bio
    );

    if(bio!==null){
        currentStudent.bio=bio.trim();
    }

    const location = prompt(
        "Enter Location",
        currentStudent.location
    );

    if(location!==null && location.trim()!==""){
        currentStudent.location=location.trim();
    }

    saveStudents();

    loadProfile();

    updateCareerScore();

};

}

// =============================
// PROFILE PHOTO
// =============================

const profileInput=document.createElement("input");

profileInput.type="file";

profileInput.accept="image/*";

profileInput.style.display="none";

document.body.appendChild(profileInput);

document.querySelector(".profile-image")
.onclick=()=>{

profileInput.click();

}

profileInput.onchange=()=>{

const file=profileInput.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=e=>{

currentStudent.profilePhoto=e.target.result;

saveStudents();

loadProfile();

updateCareerScore();

};

reader.readAsDataURL(file);

}

// =============================
// COVER PHOTO
// =============================

const coverInput=document.createElement("input");

coverInput.type="file";

coverInput.accept="image/*";

coverInput.style.display="none";

document.body.appendChild(coverInput);

document.querySelector(".edit-cover")
.onclick=()=>{

coverInput.click();

}

coverInput.onchange=()=>{

const file=coverInput.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=e=>{

currentStudent.coverPhoto=e.target.result;

saveStudents();

loadProfile();

updateCareerScore();

};

reader.readAsDataURL(file);

}

// =============================
// ADD SKILL
// =============================

const skillBtn=
document.querySelectorAll(".card-title button")[0];

skillBtn.onclick=()=>{

const skill=prompt("Enter Skill");

if(!skill) return;

currentStudent.skills.push(skill);

saveStudents();

renderSkills();

updateCareerScore();

}

function renderSkills(){

const box=document.querySelector(".skills");

box.innerHTML="";

currentStudent.skills.forEach(skill=>{

box.innerHTML+=`

<span>${skill}</span>

`;

});

}

renderSkills();

// =============================
// ADD CERTIFICATE
// =============================

const certificateBtn=
document.querySelectorAll(".card-title button")[2];

certificateBtn.onclick=()=>{

const title=prompt("Certificate Name");

if(!title) return;

const provider=prompt("Issued By");

currentStudent.certificates.push({

title,

provider

});

saveStudents();

renderCertificates();

updateCareerScore();

}

function renderCertificates(){

const grid=document.querySelector(".certificate-grid");

grid.innerHTML="";

currentStudent.certificates.forEach(c=>{

grid.innerHTML+=`

<div class="certificate-card">

<i class="fa-solid fa-award"></i>

<h3>${c.title}</h3>

<p>${c.provider}</p>

</div>

`;

});

}

renderCertificates();

// =============================
// ADD PROJECT
// =============================

const projectBtn=
document.querySelectorAll(".card-title button")[3];

projectBtn.onclick=()=>{

const title=prompt("Project Name");

if(!title) return;

const desc=prompt("Description");

currentStudent.projects.push({

title,

description:desc

});

saveStudents();

renderProjects();

updateCareerScore();

}

function renderProjects(){

const list=document.querySelector(".project-list");

list.innerHTML="";

currentStudent.projects.forEach(project=>{

list.innerHTML+=`

<div class="project-card">

<h3>${project.title}</h3>

<p>${project.description}</p>

<button>

View Project

</button>

</div>

`;

});

}

renderProjects();

/* ==========================================
   PlaceMate V2 - profile.js (Part 4C)
   Resume • Delete • Sync • Notifications
==========================================*/

// =============================
// RESUME UPLOAD
// =============================

const resumeBtn =
document.querySelector(".resume-box button");

const resumeInput =
document.createElement("input");

resumeInput.type="file";

resumeInput.accept=".pdf,.doc,.docx";

resumeInput.style.display="none";

document.body.appendChild(resumeInput);

resumeBtn.onclick=()=>{

    resumeInput.click();

}

resumeInput.onchange=()=>{

    const file=resumeInput.files[0];

    if(!file) return;

    currentStudent.resume={

        name:file.name,

        uploaded:new Date().toLocaleDateString()

    };

    saveStudents();

    renderResume();

    updateCareerScore();

}

function renderResume(){

    if(!currentStudent.resume) return;

    document.querySelector(".resume-box h3").innerHTML=
    currentStudent.resume.name;

    document.querySelector(".resume-box p").innerHTML=
    "Uploaded : "+currentStudent.resume.uploaded;

}

renderResume();


// =============================
// DELETE SKILL
// =============================

document.addEventListener("dblclick",(e)=>{

    if(e.target.parentElement &&
       e.target.parentElement.classList.contains("skills")){

        const skill=e.target.innerText;

        currentStudent.skills=
        currentStudent.skills.filter(s=>s!==skill);

        saveStudents();

        renderSkills();

        updateCareerScore();

    }

});


// =============================
// DELETE CERTIFICATE
// =============================

document.addEventListener("contextmenu",(e)=>{

if(e.target.closest(".certificate-card")){

e.preventDefault();

const title=
e.target.closest(".certificate-card")
.querySelector("h3").innerText;

currentStudent.certificates=
currentStudent.certificates.filter(c=>c.title!==title);

saveStudents();

renderCertificates();

updateCareerScore();

}

});


// =============================
// DELETE PROJECT
// =============================

document.addEventListener("contextmenu",(e)=>{

if(e.target.closest(".project-card")){

e.preventDefault();

const title=
e.target.closest(".project-card")
.querySelector("h3").innerText;

currentStudent.projects=
currentStudent.projects.filter(p=>p.title!==title);

saveStudents();

renderProjects();

updateCareerScore();

}

});


// =============================
// FOLLOWER STATS
// =============================

const statCards=
document.querySelectorAll(".stats-card h2");

if(statCards.length>=4){

statCards[0].innerHTML=
currentStudent.followers.length;

statCards[1].innerHTML=
currentStudent.following.length;

}


// =============================
// NOTIFICATIONS
// =============================

function notify(message){

if(!currentStudent.notifications){

currentStudent.notifications=[];

}

currentStudent.notifications.unshift({

text:message,

time:new Date().toLocaleString()

});

saveStudents();

}

notify("Visited Profile");


// =============================
// RECENT ACTIVITY
// =============================

function addActivity(message){

let activity=document.querySelector(".activity");

if(!activity) return;

}


// =============================
// SYNC HOME PROFILE
// =============================

localStorage.setItem(

"profileUpdated",

Date.now()

);


// =============================
// SAVE BEFORE EXIT
// =============================

window.addEventListener("beforeunload",()=>{

saveStudents();

});


// =============================
// SUCCESS
// =============================

console.log(

"PlaceMate Profile Loaded Successfully."

);