const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Twit = require('twit');
const T = new Twit(require('./config'));
const trimTweets = require('./trimTweets');
const { streamSearchQuery, myTwitterHandle } = require('./adConfig');

app.use(express.static(require('path').resolve(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// start stream
const stream = T.stream('statuses/filter', { track: streamSearchQuery });
stream.on('tweet', function emitTweet(tweet) {
  console.log('new tweet incoming, emitting now');
  const [trimmedTweet] = trimTweets([tweet]);
  io.emit('tweet', { tweet: trimmedTweet });
})

io.on('connection', function(socket) {
  // gives you a reference to the socket which is cool, this must be where we add listeners
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
