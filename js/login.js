async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await window.sb.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        document.getElementById("message").innerHTML = error.message;
        return;
    }

    document.getElementById("message").innerHTML =
        "✅ Login Successful";

    // Get logged in user
    const {
        data: { user }
    } = await window.sb.auth.getUser();

    // Check avatar selection
    const { data: profile } = await window.sb
        .from("profiles")
        .select("selected_avatar")
        .eq("user_id", user.id)
        .maybeSingle();

    setTimeout(function () {

        if (!profile || !profile.selected_avatar) {
            window.location.href = "avatars.html";
        } else {
            window.location.href = "dashboard.html";
        }

    }, 1000);

}
