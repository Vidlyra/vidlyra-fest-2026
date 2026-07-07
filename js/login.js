async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } =
    await window.sb.auth.signInWithPassword({

        email: email,
        password: password

    });
    // Check if user already selected an avatar
const {
    data: { user }
} = await window.sb.auth.getUser();

const { data: profile } = await window.sb
    .from("profiles")
    .select("selected_avatar")
    .eq("user_id", user.id)
    .maybeSingle();

// First login
if (!profile || !profile.selected_avatar) {

    window.location.href = "avatars.html";

} else {

    window.location.href = "dashboard.html";

}

    if(error){

        document.getElementById("message").innerHTML =
        error.message;

    }else{

        document.getElementById("message").innerHTML =
        "✅ Login Successful";

        setTimeout(function(){

            window.location.href="dashboard.html";

        },1000);

    }

}
