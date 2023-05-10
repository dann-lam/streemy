const router = require("express").Router();
const { User, Streamer, Platform, User_Streamer } = require("../../models");
const withAuth = require("../../utils/auth");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    let yee = await { Message: "We got got." };
    res.status(200).json(yee);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Deleted withAuth lol
// withAuth
router.get("/online", async (req, res) => {
  try {
    //Once logging in,
    //Save ID on client side
    //Once logged in, pass it as a parameter.
    //Save ID on local storage.
    //Grab it from local storage object
    //Send it as a parameter.
    console.log("Online route Hit!");
    let ourUserID = req.session.user_id;
    console.log("Our UserID!: ", ourUserID);
    const streamerData = await User_Streamer.findAll({
      // include
      //Find the streamers where the user ID is OUR user ID.
      //I'm logged in as user ID 2.
      //So, I have to get our USER ID somehow??
      //SESSION ID?
      //After we do our SQL Database query where we only get back streamers based on our USER ID
      //We save that query, (because it'll only contain our streamers based on user ID) to a variable.
      //Inside that variable is going to be an object of some kind, and we simply respond with a res.json (with our variable inside)
      where: {
        user: 2,
      },
    });
    console.log(ourUserID);
    if (!streamerData) {
      console.log("No streamer data found!");
    }
    console.log(streamerData);
    res.json(streamerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/offline", withAuth, async (req, res) => {
  try {
    const streamerData = await Streamer.findAll({
      where: {
        online: false,
      },
    });
    const streamers = streamerData.map((streamer) =>
      streamer.get({ plain: true })
    );

    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/favorites", withAuth, async (req, res) => {
  try {
    const streamerData = await User_Streamer.findAll({
      where: {
        favorite: true,
        user: req.session.user_id,
      },
    });

    res.status(200).json(streamerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
