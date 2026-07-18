// Authentication
if (!getAdmin()) {

    window.location.href = "admin-login.html";

}

const table = document.getElementById("applicationTable");
const search = document.getElementById("searchApplication");
const statusFilter = document.getElementById("statusFilter");

const modal = document.getElementById("applicationModal");
const body = document.getElementById("applicationBody");
const closeModal = document.querySelector(".close-modal");

const toast = document.getElementById("toast");

let students = Storage.get("registeredUsers") || [];
let applications = Storage.get("applications") || [];
let companyList = Storage.get("companies") || companies;

function toastMsg(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

function renderApplications(data = applications){

    table.innerHTML = "";

    if(data.length===0){

        table.innerHTML = `
        <tr>
            <td colspan="5">
                No Applications Found
            </td>
        </tr>`;

        return;

    }

    data.forEach(app=>{

        const student = students.find(

            s=>s.id==app.userId

        );

        const company = companyList.find(

            c=>c.id==app.companyId

        );

        table.innerHTML += `

        <tr>

        <td>${student?.name || "-"}</td>

        <td>${company?.name || "-"}</td>

        <td>${app.date || "-"}</td>

        <td>

        <select
        class="status-select"
        onchange="changeStatus('${app.id}',this.value)">

        <option ${app.status==="Applied"?"selected":""}>Applied</option>

        <option ${app.status==="Shortlisted"?"selected":""}>Shortlisted</option>

        <option ${app.status==="Interview"?"selected":""}>Interview</option>

        <option ${app.status==="Selected"?"selected":""}>Selected</option>

        <option ${app.status==="Rejected"?"selected":""}>Rejected</option>

        </select>

        </td>

        <td>

        <button
        class="action-btn view-btn"
        onclick="viewApplication('${app.id}')">

        View

        </button>

        </td>

        </tr>

        `;

    });

}

renderApplications();

function changeStatus(id,status){

    applications = applications.map(app=>{

        if(app.id===id){

            app.status=status;

        }

        return app;

    });

    Storage.save("applications",applications);

    toastMsg("Application Updated");

}

function viewApplication(id){

    const app = applications.find(

        a=>a.id===id

    );

    const student = students.find(

        s=>s.id==app.userId

    );

    const company = companyList.find(

        c=>c.id==app.companyId

    );

    body.innerHTML=`

    <h2>${student?.name}</h2>

    <hr><br>

    <p><b>Email :</b> ${student?.email}</p>

    <p><b>Company :</b> ${company?.name}</p>

    <p><b>Role :</b> ${company?.role}</p>

    <p><b>Status :</b> ${app.status}</p>

    <p><b>Applied :</b> ${app.date}</p>

    `;

    modal.style.display="flex";

}

closeModal.onclick=()=>{

modal.style.display="none";

}

window.onclick=e=>{

if(e.target===modal){

modal.style.display="none";

}

}

search.addEventListener("input",filterData);

statusFilter.addEventListener("change",filterData);

function filterData(){

const keyword=search.value.toLowerCase();

const status=statusFilter.value;

let filtered=applications.filter(app=>{

const student=students.find(s=>s.id==app.userId);

const company=companyList.find(c=>c.id==app.companyId);

const matchesSearch=

student?.name.toLowerCase().includes(keyword)||

company?.name.toLowerCase().includes(keyword);

const matchesStatus=

status===""||app.status===status;

return matchesSearch&&matchesStatus;

});

renderApplications(filtered);

}