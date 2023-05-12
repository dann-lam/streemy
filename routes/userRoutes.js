const router = require("express").Router();
const { User, Platform, Streamer, User_Streamer } = require("../models");
const { update } = require("../models/User");
const path = require("path");

const { Sequelize } = require("sequelize");

//THIS route never gets hit???
router.get("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      return res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  } catch (err) {}
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (!req.session.logged_in) {
    return res.sendFile(path.join(__dirname, "../public/login.html"));
  } else {
    res.redirect("/login");
  }
});

router.post("/signup", async (req, res) => {
  try {
    let passwordInput = req.body.password;
    let emailInput = req.body.email;

    const existingUserData = await User.findOne({
      where: { email: emailInput },
    });

    if (!existingUserData) {
      const newUser = await User.create({
        email: emailInput,
        password: passwordInput,
      });

      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        res.status(200).json({ message: "Logged in successfully" });
      });
    } else {
      res.status(400).json({ message: "Email already exists." });
      // User with the same email already exists, handle the error here.
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Return a JSON response instead of redirecting
      res.status(200).json({ message: "Logged in successfully" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      // Redirect to login.html upon successful logout
      res.redirect("/login");
    });
  } else {
    res.status(404).end();
  }
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      // Redirect to login.html upon successful logout
      res.redirect("/login");
    });
  } else {
    res.status(404).end();
  }
});

/*userRoutes*/
//Oh, someone called me!
router.get("/online", async (req, res) => {
  try {
    let ourUserID = req.session.user_id;

    const streamerData = await User.findAll({
      where: {
        id: ourUserID,
      },
      include: [
        {
          model: Streamer,
          where: {
            is_online: true,
          },
          include: [
            {
              model: Platform,
            },
          ],
        },
      ],
    });

    if (!streamerData) {
      console.log("No streamer data found!");
    }

    // const streamers = streamerData.map((userStreamer) => {
    //   const streamer = userStreamer.Streamer.get({ plain: true });
    //   return {
    //     ...userStreamer.get({ plain: true }),
    //     streamer_name: streamer.name,
    //   };
    // });
    // res.json(streamers);
    console.log("StreamerData");
    console.log(streamerData);
    res.status(200).json(streamerData);
    //Give me our list.
  } catch (err) {
    //GO away.
    res.status(500).json(err);
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const streamerData = await User_Streamer.findAll({
      where: {
        favorited: true,
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Streamer,
          include: [
            {
              model: Platform,
            },
          ],
        },
      ],
    });
    res.status(200).json(streamerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/offline", async (req, res) => {
  try {
    let ourUserID = req.session.user_id;

    const streamerData = await User.findAll({
      where: {
        id: ourUserID,
      },
      include: [
        {
          model: Streamer,
          where: {
            is_online: false,
          },
          include: [
            {
              model: Platform,
            },
          ],
        },
      ],
    });

    if (!streamerData) {
      console.log("No streamer data found!");
    }
    console.log("StreamerData");
    console.log(streamerData);
    res.status(200).json(streamerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/favNum", async (req, res) => {
  try {
    let ourTargID = req.body.data;
    let ourUserID = req.session.user_id;

    const updateData = await User_Streamer.update(
      {
        favorited: Sequelize.literal("NOT favorited"),
      },
      {
        where: {
          user_id: ourUserID,
          streamer_id: ourTargID,
        },
        // returning: true,
        // plain: true,
      }
    );

    //Get the boolean value of the target streamer.
    const boolData = await User_Streamer.findOne({
      where: {
        user_id: ourUserID,
        streamer_id: ourTargID,
      },
    });

    //Query the thing again, and then send back our thing.
    console.log("Bool Data");
    console.log(boolData);
    res.status(200).json(boolData);
  } catch (err) {
    console.log("Hit our error!", err);
    res.status(500).json(err);
  }
});

router.get("/test", async (req, res) => {
  try {
    console.log("Test hit!");
    res.status(200).json({ Message: "Test HIt" });
  } catch (err) {
    console.log("Err caught.");
    res.status(500).json(err);
  }
});

module.exports = router;
