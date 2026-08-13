// ===============================
// Join an Event
// ===============================
async function joinEvent(eventName) {
    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const { error } = await window.sb
        .from("event_signups")
        .insert([{ user_id: user.id, event_name: eventName }]);

    if (error) {
        // Avoid duplicate signups piling up as scary errors in the console
        if (error.code === "23505") {
            alert(`You're already signed up for ${eventName}.`);
        } else {
            console.error(error);
            alert("Couldn't join that event. Please try again.");
        }
        return;
    }

    alert(`You're in! Joined ${eventName}.`);
    await loadMyEvents();
}

// ===============================
// Load "My Events" list + count
// ===============================
async function loadMyEvents() {
    const {
        data: { user }
    } = await window.sb.auth.getUser();

    if (!user) return;

    const { data, error } = await window.sb
        .from("event_signups")
        .select("event_name")
        .eq("user_id", user.id);

    const box = document.getElementById("myEvents");
    const count = document.getElementById("eventCount");

    if (error) {
        console.error(error);
        if (box) box.innerHTML = "<p>Couldn't load your events.</p>";
        return;
    }

    if (count) count.textContent = data.length;

    if (!box) return;

    if (!data || data.length === 0) {
        box.innerHTML = "<p>You haven't joined any events yet.</p>";
        return;
    }

    box.innerHTML = data
        .map(e => `<p>✅ ${e.event_name}</p>`)
        .join("");
}

window.addEventListener("load", loadMyEvents);
