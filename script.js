/* ==========================================
        PLACE MATE
        SCRIPT.JS
========================================== */

/* ==========================================
        SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/* ==========================================
        COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");

const speed = 200;

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = Math.ceil(target / speed);

        if (count < target) {

            counter.innerText = count + increment;

            setTimeout(updateCounter, 10);

        } else {

            counter.innerText = target + "+";

        }

    };

    updateCounter();

});

/* ==========================================
        BACK TO TOP
========================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================
        TEAM POPUP
========================================== */

const teamCards = document.querySelectorAll(".team-card");

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

teamCards.forEach(card => {

    card.addEventListener("click", () => {

        modalImage.src = card.querySelector("img").src;

        modalName.innerText = card.dataset.name;

        modalRole.innerText = card.dataset.role;

        modalRoll.innerText = card.dataset.roll;

        modalEmail.innerText = card.dataset.email;

        modalSkills.innerText = card.dataset.skills;

        if (card.dataset.github) {

            githubLink.href = card.dataset.github;

            githubLink.style.display = "inline-block";

        } else {

            githubLink.style.display = "none";

        }

        if (card.dataset.linkedin) {

            linkedinLink.href = card.dataset.linkedin;

            linkedinLink.style.display = "inline-block";

        } else {

            linkedinLink.style.display = "none";

        }

        profileModal.classList.add("active");

    });

});

closeProfile.addEventListener("click", () => {

    profileModal.classList.remove("active");

});

window.addEventListener("click", (e) => {

    if (e.target === profileModal) {

        profileModal.classList.remove("active");

    }

});

/* ==========================================
        APPLY MODAL
========================================== */

const applyModal = document.getElementById("applyModal");

const applyButtons = document.querySelectorAll(".job-btn");

const companyName = document.getElementById("companyName");

const closeModal = document.querySelector(".close-modal");

applyButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        const company = this.parentElement.querySelector("span").innerText;

        companyName.innerText = company;

        applyModal.style.display = "flex";

    });

});

closeModal.addEventListener("click", () => {

    applyModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === applyModal) {

        applyModal.style.display = "none";

    }

});

/* ==========================================
        CONTACT FORM
========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("✅ Thank you! Your message has been sent successfully.");

        contactForm.reset();

    });

}

/* ==========================================
        APPLY FORM
========================================== */

const applyForm = document.getElementById("applyForm");

if (applyForm) {

    applyForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("🎉 Application Submitted Successfully!");

        applyModal.style.display = "none";

        applyForm.reset();

    });

}

/* ==========================================
        ACTIVE NAVBAR
========================================== */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
        SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(

".feature-card,\
.job-card,\
.company-card,\
.success-card,\
.team-card,\
.news-card,\
.stat-card,\
.process-step,\
.faq-item"

);

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < trigger) {

            el.style.opacity = "1";

            el.style.transform = "translateY(0)";

        }

    });

};

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform = "translateY(40px)";

    el.style.transition = ".6s ease";

});

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* ==========================================
        HERO BUTTONS
========================================== */

const exploreBtn = document.querySelector(".primary-btn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", function () {

        console.log("Explore Jobs Clicked");

    });

}

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        console.log("Student Login");

    });

}

/* ==========================================
        FLOATING HEADER
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.padding = "0 8%";

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow = "0 5px 25px rgba(0,0,0,.08)";

    }

});

/* ==========================================
        FADE HERO CONTENT
========================================== */

const heroLeft = document.querySelector(".hero-left");

const heroRight = document.querySelector(".hero-right");

window.addEventListener("load", () => {

    if (heroLeft) {

        heroLeft.style.opacity = "0";

        heroLeft.style.transform = "translateX(-40px)";

    }

    if (heroRight) {

        heroRight.style.opacity = "0";

        heroRight.style.transform = "translateX(40px)";

    }

    setTimeout(() => {

        if (heroLeft) {

            heroLeft.style.transition = ".8s";

            heroLeft.style.opacity = "1";

            heroLeft.style.transform = "translateX(0)";

        }

        if (heroRight) {

            heroRight.style.transition = ".8s";

            heroRight.style.opacity = "1";

            heroRight.style.transform = "translateX(0)";

        }

    }, 200);

});

/* ==========================================
        PREVENT EMPTY LINKS
========================================== */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

    });

});

/* ==========================================
        CONSOLE MESSAGE
========================================== */

console.log("🚀 PlaceMate Landing Page Loaded Successfully");

/* ==========================================
        SEARCH JOBS
========================================== */

const searchInput = document.getElementById("jobSearch");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const jobs = document.querySelectorAll(".job-card");

        jobs.forEach(job => {

            const text = job.innerText.toLowerCase();

            job.style.display = text.includes(value) ? "block" : "none";

        });

    });

}

/* ==========================================
        LOADING SCREEN
========================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(()=>{

            loader.style.display = "none";

        },500);

    }

});

/* ==========================================
        BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(this.clientWidth,this.clientHeight);

        const radius=diameter/2;

        circle.style.width=circle.style.height=`${diameter}px`;

        circle.style.left=`${e.clientX-this.getBoundingClientRect().left-radius}px`;

        circle.style.top=`${e.clientY-this.getBoundingClientRect().top-radius}px`;

        circle.classList.add("ripple");

        const ripple=this.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

/* ==========================================
        CURRENT YEAR
========================================== */

const year=document.getElementById("currentYear");

if(year){

    year.textContent=new Date().getFullYear();

}

/* ==========================================
        PAGE FADE
========================================== */

document.body.style.opacity="0";

window.addEventListener("load",()=>{

    document.body.style.transition=".6s";

    document.body.style.opacity="1";

});

/* ==========================================
        PAGE READY
========================================== */

console.log("✅ PlaceMate Premium Version Ready");