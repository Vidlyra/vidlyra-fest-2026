// ===============================
// Load Logged-in User
// ===============================
async function loadUser() {

    const {
        data: { user },
        error
    } = await window.sb.auth.getUser();

    if (error || !user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userName").textContent =
        user.user_metadata.full_name || "Participant";

    document.getElementById("userEmail").textContent =
        user.email;
    document.getElementById("userNameTicket").textContent =
user.user_metadata.full_name || "Participant";
// ===============================
// Load User Pass
// ===============================
async function loadPass() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) return;

    const { data, error } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Pass Error:", error);

        document.getElementById("passType").textContent =
            "No Pass Purchased";

        return;
    }

    if (!data) {

        document.getElementById("passType").textContent =
            "No Pass Purchased";

        document.getElementById("ticketId").textContent = "";

        document.getElementById("passStatus").textContent = "";

        return;
    }

    document.getElementById("passType").textContent =
        "🟢 " + data.pass_type.toUpperCase() + " PASS";
    document.getElementById("topPass").textContent =
data.pass_type.toUpperCase();

    document.getElementById("ticketId").textContent =
        "Ticket ID : " + data.ticket_id;

    document.getElementById("passStatus").textContent =
        "Status : " + data.status;
    document.getElementById("qrcode").innerHTML = "";

new QRCode(document.getElementById("qrcode"), {
    text: data.ticket_id,
    width: 180,
    height: 180
});

    document.getElementById("buyButton").style.display = "none";
}

// ===============================
// Logout
// ===============================
async function logout() {

    await window.sb.auth.signOut();

    window.location.href = "login.html";

}

// ===============================
// Start Dashboard
// ===============================
window.onload = function () {

    loadUser();

    loadPass();

};
