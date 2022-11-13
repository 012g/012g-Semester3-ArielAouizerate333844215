const connection = require('../db_connection');
const {customErrorHandler} = require("../utils");
// All these get controllers are responsible for showing the user pages (signin, signup)

exports.getSignin = async (req, res) => {
    // These if statements in the get controllers helps to check if the users is signed in or not
    // if the user is already signed in we take the user to the my-events page
    if (req.session.user) return res.redirect("/events/my-events");
    res.render("signin", {error: null});
};

exports.getSignup = (req, res) => {
    // These if statements in the get controllers helps to check if the users is signed in or not
    // if the user is already signed in we take the user to the my-events page
    if (req.session.user) return res.redirect("/events/my-events");
    res.render("signup", {error: null});
};

// This controller is responsible for signing up the user
exports.postSignup = async (req, res) => {
    try {
        connection.query("SELECT * FROM Users where email= ?", [connection.escape(req.body.email)], function (error, results, fields) {
            if (error) throw error;
            // We check if the email already exist or not
            if (results.length) {
                return res.render("signup", {error: "Email already exist"});
            }
            let queryString = "INSERT INTO Users SET fullName = ?, email = ?, phone  = ?, password = ?";
            connection.query(queryString, [
                req.body.fullName,
                req.body.email,
                req.body.phone,
                req.body.password
            ], function (err, result) {
                if (err) throw err;
                // get user
                connection.query('SELECT * FROM Users WHERE id = ?', [
                    result.insertId
                ], function (err, result) {
                    if (err) throw err;
                    req.session.user = result[0];
                    res.redirect("/events/my-events");
                })
            });
        });
    } catch (error) {
        res.render("signup", {error: customErrorHandler(error)});
    }
};

// This controller is responsible for signing in the user
exports.postSignin = async (req, res) => {
    try {
        // get user by email and password
        connection.query("SELECT * FROM Users WHERE email=? AND password=?", [
            req.body.email,
            req.body.password
        ], function (error, results, fields) {
            if (error) throw error;
            let user = results[0];
            // We check if the email and password is correct or not
            if (!user) {
                return res.render("signin", {error: "Wrong email or password"});
            }
            req.session.user = user;
            res.redirect("/events/my-events");
        });
    } catch (error) {
        res.render("signin", {error: customErrorHandler(error)});
    }
};

// This controller is responsible for logging out the user
exports.logout = (req, res) => {
    // We remove the user from session for logging out
    req.session.user = null;
    res.redirect("/users/signin");
};
