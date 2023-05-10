const tiktokStreams = [
    {
      profileImage: "https://th.bing.com/th?id=OIP.IDLD7-6hTh68NAOzJeq60wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Bryce Hall",
      status: "online",
      url: "https://www.tiktok.com/@brycehall?lang=en"
    },
  ];

  const favoriteStreams = [
    {
      profileImage: "https://th.bing.com/th?id=OIP.IDLD7-6hTh68NAOzJeq60wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Addison Rae",
      status: "online",
      url: "https://www.tiktok.com/@addisonre"
    },
  ];
  

  const youtubeStreams = [
    {
      profileImage: "https://th.bing.com/th?id=OIP.aByvAl4Fl4Dk3N9fA3IudwHaFM&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Mr. Beast",
      status: "online",
      url: "https://www.youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA"
    },
    {
      profileImage: "https://th.bing.com/th?id=OIP.aByvAl4Fl4Dk3N9fA3IudwHaFM&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "PewDiePie",
      status: "online",
      url: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw"
    },
  ];
  const twitchStreams = [
    {
      profileImage: "https://www.bing.com/th?id=OIP.s_D2gr9AQVsv5oCCIWSA1wHaHZ&w=206&h=206&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Pokimane",
      status: "online",
      url: "https://www.twitch.tv/pokimane"
    },
    {
      profileImage: "https://www.bing.com/th?id=OIP.s_D2gr9AQVsv5oCCIWSA1wHaHZ&w=206&h=206&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "xQc",
      status: "online",
      url: "https://www.twitch.tv/xqc"
      
    },
  ];
  
  function displayStreams(streams, containerId, status, colorCode) {
    const container = document.getElementById(containerId);
  
    streams.forEach((stream) => {
      if (stream.status === status) {
        const cardLink = document.createElement("a");
        cardLink.href = stream.url;
        cardLink.target = "_blank";
        cardLink.rel = "noopener noreferrer";
  
        // Add click event listener to open the stream in a pop-out window
        cardLink.addEventListener("click", (event) => {
          event.preventDefault();
          window.open(stream.url, stream.title, "width=800,height=600");
        });
  
        const cardDiv = document.createElement("div");
        cardDiv.className = "stream-card";
  
        const starIcon = document.createElement("i");
        starIcon.className = isFavorited(stream.title) ? "fas fa-star" : "far fa-star";
        starIcon.style.cursor = "pointer";
        starIcon.addEventListener("click", () => toggleFavorite(stream));
        cardDiv.appendChild(starIcon);
  
        const streamDiv = document.createElement("div");
        streamDiv.className = "stream";
        streamDiv.style.boxShadow = `0 2px 6px ${colorCode}`;
  
        const img = document.createElement("img");
        img.src = stream.profileImage;
        img.alt = stream.title;
        streamDiv.appendChild(img);
  
        const title = document.createElement("p");
        title.textContent = stream.title;
        title.className = "stream-title";
        streamDiv.appendChild(title);
  
        const details = document.createElement("p");
        details.textContent = "Streaming... Valorant";
        details.className = "stream-details";
        streamDiv.appendChild(details);
  
        cardDiv.appendChild(streamDiv);
        cardLink.appendChild(cardDiv);
        container.appendChild(cardLink);
      }
    });
  }
  
  
  
  // Define function to set the online tab as active
