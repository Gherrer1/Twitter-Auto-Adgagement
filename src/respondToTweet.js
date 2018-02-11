function respondToTweet(tweetID, message, twitterClient) {
  return new Promise(function(resolve, reject) {
    if(!tweetID || !message || !twitterClient) {
      reject(new Error('tweetID or message missing'));
    }
  });
}

module.exports = respondToTweet;
