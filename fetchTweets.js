const Twit = require('twit')
const T = new Twit(require('./config'));

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

function takeOnlyWhatYouNeed(fatTweetsArray) {
  let skinnyTweetsArray = fatTweetsArray.map(fatTweetObj => {
    // these are the only fields we want for now
    const { id_str, created_at, text, source, screen_name, truncated } = fatTweetObj;
    return {
      id_str, created_at, text, source, screen_name, truncated
    };
  });

  return skinnyTweetsArray;
}
