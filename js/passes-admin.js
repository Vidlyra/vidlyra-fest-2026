async function loadPasses() {

    const { data, error } = await window.sb
        .from("passes")
        .select(`
            id,
            pass_type,
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

            <td>${pass.pass_type}</td>

            <td>${pass.status}</td>

            <td>

                <select onchange="updatePass(${pass.id}, this.value)">

                    <option value="">Choose</option>

                    <option value="Basic">Basic</option>

                    <option value="Premium">Premium</option>

                    <option value="VIP">VIP</option>

                </select>

            </td>

        </tr>

        `;

    });

}

async function updatePass(id, passType) {

    if (!passType) return;

    const { error } = await window.sb
        .from("passes")
        .update({
            pass_type: passType
        })
        .eq("id", id);

    if (error) {

        alert(error.message);
        return;

    }

    alert("✅ Pass Updated");

    loadPasses();

}

loadPasses();
