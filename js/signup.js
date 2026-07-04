async function signUp() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    const { data, error } = await window.sb.auth.signUp({

        email: email,
        password: password,

        options:{
            data:{
                full_name:name
            }
        }

    });

    if(error){

        document.getElementById("message").innerHTML=error.message;

    }else{

        document.getElementById("message").innerHTML=
        "✅ Account created! Check your email to verify your account.";

    }

}
