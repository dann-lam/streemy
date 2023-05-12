let popupWindow = null;

function addUserCard(user) {
  const container = document.querySelector(".streamers-container");
  const card = document.createElement("div");
  const favoriteButton = document.createElement("button");
  const nameElement = document.createElement("h3");
  const platformElement = document.createElement("p");
  const cardInfo = document.createElement("div");
  const cardTemplate = document.createElement("div");
  const cardLink = document.createElement("a"); // Create anchor element

  const streamerURL = user.user_streamer;
  const streamerOnline = user.is_online;
  nameElement.textContent = user.name;
  favoriteButton.innerHTML = user.user_streamer.favorited ? "★" : "☆";

  platformElement.textContent = user.platform.platform_name;

  cardLink.target = "_blank";
  cardLink.style.textDecoration = "none"; // Remove the underline from the text

  cardTemplate.classList.add("card-template");
  cardInfo.classList.add("card-info");
  card.classList.add("card");
  favoriteButton.classList.add("favorite-button");
  nameElement.classList.add("card-username");
  platformElement.classList.add("card-platform");
  card.classList.add(`platform-${user.platform.platform_name.toLowerCase()}`);

  cardTemplate.appendChild(card);
  card.appendChild(cardLink); // Wrap the card content inside the anchor element
  cardLink.appendChild(cardInfo);
  cardInfo.appendChild(nameElement);
  cardInfo.appendChild(platformElement);
  cardInfo.appendChild(favoriteButton);

  // Event listener for the card
  card.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default event (navigation)
    openStreamer(user.streamer_url);
  });

  // Event listener for the favorite button
  favoriteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the card's click event
    // ... existing code for the favorite button ...
  });

  return container.appendChild(cardTemplate);
}

function addUserCardFavorite(user) {
  const container = document.querySelector(".streamers-container");
  const card = document.createElement("div");
  const favoriteButton = document.createElement("button");
  const nameElement = document.createElement("h3");
  const platformElement = document.createElement("p");
  const cardInfo = document.createElement("div");
  const cardTemplate = document.createElement("div");
  const cardLink = document.createElement("a"); // Create anchor element

  const streamerURL = user.streamer.streamer_url;
  const streamerOnline = user.streamer.is_online;
  nameElement.textContent = user.streamer.name;
  favoriteButton.innerHTML = user.favorited ? "★" : "☆";
  platformElement.textContent = user.streamer.platform.platform_name;

  cardLink.href = streamerURL; // Set the anchor's href attribute
  cardLink.target = "_blank";
  cardLink.style.textDecoration = "none"; // Remove the underline from the text

  cardTemplate.classList.add("card-template");
  cardInfo.classList.add("card-info");
  card.classList.add("card");
  favoriteButton.classList.add("favorite-button");
  nameElement.classList.add("card-username");
  platformElement.classList.add("card-platform");
  card.classList.add(
    `platform-${user.streamer.platform.platform_name.toLowerCase()}`
  );
  card.classList.add("favorite-card");

  cardTemplate.appendChild(card);
  card.appendChild(cardLink); // Wrap the card content inside the anchor element
  cardLink.appendChild(cardInfo);
  cardInfo.appendChild(nameElement);
  cardInfo.appendChild(platformElement);
  cardInfo.appendChild(favoriteButton);

  // Event listener for the card
  card.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default event (navigation)
    openStreamer(streamerURL);
  });

  // Event listener for the favorite button
  favoriteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the card's click event
    // ... existing code for the favorite button ...
  });

  return container.appendChild(cardTemplate);
}

// function addUserCard(user) {
//   //Select this card, and then CLONE IT.
//   console.log(user);
//   const cardTemplate = document.querySelector(".card-template");
//   const card = cardTemplate.cloneNode(true);

//   // Populate card with user data
//   card.querySelector(".card-avatar").src = user.avatarUrl;
//   card.querySelector(".card-username").textContent = user.username;
//   card.querySelector(".card-streaming").textContent = user.streaming;
//   card.querySelector(".card-name").textContent = user.name; // Add the streamer's name

