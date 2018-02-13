const Twit = require('twit')
const T = new Twit(require('./config'));
const trimTweets = require('./trimTweets');
const respondToTweet = require('./respondToTweet');
const player = require('play-sound')();

const { searchQuery, myTwitterHandle } = require('./adConfig');

var stream = T.stream('statuses/filter', { track: searchQuery });

function isRetweet(tweet) {
	return tweet.text.startsWith('RT');
}

function isFromMe(tweet) {
	return tweet.user.toLowerCase() === myTwitterHandle;
}

stream.on('tweet', function(tweet) {
  const [trimmedTweet] = trimTweets([tweet]);
  if(isRetweet(trimmedTweet)) {
  console.log('Retweet:', trimmedTweet);
		return player.play('./sounds/hihat.wav', (err) => console.log(err ? err : ''));
  }
	if(isFromMe(trimmedTweet)) {
		console.log('From Me:', trimmedTweet);
		return;
	}
	console.log('OG Tweet:', trimmedTweet);
	player.play('./sounds/openhat.wav', err => console.log(err ? err : ''));
	// reply
	// const user = trimmedTweet.user;
	// const tweetID = trimmedTweet.id_str;
	// const message = `@${user} javascript is awesome`;
	// respondToTweet(tweetID, message, T)
	// 	.then(tweetResponse => console.log('Response:', trimTweets([tweetResponse])))
	// 	.catch(err => console.log(err));
});
