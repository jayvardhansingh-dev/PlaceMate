// ======================================
// PlaceMate Admin Dashboard
// ======================================

// ---------- Authentication ----------
const admin = getAdmin();

if (!admin) {
    window.location.href = "admin-login.html";
}

// ---------- Dashboard Elements ----------
const studentCount = document.getElementById("studentCount");
const companyCount = document.getElementById("companyCount");
const applicationCount = document.getElementById("applicationCount");
const placedCount = document.getElementById("placedCount");

const recentStudents = document.getElementById("recentStudents");
const recentApplications = document.getElementById("recentApplications");
const upcomingDrives = document.getElementById("upcomingDrives");
const recentNotices = document.getElementById("recentNotices");

// ---------- Storage ----------
const students = Storage.get("registeredUsers") || [];
const applications = Storage.get("applications") || [];
const notices = Storage.get("notices") || [];
const drives = Storage.get("drives") || [];

// ---------- Statistics ----------
studentCount.textContent = students.length;

companyCount.textContent = companies.length;

applicationCount.textContent = applications.length;

placedCount.textContent = applications.filter(app =>
    app.status === "Selected"
).length;

// ======================================
// Recent Students
// ======================================

function loadStudents(){

    recentStudents.innerHTML = "";

    if(students.length === 0){

        recentStudents.innerHTML =
        "<p>No students registered.</p>";

        return;

    }

    students
    .slice(-5)
    .reverse()
    .forEach(student=>{

        recentStudents.innerHTML += `

        <div class="list-item">

            <div>

                <div class="list-title">

                    ${student.name}

                </div>

                <div class="list-sub">

                    ${student.branch || "N/A"}

                </div>

            </div>

            <span>

                Semester ${student.semester || "-"}

            </span>

        </div>

        `;

    });

}

// ======================================
// Recent Applications
// ======================================

function loadApplications(){

    recentApplications.innerHTML = "";

    if(applications.length===0){

        recentApplications.innerHTML =
        "<p>No applications yet.</p>";

        return;

    }

    applications
    .slice(-5)
    .reverse()
    .forEach(app=>{

        const student = students.find(s=>s.id===app.userId);

        const company = companies.find(c=>c.id===app.companyId);

        recentApplications.innerHTML += `

        <div class="list-item">

            <div>

                <div class="list-title">

                    ${student ? student.name : "Unknown Student"}

                </div>

                <div class="list-sub">

                    ${company ? company.name : "Unknown Company"}

                </div>

            </div>

            <span>

                ${app.status}

            </span>

        </div>

        `;

    });

}

// ======================================
// Drives
// ======================================

function loadDrives(){

    upcomingDrives.innerHTML = "";

    if(drives.length===0){

        upcomingDrives.innerHTML =
        "<p>No upcoming drives.</p>";

        return;

    }

    drives
    .slice(0,5)
    .forEach(drive=>{

        upcomingDrives.innerHTML += `

        <div class="list-item">

            <div>

                <div class="list-title">

                    ${drive.company}

                </div>

                <div class="list-sub">

                    ${drive.date}

                </div>

            </div>

            <span>

                ${drive.time || ""}

            </span>

        </div>

        `;

    });

}

// ======================================
// Notices
// ======================================

function loadNotices(){

    recentNotices.innerHTML = "";

    if(notices.length===0){

        recentNotices.innerHTML =
        "<p>No notices available.</p>";

        return;

    }

    notices
    .slice(-5)
    .reverse()
    .forEach(notice=>{

        recentNotices.innerHTML += `

        <div class="list-item">

            <div>

                <div class="list-title">

                    ${notice.title}

                </div>

                <div class="list-sub">

                    ${notice.date}

                </div>

            </div>

        </div>

        `;

    });

}

// ======================================
// Placement Chart
// ======================================

new Chart(

document.getElementById("placementChart"),

{

    type:"doughnut",

    data:{

        labels:[

            "Placed",

            "Not Placed"

        ],

        datasets:[{

            data:[

                placedCount.textContent,

                studentCount.textContent - placedCount.textContent

            ]

        }]

    }

});

// ======================================
// Applications Chart
// ======================================

new Chart(

document.getElementById("applicationChart"),

{

    type:"bar",

    data:{

        labels:[

            "Applications"

        ],

        datasets:[{

            label:"Total",

            data:[

                applicationCount.textContent

            ]

        }]

    }

});

// ======================================
// Initial Load
// ======================================

loadStudents();

loadApplications();

loadDrives();

loadNotices();

const profileMenu = document.getElementById("profileMenu");

const dropdown = document.querySelector(".profile-dropdown");

profileMenu.addEventListener("click", () => {

    dropdown.classList.toggle("show");

});

window.addEventListener("click", (e) => {

    if (!profileMenu.contains(e.target)) {

        dropdown.classList.remove("show");

    }

});

document.getElementById("logoutBtn").addEventListener("click", () => {

    if (confirm("Logout from Admin Panel?")) {

        Storage.remove("admin");

        window.location.href = "admin-login.html";

    }

});