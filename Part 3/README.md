# Events Project

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
- MongoDB

How to run server:

1 Download mongodb community server + node JS + mongo compass. <br/>
2a create a folder called data at c://data and inside it a folder called "db" <br/>
2b open visual studio and the open the project folder <br/>
3 run "npm install" via the visual studio's terminal <br/>
4 open cmd and change dir to c://program files/mongodb/server/6.0/bin  <br/> 
5. type mongod <br/>
6 return to visual studio's terminal and type "npm start" (runs the server - will be up on port localhost:3000 - in browser) <br/>
7 use mongoDB compass to navigate across database after queries are entered connection details -> mongodb://127.0.0.1:27017/arimarcel <br/>
