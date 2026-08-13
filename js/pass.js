// ===============================
// Buy Basic Pass
// ===============================
async function buyBasicPass() {
    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const buyButton = document.getElementById("buyButton");
    if (buyButton) {
        buyButton.disabled = true;
        buyButton.textContent = "Processing…";
    }

    // Generate a simple readable ticket id, e.g. VF26-482913
    const ticketId = "VF26-" + Math.floor(100000 + Math.random() * 900000);

    const { error } = await window.sb
        .from("passes")
        .upsert(
            {
                user_id: user.id,
                pass_type: "Basic",
                ticket_id: ticketId,
                status: "Active"
            },
            { onConflict: "user_id" }
        );

    if (error) {
        console.error(error);
        if (buyButton) {
            buyButton.disabled = false;
            buyButton.textContent = "Buy Basic Pass";
        }
        alert("Couldn't complete your pass purchase. Please try again.");
        return;
    }

    // Refresh the ticket card with the new pass details
    if (typeof loadPass === "function") {
        await loadPass();
    } else {
        window.location.reload();
    }
}
