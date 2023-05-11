const router = require("express").Router();
const { User, Platform, Streamer, User_Streamer } = require("../models");
const { update } = require("../models/User");
const path = require("path");
const withAuth = require("../utils/auth");

router.post("/signup", async (req, res) => {
  try {
    console.log("Is our signup route getting hit??");
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

        console.log(req.session.user_id);
        res.status(200).json({ message: "Logged in successfully" });
      });
    } else {
      // User with the same email already exists, handle the error here.
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


// // CREATE new user
// router.post("/", async (req, res) => {
//   try {
//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/login", async (req, res) => {
//   try {
//     res.status(200).json();
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (!req.session.logged_in) {
    return res.sendFile(path.join(__dirname, "../public/login.html"));
  } else {
    res.redirect("/index.html");
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
    console.log("login post 400");
    res.status(400).json(err);
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     // Find the user who matches the posted e-mail address
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res.status(400).json({ message: "Incorrect email" });
//       return;
//     }

//     // Verify the posted password with the password store in the database
//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password" });
//       return;
//     }

//     // Create session variables based on the logged in user
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       // Redirect to index.html upon successful login
//       console.log("Res.status(200)");
//       res.redirect("/index.html");
//     });
//   } catch (err) {
//     console.log("login post 400");
//     res.status(400).json(err);
//   }
// });

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


// router.get("/", async (req, res) => {
//   try {
//     let yee = await { Message: "We got got." };
//     res.status(200).json(yee);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
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
        user: ourUserID,
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

