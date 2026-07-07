async function loadDashboard() {

const { count: users } = await window.sb
.from("profiles")
.select("*", { count: "exact", head: true });

document.getElementById("users").textContent =
users ?? 0;

const { count: basic } = await window.sb
.from("passes")
.select("*", { count: "exact", head: true })
.eq("pass_type", "Basic");

document.getElementById("basic").textContent =
basic ?? 0;

const { count: premium } = await window.sb
.from("passes")
.select("*", { count: "exact", head: true })
.eq("pass_type", "Premium");

document.getElementById("premium").textContent =
premium ?? 0;

const { count: vip } = await window.sb
.from("passes")
.select("*", { count: "exact", head: true })
.eq("pass_type", "VIP");

document.getElementById("vip").textContent =
vip ?? 0;

}

async function logout(){

await window.sb.auth.signOut();

location.href="admin-login.html";

}

loadDashboard();
