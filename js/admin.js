let users = [];

async function loadParticipants(){

    const { data, error } = await window.sb
        .from("passes")
        .select("*");

    if(error){

        console.error(error);

        return;

    }

    users = data;

    showParticipants(users);

}

function showParticipants(data){

    let html="";

    data.forEach(user=>{

        html += `

<tr>

<td>${user.user_id}</td>

<td>Hidden</td>

<td>${user.pass_type}</td>

<td>${user.status}</td>

</tr>

`;

    });

    document.getElementById("participants").innerHTML=html;

}

function searchUser(){

    const value=document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered=users.filter(u=>

        u.pass_type.toLowerCase().includes(value)

    );

    showParticipants(filtered);

}

async function logout(){

    await window.sb.auth.signOut();

    location.href="login.html";

}

loadParticipants();
