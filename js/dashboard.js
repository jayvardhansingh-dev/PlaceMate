/*=========================================
        PlaceMate Dashboard JS
        Part 1
=========================================*/


//==========================================
// LOGIN CHECK
//==========================================

if(localStorage.getItem("isLoggedIn")!=="true"){

    window.location.href="login.html";

}


//==========================================
// LOAD STUDENT
//==========================================

const studentRoll=localStorage.getItem("studentRoll");

const studentName=localStorage.getItem("studentName");

let students=JSON.parse(localStorage.getItem("students"))||[];

let currentStudent=students.find(s=>s.roll===studentRoll);


//==========================================
// CREATE PROFILE
//==========================================

if(!currentStudent){

    currentStudent={

        roll:studentRoll,

        name:studentName||"Student",

        bio:"BCA Student learning Full Stack Development.",

        location:"India",

        skills:["HTML","CSS","JavaScript"],

        education:[],

        certificates:[],

        projects:[],

        resume:null

    };

    students.push(currentStudent);

    saveStudents();

}


//==========================================
// SAVE
//==========================================

function saveStudents(){

    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );

}


//==========================================
// LOAD PROFILE
//==========================================

function loadProfile(){

    document.getElementById("studentName").textContent=

    currentStudent.name;

    document.getElementById("bio").textContent=

    currentStudent.bio;

    document.querySelector(".location").innerHTML=

    `<i class="fa-solid fa-location-dot"></i> ${currentStudent.location}`;

}

loadProfile();


//==========================================
// THEME
//==========================================

const body=document.body;

const themeBtn=document.getElementById("themeBtn");

let theme=localStorage.getItem("theme")||"light";

body.classList.add(theme+"-theme");

updateThemeIcon();


themeBtn.onclick=function(){

    if(body.classList.contains("light-theme")){

        body.classList.replace("light-theme","dark-theme");

        localStorage.setItem("theme","dark");

    }

    else{

        body.classList.replace("dark-theme","light-theme");

        localStorage.setItem("theme","light");

    }

    updateThemeIcon();

}


function updateThemeIcon(){

    themeBtn.innerHTML=

    body.classList.contains("dark-theme")

    ?'<i class="fa-solid fa-sun"></i>'

    :'<i class="fa-solid fa-moon"></i>';

}



//==========================================
// EDIT PROFILE
//==========================================

const editBtn=document.querySelector(".edit-profile");

editBtn.onclick=function(){

    let name=prompt(

        "Enter Name",

        currentStudent.name

    );

    if(name){

        currentStudent.name=name;

        localStorage.setItem(

            "studentName",

            name

        );

    }

    let bio=prompt(

        "Enter Bio",

        currentStudent.bio

    );

    if(bio){

        currentStudent.bio=bio;

    }

    let location=prompt(

        "Enter Location",

        currentStudent.location

    );

    if(location){

        currentStudent.location=location;

    }

    saveStudents();

    loadProfile();

}



//==========================================
// LOGOUT
//==========================================

const logoutBtn=document.getElementById("logoutBtn");

logoutBtn.onclick=function(){

    let logout=confirm(

        "Logout from PlaceMate?"

    );

    if(!logout) return;

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("studentRoll");

    localStorage.removeItem("studentName");

    window.location.href="login.html";

}


console.log("Dashboard Part 1 Loaded");

/*=========================================
        PlaceMate Dashboard JS
        Part 2
=========================================*/


//==========================================
// SKILLS
//==========================================

const skillsContainer = document.getElementById("skillsContainer");
const addSkillBtn = document.getElementById("addSkillBtn");

function renderSkills(){

    skillsContainer.innerHTML="";

    currentStudent.skills.forEach((skill,index)=>{

        skillsContainer.innerHTML+=`

        <span>

            ${skill}

            <i class="fa-solid fa-xmark remove-skill"
               data-index="${index}"></i>

        </span>

        `;

    });

}

renderSkills();

addSkillBtn.onclick=function(){

    let skill=prompt("Enter Skill");

    if(!skill) return;

    currentStudent.skills.push(skill);

    saveStudents();

    renderSkills();

    updateCareerScore();

}

