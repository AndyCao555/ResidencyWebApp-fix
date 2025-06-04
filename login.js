// Login form submission handler
document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault(); //prevents the default action of the event from occurring which in this case refreshes the page
    //async marks a function as asynchronous

    const email = document.getElementById("email").value.trim(); //.trim() removes any whitespace from the beginning and end of the string
    const password = document.getElementById("password").value;
    //.value is used toget what the user has typed in the input field

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