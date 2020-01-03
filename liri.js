//Information for Spotify
require("dontev").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Request
var request = requrie("request");

//Moment date formating 
var moment = require("moment");