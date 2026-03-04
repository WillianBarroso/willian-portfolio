const SUPABASE_URL = window.ENV.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.ENV.SUPABASE_ANON_KEY;

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  status.textContent = "Sending...";

  try {
    const { error } = await client
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) throw error;

    status.textContent = "✅ Message sent successfully!";
    form.reset();

  } catch (err) {
    console.error(err);
    status.textContent = "❌ Error sending message.";
  }
 
} );
