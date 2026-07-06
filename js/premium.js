
// ===============================
// Premium Pass Upgrade
// ===============================

async function buyPremiumPass() {

    const {
        data: { user },
        error
    } = await window.sb.auth.getUser();

    if (error || !user) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    // Check current pass
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

        return;

    }

    if (pass.pass_type === "Premium") {

        alert("You already have Premium Pass.");

        return;

    }

    if (pass.pass_type === "VIP") {

        alert("You already have VIP Pass.");

        return;

    }

    // Upgrade to Premium
    const { error: updateError } = await window.sb
        .from("passes")
        .update({

            pass_type: "Premium"

        })
        .eq("user_id", user.id);

    if (updateError) {

        alert(updateError.message);

        return;

    }

    alert("🎉 Congratulations!\nYour Premium Pass is now ACTIVE.");

    window.location.href = "dashboard.html";

}
