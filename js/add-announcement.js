async function saveAnnouncement(){

const title=document.getElementById("title").value;

const message=document.getElementById("message").value;

const {error}=await window.sb

.from("announcements")

.insert([{

title:title,

message:message,

active:true

}]);

if(error){

alert(error.message);

return;

}

alert("✅ Announcement Published");

window.location.href="announcements-admin.html";

}
