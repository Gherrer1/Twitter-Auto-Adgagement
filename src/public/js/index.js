import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';

var io = require('socket.io-client');
// triggers a connection event that's felt in our servers all the way in fiji
// defaults to trying to connect to the host that serves the page
var socket = io();

ReactDOM.render(<App socket={socket} />, document.getElementById('app'));
