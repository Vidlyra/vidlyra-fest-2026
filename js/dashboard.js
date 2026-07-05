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

    const ticketName = document.getElementById("userNameTicket");

    if (ticketName) {
        ticketName.textContent =
            user.user_metadata.full_name || "Participant";
    }

}

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
        console.error(error);

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

    // Pass Type
    document.getElementById("passType").textContent =
        "🟢 " + data.pass_type.toUpperCase() + " PASS";

    // Dashboard Top Pass (if exists)
    const topPass = document.getElementById("topPass");

    if (topPass) {
        topPass.textContent =
            data.pass_type.toUpperCase();
    }

    // Ticket ID
    document.getElementById("ticketId").textContent =
        data.ticket_id;

    // Status
    document.getElementById("passStatus").textContent =
        data.status;

    // QR Code
    const qr = document.getElementById("qrcode");

    if (qr) {

        qr.innerHTML = "";

        new QRCode(qr, {
            text: data.ticket_id,
            width: 180,
            height: 180
        });

    }

    // Hide Buy Button
    const buyButton = document.getElementById("buyButton");

    if (buyButton) {
        buyButton.style.display = "none";
    }

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
window.onload = async function () {

    await loadUser();

    await loadPass();

};
