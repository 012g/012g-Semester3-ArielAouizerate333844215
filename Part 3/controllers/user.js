const User = require("../models/user");
const path = require("path");
const { mongooseErrorHandler } = require("../utils");

// All these get controllers are responsible for showing the user pages (signin, signup)

exports.getSignin = (req, res) => {
  // These if statements in the get controllers helps to check if the users is signed in or not
  // if the user is already signed in we take the user to the my events page
  if (req.session.user) return res.redirect("/events/my-events");

  res.render("signin", { error: null });
};

exports.getSignup = (req, res) => {
  // These if statements in the get controllers helps to check if the users is signed in or not
  // if the user is already signed in we take the user to the my events page
  if (req.session.user) return res.redirect("/events/my-events");
  res.render("signup", { error: null });
};

// This controller is responsible for signing up the user
exports.postSignup = async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });

    // We check if the email already exist or not
    if (emailExist) {
      return res.render("signup", { error: "Email already exist" });
    }

    const user = new User(req.body);
    await user.save();

    // We are using sessions for keeping the user signed in
    req.session.user = user;

    res.redirect("/events/my-events");
  } catch (error) {
    res.render("signup", { error: mongooseErrorHandler(error) });
  }
};

// This controller is responsible for logging out the user
exports.logout = (req, res) => {
  // We remove the user from session for logging out
  req.session.user = null;
  res.redirect("/users/signin");
};

// This controller is responsible for signing in the user
exports.postSignin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    // We check if the email and password is correct or not
    if (!user) {
      return res.render("signin", { error: "Wrong email or password" });
    }

    // We are using sessions for keeping the user signed in
    req.session.user = user;

    res.redirect("/events/my-events");
  } catch (error) {
    res.render("signin", { error: mongooseErrorHandler(error) });
  }
};
