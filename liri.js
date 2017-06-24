//////////////////////////////////
//         VARIABLES            //
//////////////////////////////////
var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');

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
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}

//////////////////////////////////
//           Spotify            //
//////////////////////////////////
var spotify = new Spotify({
  id: "6c4df8acd26343bc81ac66dc1e9d6675",
  secret: "4a9d71ef882e4c01b64d9ee33055264b"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


//////////////////////////////////
//        switch statement      //
//////////////////////////////////
var userInput = function(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getTweet();
            break;
        default:
            console.log('LIRI does not understand')
    }
};

var runThis = function(argOne, argTwo) {
    userInput(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);



