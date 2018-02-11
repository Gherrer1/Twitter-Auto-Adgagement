const Twit = require('twit')
const T = new Twit(require('./config'));
const trimTweets = require('./trimTweets');

var stream = T.stream('statuses/filter', { track: 'javascript' });

stream.on('tweet', function(tweet) {
  const trimmedTweet = trimTweets([tweet]);
  console.log(trimmedTweet);
});
