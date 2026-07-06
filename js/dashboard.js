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
// ===============================
// Load Selected Frequency Avatar
// ===============================

const { data: profile } = await window.sb
.from("profiles")
.select("selected_avatar")
.eq("user_id", user.id)
.maybeSingle();

if(profile && profile.selected_avatar){

    const { data: avatar } = await window.sb
    .from("avatars")
    .select("image_url, avatar_name")
    .eq("id", profile.selected_avatar)
    .single();

    if(avatar){

        document.getElementById("userAvatar").src =
        avatar.image_url;

        document.getElementById("userAvatar").alt =
        avatar.avatar_name;

    }

}
if (profile && profile.avatar_url) {

    document.getElementById("userAvatar").src =
        profile.avatar_url;

}

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
   let icon = "🟢";

if (data.pass_type === "Premium") {

    icon = "💎";

}

if (data.pass_type === "VIP") {

    icon = "👑";

}

document.getElementById("passType").textContent =
    icon + " " + data.pass_type.toUpperCase() + " PASS";

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
// Upload Avatar
// ===============================
async function uploadAvatar() {
    console.log("Current User ID:", user.id);
console.log("Avatar URL:", avatarUrl);
    console.log("Update Error:", updateError);

    const file =
        document.getElementById("avatarFile").files[0];

    if (!file) {

        alert("Please select an image.");

        return;

    }

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) return;

    const fileName =
        user.id + "-" + Date.now() + "-" + file.name;

    // Upload image
    const { error: uploadError } = await window.sb.storage
        .from("avatars")
        .upload(fileName, file);

    if (uploadError) {

        alert(uploadError.message);

        return;

    }

    // Get Public URL
    const { data } = window.sb.storage
        .from("avatars")
        .getPublicUrl(fileName);

    const avatarUrl = data.publicUrl;

    // Save URL to profiles table
    const { error: updateError } = await window.sb
        .from("profiles")
        .update({
            avatar_url: avatarUrl
        })
        .eq("user_id", user.id);

    if (updateError) {

        alert(updateError.message);

        return;

    }

    document.getElementById("userAvatar").src =
        avatarUrl;

    alert("✅ Avatar uploaded successfully!");

}
// ===============================
// Start Dashboard
// ===============================
window.onload = async function () {

    await loadUser();

    await loadPass();

};
