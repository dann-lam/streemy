//global variable representing the interest area of a user defaulting to "online"
var currTab = "online";

let popupWindow = null;
//Function dedicated to resetting content in a container.
function clearStreamersContainer() {
  const streamersContainer = document.querySelector(".streamers-container");
  while (streamersContainer.firstChild) {
    streamersContainer.removeChild(streamersContainer.firstChild);
  }
}
//Switch function dedicated to figuring out which tab the user is on.
let onFavOff = (string) => {
  if (string === "offline") {
    clearStreamersContainer();
    return offlineFunc();
  } else if (string === "online") {
    clearStreamersContainer();
    return onlineFunc();
  } else if (string === "favorites") {
    clearStreamersContainer();
    return favoriteFunc();
  }
  console.log("you fed me wrong");
  return;
};
//Routing for the "offline" route,.
let offlineFunc = () => {
  fetch("/offline")
    .then((response) => response.json())
    .then((data) => {
      let ourStuff = data[0].streamers;
      ourStuff.forEach((user) => addUserCard(user));
      return;
    })
    .catch((error) => console.error(error));
};

//Routing for updating which users are favorited on the backend.
let patchFav = (inNum, inString) => {
  fetch("/favNum", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: inNum,
    }),
  })
    .then((response) => response.json())
    .then((data) => onFavOff(inString))
    .catch((error) => console.error(error));
};
//Routing for loging in.
let loginFunc = () => {
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
};
//Routing for retrieving our favorited streamers.
let favoriteFunc = () => {
  fetch("/favorites")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => addUserCardFavorite(user));
      return;
    })
    .catch((error) => console.error(error));
};
//Routing for retrieving which streamers are online.
let onlineFunc = () => {
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
};
//Function for Creating a card for "Online" and "Offline" routes.
function addUserCard(user) {
  const container = document.querySelector(".streamers-container");
  const card = document.createElement("div");
  const favoriteButton = document.createElement("button");
  const nameElement = document.createElement("h3");
  const platformElement = document.createElement("p");
  const cardInfo = document.createElement("div");
  const cardTemplate = document.createElement("div");
  const cardLink = document.createElement("a"); // Create anchor element
  //ATTRIBUTE SETTING
  let streamerId = user.user_streamer.streamerId;
  cardLink.dataset.streamerId = streamerId;

  //TEXT CONTENT
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
  favoriteButton.classList.add("favorites-icon");
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
  nameElement.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default event (navigation)
    openStreamer(user.streamer_url);
  });

  // Event listener for the favorite button
  favoriteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    let num = cardLink.dataset.streamerId;
    patchFav(num, currTab);
  });

  return container.appendChild(cardTemplate);
}

//Unfortunate repeat, but the nature of the routing kinda forces me to change up a few variables. Could 100% be dryer, but I don't have time to fix it.

function addUserCardFavorite(user) {
  const container = document.querySelector(".streamers-container");
  const card = document.createElement("div");
  const favoriteButton = document.createElement("button");
  const nameElement = document.createElement("h3");
  const platformElement = document.createElement("p");
  const cardInfo = document.createElement("div");
  const cardTemplate = document.createElement("div");
  const cardLink = document.createElement("a"); // Create anchor element

  //ATTRIBUTES FOR FAVORITES
  let streamerId = user.streamerId;
  cardLink.dataset.streamerId = streamerId;

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
  // favoriteButton.classList.add("favorite-button");
  nameElement.classList.add("card-username");
  platformElement.classList.add("card-platform");
  card.classList.add(
    `platform-${user.streamer.platform.platform_name.toLowerCase()}`
  );
  card.classList.add("favorite-card");

  favoriteButton.classList.add("favorites-icon");

  cardTemplate.appendChild(card);
  card.appendChild(cardLink); 
  cardLink.appendChild(cardInfo);
  cardInfo.appendChild(nameElement);
  cardInfo.appendChild(platformElement);
  cardInfo.appendChild(favoriteButton);

  // Event listener for the card
  nameElement.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default event (navigation)
    openStreamer(streamerURL);
  });

  // Event listener for the favorite button
  favoriteButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    let num = cardLink.dataset.streamerId;
    patchFav(num, currTab);
  });

  return container.appendChild(cardTemplate);
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
  currTab = "favorites";
  favoriteFunc();
});

document
  .querySelector(".status-button.offline")
  .addEventListener("click", () => {
    clearStreamersContainer();
    currTab = "offline";
    offlineFunc();
  });

document.querySelector(".login-button").addEventListener("click", () => {
  loginFunc();
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
    currTab = "online";
    onlineFunc();
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

// card.addEventListener("click", () => {
//   openStreamer(user.streamer_url);
// });
