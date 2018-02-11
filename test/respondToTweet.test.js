const respondToTweet = require('../src/respondToTweet');
const assert = require('chai').assert;

describe('respondToTweet', function() {
  it('should return a promise', function() {
    let returnVal = respondToTweet();
    assert.isDefined(returnVal.then);
    assert.isDefined(returnVal.catch);
    returnVal.catch(() => {});
  });
  it('should reject with error if tweetID and message args arent passed in', function() {
    throw new Error('red-green');
  });
  it('should call twit.Tweet() once', function() {
    throw new Error('red-green');
  });
  it('should resolve with idk if all goes well', function() {
    throw new Error('red-green');
  });
  it('should reject with error if twit.Tweet() fails', function() {
    throw new Error('red-green');
  });
});
