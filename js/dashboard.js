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

    // Name
    document.getElementById("userName").textContent =
        user.user_metadata.full_name || "Participant";

    // Email
    document.getElementById("userEmail").textContent =
        user.email;

    // Ticket Name
    const ticketName = document.getElementById("userNameTicket");

    if (ticketName) {
        ticketName.textContent =
            user.user_metadata.full_name || "Participant";
    }

    // =====================================
    // Load Selected Frequency Avatar
    // =====================================

    const { data: profile, error: profileError } = await window.sb
        .from("profiles")
        .select("selected_avatar")
        .eq("user_id", user.id)
        .maybeSingle();

    if (profileError) {
        console.error(profileError);
        return;
    }

    if (profile && profile.selected_avatar) {

        const { data: avatar, error: avatarError } = await window.sb
            .from("avatars")
            .select("image_url, avatar_name")
            .eq("id", profile.selected_avatar)
            .single();

        if (avatarError) {
            console.error(avatarError);
            return;
        }

        if (avatar) {

            document.getElementById("userAvatar").src =
                avatar.image_url;

            document.getElementById("userAvatar").alt =
                avatar.avatar_name;

        }

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

    if (error || !data) {

        document.getElementById("passType").textContent =
            "No Pass Purchased";

        return;

    }

    let icon = "🟢";

    if (data.pass_type === "Premium") icon = "💎";

    if (data.pass_type === "VIP") icon = "👑";

    document.getElementById("passType").textContent =
        icon + " " + data.pass_type.toUpperCase() + " PASS";

    const topPass = document.getElementById("topPass");

    if (topPass) {
        topPass.textContent = data.pass_type.toUpperCase();
    }

    document.getElementById("ticketId").textContent =
        data.ticket_id;

    document.getElementById("passStatus").textContent =
        data.status;

    const qr = document.getElementById("qrcode");

    if (qr) {

        qr.innerHTML = "";

        new QRCode(qr, {
            text: data.ticket_id,
            width: 180,
            height: 180
        });

    }

    const buyButton =
        document.getElementById("buyButton");

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
