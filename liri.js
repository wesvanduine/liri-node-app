//////////////////////////////////
//         VARIABLES			//
//////////////////////////////////

var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');
var argument = process.argv[2];


var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

//////////////////////////////////
//           Logic			    //
//////////////////////////////////
//Twitter paramaters to search username coderdev4056, return only the last 20 tweets, and will not trim the username so the username will come up with the username and not ID#
var params = {
    screen_name: "coderdev4056",
    count: 20,
    trim_user: false
}


//Twitter logic
client.get('/statuses/user_timeline.json', params, function(error, data, response) {
    if (!error) {
        var tweets = data;

        console.log("User Name: " + params.screen_name + " last 20 tweets");
        for (i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }
    } else console.log(error);
});