function setActiveTab() {
    const onlineBtn = document.querySelector(".favorites-container .favorites-button:first-child");
    const offlineBtn = document.querySelector(".favorites-container .favorites-button:last-child");
    onlineBtn.classList.add("active");
    offlineBtn.classList.remove("active");
  }
  
  // Call setActiveTab() and displayStreams() functions on page load
  window.onload = function() {
    setActiveTab();
    displayStreams(tiktokStreams, "tiktok-streams", "online");
    displayStreams(youtubeStreams, "youtube-streams", "online");
    displayStreams(twitchStreams, "twitch-streams", "online");
  };
  
  const offlineBtn = document.querySelector(".favorites-container .status-button.offline");
  offlineBtn.addEventListener("click", function () {
    const streamsContainers = document.querySelectorAll(".stream-container");
    streamsContainers.forEach(function (container) {
      container.innerHTML = "";
    });
    displayStreams(tiktokStreams, "tiktok-streams", "offline", "black"); // TikTok color
    displayStreams(youtubeStreams, "youtube-streams", "offline", "#FF0000"); // YouTube color
    displayStreams(twitchStreams, "twitch-streams", "offline", "#9146FF"); // Twitch color
    onlineBtn.classList.remove("active");
    offlineBtn.classList.add("active");
    displayAddisonRae("offline"); // Updated
  });
  
  const onlineBtn = document.querySelector(".favorites-container .status-button.online");
  onlineBtn.addEventListener("click", function () {
    const streamsContainers = document.querySelectorAll(".stream-container");
    streamsContainers.forEach(function (container) {
      container.innerHTML = "";
    });
    displayStreams(tiktokStreams, "tiktok-streams", "online", "black"); // TikTok color
    displayStreams(youtubeStreams, "youtube-streams", "online", "#FF0000"); // YouTube color
    displayStreams(twitchStreams, "twitch-streams", "online", "#9146FF"); // Twitch color
    onlineBtn.classList.add("active");
    offlineBtn.classList.remove("active");
    displayAddisonRae("online"); // Updated
  });
 
  function displayAddisonRae(status) {
    const addisonRae = favoriteStreams.find((stream) => stream.title === "Addison Rae");
    const favoritesStreamersContainer = document.querySelector(".favorites-streamers-container");
  
    if (addisonRae && addisonRae.status === status) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "stream-card";
  
      // add click event listener to cardDiv
      cardDiv.addEventListener("click", () => window.open(addisonRae.url, "Addison Rae Stream", "width=500,height=500"));
  
      const streamDiv = document.createElement("div");
      streamDiv.className = "stream";
  
      const img = document.createElement("img");
      img.src = addisonRae.profileImage;
      img.alt = addisonRae.title;
      streamDiv.appendChild(img);
  
      const title = document.createElement("p");
      title.textContent = addisonRae.title;
      title.className = "stream-title";
      streamDiv.appendChild(title);
  
      const details = document.createElement("p");
      details.textContent = "Streaming... Valorant";
      details.className = "stream-details";
      streamDiv.appendChild(details);
  
      cardDiv.appendChild(streamDiv);
      favoritesStreamersContainer.innerHTML = ""; // Clear previous content
      favoritesStreamersContainer.appendChild(cardDiv);
    } else {
      favoritesStreamersContainer.innerHTML = ""; // Clear previous content when status doesn't match
    }
  }
  
  
  
  
  
  function showOnlineStreams() {
    const streamsContainers = document.querySelectorAll(".stream-container");
    streamsContainers.forEach(function (container) {
      container.innerHTML = "";
    });
    displayStreams(tiktokStreams, "tiktok-streams", "online");
    displayStreams(youtubeStreams, "youtube-streams", "online");
    displayStreams(twitchStreams, "twitch-streams", "online");
  }
  
  const favoritesBtn = document.querySelector(".favorites-container .favorites-button");
  favoritesBtn.addEventListener("click", function () {
    const streamsContainers = document.querySelectorAll(".stream-container");
    streamsContainers.forEach(function (container) {
      container.innerHTML = "";
    });
  
    
    displayAddisonRae("online"); // Pass the appropriate status parameter here
  });
  
  function isFavorited(title) {
    return favoriteStreams.some((stream) => stream.title === title);
  }
  
  function toggleFavorite(stream) {
    if (isFavorited(stream.title)) {
      favoriteStreams = favoriteStreams.filter((fav) => fav.title !== stream.title);
    } else {
      favoriteStreams.push(stream);
    }
    // Re-render the favorite streamer section with the updated list
    displayAddisonRae(stream.status);
  }
  
  const cardDiv = document.createElement("div");
  cardDiv.className = "stream-card";
  
  const streamDiv = document.createElement("div");
  streamDiv.className = "stream";

  
  const img = document.createElement("img");
  img.src = stream.profileImage;
  img.alt = stream.title;
  streamDiv.appendChild(img);
  
  const title = document.createElement("p");
  title.textContent = stream.title;
  title.className = "stream-title";
  streamDiv.appendChild(title);
  
  const details = document.createElement("p");
  details.textContent = "Streaming... Valorant";
  details.className = "stream-details";
  streamDiv.appendChild(details);
  
  cardDiv.appendChild(streamDiv);
  container.appendChild(cardDiv);
  

  