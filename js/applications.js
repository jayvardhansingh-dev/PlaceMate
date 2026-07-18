// ======================================
// PlaceMate Applications
// ======================================

const container = document.getElementById("applicationsContainer");
const emptyState = document.getElementById("emptyState");
const statusFilter = document.getElementById("statusFilter");

const totalApplications = document.getElementById("totalApplications");
const shortlistedCount = document.getElementById("shortlistedCount");
const interviewCount = document.getElementById("interviewCount");
const selectedCount = document.getElementById("selectedCount");

const toast = document.getElementById("toast");

// ======================================
// Current User
// ======================================

const currentUser = Storage.get("currentUser");

if (!currentUser) {

    window.location.href = "login.html";

}

// ======================================
// Storage
// ======================================

let applications = Storage.get("applications") || [];

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
// Render Applications
// ======================================

function renderApplications(){

    container.innerHTML = "";

    let myApplications = applications.filter(app=>{

        return app.userId === currentUser.id;

    });

    const status = statusFilter.value;

    if(status){

        myApplications = myApplications.filter(app=>{

            return app.status === status;

        });

    }

    updateStatistics(myApplications);

    if(myApplications.length===0){

        emptyState.style.display="block";

        container.style.display="none";

        return;

    }

    emptyState.style.display="none";

    container.style.display="grid";

    myApplications.forEach(app=>{

        const company = companies.find(c=>{

            return c.id===app.companyId;

        });

        const card=document.createElement("div");

        card.className="application-card";

        card.innerHTML=`

        <div class="company-top">

            <img src="${company.logo}">

            <div>

                <div class="company-name">

                    ${company.name}

                </div>

                <div class="role">

                    ${company.role}

                </div>

            </div>

        </div>

        <div class="info">

            <p><b>📍</b> ${company.location}</p>

            <p><b>💰</b> ${company.package}</p>

            <p><b>📅</b> ${app.date}</p>

        </div>

        <span class="status ${app.status.toLowerCase()}">

            ${app.status}

        </span>

        <div class="card-buttons">

            <button

                class="view-btn"

                onclick="viewApplication(${company.id})">

                View

            </button>

            <button

                class="withdraw-btn"

                onclick="withdrawApplication(${company.id})">

                Withdraw

            </button>

        </div>

        `;

        container.appendChild(card);

    });

}

// ======================================
// Statistics
// ======================================

function updateStatistics(data){

    totalApplications.innerHTML = data.length;

    shortlistedCount.innerHTML =

        data.filter(a=>a.status==="Shortlisted").length;

    interviewCount.innerHTML =

        data.filter(a=>a.status==="Interview").length;

    selectedCount.innerHTML =

        data.filter(a=>a.status==="Selected").length;

}

// ======================================
// View Application
// ======================================

function viewApplication(id){

    const company = companies.find(c=>c.id===id);

    alert(

`${company.name}

Role : ${company.role}

Location : ${company.location}

Package : ${company.package}

Eligibility : ${company.eligibility}

Deadline : ${company.deadline}`

    );

}

// ======================================
// Withdraw
// ======================================

function withdrawApplication(id){

    const confirmDelete = confirm(

        "Withdraw this application?"

    );

    if(!confirmDelete){

        return;

    }

    applications = applications.filter(app=>{

        return !(

            app.companyId===id

            &&

            app.userId===currentUser.id

        );

    });

    Storage.save(

        "applications",

        applications

    );

    showToast("Application Withdrawn");

    renderApplications();

}

// ======================================
// Filter
// ======================================

statusFilter.addEventListener("change",()=>{

    renderApplications();

});

// ======================================
// Initial Render
// ======================================

renderApplications();