async function loadTicket(){

const {
data:{user},
error
}=await window.sb.auth.getUser();

if(error||!user){

location.href="login.html";

return;

}

// User

document.getElementById("name").textContent=
user.user_metadata.full_name||"Participant";

// Profile

const {data:profile}=await window.sb
.from("profiles")
.select("selected_avatar")
.eq("user_id",user.id)
.maybeSingle();

if(profile&&profile.selected_avatar){

const {data:avatar}=await window.sb
.from("avatars")
.select("image_url")
.eq("id",profile.selected_avatar)
.single();

if(avatar){

document.getElementById("avatar").src=
avatar.image_url;

}

}

// Pass

const {data:pass}=await window.sb
.from("passes")
.select("*")
.eq("user_id",user.id)
.maybeSingle();

if(pass){

document.getElementById("pass").textContent=
pass.pass_type.toUpperCase()+" PASS";

document.getElementById("ticketId").textContent=
pass.ticket_id;

document.getElementById("status").textContent=
pass.status;

new QRCode(document.getElementById("qrcode"),{

text:pass.ticket_id,

width:200,

height:200

});

}

}

loadTicket();
