const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Twit = require('twit');
const T = new Twit(require('./config'));
const trimTweets = require('./trimTweets');
const fetchTweets = require('./fetchTweets');
const { streamSearchQuery, myTwitterHandle, searchQuery } = require('./adConfig');

app.use(express.static(require('path').resolve(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/last/:id', function(req, res) {
  const count = Number(req.params.id);
  // if not number send error
  if(!(typeof count === 'number' && isFinite(count) && count > 0)) {
    return res.json({ error: '/last/:id requires that :id is a positive number' });
  }
  fetchTweets(searchQuery, count)
    .then(tweets => res.json( tweets ))
    .catch(err => res.json({ error: err.message }));
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
