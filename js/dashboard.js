/* ==========================================
   PlaceMate V2 - home.js (Part 1)
========================================== */

// ---------------------------
// LOGIN CHECK
// ---------------------------

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// ---------------------------
// LOAD STUDENT
// ---------------------------

const studentName =
    localStorage.getItem("studentName") || "Student";

const studentRoll =
    localStorage.getItem("studentRoll") || "";

document.getElementById("studentName").textContent =
    studentName;

// ---------------------------
// THEME
// ---------------------------

const body = document.body;

const themeBtn = document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem("theme") || "light";

body.classList.remove("light-theme", "dark-theme");

body.classList.add(savedTheme + "-theme");

updateThemeIcon();

themeBtn.addEventListener("click", () => {

    if (body.classList.contains("light-theme")) {

        body.classList.remove("light-theme");

        body.classList.add("dark-theme");

        localStorage.setItem("theme", "dark");

    } else {

        body.classList.remove("dark-theme");

        body.classList.add("light-theme");

        localStorage.setItem("theme", "light");

    }

    updateThemeIcon();

});

function updateThemeIcon() {

    if (body.classList.contains("dark-theme")) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}

// ---------------------------
// LOGOUT
// ---------------------------

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("studentName");

    localStorage.removeItem("studentRoll");

    window.location.href = "login.html";

});

// ---------------------------
// POSTS
// ---------------------------

let posts =
    JSON.parse(localStorage.getItem("posts")) || [];

const postInput =
    document.querySelector(".post-top input");

const postBtn =
    document.querySelector(".post-btn");

const postContainer =
    document.getElementById("postContainer");

// ---------------------------
// CREATE POST
// ---------------------------

postBtn.addEventListener("click", () => {

    const text = postInput.value.trim();

    if (!text) {

        alert("Write something first.");

        return;

    }

    const post = {

        id: Date.now(),

        name: studentName,

        roll: studentRoll,

        text: text,

        image: "",

        likes: [],

        comments: [],

        timestamp: Date.now()

    };

    posts.unshift(post);

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    postInput.value = "";

    function renderPosts(){

    postContainer.innerHTML="";

    if(posts.length===0){

        postContainer.innerHTML=`

        <div class="empty-feed">

            <i class="fa-solid fa-comments"></i>

            <h2>No Posts Yet</h2>

            <p>Create your first post.</p>

        </div>

        `;

        return;

    }

    posts.forEach(post=>{

        const liked=post.likes.includes(studentRoll);

        postContainer.innerHTML+=`

<div class="post-card">

<div class="post-header">

<div class="post-user">

<img src="images/default-profile.png">

<div>

<div class="post-name">${post.name}</div>

<div class="post-time">${formatTime(post.timestamp)}</div>

</div>

</div>

${
post.roll===studentRoll?

`

<div>

<button onclick="editPost(${post.id})" class="more-btn">

<i class="fa-solid fa-pen"></i>

</button>

<button onclick="deletePost(${post.id})" class="more-btn">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`

:""

}

</div>

<div class="post-content">

${post.text}

</div>

${
post.image?

`<img src="${post.image}" class="post-image">`

:""

}

<div class="post-info">

<span>

❤️ ${post.likes.length}

</span>

<span>

💬 ${post.comments.length}

</span>

</div>

<div class="post-actions-bar">

<button

class="like-btn ${liked?"active":""}"

onclick="toggleLike(${post.id})">

<i class="fa-regular fa-heart"></i>

Like

</button>

<button onclick="document.getElementById('comment-${post.id}').focus()">

<i class="fa-regular fa-comment"></i>

Comment

</button>

<button onclick="sharePost(${post.id})">

<i class="fa-solid fa-share"></i>

Share

</button>

</div>

<div class="comment-box">

<input

id="comment-${post.id}"

class="comment-input"

placeholder="Write a comment...">

<button

class="profile-btn"

style="margin-top:12px"

onclick="addComment(${post.id})">

Comment

</button>

<div class="comments">

${post.comments.map(c=>`

<div class="comment">

<strong>${c.user}</strong><br>

${c.text}

</div>

`).join("")}

</div>

</div>

</div>

`;

    });

}

});

