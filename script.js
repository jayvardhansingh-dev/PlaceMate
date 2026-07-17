console.log("CareerConnect Loaded");

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
        document.getElementById("companies").scrollIntoView({
            behavior: "smooth"
        });
    });
}

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
    registerBtn.addEventListener("click", function () {
        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// ============================
// APPLY MODAL
// ============================

const applyModal = document.getElementById("applyModal");
const applyForm = document.getElementById("applyForm");
const companyName = document.getElementById("companyName");
const closeModal = document.querySelector(".close-modal");

const applyBtns = document.querySelectorAll(".apply-btn");

applyBtns.forEach(btn => {

    btn.addEventListener("click", function(){

        const company =
        this.parentElement.querySelector("h3").innerText;

        companyName.innerText = company;

        applyModal.style.display = "flex";

    });

});

closeModal.addEventListener("click", function(){

    applyModal.style.display = "none";

});

window.addEventListener("click", function(e){

    if(e.target === applyModal){

        applyModal.style.display = "none";

    }

});

// ============================
// APPLY FORM SUBMIT
// ============================

applyForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const resume = document.getElementById("studentResume").files.length;

    if(name === "" || email === "" || phone === "" || resume === 0){

        alert("Please fill all the fields.");

        return;

    }

    alert(
        "🎉 Congratulations " + name +
        "!\n\nYour application for " +
        companyName.innerText +
        " has been submitted successfully."
    );

    applyForm.reset();

    applyModal.style.display = "none";

});

/*====================================
        TEAM PROFILE POPUP
====================================*/

const teamMembers = document.querySelectorAll(".team-circle");

const profileModal = document.getElementById("profileModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalRoll = document.getElementById("modalRoll");
const modalEmail = document.getElementById("modalEmail");
const modalSkills = document.getElementById("modalSkills");

const githubLink = document.getElementById("githubLink");
const linkedinLink = document.getElementById("linkedinLink");

const closeProfile = document.querySelector(".close-profile");

teamMembers.forEach(member => {

    member.addEventListener("click", () => {

        modalImage.src = member.querySelector("img").src;

        modalName.innerText = member.dataset.name;
        modalRole.innerText = member.dataset.role;
        modalRoll.innerText = member.dataset.roll;
        modalEmail.innerText = member.dataset.email;
        modalSkills.innerText = member.dataset.skills;

        if(member.dataset.github){
            githubLink.href = member.dataset.github;
            githubLink.style.display = "inline-block";
        }else{
            githubLink.style.display = "none";
        }

        if(member.dataset.linkedin){
            linkedinLink.href = member.dataset.linkedin;
            linkedinLink.style.display = "inline-block";
        }else{
            linkedinLink.style.display = "none";
        }

        profileModal.style.display = "flex";

    });

});

closeProfile.addEventListener("click", () => {

    profileModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === profileModal){

        profileModal.style.display = "none";

    }

});