//////////////////////////////////
//         VARIABLES            //
//////////////////////////////////
var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var pick = require('object.pick');
//////////////////////////////////
//           TWITTER            //
//////////////////////////////////
var getTweet = function() {
    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'coderdev4056' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            /*console.log(tweets);*/
            for (i = 0; i < tweets.length; i++) {
                console.log(i);
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log(" ");
            }
        }
    });
}

//////////////////////////////////
//           Spotify            //
//////////////////////////////////

var getArtistName = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {
    var spotify = new Spotify({
        id: "6c4df8acd26343bc81ac66dc1e9d6675",
        secret: "4a9d71ef882e4c01b64d9ee33055264b"
    });

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (i = 0; i < songs.length; i++) {
            console.log("Artist: " + songs[i].artists.map(getArtistName));
            console.log("Song name: " + songs[i].name);
            console.log("Song link: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log(" ");

        }
    });
}


//////////////////////////////////
//           OMDB               //
//////////////////////////////////
var getMovie = function(movieName) {
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName + "&y=&plot=short&r=json", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Release Year: " + jsonData.Released);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rotten Tomato Rating: " + jsonData.Metascore);
            console.log("Country Produced: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
        };
    })
}

//////////////////////////////////
//      DO what it says         //
//////////////////////////////////
var doWhatitSays = function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);

}

//////////////////////////////////
//        switch statement      //
//////////////////////////////////
var userInput = function(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getTweet();
            break;
        case 'spotify-this-song':
            getSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'do-what-it-says':
        doWhatitSays();
             break;
        default:
            console.log('LIRI does not understand')
    }
};

var runThis = function(argOne, argTwo) {
    userInput(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
