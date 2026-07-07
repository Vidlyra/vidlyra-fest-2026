async function loadProfile() {

    const {
        data: { user },
        error
    } = await window.sb.auth.getUser();

    if (error || !user) {
        location.href = "login.html";
        return;
    }

    document.getElementById("name").textContent =
        user.user_metadata.full_name || "Participant";

    document.getElementById("email").textContent =
        user.email;

    // Load Profile
    const { data: profile } = await window.sb
        .from("profiles")
        .select("selected_avatar")
        .eq("user_id", user.id)
        .maybeSingle();

    if (profile && profile.selected_avatar) {

        const { data: avatar } = await window.sb
            .from("avatars")
            .select("image_url")
            .eq("id", profile.selected_avatar)
            .single();

        if (avatar) {
            document.getElementById("avatar").src =
                avatar.image_url;
        }

    }

    // Load Pass
    const { data: pass } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (pass) {

        document.getElementById("passType").textContent =
            pass.pass_type;

        document.getElementById("ticketId").textContent =
            pass.ticket_id;

        document.getElementById("status").textContent =
            pass.status;

    }

    // Load Events
    const { count } = await window.sb
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

    document.getElementById("events").textContent =
        count ?? 0;

}

loadProfile();