// ---------------------------
// TIME FORMAT
// ---------------------------

function formatTime(time) {

    const seconds =
        Math.floor((Date.now() - time) / 1000);

    if (seconds < 60)
        return "Just now";

    const minutes =
        Math.floor(seconds / 60);

    if (minutes < 60)
        return minutes + " min ago";

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24)
        return hours + " hr ago";

    const days =
        Math.floor(hours / 24);

    return days + " day ago";

}

// ---------------------------
// RENDER POSTS
// ---------------------------

function renderPosts() {

    postContainer.innerHTML = "";

    if (posts.length === 0) {

        postContainer.innerHTML = `

        <div class="empty-feed">

            <i class="fa-solid fa-comments"></i>

            <h2>No Posts Yet</h2>

            <p>Share your first achievement.</p>

        </div>

        `;

        return;

    }

    posts.forEach(post => {

        postContainer.innerHTML += `

        <div class="post-card" data-id="${post.id}">

            <div class="post-header">

                <div class="post-user">

                    <img src="images/default-profile.png">

                    <div>

                        <div class="post-name">

                            ${post.name}

                        </div>

                        <div class="post-time">

                            ${formatTime(post.timestamp)}

                        </div>

                    </div>

                </div>

            </div>

            <div class="post-content">

                ${post.text}

            </div>

            ${post.image ? `

            <img
            src="${post.image}"
            class="post-image">

            ` : ""}

            <div class="post-info">

                <span>

                    ❤️ ${post.likes.length}

                </span>

                <span>

                    💬 ${post.comments.length}

                </span>

            </div>

            <div class="post-actions-bar">

                <button
                class="like-btn"
                data-id="${post.id}">

                    <i class="fa-regular fa-heart"></i>

                    Like

                </button>

                <button>

                    <i class="fa-regular fa-comment"></i>

                    Comment

                </button>

                <button>

                    <i class="fa-solid fa-share"></i>

                    Share

                </button>

            </div>

        </div>

        `;

    });

}

renderPosts();

/* ==========================================
   PlaceMate V2 - home.js (Part 3B)
   Likes • Comments • Delete • Edit • Share
==========================================*/

// ---------------------------
// LIKE POST
// ---------------------------

function toggleLike(id){

    posts = posts.map(post=>{

        if(post.id===id){

            const index = post.likes.indexOf(studentRoll);

            if(index===-1){

                post.likes.push(studentRoll);

            }else{

                post.likes.splice(index,1);

            }

        }

        return post;

    });

    localStorage.setItem("posts",JSON.stringify(posts));

    renderPosts();

}

// ---------------------------
// COMMENT
// ---------------------------

function addComment(id){

    const input=document.getElementById("comment-"+id);

    const text=input.value.trim();

    if(text==="") return;

    posts=posts.map(post=>{

        if(post.id===id){

            post.comments.push({

                user:studentName,

                text:text

            });

        }

        return post;

    });

    localStorage.setItem("posts",JSON.stringify(posts));

    renderPosts();

}

// ---------------------------
// DELETE POST
// ---------------------------

function deletePost(id){

    if(!confirm("Delete this post?")) return;

    posts=posts.filter(post=>post.id!==id);

    localStorage.setItem("posts",JSON.stringify(posts));

    renderPosts();

}

// ---------------------------
// EDIT POST
// ---------------------------

function editPost(id){

    const post=posts.find(p=>p.id===id);

    if(!post) return;

    const updated=prompt("Edit your post",post.text);

    if(updated===null) return;

    post.text=updated;

    localStorage.setItem("posts",JSON.stringify(posts));

    renderPosts();

}

// ---------------------------
// SHARE
// ---------------------------

