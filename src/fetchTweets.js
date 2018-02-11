const Twit = require('twit')
const T = new Twit(require('./config'));
const takeOnlyWhatYouNeed = require('./trimTweets');

module.exports = function fetchTweets(keyword, count = 100) {
  return new Promise(function(resolve, reject) {
    T.get('search/tweets', { q: keyword, count: count }, function(err, data, response) {
      if(err) return reject(err);

      const { statuses } = data;
      let trimTweetData = takeOnlyWhatYouNeed(statuses);
      return resolve(trimTweetData);
    });
  });
}
