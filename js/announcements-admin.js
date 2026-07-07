async function loadAnnouncements(){

const {data,error}=await window.sb

.from("announcements")

.select("*")

.order("id",{ascending:false});

if(error){

console.error(error);

return;

}

const list=document.getElementById("announcementList");

list.innerHTML="";

data.forEach(item=>{

list.innerHTML+=`

<div class="card">

<h2>${item.title}</h2>

<p>${item.message}</p>

<p>${item.active?"🟢 Published":"🔴 Hidden"}</p>

<button onclick="toggleAnnouncement(${item.id},${item.active})">

${item.active?"Hide":"Publish"}

</button>

</div>

`;

});

}

async function toggleAnnouncement(id,state){

const {error}=await window.sb

.from("announcements")

.update({

active:!state

})

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAnnouncements();

}

loadAnnouncements();
