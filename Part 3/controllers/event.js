const Event = require("../models/event");
const User = require("../models/user");
const { mongooseErrorHandler } = require("../utils");

// All these get controllers are responsible for showing the event pages

exports.getCreate = (req, res) => {
  // These if statements in the get controllers helps to check if the users is signed in or not
  // if the user is not signed in we take the user to the sign in page
  if (!req.session.user) return res.redirect("/users/signin");

  res.render("create", { error: null });
};

exports.getJoinEvent = (req, res) => {
  // These if statements in the get controllers helps to check if the users is signed in or not
  // if the user is not signed in we take the user to the sign in page
  if (!req.session.user) return res.redirect("/users/signin");

  res.render("join-event", { error: null });
};

exports.getMyEvents = async (req, res) => {
  // These if statements in the get controllers helps to check if the users is signed in or not
  // if the user is not signed in we take the user to the sign in page
  if (!req.session.user) return res.redirect("/users/signin");

  // We are getting the events of the user from the database
  const { events } = await User.findById(req.session.user._id)
    .select("events -_id")
    .populate({
      path: "events",
      options: { sort: [{ date: "asc" }] },
    });

  res.render("my-events", { events, error: null });
};

// This controller is for creating the event
exports.postCreate = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      slots: +req.body.slots,
      user: req.session.user._id,
    });

    const user = await User.findById(req.session.user._id);
    user.events.push(event._id);

    await event.save();
    await user.save();

    res.redirect("/events/my-events");
  } catch (error) {
    res.render("create", { error: mongooseErrorHandler(error) });
  }
};

// This controller is for joining the event
exports.postJoinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventCode);

    // If the event code is wrong we show an error
    if (!event) {
      return res.render("join-event", { error: "Wrong event code!" });
    }

    const user = await User.findById(req.session.user._id);

    // If the user is already in the event we again show an error
    if (user.events.includes(req.body.eventCode)) {
      return res.render("join-event", {
        error: "You have already joined the event!",
      });
    }

    const users = await User.find({ events: { $in: [req.body.eventCode] } });

    // If the slots are full we again show the error
    if (users.length == event.slots) {
      return res.render("join-event", {
        error: "Event is full!",
      });
    }

    user.events.push(req.body.eventCode);
    await user.save();

    res.redirect("/events/my-events");
  } catch (error) {
    res.render("join-event", { error: mongooseErrorHandler(error) });
  }
};

// This controller is for deleting an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.body.eventId,
      user: req.session.user._id,
    });

    // The event can only be deleted by the person who creates it
    if (!event) {
      return res.redirect("/events/my-events");
    }

    await Event.deleteOne({ _id: req.body.eventId });

    res.redirect("/events/my-events");
  } catch (error) {
    res.redirect("/events/my-events");
  }
};
