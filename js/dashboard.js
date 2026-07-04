async function loadUser() {

    const {
        data: { user },
        error
    } = await window.sb.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
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
