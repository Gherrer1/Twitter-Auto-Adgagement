const Twit = require('twit')
const T = new Twit(require('./config'));

const { searchQuery } = require('./adConfig');

T.get('search/tweets', { q: searchQuery, count: 100 }, function(err, data, response) {
  if(err) return console.log('err:', err);
  const { statuses } = data;
  let trimmedDownTweets = statuses.map(tweetData => ({
    created_at: tweetData.created_at,
    text: tweetData.text,
    source: tweetData.source,
    user: tweetData.user.screen_name,
    truncated: tweetData.truncated
  }));
  console.log(trimmedDownTweets);
});
