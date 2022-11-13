Fixes since part 2:
1. Added validation of password on signup page.
2. Added a small about footer to inform more the user on the web-site.

Folder Structure of the Project:
- server.js - The root file which runs the server
- views - Responsible for the pages/ui
- models - Responsible for defining how each entity will look like (event, user etc)
- controllers - The main logic of the app
- routes - Setting up routes for each entity (GET, POST, DELETE, etc)

Projects includes:

- HTML & CSS & JS & Pug
// -=- HTML -=- //
The HTML side is devided into two parts (which each of them has special CSS settings - due styling mode), all page are fully redirecting towards log-in -> join-event / create event -> log out.
// -=- CSS -=- //
On the landing page of login I have added a fading down annimation to improve the design of the web-site. Also button and tab bar after the log-in (My-Evens/Join Event/Create Event) have a special "loading" bars.
// -=- JS -=- //
I have used 2 JS dynamic function:
Function that helps user to choose which view he preffers - grid or rows.
A validation function for password (matching and lenght) to improve security and user experience.
A Code generator that generates uniq code in order to create "invite code" to group created by users - for now the generator is up and running after linking it to database it will ensure uniqness.


- Express + Express-Session - For user signin and signup
    1. Added an option of seing if user already joined with this email.
    2. added option to manage event (delete and not allow joining for full event)
- MySQL


How to run server:
1. Download mysql + node js
2a. open local cd and run npm install to download needed modules
2b. open mysqlshell and past script from bellow the +++
2c. open local cd and run node .\setup_db.js
3. open local cd and run npm start
4. Access local server on port 3000


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Script to create db table! 


        CREATE DATABASE db_main DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
        CREATE USER 'db_user'@'%' IDENTIFIED WITH mysql_native_password BY 'CxULdd61jbmTcibS';
        GRANT ALL PRIVILEGES ON db_main.* TO 'db_user'@'%';
        FLUSH PRIVILEGES;



// db root user
//Pass123