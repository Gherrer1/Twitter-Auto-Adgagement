const respondToTweet = require('../src/respondToTweet');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai.assert;

describe('respondToTweet', function() {
  it('should return a promise', function() {
    let returnVal = respondToTweet();
    assert.isDefined(returnVal.then);
    assert.isDefined(returnVal.catch);
    returnVal.catch(() => {});
  });
  it('should reject with error if tweetID and message and twitterClient args arent passed in', function() {
    let promise = respondToTweet();
    return assert.isRejected(promise, /missing/);
  });
  it('should call client.Tweet() once', function() {
    throw new Error('red-green');
  });
  it('should resolve with idk if all goes well', function() {
    throw new Error('red-green');
  });
  it('should reject with error if twit.Tweet() fails', function() {
    throw new Error('red-green');
  });
});
