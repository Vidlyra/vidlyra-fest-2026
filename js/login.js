// ---------- Vidlyra Fest — Login handler ----------

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const btn = document.getElementById("loginBtn");
  const message = document.getElementById("message");

  message.textContent = "";
  message.className = "";

  if (!email || !password) {
    showMessage("Please enter your email and password.", "error");
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      showMessage(error.message, "error");
      setLoading(false);
      return;
    }

    showMessage("Welcome back! Redirecting…", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  } catch (err) {
    showMessage("Something went wrong. Please try again.", "error");
    console.error(err);
    setLoading(false);
  }

  function setLoading(isLoading) {
    btn.disabled = isLoading;
    btn.textContent = isLoading ? "Logging in…" : "Login";
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
  }
}
