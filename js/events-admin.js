async function loadEvents(){

const {data,error}=await window.sb

.from("events")

.select("*")

.order("id");

if(error){

console.error(error);

return;

}

const grid=document.getElementById("eventGrid");

grid.innerHTML="";

data.forEach(event=>{

grid.innerHTML+=`

<div class="avatarCard">

<img src="${event.image_url}">

<h3>${event.title}</h3>

<p>${event.category}</p>

<p>${event.event_date}</p>

<p>${event.status}</p>

<button onclick="toggleEvent(${event.id},'${event.status}')">

${event.status=="OPEN"?"Close":"Open"}

</button>

</div>

`;

});

}

async function toggleEvent(id,status){

const newStatus=

status=="OPEN"

?

"CLOSED"

:

"OPEN";

const {error}=await window.sb

.from("events")

.update({

status:newStatus

})

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadEvents();

}

loadEvents();
