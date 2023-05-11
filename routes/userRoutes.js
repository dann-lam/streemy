const router = require("express").Router();
const { User, Platform, Streamer, User_Streamer } = require("../models");
const { update } = require("../models/User");
const path = require("path");

router.post("/signup", async (req, res) => {
  try {
    console.log("Is our signup route getting hit??");
    // Find the user who matches the posted e-mail address
    //Get the username.
    let passwordInput = req.body.password;
    let emailInput = req.body.email;
    //We should check to see if the user is already in the database already
    //If they are, then we can send a message saying that person already exists.
    //Otherwise register the user.
    const userData = await User.findOne({
      where: { email: emailInput },
    });
    //If you cannot find on signup... that means there is no user with that email. Which means we can sign them up.
    if (!userData) {
      // const dbUserData =
      User.create({
        email: emailInput,
        password: passwordInput,
      });
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        // Redirect to index.html upon successful signup
        console.log(req.session.user_id);
        res.redirect("/index.html");
      });
    }

    // Create session variables based on the logged in user
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
    console.log("Hi!");
    // res.redirect("/online");
  }
});

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Redirect to index.html upon successful login
      console.log("Res.status(200)");
      res.status(200).redirect("/index.html");
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

module.exports = router;
