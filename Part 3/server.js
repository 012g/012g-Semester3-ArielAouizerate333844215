const path = require("path");
const express = require("express");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { Sequelize } = require('sequelize');
const expressSession = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store)
const connection = require('./db_connection');
const app = express();

// Connect to session
const myDatabase = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
});
const sequelizeSessionStore = new SequelizeStore({
    db: myDatabase,
});

app.use(expressSession({
    secret: process.env.TOKEN,
    saveUninitialized: true,
    resave: false,
    store:sequelizeSessionStore,
    proxy: true, // if you do SSL outside of node.
}));

app.use(cookieParser());
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));

// setting up routes for signup, login, my-events and all the pages
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

// showing the home page if user navigates to any other anonymous route
app.get("*", (req, res) => res.redirect("/events/my-events"));

(async () => {
  // starting the server
  app.listen(3000, () => console.log("server is running!"));
})();
