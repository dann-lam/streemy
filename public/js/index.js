function addUserCard(user) {
  const container = document.querySelector(".streamers-container");
  const card = document.createElement("div");
  const favoriteButton = document.createElement("button");
  const nameElement = document.createElement("h3");
  const platformElement = document.createElement("p");
  const cardInfo = document.createElement("div");
  const cardTemplate = document.createElement("div");
  //Remember to make something for the avatar! :)
  const streamerURL = user.user_streamer;
  const streamerOnline = user.is_online;
  nameElement.textContent = user.name;
  favoriteButton.innerHTML = user.isFavorited ? "★" : "☆";
  platformElement.textContent = user.platform.platform_name;

  cardTemplate.classList.add("card-template");
  cardInfo.classList.add("card-info");
  card.classList.add("card");
  favoriteButton.classList.add("favorite-button");
  nameElement.classList.add("card-username");
  platformElement.classList.add("card-platform");
  card.classList.add(`platform-${user.platform.platform_name.toLowerCase()}`);

  cardTemplate.appendChild(card);
  card.appendChild(cardInfo);
  cardInfo.appendChild(nameElement);
  cardInfo.appendChild(platformElement);
  cardInfo.appendChild(favoriteButton);

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
  //Remember to make something for the avatar! :)
  const streamerURL = user.streamer.streamer_url;
  const streamerOnline = user.streamer.is_online;
  nameElement.textContent = user.streamer.name;
  favoriteButton.innerHTML = user.favorited ? "★" : "☆";
  platformElement.textContent = user.streamer.platform.platform_name;

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
  card.appendChild(cardInfo);
  cardInfo.appendChild(nameElement);
  cardInfo.appendChild(platformElement);
  cardInfo.appendChild(favoriteButton);

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

document.querySelector(".favorites-button").addEventListener("click", () => {
  clearStreamersContainer();
});

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    clearStreamersContainer();
  });

document
  .querySelector(".status-button.online")
  .addEventListener("click", () => {});

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    filterCards("offline");
  });

  const statusButtons = document.querySelectorAll('.status-button, .favorites-button');

  statusButtons.forEach(button => {
    button.addEventListener('click', function() {
      // First, remove 'active' class from all status buttons
      statusButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Then, add 'active' class to the clicked button
      this.classList.add('active');
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
