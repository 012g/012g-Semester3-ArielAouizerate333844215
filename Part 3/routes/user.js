const router = require("express").Router();
const {
  getSignin,
  getSignup,
  postSignup,
  logout,
  postSignin,
} = require("../controllers/user");

// This file is responsible for the routes related to the user

// Route for the signin page
router.get("/signin", getSignin);

// Route for the signup page
router.get("/signup", getSignup);

// Route for signup
router.post("/signup", postSignup);

// Route for signin
router.post("/signin", postSignin);

// Route for logout
router.get("/logout", logout);

module.exports = router;
