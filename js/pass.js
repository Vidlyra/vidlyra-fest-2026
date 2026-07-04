async function buyBasicPass() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        alert("Please login first.");
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
    } else {
        alert("🎉 Basic Pass Purchased!");
        location.reload();
    }
}
