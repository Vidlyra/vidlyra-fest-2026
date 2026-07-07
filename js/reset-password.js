async function updatePassword() {

    const password =
        document.getElementById("password").value;

    const confirm =
        document.getElementById("confirmPassword").value;

    if(password !== confirm){

        alert("Passwords do not match.");

        return;

    }

    const { error } =
    await window.sb.auth.updateUser({

        password: password

    });

    if(error){

        document.getElementById("message").innerHTML =
        error.message;

    }else{

        alert("✅ Password updated successfully.");

        window.location.href = "login.html";

    }

}
