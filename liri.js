//Information for Spotify
require("dontev").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Request
var request = requrie("request");

//Moment date formating 
var moment = require("moment");

//info for fs
var fs = request("fs");

var command = process.argv[2];

//info about a concert in town
if (command === "concert-this") {
    var artist = process.argv[3];

    request("https://rest.bandsintown.com/artist/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statuseCode === 200) {
            console.log("----------------------");
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
            console.log("Location: " + JSON.parse(body)[0].venue.city + " " = JSON.parse(body)[0].venue.region);
            console.log("----------------------");

        }
    });
    //if you want to find out information about a song
} else if (command === "spotify-this-song") {
    var song = process.argv[3];
    
    if (song === undefined) {
        song = "The Sign";
    }

    spotify.search({
        type: "track",
        query: song, 
    }, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err)
        }
        
    })
} 