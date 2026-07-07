// =======================================
// Frequency Avatars
// Load From Supabase
// =======================================

async function loadAvatars() {

    // Logged-in user
    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {

        location.href = "login.html";

        return;

    }

    // User Pass
    const { data: pass } = await window.sb
        .from("passes")
        .select("pass_type")
        .eq("user_id", user.id)
        .maybeSingle();

    const userPass = pass ? pass.pass_type : "None";

    // Load Avatars
   // Load Avatars
const { data: avatars, error } = await window.sb
    .from("avatars")
    .select("*")
    .order("id");

console.log("Avatars:", avatars);
console.log("Error:", error);
console.log("Avatars:", avatars);
console.log("Error:", error);
    if (error) {

        console.error(error);

        return;

    }

    const grid = document.getElementById("avatarGrid");

    grid.innerHTML = "";

    avatars.forEach(avatar => {

        let unlocked = false;

        if (avatar.membership_required === "Basic")
            unlocked = true;

        if (
            avatar.membership_required === "Premium" &&
            (userPass === "Premium" || userPass === "VIP")
        )
            unlocked = true;

        if (
            avatar.membership_required === "VIP" &&
            userPass === "VIP"
        )
            unlocked = true;

        grid.innerHTML += `

        <div class="avatar">

            <img src="${avatar.image_url}" alt="${avatar.avatar_name}">

            <h3>${avatar.avatar_name}</h3>

            <p>${avatar.membership_required}</p>

            ${
                unlocked
                ?
                `<button onclick="selectAvatar(${avatar.id})">
                Select
                </button>`
                :
                `<button disabled>
                🔒 Locked
                </button>`
            }

        </div>

        `;

    });

}
// =======================================
// Save Selected Avatar
// =======================================

async function selectAvatar(id) {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        alert("Login required");
        return;
    }

    console.log("User:", user.id);
    console.log("Avatar:", id);

    const { data: profile } = await window.sb
        .from("profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (!profile) {

        const { error } = await window.sb
            .from("profiles")
            .insert({
                user_id: user.id,
                selected_avatar: id,
                full_name: user.user_metadata.full_name,
                email: user.email
            });

        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }

    } else {

        const { error } = await window.sb
            .from("profiles")
            .update({
                selected_avatar: id
            })
            .eq("user_id", user.id);

        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }

    }

    alert("✅ Avatar Selected");

    location.href = "dashboard.html";
}

loadAvatars();
