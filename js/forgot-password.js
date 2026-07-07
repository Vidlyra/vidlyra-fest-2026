async function resetPassword() {

    const email = document.getElementById("email").value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    const { error } = await window.sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password.html"
    });

    if (error) {

        document.getElementById("message").innerHTML =
            "<span style='color:red'>" + error.message + "</span>";

    } else {

        document.getElementById("message").innerHTML =
            "<span style='color:lightgreen'>✅ Password reset link sent! Please check your email.</span>";

    }

}
