document.addEventListener("DOMContentLoaded", function () {
  const showLoginFormButton = document.getElementById("show-login-btn");
  const loginForm = document.getElementById("login-form");
  const showSignupFormButton = document.getElementById("show-signup-btn");
  const signupForm = document.getElementById("signup-form");
  const emailInput = document.getElementById("email");

  showLoginFormButton.addEventListener("click", function () {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  });

  showSignupFormButton.addEventListener("click", function () {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  });

  emailInput.addEventListener("input", function () {
    if (!emailInput.checkValidity()) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }
  });

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    //I probably need to set up receiving responses better.

    // const data = await response.json();

    if (response.ok) {
      const data = await response.json();
      console.log("Logged in successfully");
      window.location.href = "/index.html"; 
    } else {
      console.log("Login failed");
    }
  });
    
    // if (response.ok) {
    //   console.log("Is ok");
    // } else {
    //   console.log("is not ok");
    // }

    // console.log("Data received.");
    // console.log(data.user);

    // Process the response data (e.g., save token, redirect to dashboard, etc.)

    // Display an error message (e.g., incorrect email or password)


  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Signed in successfully");
      window.location.href = "/index.html"; 
    } else {
      console.log("Signup failed");
    }
  });
});

function addUserCard(user) {
  const cardTemplate = document.querySelector(".card-template");
  const card = cardTemplate.cloneNode(true);

  // Populate card with user data
  card.querySelector(".card-avatar").src = user.avatarUrl;
  card.querySelector(".card-username").textContent = user.username;
  card.querySelector(".card-streaming").textContent = user.streaming;

  // Remove the template class, add user status class, and display the card
  card.classList.remove("card-template");
  card.classList.add(user.status);

  // Append card to the container
  const streamersContainer = document.querySelector(".streamers-container");
  streamersContainer.appendChild(card);
}

function clearStreamersContainer() {
  const streamersContainer = document.querySelector(".streamers-container");
  while (streamersContainer.firstChild) {
    streamersContainer.removeChild(streamersContainer.firstChild);
  }
}

document.querySelector(".favorites-button").addEventListener("click", () => {
  clearStreamersContainer();
});

document
  .querySelector(".status-button.online")
  .addEventListener("click", () => {
    clearStreamersContainer();
  });

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    clearStreamersContainer();
  });

function filterCards(status) {
  const cards = document.querySelectorAll(".streamers-container .card");
  cards.forEach((card) => {
    if (card.classList.contains(status)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

document
  .querySelector(".status-button.online")
  .addEventListener("click", () => {
    filterCards("online");
  });

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    filterCards("offline");
  });

function onNewUser(newUser) {
  // Add a card for the new user
  addUserCard(newUser);
}

document.querySelector(".favorites-button").addEventListener("click", () => {
  // Fetch data for the favorite streamers and populate the cards
  fetch("/favorites")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => addUserCard(user));
    })
    .catch((error) => console.error(error));
});

document
  .querySelector(".status-button.online")
  .addEventListener("click", () => {
    // Fetch data for online streamers and populate the cards
    fetch("/online")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => addUserCard(user));
      })
      .catch((error) => console.error(error));
  });

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    // Fetch data for offline streamers and populate the cards
    fetch("/offline")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => addUserCard(user));
      })
      .catch((error) => console.error(error));
  });