function sharePost(id){

    const post=posts.find(p=>p.id===id);

    if(!post) return;

    if(navigator.share){

        navigator.share({

            title:"PlaceMate",

            text:post.text

        });

    }else{

        navigator.clipboard.writeText(post.text);

        alert("Post copied to clipboard.");

    }

}

/* ==========================================
   PlaceMate V2 - home.js (Part 3C)
   Images • Profile • Career Score • Welcome
==========================================*/

// ---------------------------
// DEFAULT STUDENT
// ---------------------------

let students =
JSON.parse(localStorage.getItem("students")) || [];

let currentStudent =
students.find(s => s.roll === studentRoll);

// Create default student if not found
if(!currentStudent){

    currentStudent = {

        roll: studentRoll,

        name: studentName,

        profilePhoto: "images/default-profile.png",

        coverPhoto: "",

        bio: "Welcome to PlaceMate!",

        followers: [],

        following: [],

        certificates: [],

        projects: [],

        resume: "",

        notifications: []

    };

    students.push(currentStudent);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}

// ---------------------------
// PROFILE PHOTO
// ---------------------------

document.querySelectorAll(".nav-profile").forEach(img=>{

    img.src=currentStudent.profilePhoto;

});

document.querySelectorAll(".profile-photo").forEach(img=>{

    img.src=currentStudent.profilePhoto;

});

document.querySelectorAll(".create-profile").forEach(img=>{

    img.src=currentStudent.profilePhoto;

});

// ---------------------------
// IMAGE UPLOAD
// ---------------------------

// Hidden file input

const imageInput=document.createElement("input");

imageInput.type="file";

imageInput.accept="image/*";

imageInput.style.display="none";

document.body.appendChild(imageInput);

let selectedImage="";

// Photo button

document.querySelectorAll(".post-actions button")[0]
.addEventListener("click",()=>{

    imageInput.click();

});

imageInput.addEventListener("change",()=>{

    const file=imageInput.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=e=>{

        selectedImage=e.target.result;

        alert("Image Selected.");

    }

    reader.readAsDataURL(file);

});

// Replace Create Post

postBtn.onclick=()=>{

    const text=postInput.value.trim();

    if(text==="" && selectedImage===""){

        alert("Write something.");

        return;

    }

    posts.unshift({

        id:Date.now(),

        name:studentName,

        roll:studentRoll,

        text:text,

        image:selectedImage,

        likes:[],

        comments:[],

        timestamp:Date.now()

    });

    selectedImage="";

    postInput.value="";

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    renderPosts();

};

// ---------------------------
// CAREER SCORE
// ---------------------------

function calculateCareerScore(){

    let score=0;

    if(currentStudent.profilePhoto) score+=10;

    if(currentStudent.bio) score+=10;

    if(currentStudent.resume) score+=20;

    score+=Math.min(
        currentStudent.projects.length*10,
        30
    );

    score+=Math.min(
        currentStudent.certificates.length*5,
        30
    );

    document.querySelector(".score-circle")
    .innerHTML=score+"%";

}

calculateCareerScore();

// ---------------------------
// NOTIFICATIONS
// ---------------------------

function addNotification(message){

    currentStudent.notifications.unshift({

        text:message,

        time:Date.now()

    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}

// ---------------------------
// DEFAULT WELCOME POSTS
// ---------------------------

if(localStorage.getItem("defaultPosts")!=="true"){

posts.unshift({

id:Date.now()+1,

name:"PlaceMate",

roll:"admin",

text:"🎉 Welcome to PlaceMate! Connect with students, showcase your projects, certificates and prepare for placements.",

image:"",

likes:[],

comments:[],

timestamp:Date.now()

});

posts.unshift({

id:Date.now()+2,

name:"Training & Placement Cell",

roll:"admin",

text:"💼 New placement drives will appear here. Keep your profile updated to improve your Career Score.",

image:"",

likes:[],

comments:[],

timestamp:Date.now()

});

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

localStorage.setItem(
"defaultPosts",
"true"
);

}

// ---------------------------
// LOAD FEED
// ---------------------------

renderPosts();