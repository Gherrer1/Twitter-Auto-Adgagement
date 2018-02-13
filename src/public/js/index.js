var io = require('socket.io-client');

console.log('heya');

// triggers a connection event that's felt in our servers all the way in fiji
// defaults to trying to connect to the host that serves the page
var socket = io();

setTimeout(function() {
  socket.emit('booya', 23);
}, 3000);

socket.on('tweet', function(data) {
  console.log(data);
});