//   card.classList.remove("card-template");
//   card.classList.add(user.status);
//   card.classList.add(`platform-${user.platform.toLowerCase()}`);

//   const favoriteButton = document.createElement("button");
//   favoriteButton.classList.add("favorite-button");
//   favoriteButton.innerHTML = user.isFavorited ? "★" : "☆";

//   // Event listener for liking/unliking a user
//   //How does isFavorited method work
//   favoriteButton.addEventListener("click", (event) => {
//     event.stopPropagation(); // Prevent the card's click event
//     const isFavorited = favoriteButton.innerHTML === "★";
//     fetch(`/favorites/${user.id}`, { method: isFavorited ? "DELETE" : "POST" })
//       .then((response) => {
//         if (response.ok) {
//           favoriteButton.innerHTML = isFavorited ? "☆" : "★";
//         }
//       })
//       .catch((error) => console.error(error));
//   });

//   // Append favorite button to the card
//   card.querySelector(".card-info").appendChild(favoriteButton);

//   // Append card to the container
//   const streamersContainer = document.querySelector(".streamers-container");
//   streamersContainer.appendChild(card);

//   // Event listener for card click
//   card.addEventListener("click", () => {
//     window.location.href = user.streamer_url; // Open the streamer's URL when the card is clicked
//   });
// }

function clearStreamersContainer() {
  const streamersContainer = document.querySelector(".streamers-container");
  while (streamersContainer.firstChild) {
    streamersContainer.removeChild(streamersContainer.firstChild);
  }
}

const statusButtons = document.querySelectorAll(
  ".status-button, .favorites-button"
);

statusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // First, remove 'active' class from all status buttons
    statusButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Then, add 'active' class to the clicked button
    this.classList.add("active");
  });
});

function onNewUser(newUser) {
  // Add a card for the new user
  addUserCard(newUser);
}

document.querySelector(".favorites-button").addEventListener("click", () => {
  // Fetch data for the favorite streamers and populate the cards
  clearStreamersContainer();
  fetch("/favorites")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((user) => addUserCardFavorite(user));
      return;
    })
    .catch((error) => console.error(error));
});

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    clearStreamersContainer();
    fetch("/offline")
      .then((response) => response.json())
      .then((data) => {
        let ourStuff = data[0].streamers;
        ourStuff.forEach((user) => addUserCard(user));
        return;
      })
      .catch((error) => console.error(error));
  });

document.querySelector(".login-button").addEventListener("click", () => {
  fetch("/login")
    .then((response) => {
      if (response.ok) {
        // Redirect user to login page, or show a "logged out" message, etc.
        window.location.href = "/login";
      } else {
        console.error("Login failed");
      }
    })
    .catch((error) => console.error(error));
});

document.querySelector("#logout-button").addEventListener("click", () => {
  fetch("/logout")
    .then((response) => {
      if (response.ok) {
        // Redirect user to login page, or show a "logged out" message, etc.
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    })
    .catch((error) => console.error(error));
});

document
  .querySelector(".status-button.online")
  .addEventListener("click", () => {
    clearStreamersContainer();
    fetch("/online")
      //
      .then((response) => response.json())
      .then((data) => {
        let ourStuff = data[0].streamers;
        console.log(ourStuff);
        ourStuff.forEach((hotdog) => addUserCard(hotdog));
        // data.forEach((streamer) => addUserCard(streamer));
        return;
        //Promise not resolved.
      })
      .catch((error) => console.error(error));
    //   .catch((error) => console.error(error));
    //   .then((data) => {
    //     data.forEach((user) => addUserCard(user));
    //   })
    //   ;
  });

function openStreamer(streamerUrl) {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.location.href = streamerUrl;
  } else {
    popupWindow = window.open(
      streamerUrl,
      "streamerWindow",
      "height=600,width=800,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no"
    );
  }

  if (window.focus) {
    popupWindow.focus();
  }
}

card.addEventListener("click", () => {
  openStreamer(user.streamer_url);
});
