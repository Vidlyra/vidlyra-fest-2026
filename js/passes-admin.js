async function loadPasses() {

    const { data, error } = await window.sb
        .from("passes")
        .select(`
            id,
            user_id,
            pass_type,
            ticket_id,
            status,
            profiles (
                full_name,
                email
            )
        `);

    if (error) {
        console.error(error);
        return;
    }

    const table = document.getElementById("passTable");

    table.innerHTML = "";

    data.forEach(pass => {

        table.innerHTML += `

<tr>

<td>${pass.profiles?.full_name || "-"}</td>

<td>${pass.profiles?.email || "-"}</td>

<td>${pass.ticket_id}</td>

<td>${pass.pass_type}</td>

<td>${pass.status}</td>

<td>

<select onchange="updatePass(${pass.id},this.value)">

<option value="">Upgrade</option>

<option value="Basic">Basic</option>

<option value="Premium">Premium</option>

<option value="VIP">VIP</option>

</select>

</td>

<td>

<button onclick="toggleStatus(${pass.id},'${pass.status}')">

${pass.status=="ACTIVE"?"Suspend":"Activate"}

</button>

</td>

</tr>

`;

    });

}

async function updatePass(id,type){

if(type=="") return;

const {error}=await window.sb

.from("passes")

.update({

pass_type:type

})

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadPasses();

}

async function toggleStatus(id,status){

const newStatus=

status=="ACTIVE"

?

"SUSPENDED"

:

"ACTIVE";

const {error}=await window.sb

.from("passes")

.update({

status:newStatus

})

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadPasses();

}

loadPasses();
