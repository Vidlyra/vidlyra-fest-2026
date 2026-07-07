async function signUp() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        document.getElementById("message").innerHTML =
            "Please fill in all fields.";
        return;
    }

    // Create authentication account
    const { data, error } = await window.sb.auth.signUp({

        email: email,
        password: password,

        options: {
            data: {
                full_name: name
            }
        }

    });

    if(error){

alert(error.message);

}else{

alert("✅ Account created.\nVerify your email then login.");

window.location.href="login.html";

}

}
    // Save profile
    if (data.user) {

        const { error: profileError } = await window.sb
            .from("profiles")
            .insert([
                {
                    user_id: data.user.id,
                    full_name: name,
                    email: email,
                    avatar_url: ""
                }
            ]);

        if (profileError) {
            console.error("Profile Error:", profileError);
        }

    }

    document.getElementById("message").innerHTML =
        "✅ Account created! Check your email to verify your account.";

}
