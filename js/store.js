// ===============================
// Buy Basic Pass
// ===============================

async function buyBasicPass() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        alert("Please login first.");
        location.href = "login.html";
        return;
    }

    const { data: existing } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (existing) {
        alert("You already own a membership.");
        return;
    }

    const ticketId = "VF2026-" + Date.now();

    const { error } = await window.sb
        .from("passes")
        .insert({
            user_id: user.id,
            pass_type: "Basic",
            ticket_id: ticketId,
            status: "ACTIVE"
        });

    if (error) {
        alert(error.message);
        return;
    }

    alert("🎉 Basic Pass Purchased!");

    location.href = "dashboard.html";

}

// ===============================
// Upgrade to Premium
// ===============================

async function upgradePremium() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        alert("Please login first.");
        return;
    }

    const { error } = await window.sb
        .from("passes")
        .update({
            pass_type: "Premium"
        })
        .eq("user_id", user.id);

    if (error) {
        alert(error.message);
        return;
    }

    alert("💎 Upgraded to Premium!");

    location.href = "dashboard.html";

}

// ===============================
// Upgrade to VIP
// ===============================

async function upgradeVIP() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        alert("Please login first.");
        return;
    }

    const { error } = await window.sb
        .from("passes")
        .update({
            pass_type: "VIP"
        })
        .eq("user_id", user.id);

    if (error) {
        alert(error.message);
        return;
    }

    alert("👑 Welcome to VIP!");

    location.href = "dashboard.html";

}
