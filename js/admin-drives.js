if(!getAdmin()){

location.href="admin-login.html";

}

const table=document.getElementById("driveTable");

const form=document.getElementById("driveForm");

const modal=document.getElementById("driveModal");

const addBtn=document.getElementById("addDriveBtn");

const close=document.querySelector(".close-modal");

let drives=Storage.get("drives")||[];

function render(){

table.innerHTML="";

if(drives.length===0){

table.innerHTML=`
<tr>
<td colspan="7">
No Placement Drives
</td>
</tr>
`;

return;

}

drives.forEach(drive=>{

table.innerHTML+=`

<tr>

<td>${drive.company}</td>

<td>${drive.date}</td>

<td>${drive.time}</td>

<td>${drive.venue}</td>

<td>${drive.mode}</td>

<td>${drive.status}</td>

<td>

<button
class="action-btn view-btn"
onclick="editDrive('${drive.id}')">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteDrive('${drive.id}')">

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