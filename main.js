const fetchTweets = require('./fetchTweets');

const { searchQuery } = require('./adConfig');

const cache = {};

fetchTweets(searchQuery, 100)
  .then(tweets => {
    const uncachedTweets = getUncachedTweets(tweets, cache);
    console.log(uncachedTweets);
    cacheTweets(uncachedTweets, cache);
  })
  .catch(err => console.log(err));

let count = 0;
let interval = setInterval(function getTweets() {
  if(count === 3) {
    clearInterval(interval);
    interval = null;
    return;
  }
  count++;

  fetchTweets(searchQuery)
    .then(tweets => {
      const uncachedTweets = getUncachedTweets(tweets, cache);
      console.log(uncachedTweets);
      cacheTweets(uncachedTweets, cache);
    })
    .catch(err => console.log(err));
}, 10 * 1000);




function getUncachedTweets(tweets, cache) {
  return tweets.filter(tweet => !cache[tweet.id_str]);
}

function cacheTweets(tweets, cache) {
  tweets.forEach(tweet => cache[tweet.id_str] = tweet);
}

// NOTES:
// rate limit of 180 reqs / 15 mins
// tweeting rate limit = 2400 per day
