const path = require("path");
const withAuth = (req, res, next) => {
  console.log("Status of session:", req.session.logged_in);
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    console.log("Should be redirected!");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
