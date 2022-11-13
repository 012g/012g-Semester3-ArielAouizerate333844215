const axios = require("axios");
const moment = require("moment");
const {customErrorHandler} = require("../utils");
const connection = require("../db_connection");

// All these get controllers are responsible for showing the event pages
exports.getCreate = (req, res) => {
    // These if statements in the get controllers helps to check if the users is signed in or not
    // if the user is not signed in we take the user to the sign-in page
    if (!req.session.user) return res.redirect("/users/signin");
    res.render("create", {error: null});
};

exports.getJoinEvent = (req, res) => {
    // These if statements in the get controllers helps to check if the users is signed in or not
    // if the user is not signed in we take the user to the sign in page
    if (!req.session.user) return res.redirect("/users/signin");
    res.render("join-event", {error: null});
};

exports.getMyEvents = async (req, res) => {
    // These if statements in the get controllers helps to check if the users is signed in or not
    // if the user is not signed in we take the user to the sign in page
    if (!req.session.user) return res.redirect("/users/signin");
    // get events by user id
    connection.query('SELECT * FROM Events WHERE users LIKE "%?%"', [
        req.session.user.id
    ], function (error, results) {
        if (error) throw error;
        let events = results;
        res.render("my-events", {events, error: null});
    });
};

// This controller is for creating the event
exports.postCreate = async (req, res) => {
    try {
        let eventUsers = [req.session.user.id];
        let sql = '';
        if (req.body.address) {
            const apiResult = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    req.body.address
                )}&key=ef1db87a7c70417ca26087e3c2ed1e81&no_annotations=1&limit=1`
            );
            let lat = apiResult.data.results[0].geometry.lat;
            let lng = apiResult.data.results[0].geometry.lng;
            sql = 'INSERT INTO Events (`users`, `owner_id`, `slots`, `address`, `category`, `teamName`, `date`, `coordinates`)' +
            ' VALUES (' +
                '"'+JSON.stringify(eventUsers) + '",' +
                '"'+req.session.user.id + '",' +
                '"'+req.body.slots + '",' +
                '"'+req.body.address + '",' +
                '"'+req.body.category + '",' +
                '"'+req.body.teamName + '",' +
                '"'+moment(req.body.date).format("YYYY-MM-DD hh:mm:ss") + '",' +
                'POINT(' + lat + ', ' + lng + ')' +
                ')';
        } else {
            console.log('Address not set!')
            sql = 'INSERT INTO Events (`users`, `owner_id`, `slots`, `address`, `category`, `teamName`, `date`)' +
                ' VALUES (' +
                '"'+JSON.stringify(eventUsers) + '",' +
                '"'+req.session.user.id + '",' +
                '"'+req.body.slots + '",' +
                '"'+req.body.address + '",' +
                '"'+req.body.category + '",' +
                '"'+req.body.teamName + '",' +
                '"'+moment(req.body.date).format("YYYY-MM-DD hh:mm:ss") + '"' +
                ')';
        }
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.redirect("/events/my-events");
        })
    } catch (error) {
        res.render("create", {error: customErrorHandler(error)});
    }
};

// This controller is for joining the event
exports.postJoinEvent = async (req, res) => {
    try {
        // Get Event by id
        connection.query('SELECT * FROM Events WHERE id = ?', [
            req.body.eventCode // this is event id
        ], function (err, result) {
            if (err) throw err;
            let event = result[0];
            event.users = JSON.parse(event.users);
            // If the event code is wrong we show an error
            if (!event) {
                return res.render("join-event", {error: "Wrong event code!"});
            }
            // Check if full  If the slots are full we again show the error
            if (JSON.parse(event.users).length === event.slots) {
                return res.render("join-event", {
                    error: "Event is full!",
                });
            }
            // Check if already joined
            if (event.users.includes(req.session.user.id)) {
                return res.render("join-event", {
                    error: "You have already joined the event!",
                });
            }
            // update event.users
            event.users.push(req.session.user.id)
            // Update event
            connection.query('UPDATE Events SET users=? WHERE id=?',
                [
                    JSON.stringify(event.users),
                    event.id,
                ], function (err, result) {
                    if (err) throw err;
                    res.redirect("/events/my-events");
                })
        })
    } catch (error) {
        res.render("join-event", {
            error: (error) => {
                const errorMessage = Object.values(error.errors)[0].message;
                if (error.errors)
                    return errorMessage || error.message;
            }
        });
    }
};

// This controller is for deleting an event
exports.deleteEvent = async (req, res) => {
    try {
        // Get Event by id
        connection.query('SELECT * FROM Events WHERE id=?', [
            req.body.eventId
        ], function (err, result) {
            if (!result || !result.length) {
                return res.redirect("/events/my-events");
            }
            let event = result[0];
            if (event.owner_id !== req.session.user.id) {
                return res.redirect("/events/my-events");
            }
            connection.query('DELETE FROM Events WHERE id=?', [
                req.body.eventId, // this is event id,
            ], function (err, result) {
                res.redirect("/events/my-events");
            })
        })
    } catch (error) {
        res.redirect("/events/my-events");
    }
};
