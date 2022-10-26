const router = require("express").Router();
const {
  getCreate,
  getJoinEvent,
  getMyEvents,
  postCreate,
  postJoinEvent,
  deleteEvent,
} = require("../controllers/event");

// This file is responsible for the routes related to events

// Route for the create event page
router.get("/create", getCreate);

// Route for the join event page
router.get("/join-event", getJoinEvent);

// Route for the my event page
router.get("/my-events", getMyEvents);

// Route for creating an event
router.post("/create", postCreate);

// Route for joining an event
router.post("/join-event", postJoinEvent);

// Route for deleting an event
router.post("/delete", deleteEvent);

module.exports = router;
