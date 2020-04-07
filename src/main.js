// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************
import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import { Lib, ServerEngine } from 'lance-gg';
import Game from './common/Game';

var PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, '../dist/index.html');

// define routes and socket
const app = express();
app.get('/', function(req, res) { res.sendFile(INDEX); });
app.use('/', express.static(path.join(__dirname, '../dist/')));
let requestHandler = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(requestHandler);

// Game Instances
const gameEngine = new Game({ traceLevel: Lib.Trace.TRACE_NONE });
const serverEngine = new ServerEngine(io, gameEngine, { debug: {}, updateRate: 6 });

// start the game
serverEngine.start();

// Requiring necessary npm packages
import session from 'express-session';

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* PASSPORT CONFIGURATION:
var passport = require("./config/passport");

app.use(require('express-session')({
  //change secret
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
*/

// Static directory
app.use(express.static("app/public"));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/nes.css/css')); // redirect CSS bootstrap

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// require("./routes/api.js")(app);
// require("./routes/html.js")(app);

// Starts the server to begin listening
//app.listen(PORT, function() {
  // Log (server-side) when our server has started
//    console.log("Server listening on: http://localhost:" + PORT);
//});