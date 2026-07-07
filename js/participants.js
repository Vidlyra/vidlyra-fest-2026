let allUsers=[];

async function loadParticipants(){

const {data,error}=await window.sb
.from("profiles")
.select(`
full_name,
email,
passes(
pass_type,
ticket_id,
status
)
`);

if(error){

console.error(error);

return;

}

allUsers=data||[];

render(allUsers);

}

function render(users){

const tbody=document.querySelector("tbody");

tbody.innerHTML="";

users.forEach(user=>{

const pass=user.passes?.[0]||{};

tbody.innerHTML+=`

<tr>

<td>${user.full_name||"-"}</td>

<td>${user.email||"-"}</td>

<td>${pass.pass_type||"None"}</td>

<td>${pass.ticket_id||"-"}</td>

<td>${pass.status||"-"}</td>

</tr>

`;

});

}

function searchUsers(){

const text=document
.getElementById("search")
.value
.toLowerCase();

const filtered=allUsers.filter(u=>

(u.full_name||"")
.toLowerCase()
.includes(text)

||

(u.email||"")
.toLowerCase()
.includes(text)

);

render(filtered);

}

loadParticipants();
