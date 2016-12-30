var twit = require('twit');
var config = require('./config.js');


var Twitter = new twit(config);

Twitter.post('statuses/update', { status: "I'm posting a tweet, using my Twitter bot! -Developed by me :)" }, function(err, data, response) {
  if(err) {
    console.log("There was a problem tweeting the message.", err);
  }
});