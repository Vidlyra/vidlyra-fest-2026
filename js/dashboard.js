async function loadUser() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Update Profile
    document.getElementById("userName").textContent =
        user.user_metadata.full_name || "Participant";

    document.getElementById("userEmail").textContent =
        user.email;
}

// Load Pass
async function loadPass() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) return;

    const { data, error } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        console.error(error);
        document.getElementById("passType").textContent =
            "No Pass Purchased";
        return;
    }

    if (!data || data.length === 0) {
        document.getElementById("passType").textContent =
            "No Pass Purchased";
        return;
    }

    const pass = data[0];

    document.getElementById("passType").textContent =
        "🟢 " + pass.pass_type + " PASS";

    document.getElementById("ticketId").textContent =
        "Ticket ID : " + pass.ticket_id;

    document.getElementById("passStatus").textContent =
        "Status : " + pass.status;

    document.getElementById("buyButton").style.display = "none";
}

// Logout
async function logout() {
    await window.sb.auth.signOut();
    window.location.href = "login.html";
}

// Load everything
loadUser();
loadPass();
