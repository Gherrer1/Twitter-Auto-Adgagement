const Twit = require('twit')
const T = new Twit(require('./config'));

var stream = T.stream('statuses/filter', { track: 'lambo' });

stream.on('tweet', function(tweet) {
  console.log(tweet);
});
