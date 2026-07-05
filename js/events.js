async function joinEvent(eventName) {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        alert("Please login first.");
        return;
    }

    const { data: existing } = await window.sb
        .from("event_registrations")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_name", eventName)
        .maybeSingle();

    if (existing) {
        alert("You have already joined this event.");
        return;
    }

    const { error } = await window.sb
        .from("event_registrations")
        .insert([
            {
                user_id: user.id,
                event_name: eventName
            }
        ]);

    if (error) {
        alert(error.message);
    } else {
        alert("🎉 Successfully joined " + eventName + "!");
loadMyEvents();
    }
}
async function loadMyEvents() {

    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) return;

    const { data, error } = await window.sb
        .from("event_registrations")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        console.error(error);
        return;
    }

    let html = "";

    if (!data || data.length === 0) {

        html = "No events joined yet.";

    } else {

        data.forEach(event => {

            html += `
                <p>✅ ${event.event_name}</p>
            `;

        });

        html += `
            <hr style="margin:15px 0;">
            <strong>Total Joined : ${data.length}</strong>
        `;
    }

    document.getElementById("myEvents").innerHTML = html;
}
window.addEventListener("load", loadMyEvents);
