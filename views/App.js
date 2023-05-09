const tiktokStreams = [
    {
      profileImage: "https://th.bing.com/th?id=OIP.IDLD7-6hTh68NAOzJeq60wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Bryce Hall",
    },
    {
      profileImage: "https://th.bing.com/th?id=OIP.IDLD7-6hTh68NAOzJeq60wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Addison Rae",
    },
  ];

  const youtubeStreams = [
    {
      profileImage: "https://th.bing.com/th?id=OIP.aByvAl4Fl4Dk3N9fA3IudwHaFM&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Mr. Beast",
    },
    {
      profileImage: "https://th.bing.com/th?id=OIP.aByvAl4Fl4Dk3N9fA3IudwHaFM&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "PewDiePie",
    },
  ];
  
  const twitchStreams = [
    {
      profileImage: "https://www.bing.com/th?id=OIP.s_D2gr9AQVsv5oCCIWSA1wHaHZ&w=206&h=206&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "Pokimane",
    },
    {
      profileImage: "https://www.bing.com/th?id=OIP.s_D2gr9AQVsv5oCCIWSA1wHaHZ&w=206&h=206&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      title: "xQc",
    },
  ];
  
  function displayStreams(streams, containerId) {
    const container = document.getElementById(containerId);
  
    streams.forEach((stream) => {
      const streamDiv = document.createElement("div");
      streamDiv.className = "stream";
  
      const img = document.createElement("img");
      img.src = stream.profileImage;
      img.alt = stream.title;
      streamDiv.appendChild(img);
  
      const p = document.createElement("p");
      p.textContent = stream.title;
      streamDiv.appendChild(p);
  
      container.appendChild(streamDiv);
    });
  }