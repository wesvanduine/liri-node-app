//////////////////////////////////
//         VARIABLES			//
//////////////////////////////////

var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var keys = require('./keys.js');
var argument = process.argv[2];



//Twitter paramaters to search username coderdev4056, return only the last 20 tweets, and will not trim the username so the username will come up with the username and not ID#
var params = {
    screen_name: "coderdev4056",
    count: 20,
    trim_user: false,
}


//Twitter logic
if (argument === 'my-tweets') {
    twitter.find('statuses/user_timeline', params, gotData);

    function gotData(error, data, response) {
        var tweets = data;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }

    };
    outputText();
}
