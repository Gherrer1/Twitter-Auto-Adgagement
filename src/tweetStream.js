const Twit = require('twit')
const T = new Twit(require('./config'));
const trimTweets = require('./trimTweets');
const respondToTweet = require('./respondToTweet');
const player = require('play-sound')();
const color = require('colors');

const { streamSearchQuery, myTwitterHandle } = require('./adConfig');

function isRetweet(tweet) {
	return tweet.text.startsWith('RT');
}

function isFromMe(tweet) {
	return tweet.user.toLowerCase() === myTwitterHandle;
}


var stream = T.stream('statuses/filter', { track: streamSearchQuery });
stream.on('tweet', (tweet) => console.log(trimTweets([tweet])[0]));
