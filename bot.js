var twit = require('twit');
var config = require('./config.js');


var Twitter = new twit(config);

var retweet = function(){
  var params = {
    q: '#Nodejs',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data, response){
    if(!err) {
      console.log('Tweet' , data);
    } else {
          console.log('Something went wrong while SEARCHING...', data);
    }
  });
}

retweet();