// ==========================
// Get Member
// ==========================
// ==========================
// Get Member
// ==========================

const loggedUser = getCurrentUser();

console.log("Current User:", loggedUser);

const currentMember = members[loggedUser];

console.log("Current Member:", currentMember);

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        logoutUser();
        window.location.href = "login.html";
    });
}
// ==========================
// Universal Modal
// ==========================

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".close-modal");

function openModal(content){

    modalBody.innerHTML = content;

    modal.style.display = "flex";

}

function hideModal(){

    modal.style.display = "none";

}

closeModal.onclick = hideModal;

window.onclick = function(e){

    if(e.target === modal){

        hideModal();

    }

}

// ==========================
// Helper
// ==========================

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// ==========================
// Basic Info
// ==========================

setText("userName", currentMember.name);
setText("miniName", currentMember.name);
setText("welcomeText", currentMember.name);

setText("userRole", currentMember.role);

setText("careerScore", currentMember.score + "%");

setText("projectCount", currentMember.projects);
setText("certificateCount", currentMember.certificates);
setText("companyCount", currentMember.companies);
setText("applicationCount", currentMember.applications);

// ==========================
// Profile Images
// ==========================

document.getElementById("profileImage").src = currentMember.image;
document.getElementById("miniProfile").src = currentMember.image;
// ==========================
// Quick Actions
// ==========================

const actionGrid = document.getElementById("actionGrid");

if (actionGrid) {

    actionGrid.innerHTML = "";

    currentMember.actions.forEach(action => {

        actionGrid.innerHTML += `
            <div class="action-card">
                <h3>${action}</h3>
            </div>
        `;

    });

}

// ==========================
// Projects
// ==========================

const projectGrid = document.getElementById("projectGrid");

if(projectGrid){

    projectGrid.innerHTML="";

    currentMember.projectsList.forEach(project=>{

        projectGrid.innerHTML+=`

        <div class="project-card">

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <button class="view-project">

                View Details

            </button>

        </div>

        `;

    });

    document.querySelectorAll(".view-project").forEach((btn,index)=>{

        btn.onclick=()=>{

            const p=currentMember.projectsList[index];

            openModal(`

                <h2>${p.title}</h2>

                <br>

                <p><b>Description</b></p>

                <p>${p.description}</p>

                <br>

                <p><b>Technology</b></p>

                <p>${p.tech}</p>

                <br>

                <p><b>Status</b></p>

                <p>${p.status}</p>

            `);

        };

    });

}

// ==========================
// Skills
// ==========================

const skillsContainer = document.getElementById("skillsContainer");

if (skillsContainer) {

    skillsContainer.innerHTML = "";

    currentMember.skills.forEach(skill => {

        skillsContainer.innerHTML += `

            <div class="skill">

                <div class="skill-title">

                    <span>${skill.name}</span>

                    <span>${skill.percent}%</span>

                </div>

                <div class="progress">

                    <div
                        class="progress-fill"
                        style="width:${skill.percent}%">
                    </div>

                </div>

            </div>

        `;

    });

}



// ==========================
// Certificates
// ==========================

const certificateGrid = document.getElementById("certificateGrid");

if (certificateGrid) {

    for (let i = 1; i <= currentMember.certificates; i++) {

        certificateGrid.innerHTML += `

            <div class="certificate-card">

                <i class="fa-solid fa-award"></i>

                <h3>Certificate ${i}</h3>

                <p>Professional Skill Certificate</p>

            </div>

        `;

    }

}

// ==========================
// Team
// ==========================

const teamGrid = document.getElementById("teamGrid");

if(teamGrid){

    teamGrid.innerHTML = "";

    Object.values(members).forEach(member=>{

        teamGrid.innerHTML += `

        <div class="team-card" data-id="${member.id}">

            <img src="${member.image}">

            <h3>${member.name}</h3>

            <p>${member.role}</p>

        </div>

        `;

    });

    document.querySelectorAll(".team-card").forEach(card=>{

        card.onclick=()=>{

            const id=card.dataset.id;

            const member=Object.values(members).find(m=>m.id==id);

            openModal(`

                <center>

                <img src="${member.image}">

                <h2>${member.name}</h2>

                <p>${member.role}</p>

                <br>

                <h3>Statistics</h3>

                <p>Projects : ${member.projects}</p>

                <p>Certificates : ${member.certificates}</p>

                <p>Applications : ${member.applications}</p>

                <br>

                <h3>Skills</h3>

                <ul>

                ${member.skills.map(skill=>`<li>${skill.name} (${skill.percent}%)</li>`).join("")}

                </ul>

                </center>

            `);

        };

    });

}

// ==========================
// Notifications
// ==========================

const notificationList = document.getElementById("notificationList");

if (notificationList) {

    notificationList.innerHTML = `

        <div class="notification-card">
            Resume Updated Successfully
        </div>

        <div class="notification-card">
            New Placement Drive Available
        </div>

        <div class="notification-card">
            ${currentMember.companies} Companies Interested
        </div>

    `;

}

// ==========================
// Activity
// ==========================

const activityList = document.getElementById("activityList");

if (activityList) {

    activityList.innerHTML = `

        <div class="activity-card">
            <i class="fa-solid fa-code"></i>
            <div>
                <h4>Completed Portfolio Project</h4>
                <small>Today</small>
            </div>
        </div>

        <div class="activity-card">
            <i class="fa-solid fa-file"></i>
            <div>
                <h4>Resume Updated</h4>
                <small>Yesterday</small>
            </div>
        </div>

        <div class="activity-card">
            <i class="fa-solid fa-building"></i>
            <div>
                <h4>Applied to Company</h4>
                <small>2 Days Ago</small>
            </div>
        </div>

    `;

}

// ==========================
// Theme Toggle
// ==========================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

    });

}

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");

const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click",()=>{

    sidebar.classList.add("show");

    overlay.classList.add("show");

});

overlay.addEventListener("click",()=>{

    sidebar.classList.remove("show");

    overlay.classList.remove("show");

});

document.querySelectorAll(".sidebar a").forEach(link=>{

    link.addEventListener("click",()=>{

        sidebar.classList.remove("show");

        overlay.classList.remove("show");

    });

});