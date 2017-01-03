var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);
var stream = Twitter.stream('user');
const params = {
  q: '#reactjs, #Reactjs',
  result_type: 'recent',
  lang: 'en'
}
const retweet = () => {

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
function ranDom (arr, n){
  const index = Math.floor(Math.random()*n);
  return arr[index];
}
const favouriteTweet = () => {
  Twitter.get('search/tweets', params)
  .catch(err => {
    console.log('Something went wrong while SEARCHING...');
  })
  .then((result) => {
    const tweet = result.data.statuses;
    // console.log(tweet);
    const randomTweet = ranDom(tweet, tweet.length);
    if (typeof randomTweet != 'undefined') {
      Twitter.post('favorites/create', { id: randomTweet.id_str })
      .catch(err => {
        console.log('cant find favorite');
      })
      .then(() => {
        console.log('Favorited!');
      })
    }
  });
}
favouriteTweet();

stream.on('follow', (event) => {
  console.log('Follow event is running');
  const name = event.source.name;
  const screenName = event.source.screen_name;
  Twitter.post('direct_messages/new', { screen_name: screenName, text: '@' + screenName + 'Thanks a lot for the follow up' })
  .catch(err => {
    console.log('cant DM');
  })
  .then(() => {
    console.log('Gratitude shown successfully!');
  })
})
// setInterval(retweet, 3000);
// Twitter.post('statuses/update', { status: 'hello world- Twitter bot!' }, function(err, data, response) {
//   console.log(data)
// })
