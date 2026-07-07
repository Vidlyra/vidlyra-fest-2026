async function saveEvent(){

const title=document.getElementById("title").value;

const category=document.getElementById("category").value;

const date=document.getElementById("date").value;

const image=document.getElementById("image").value;

const description=document.getElementById("description").value;

const {error}=await window.sb

.from("events")

.insert([{

title:title,

category:category,

event_date:date,

image_url:image,

description:description,

status:"OPEN"

}]);

if(error){

alert(error.message);

return;

}

alert("✅ Event Added Successfully");

window.location.href="events-admin.html";

}
