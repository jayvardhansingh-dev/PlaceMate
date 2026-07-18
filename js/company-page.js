// ======================================
// PlaceMate Companies Page
// ======================================

const companyContainer = document.getElementById("companyContainer");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const packageFilter = document.getElementById("packageFilter");
const roleFilter = document.getElementById("roleFilter");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".close-modal");

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

let favourites = Storage.get("favourites") || [];

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
// Render Companies
// ======================================

function renderCompanies(data){

    companyContainer.innerHTML = "";

    if(data.length===0){

        companyContainer.innerHTML =

        `
        <h2>No Companies Found</h2>
        `;

        return;

    }

    data.forEach(company=>{

        const applied = applications.some(item=>

            item.companyId===company.id

            &&

            item.userId===currentUser.id

        );

        const favourite = favourites.includes(company.id);

        const card=document.createElement("div");

        card.className="company-card";

        card.innerHTML=`

        <div class="company-header">

            <img src="${company.logo}">

            <div>

                <div class="company-name">
                    ${company.name}
                </div>

                <div class="company-role">
                    ${company.role}
                </div>

            </div>

        </div>

        <div class="company-info">

            <p><b>📍</b> ${company.location}</p>

            <p><b>💰</b> ${company.package}</p>

            <p><b>🎓</b> ${company.eligibility}</p>

            <p><b>🕒</b> ${company.deadline}</p>

        </div>

        <div class="skills">

            ${company.skills.map(skill=>`

            <span class="skill">

                ${skill}

            </span>

            `).join("")}

        </div>

        <div class="card-buttons">

            <button
            class="details-btn"
            onclick="showDetails(${company.id})">

            Details

            </button>

            <button
            class="apply-btn"
            onclick="applyJob(${company.id})"

            ${applied?"disabled":""}>

            ${applied?"Applied":"Apply"}

            </button>

        </div>

        <button
        class="fav-btn"
        onclick="toggleFavourite(${company.id})">

        ${favourite?"❤️":"🤍"}

        </button>

        `;

        companyContainer.appendChild(card);

    });

}

// ======================================
// Company Details
// ======================================

function showDetails(id){

    const company = companies.find(c=>c.id===id);

    modalBody.innerHTML=`

    <h2>${company.name}</h2>

    <br>

    <p><b>Role:</b> ${company.role}</p>

    <p><b>Location:</b> ${company.location}</p>

    <p><b>Package:</b> ${company.package}</p>

    <p><b>Eligibility:</b> ${company.eligibility}</p>

    <p><b>Openings:</b> ${company.openings}</p>

    <p><b>Deadline:</b> ${company.deadline}</p>

    <br>

    <h3>Required Skills</h3>

    <ul>

    ${company.skills.map(skill=>

        `<li>${skill}</li>`

    ).join("")}

    </ul>

    `;

    modal.style.display="flex";

}

// ======================================
// Close Modal
// ======================================

closeModal.onclick=()=>{

    modal.style.display="none";

};

window.onclick=(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};

// ======================================
// Apply Job
// ======================================

function applyJob(id){

    const exists = applications.some(item=>

        item.companyId===id

        &&

        item.userId===currentUser.id

    );

    if(exists){

        showToast("Already Applied",false);

        return;

    }

    applications.push({

        companyId:id,

        userId:currentUser.id,

        date:new Date().toLocaleDateString(),

        status:"Applied"

    });

    Storage.save(

        "applications",

        applications

    );

    saveApplications(applications);

    showToast("Application Submitted");

    renderCompanies(filterCompanies());

}

// ======================================
// Favourite
// ======================================

function toggleFavourite(id){

    if(favourites.includes(id)){

        favourites=favourites.filter(i=>i!==id);

    }

    else{

        favourites.push(id);

    }

    Storage.save(

        "favourites",

        favourites

    );

    renderCompanies(filterCompanies());

}

// ======================================
// Filter
// ======================================

function filterCompanies(){

    let result=[...companies];

    const search=searchInput.value.toLowerCase();

    const location=locationFilter.value;

    const role=roleFilter.value;

    const pack=packageFilter.value;

    result=result.filter(company=>{

        const text=

        company.name.toLowerCase()

        +

        company.role.toLowerCase()

        +

        company.skills.join("").toLowerCase();

        return text.includes(search);

    });

    if(location){

        result=result.filter(

            c=>c.location===location

        );

    }

    if(role){

        result=result.filter(

            c=>c.role===role

        );

    }

    if(pack){

        result=result.filter(c=>{

            const value=parseFloat(

                c.package.replace(/[^\d.]/g,"")

            );

            return value>=Number(pack);

        });

    }

    return result;

}

// ======================================
// Events
// ======================================

searchInput.addEventListener("input",()=>{

    renderCompanies(filterCompanies());

});

locationFilter.addEventListener("change",()=>{

    renderCompanies(filterCompanies());

});

roleFilter.addEventListener("change",()=>{

    renderCompanies(filterCompanies());

});

packageFilter.addEventListener("change",()=>{

    renderCompanies(filterCompanies());

});

// ======================================
// Initial Render
// ======================================

renderCompanies(companies);