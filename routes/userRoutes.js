const router = require("express").Router();
const { User, Platform, Streamer, User_Streamer } = require("../models");
const { update } = require("../models/User");
const path = require("path");

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
        res.redirect("/index.html");
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
      res.redirect("/index.html");
    });
  } catch (err) {
    console.log("login post 400");
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

module.exports = router;
