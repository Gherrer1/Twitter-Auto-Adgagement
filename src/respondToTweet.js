function respondToTweet(tweetID, message, twitterClient) {
  return new Promise(function(resolve, reject) {
    if(!tweetID || !message || !twitterClient) {
      reject(new Error('tweetID or message missing'));
    }
    twitterClient.post('statuses/update', { status: message, in_reply_to_status_id: tweetID })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = respondToTweet;
