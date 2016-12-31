var twit = require('twit');
var config = require('./config.js');


var Twitter = new twit(config);

var retweet = function(){
  var params = {
    q: '#reactjs, #Reactjs',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params)
  .catch(err => {
    console.log('Something went wrong while SEARCHING...');
  })
  .then((result) => {
    const retweetId = result.data.statuses[1].id_str;
    Twitter.post('statuses/retweet/:id', { id: retweetId })
    .catch(err => {
      console.log('Something went wrong with RETWEETING!!');
    })
    .then( response => {
        console.log('RETWEETED!');
    });
    console.log(result.data);
  });
}

retweet();
setInterval(retweet, 3000);
// Twitter.post('statuses/update', { status: 'hello world- Twitter bot!' }, function(err, data, response) {
//   console.log(data)
// })
