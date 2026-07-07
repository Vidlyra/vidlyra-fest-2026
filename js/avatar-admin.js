async function loadAvatars(){

const {data,error}=await window.sb

.from("avatars")

.select("*")

.order("id");

if(error){

console.error(error);

return;

}

const grid=document.getElementById("avatarGrid");

grid.innerHTML="";

data.forEach(a=>{

grid.innerHTML+=`

<div class="avatarCard">

<img src="${a.image_url}">

<h3>${a.avatar_name}</h3>

<p>${a.membership_required}</p>

<p>${a.active ? "🟢 Active":"🔴 Disabled"}</p>

<button onclick="toggleAvatar(${a.id},${a.active})">

${a.active ? "Disable":"Enable"}

</button>

</div>

`;

});

}

async function toggleAvatar(id,state){

const {error}=await window.sb

.from("avatars")

.update({

active:!state

})

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAvatars();

}

loadAvatars();
