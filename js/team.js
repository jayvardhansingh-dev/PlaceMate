/* ==========================================
   PlaceMate - Core Team Data
========================================== */

const teamMembers = {

    jay: {

        id: "jay",
        name: "Jayvardhan Singh",
        role: "Frontend Developer",
        score: 98,
        projects: 12,
        certificates: 8,
        image: "images/jay.jpg"

    },

    uzair: {

        id: "uzair",
        name: "Uzair",
        role: "Backend Developer",
        score: 95,
        projects: 9,
        certificates: 6,
        image: "images/uzair.jpg"

    },

    utsav: {

        id: "utsav",
        name: "Utsav Saraswat",
        role: "Database Management",
        score: 96,
        projects: 11,
        certificates: 7,
        image: "images/utsav.jpg"

    },

    aakash: {

        id: "aakash",
        name: "Aakash Yadav",
        role: "Project Testing & Documentation",
        score: 94,
        projects: 10,
        certificates: 5,
        image: "images/aakash.jpg"

    }

};


/* ==========================================
   Card Animation
========================================== */

const cards = document.querySelectorAll(".team-card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>observer.observe(card));


/* ==========================================
   Hover Effect
========================================== */

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        card.style.setProperty("--x",(e.clientX-rect.left)+"px");
        card.style.setProperty("--y",(e.clientY-rect.top)+"px");

    });

});


/* ==========================================
   View Profile Button
========================================== */

document.querySelectorAll(".btn").forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.preventDefault();

        const url = new URL(button.href);

        const memberId = url.searchParams.get("id");

        if(teamMembers[memberId]){

            localStorage.setItem(
                "selectedProfile",
                JSON.stringify(teamMembers[memberId])
            );

            window.location.href="profile.html";

        }

    });

});


/* ==========================================
   Navbar Active Link
========================================== */

document.querySelectorAll(".navbar a").forEach(link=>{

    if(link.href===window.location.href){

        link.classList.add("active");

    }

});


/* ==========================================
   Footer Year
========================================== */

const footer=document.querySelector("footer p");

if(footer){

    footer.innerHTML=
    `© ${new Date().getFullYear()} PlaceMate • Built with ❤️ by the Core Team`;

}


/* ==========================================
   Console
========================================== */

console.log("PlaceMate Core Team Loaded 🚀");