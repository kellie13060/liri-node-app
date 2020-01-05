require("dotenv").config();

//require the keys
var keys = require("./key.js");
//require spotify api
var Spotify = require('node-spotify-api'); 
//require spotify keys
var spotify = new Spotify(keys.spotify);

//require npm moment instal
var moment = require('moment'); 
// moment().format();

//information from the APIs for movie and concerts
var axios = require('axios');

//this will read the random.txt file. 
var fs = require('fs'); 

var command = process.argv[2]; 
var value = process.argv[3]; 

//will sets the commands
switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};

//fuction for "concert-this"
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            // var datetime = response.data[i].datetime; 
            // var dateArr = datetime.split('T'); 
            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(response.data[i].datetime).format("MM-DD-YYYY"); 
           
                    console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}
//function for spotify this song
function spotifySong(value) {
    if(!value){
        value = "The Sign";
    }
    spotify
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 10; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

//funciton for movie this. 
function movieThis(value) {
    if(!value){
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doThis() {
    //reads the random file
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[1]);
    });
}
