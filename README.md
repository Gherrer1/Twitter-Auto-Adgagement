# Twitter-Auto-Adgagement
Twitter bot to automatically engage with tweets with certain keywords

-1) edit src/adConfig.js with the keywords you want to filter realtime tweets by
0) edit src/config.js with your twitter consumer key and consumer secret. access token & secret arent necessary
unless you'll be automating replying to tweets from your account.
1) npm install
2) node_modules/.bin/webpack
3) node src/server.js
4) open up browser, go to localhost:3000 (or edit the src/server.js to pick your own port, need to make
this configurable with environment vars just havent gotten around to it yet)