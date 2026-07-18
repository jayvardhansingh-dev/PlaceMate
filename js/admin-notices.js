// Authentication
if(!getAdmin()){

location.href="admin-login.html";

}

const table=document.getElementById("noticeTable");

const modal=document.getElementById("noticeModal");

const form=document.getElementById("noticeForm");

const addBtn=document.getElementById("addNoticeBtn");

const close=document.querySelector(".close-modal");

let notices=Storage.get("notices")||[];

function render(){

table.innerHTML="";

if(notices.length===0){

table.innerHTML=`
<tr>
<td colspan="5">
No Notices Available
</td>
</tr>
`;

return;

}

notices
.slice()
.reverse()
.forEach(notice=>{

table.innerHTML+=`

<tr>

<td>${notice.title}</td>

<td>${notice.date}</td>

<td>${notice.expiry}</td>

<td>${notice.priority}</td>

<td>

<button
class="action-btn view-btn"
onclick="editNotice('${notice.id}')">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteNotice('${notice.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

render();

addBtn.onclick=()=>{

form.reset();

driveId.value="";

modal.style.display="flex";

};

close.onclick=()=>{

modal.style.display="none";

};

window.onclick=e=>{

if(e.target===modal){

modal.style.display="none";

}

};

form.onsubmit=e=>{

e.preventDefault();

const drive={

id:driveId.value||Date.now().toString(),

company:driveCompany.value,

date:driveDate.value,

time:driveTime.value,

venue:driveVenue.value,

mode:driveMode.value,

status:driveStatus.value

};

if(driveId.value){

drives=drives.map(d=>d.id===drive.id?drive:d);

}else{

drives.push(drive);

}

Storage.save("drives",drives);

modal.style.display="none";

render();

};

function editDrive(id){

const drive=drives.find(d=>d.id===id);

driveId.value=drive.id;

driveCompany.value=drive.company;

driveDate.value=drive.date;

driveTime.value=drive.time;

driveVenue.value=drive.venue;

driveMode.value=drive.mode;

driveStatus.value=drive.status;

modal.style.display="flex";

}

function deleteDrive(id){

if(!confirm("Delete Drive?")) return;

drives=drives.filter(d=>d.id!==id);

Storage.save("drives",drives);

render();

}