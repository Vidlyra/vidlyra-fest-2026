async function loadUser() {

    const {
        data: { user },
        error
    } = await window.sb.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }
async function loadPass() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    const { data, error } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id)
        .limit(1)
        .single();

    if (error) {

        document.getElementById("passType").innerHTML =
        "No Pass Purchased";

        return;
    }

    document.getElementById("passType").innerHTML =
    "🟢 " + data.pass_type + " PASS";

    document.getElementById("ticketId").innerHTML =
    "Ticket ID : " + data.ticket_id;

    document.getElementById("passStatus").innerHTML =
    "Status : " + data.status;

    document.getElementById("buyButton").style.display = "none";

}
    // Update the profile card
    document.getElementById("userName").textContent =
        user.user_metadata.full_name || "Participant";

    document.getElementById("userEmail").textContent =
        user.email;
}

// Logout
async function logout() {
    await window.sb.auth.signOut();
    window.location.href = "login.html";
}

loadUser();
loadPass();