document.addEventListener("click",function(e){

    if(e.target.classList.contains("remove-skill")){

        let index=e.target.dataset.index;

        currentStudent.skills.splice(index,1);

        saveStudents();

        renderSkills();

        updateCareerScore();

    }

});


//==========================================
// CERTIFICATES
//==========================================

const certificateContainer=document.getElementById("certificateContainer");

const addCertificateBtn=document.getElementById("addCertificateBtn");

function renderCertificates(){

    certificateContainer.innerHTML="";

    currentStudent.certificates.forEach((certificate,index)=>{

        certificateContainer.innerHTML+=`

        <div class="certificate-card">

            <i class="fa-solid fa-award"></i>

            <h3>${certificate.title}</h3>

            <p>${certificate.provider}</p>

            <button
            class="delete-certificate"
            data-index="${index}">

            Delete

            </button>

        </div>

        `;

    });

}

renderCertificates();

addCertificateBtn.onclick=function(){

    let title=prompt("Certificate Name");

    if(!title) return;

    let provider=prompt("Issued By");

    currentStudent.certificates.push({

        title,

        provider

    });

    saveStudents();

    renderCertificates();

    updateCareerScore();

}

document.addEventListener("click",function(e){

if(e.target.classList.contains("delete-certificate")){

let index=e.target.dataset.index;

currentStudent.certificates.splice(index,1);

saveStudents();

renderCertificates();

updateCareerScore();

}

});


//==========================================
// PROJECTS
//==========================================

const projectContainer=document.getElementById("projectContainer");

const addProjectBtn=document.getElementById("addProjectBtn");

function renderProjects(){

projectContainer.innerHTML="";

currentStudent.projects.forEach((project,index)=>{

projectContainer.innerHTML+=`

<div class="project-card">

<h3>${project.title}</h3>

<p>${project.description}</p>

<button

class="delete-project"

data-index="${index}">

Delete

</button>

</div>

`;

});

}

renderProjects();

addProjectBtn.onclick=function(){

let title=prompt("Project Name");

if(!title) return;

let description=prompt("Project Description");

currentStudent.projects.push({

title,

description

});

saveStudents();

renderProjects();

updateCareerScore();

}

document.addEventListener("click",function(e){

if(e.target.classList.contains("delete-project")){

let index=e.target.dataset.index;

currentStudent.projects.splice(index,1);

saveStudents();

renderProjects();

updateCareerScore();

}

});


//==========================================
// RESUME
//==========================================

const uploadResumeBtn=document.getElementById("uploadResumeBtn");

const resumeBox=document.getElementById("resumeBox");

const resumeInput=document.createElement("input");

resumeInput.type="file";

resumeInput.accept=".pdf,.doc,.docx";

resumeInput.style.display="none";

document.body.appendChild(resumeInput);

uploadResumeBtn.onclick=function(){

resumeInput.click();

}

resumeInput.onchange=function(){

let file=resumeInput.files[0];

if(!file) return;

currentStudent.resume={

name:file.name,

date:new Date().toLocaleDateString()

};

saveStudents();

renderResume();

updateCareerScore();

}

function renderResume(){

if(!currentStudent.resume) return;

resumeBox.innerHTML=`

<i class="fa-solid fa-file-pdf"></i>

<div>

<h3>${currentStudent.resume.name}</h3>

<p>

Uploaded : ${currentStudent.resume.date}

</p>

</div>

`;

}

renderResume();


//==========================================
// CAREER SCORE
//==========================================

function updateCareerScore(){

let score=0;

if(currentStudent.bio) score+=20;

if(currentStudent.location) score+=10;

score+=Math.min(currentStudent.skills.length*5,20);

score+=Math.min(currentStudent.projects.length*10,20);

score+=Math.min(currentStudent.certificates.length*5,20);

if(currentStudent.resume) score+=10;

document.getElementById("careerScore").textContent=

score+"%";

document.getElementById("progressBar").style.width=

score+"%";

document.getElementById("progressBar").textContent=

score+"%";

}

updateCareerScore();


//==========================================
// AUTO SAVE
//==========================================

window.addEventListener("beforeunload",saveStudents);

console.log("PlaceMate Dashboard Ready 🚀");