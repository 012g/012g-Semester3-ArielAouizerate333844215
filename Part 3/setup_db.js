const mysql = require('mysql');
require("dotenv").config();

let con = mysql.createConnection({
    host: "localhost",
    user: "db_user",
    port: 3306,
    password: "CxULdd61jbmTcibS",
    database: "db_main",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("CREATE DATABASE IF NOT EXISTS db_main", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

con.query("CREATE TABLE IF NOT EXISTS Sessions (" +
    "sid VARCHAR(32) NOT NULL," +
    "data TEXT," +
    "expires TIMESTAMP NOT NULL DEFAULT NOW()," +
    "createdAt TIMESTAMP NOT NULL DEFAULT NOW()," +
    "updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE now()" +
    ")", 
    function (err, result) {
        if (err) throw err;
        console.log("Table created");
});

con.query("CREATE TABLE IF NOT EXISTS Users (" +
    "id int NOT NULL AUTO_INCREMENT," +
    "fullName VARCHAR(255)," +
    "phone VARCHAR(32)," +
    "email VARCHAR(255)," +
    "password VARCHAR(255)," +
    "createdAt TIMESTAMP NOT NULL DEFAULT NOW()," +
    "updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE now()," +
    "PRIMARY KEY (id)" +
    ")", function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

con.query("CREATE TABLE IF NOT EXISTS Events (" +
    "id INT NOT NULL AUTO_INCREMENT," +
    "users JSON," + // user ids
    "owner_id INT," + // owner
    "slots INT," +
    "address VARCHAR(255)," +
    "teamName VARCHAR(255)," +
    "category VARCHAR(255)," +
    "date DATETIME," +
    "coordinates POINT DEFAULT NULL," +
    "createdAt TIMESTAMP NOT NULL DEFAULT NOW()," +
    "updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE now()," +
    "PRIMARY KEY (id))" +
    "ENGINE=InnoDB", function (err, result) {
    if (err) throw err;
    console.log("Table created");
});
