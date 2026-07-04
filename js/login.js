async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } =
    await window.sb.auth.signInWithPassword({

        email: email,
        password: password

    });

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
