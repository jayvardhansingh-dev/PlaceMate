// ======================================
// PlaceMate Profile
// ======================================

const profileForm = document.getElementById("profileForm");

const profileImage = document.getElementById("profileImage");
const photoInput = document.getElementById("photoInput");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const collegeInput = document.getElementById("college");
const branchInput = document.getElementById("branch");
const semesterInput = document.getElementById("semester");
const cgpaInput = document.getElementById("cgpa");
const bioInput = document.getElementById("bio");

const toast = document.getElementById("toast");

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

    },3000);

}

// ======================================
// Current User
// ======================================

let currentUser = Storage.get("currentUser");

if(!currentUser){

    window.location.href = "login.html";

}

// ======================================
// Load Profile
// ======================================

function loadProfile(){

    nameInput.value = currentUser.name || "";

    emailInput.value = currentUser.email || "";

    phoneInput.value = currentUser.phone || "";

    collegeInput.value = currentUser.college || "";

    branchInput.value = currentUser.branch || "";

    semesterInput.value = currentUser.semester || "";

    cgpaInput.value = currentUser.cgpa || "";

    bioInput.value = currentUser.bio || "";

    profileImage.src =
        currentUser.image || "images/default-avatar.png";

}

loadProfile();

// ======================================
// Save Profile
// ======================================

profileForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    currentUser.name = nameInput.value.trim();

    currentUser.email = emailInput.value.trim();

    currentUser.phone = phoneInput.value.trim();

    currentUser.college = collegeInput.value.trim();

    currentUser.branch = branchInput.value.trim();

    currentUser.semester = semesterInput.value.trim();

    currentUser.cgpa = cgpaInput.value.trim();

    currentUser.bio = bioInput.value.trim();

    Storage.save(

        "currentUser",

        currentUser

    );

    // Update Registered User

    let users = Storage.get("registeredUsers") || [];

    users = users.map(user=>{

        if(user.id === currentUser.id){

            return currentUser;

        }

        return user;

    });

    Storage.save(

        "registeredUsers",

        users

    );

    saveNotification("Profile Updated");

    showToast("Profile Saved Successfully");

});

// ======================================
// Upload Image
// ======================================

photoInput.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file){

        return;

    }

    const reader = new FileReader();

    reader.onload=function(){

        profileImage.src = reader.result;

        currentUser.image = reader.result;

        Storage.save(

            "currentUser",

            currentUser

        );

    }

    reader.readAsDataURL(file);

});

// ======================================
// Profile Completion
// ======================================

function profileCompletion(){

    let total = 8;

    let done = 0;

    if(currentUser.name) done++;

    if(currentUser.email) done++;

    if(currentUser.phone) done++;

    if(currentUser.college) done++;

    if(currentUser.branch) done++;

    if(currentUser.semester) done++;

    if(currentUser.cgpa) done++;

    if(currentUser.bio) done++;

    return Math.round(done/total*100);

}

console.log(

    "Profile Completion :",

    profileCompletion()+"%"

);