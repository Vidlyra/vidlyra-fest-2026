// ===============================
// Buy Basic Pass
// ===============================
async function buyBasicPass() {

    const {
        data: { user },
        error: userError
    } = await window.sb.auth.getUser();

    if (userError || !user) {

        alert("Please login first.");

        return;

    }

    // Check if user already has a pass
    const { data: existingPass } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (existingPass) {

        alert("You already own a pass.");

        return;

    }

    // Generate Ticket ID
    const ticketId = "VF2026-" + Date.now();

    const { error } = await window.sb
        .from("passes")
        .insert([
            {
                user_id: user.id,
                pass_type: "Basic",
                ticket_id: ticketId,
                status: "ACTIVE"
            }
        ]);

    if (error) {

        alert(error.message);

        return;

    }

    alert("🎉 Basic Pass Purchased!");

    location.reload();

}
    // Generate Ticket ID
    const ticketId = "VF2026-" + Date.now();

    const { error } = await window.sb
        .from("passes")
        .insert([
            {
                user_id: user.id,
                pass_type: "Basic",
                ticket_id: ticketId,
                status: "ACTIVE"
            }
        ]);

    if (error) {
        alert(error.message);
    } else {
        alert("🎉 Basic Pass Purchased!");
        location.reload();
    }
}
