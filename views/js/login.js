document.addEventListener("DOMContentLoaded", function() {
    const showLoginFormButton = document.getElementById("show-login-btn");
    const loginForm = document.getElementById("login-form");
    const showSignupFormButton = document.getElementById("show-signup-btn");
    const signupForm = document.getElementById("signup-form");
  
    showLoginFormButton.addEventListener("click", function() {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    });
  
    showSignupFormButton.addEventListener("click", function() {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
    });
  });

  const emailInput = document.getElementById("email");

  emailInput.addEventListener("input", function() {
    if (!emailInput.checkValidity()) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }
  });
  
  