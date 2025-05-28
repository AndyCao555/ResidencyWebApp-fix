// Login form submission handler
document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Store user data
        localStorage.setItem("studentEmail", email);
        localStorage.setItem("studentId", data.user.id);
        
        // Redirect to dashboard
        window.location.href = "StudentDashboard.html";
    } catch (error) {
        alert(error.message || "An error occurred during login");
    }
}); 