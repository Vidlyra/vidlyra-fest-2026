// ---------- Vidlyra Fest — Signup handler ----------

async function signup(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const btn = document.getElementById("signupBtn");
  const message = document.getElementById("message");

  message.textContent = "";
  message.className = "";

  // ---- Client-side validation ----
  if (!fullname || !email || !password || !confirmPassword) {
    showMessage("Please fill in every field.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  // ---- Submit to Supabase ----
  setLoading(true);

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullname
        }
      }
    });

    if (error) {
      showMessage(error.message, "error");
      setLoading(false);
      return;
    }

    // Optional: store the full name in a profiles table.
    // Uncomment and adjust to match your schema.
    /*
    if (data.user) {
      const { error: profileError } = await supabaseClient
        .from("profiles")
        .insert([{ id: data.user.id, full_name: fullname, email: email }]);

      if (profileError) {
        console.error("Profile creation failed:", profileError.message);
      }
    }
    */

    if (data.user && !data.session) {
      // Email confirmation is required before login
      showMessage("Account created! Check your email to confirm before logging in.", "success");
    } else {
      showMessage("Account created! Redirecting to login…", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  } catch (err) {
    showMessage("Something went wrong. Please try again.", "error");
    console.error(err);
    setLoading(false);
  }

  function setLoading(isLoading) {
    btn.disabled = isLoading;
    btn.textContent = isLoading ? "Creating Account…" : "Create Account";
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
  }
}
