// ===============================
// VIP Pass Upgrade
// Vidlyra Fest 2026
// ===============================

async function buyVIPPass() {

    // Get logged in user
    const {
        data: { user },
        error: userError
    } = await window.sb.auth.getUser();

    if (userError || !user) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    // Get current pass
    const { data: pass, error: passError } = await window.sb
        .from("passes")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (passError) {

        alert(passError.message);

        return;

    }

    if (!pass) {

        alert("Please purchase a Basic Pass first.");

        window.location.href = "dashboard.html";

        return;

    }

    // Already VIP
    if (pass.pass_type === "VIP") {

        alert("👑 You already own the VIP Pass.");

        window.location.href = "dashboard.html";

        return;

    }

    // Upgrade to VIP
    const { error: updateError } = await window.sb
        .from("passes")
        .update({

            pass_type: "VIP"

        })
        .eq("user_id", user.id);

    if (updateError) {

        alert(updateError.message);

        return;

    }

    alert("🎉 Congratulations!\nWelcome to VIDLYRA VIP!");

    window.location.href = "dashboard.html";

}
