document.addEventListener("DOMContentLoaded", function() {
  const showLoginFormButton = document.getElementById("show-login-btn");
  const loginForm = document.getElementById("login-form");
  const showSignupFormButton = document.getElementById("show-signup-btn");
  const signupForm = document.getElementById("signup-form");
  const emailInput = document.getElementById("email");

  showLoginFormButton.addEventListener("click", function() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  });

  showSignupFormButton.addEventListener("click", function() {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  });

  emailInput.addEventListener("input", function() {
    if (!emailInput.checkValidity()) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }
  });

  loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Process the response data (e.g., save token, redirect to dashboard, etc.)
    } else {
      // Display an error message (e.g., incorrect email or password)
    }
  });

  signupForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Process the response data (e.g., save token, redirect to dashboard, etc.)
    } else {
      // Display an error message (e.g., email already exists)
    }

  });
});
