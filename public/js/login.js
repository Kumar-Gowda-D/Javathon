document.getElementById("login-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email === "test@example.com" && password === "password123") {
      alert("Welcome to SMILE! Login successful.");
      window.location.href = "homepage.html"; // Navigate to the homepage
    } else if (!email || !password) {
      alert("Please fill out all fields!");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
  