// ======================================
// PlaceMate Company Management
// ======================================

// Authentication
if (!getAdmin()) {
    window.location.href = "admin-login.html";
}

// Elements
const companyTable = document.getElementById("companyTable");
const searchCompany = document.getElementById("searchCompany");
const companyModal = document.getElementById("companyModal");
const companyForm = document.getElementById("companyForm");
const modalTitle = document.getElementById("modalTitle");

const companyId = document.getElementById("companyId");
const companyName = document.getElementById("companyName");
const companyLogo = document.getElementById("companyLogo");
const companyRole = document.getElementById("companyRole");
const companyPackage = document.getElementById("companyPackage");
const companyLocation = document.getElementById("companyLocation");
const companyEligibility = document.getElementById("companyEligibility");
const companyDeadline = document.getElementById("companyDeadline");
const companyOpenings = document.getElementById("companyOpenings");
const companySkills = document.getElementById("companySkills");

const addCompanyBtn = document.getElementById("addCompanyBtn");
const closeModal = document.querySelector(".close-modal");
const toast = document.getElementById("toast");

// Load Companies
let companyList = Storage.get("companies");

if (!companyList) {
    companyList = [...companies];
    Storage.save("companies", companyList);
}

// Toast
function showToast(message, success = true) {

    toast.textContent = message;

    toast.style.background =
        success ? "#16a34a" : "#dc2626";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// Render Companies
function renderCompanies(data = companyList) {

    companyTable.innerHTML = "";

    if (data.length === 0) {

        companyTable.innerHTML = `
        <tr>
            <td colspan="8">
                No Companies Found
            </td>
        </tr>
        `;

        return;

    }

    data.forEach(company => {

        companyTable.innerHTML += `

        <tr>

            <td>

                <img
                src="${company.logo}"
                width="45">

            </td>

            <td>${company.name}</td>

            <td>${company.role}</td>

            <td>${company.package}</td>

            <td>${company.location}</td>

            <td>${company.deadline}</td>

            <td>${company.openings}</td>

            <td>

                <button
                class="action-btn view-btn"
                onclick="editCompany('${company.id}')">

                Edit

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteCompany('${company.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

renderCompanies();

// Search
searchCompany.addEventListener("input", () => {

    const keyword = searchCompany.value.toLowerCase();

    const filtered = companyList.filter(company =>

        company.name.toLowerCase().includes(keyword) ||

        company.role.toLowerCase().includes(keyword)

    );

    renderCompanies(filtered);

});

// Open Add Modal
addCompanyBtn.onclick = () => {

    companyForm.reset();

    companyId.value = "";

    modalTitle.textContent = "Add Company";

    companyModal.style.display = "flex";

};

// Close Modal
closeModal.onclick = () => {

    companyModal.style.display = "none";

};

window.onclick = e => {

    if (e.target === companyModal) {

        companyModal.style.display = "none";

    }

};

// Save Company
companyForm.addEventListener("submit", e => {

    e.preventDefault();

    const companyData = {

        id: companyId.value || Date.now().toString(),

        name: companyName.value,

        logo: companyLogo.value,

        role: companyRole.value,

        package: companyPackage.value,

        location: companyLocation.value,

        eligibility: companyEligibility.value,

        deadline: companyDeadline.value,

        openings: companyOpenings.value,

        skills: companySkills.value
            .split(",")
            .map(skill => skill.trim())

    };

    if (companyId.value) {

        companyList = companyList.map(company =>

            company.id === companyId.value

                ? companyData

                : company

        );

        showToast("Company Updated");

    } else {

        companyList.push(companyData);

        showToast("Company Added");

    }

    Storage.save("companies", companyList);

    renderCompanies();

    companyModal.style.display = "none";

});

// Edit Company
function editCompany(id) {

    const company = companyList.find(c => c.id == id);

    if (!company) return;

    modalTitle.textContent = "Edit Company";

    companyId.value = company.id;
    companyName.value = company.name;
    companyLogo.value = company.logo;
    companyRole.value = company.role;
    companyPackage.value = company.package;
    companyLocation.value = company.location;
    companyEligibility.value = company.eligibility;
    companyDeadline.value = company.deadline;
    companyOpenings.value = company.openings;
    companySkills.value = company.skills.join(", ");

    companyModal.style.display = "flex";

}

// Delete Company
function deleteCompany(id) {

    if (!confirm("Delete this company?")) return;

    companyList = companyList.filter(company => company.id != id);

    Storage.save("companies", companyList);

    renderCompanies();

    showToast("Company Deleted");

}