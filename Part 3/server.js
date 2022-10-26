const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const path = require("path");
require("dotenv").config();
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const MongoSession = require("connect-mongodb-session")(sessions);

const app = express();

// Storing user sessions in the database to keep the user signed in
const sessionStore = new MongoSession({
  collection: "sessions",
  uri: process.env.MONGO_URI,
});

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded());

app.use(cookieParser());

// configuring session
app.use(
  sessions({
    secret: process.env.TOKEN,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    store: sessionStore,
  })
);

// setting up routes for signup, login, my-events and all the pages
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

// showing the home page if user navigates to any other anonymous route
app.get("*", (req, res) => res.redirect("/events/my-events"));

(async () => {
  // connecting to the database
  await mongoose.connect(process.env.MONGO_URI);

  // starting the server
  app.listen(3000, () => console.log("server is running!"));
})();
