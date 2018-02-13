const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(require('path').resolve(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  // gives you a reference to the socket which is cool, this must be where we add listeners
  console.log('a user connected');

  socket.on('booya', function(data) {
    console.log(data);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

setInterval(function() {
  io.emit('tweet', { data: 'hey' });
}, 1000);

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
