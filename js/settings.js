async function loadSettings(){

const {
data:{user}
}=await window.sb.auth.getUser();

if(!user){

location.href="login.html";
return;

}

document.getElementById("name").textContent=
user.user_metadata.full_name;

document.getElementById("email").textContent=
user.email;

const {data:pass}=await window.sb
.from("passes")
.select("pass_type")
.eq("user_id",user.id)
.maybeSingle();

document.getElementById("pass").textContent=
pass ? pass.pass_type : "No Pass";

}

async function logout(){

await window.sb.auth.signOut();

location.href="index.html";

}

loadSettings();
