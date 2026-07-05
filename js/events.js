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
    }
}
