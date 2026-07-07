async function adminLogin() {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const msg =
document.getElementById("message");

msg.textContent = "";

const { error } =
await window.sb.auth.signInWithPassword({

email,

password

});

if(error){

msg.textContent = error.message;

return;

}

const {
data:{user}
}=await window.sb.auth.getUser();

// Change this to YOUR admin email
if(user.email !== "funhigh924@gmail.com"){

await window.sb.auth.signOut();

msg.textContent = "Access Denied";

return;

}

location.href="admin-dashboard.html";

}
