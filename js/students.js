// ======================================
// PlaceMate Student Management
// ======================================

// Authentication
if (!getAdmin()) {

    window.location.href = "admin-login.html";

}

// Elements
const table = document.getElementById("studentTable");
const search = document.getElementById("searchStudent");
const branchFilter = document.getElementById("branchFilter");
const semesterFilter = document.getElementById("semesterFilter");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

const closeModal = document.querySelector(".close-modal");

const toast = document.getElementById("toast");

// Data
let students = Storage.get("registeredUsers") || [];

let applications = Storage.get("applications") || [];

// Toast
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

// Render Table
function renderStudents(data){

    table.innerHTML = "";

    if(data.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="8">

                No Students Found

            </td>

        </tr>

        `;

        return;

    }

    data.forEach(student=>{

        const totalApplications =

        applications.filter(app=>

            app.userId===student.id

        ).length;

        table.innerHTML += `

        <tr>

            <td>

                <img
                src="${student.image || '../images/default-avatar.png'}">

            </td>

            <td>

                ${student.name}

            </td>

            <td>

                ${student.email}

            </td>

            <td>

                ${student.branch || "-"}

            </td>

            <td>

                ${student.semester || "-"}

            </td>

            <td>

                ${student.cgpa || "-"}

            </td>

            <td>

                ${totalApplications}

            </td>

            <td>

                <button
                class="action-btn view-btn"
                onclick="viewStudent(${student.id})">

                View

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteStudent(${student.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// View Profile
function viewStudent(id){

    const student = students.find(

        s=>s.id===id

    );

    modalBody.innerHTML=`

    <div style="text-align:center">

        <img

        src="${student.image || '../images/default-avatar.png'}"

        style="width:120px;height:120px;border-radius:50%;margin-bottom:20px">

        <h2>

            ${student.name}

        </h2>

        <p>

            ${student.email}

        </p>

    </div>

    <hr><br>

    <p><b>Phone:</b> ${student.phone || "-"}</p>

    <p><b>College:</b> ${student.college || "-"}</p>

    <p><b>Branch:</b> ${student.branch || "-"}</p>

    <p><b>Semester:</b> ${student.semester || "-"}</p>

    <p><b>CGPA:</b> ${student.cgpa || "-"}</p>

    <p><b>Bio:</b> ${student.bio || "-"}</p>

    `;

    modal.style.display="flex";

}

// Close Modal
closeModal.onclick=()=>{

    modal.style.display="none";

};

window.onclick=(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};

// Delete Student
function deleteStudent(id){

    const confirmDelete = confirm(

        "Delete this student?"

    );

    if(!confirmDelete){

        return;

    }

    students = students.filter(

        student=>student.id!==id

    );

    Storage.save(

        "registeredUsers",

        students

    );

    applications = applications.filter(

        app=>app.userId!==id

    );

    Storage.save(

        "applications",

        applications

    );

    renderStudents(filterStudents());

    showToast("Student Deleted");

}

// Filter
function filterStudents(){

    let data=[...students];

    const keyword=search.value.toLowerCase();

    const branch=branchFilter.value;

    const semester=semesterFilter.value;

    data=data.filter(student=>{

        return (

            student.name.toLowerCase().includes(keyword)

            ||

            student.email.toLowerCase().includes(keyword)

        );

    });

    if(branch){

        data=data.filter(

            s=>s.branch===branch

        );

    }

    if(semester){

        data=data.filter(

            s=>String(s.semester)===semester

        );

    }

    return data;

}

// Events
search.addEventListener("input",()=>{

    renderStudents(filterStudents());

});

branchFilter.addEventListener("change",()=>{

    renderStudents(filterStudents());

});

semesterFilter.addEventListener("change",()=>{

    renderStudents(filterStudents());

});

// Initial Load
renderStudents(students);