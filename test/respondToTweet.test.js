const respondToTweet = require('../src/respondToTweet');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai.assert;
const sinon = require('sinon');

describe('respondToTweet', function() {
  let twitterClientStub;
  let fakeTweetID, fakeMessage;

  beforeEach(function() {
    twitterClientStub = {
      post: sinon.stub().resolves()
    };
    fakeTweetID = '123';
    fakeMessage = 'testing rox';
  });
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
  it('should call client.post() once with args: [`statuses/update`, { status, in_reply_to_status_id }]', function() {
    let returnVal = respondToTweet(fakeTweetID, fakeMessage, twitterClientStub)
      .then(result => {
        assert.isTrue(twitterClientStub.post.calledOnce);
        let [actualEndpoint, actualParams] = twitterClientStub.post.args[0];
        const [expectedEnpoint, expectedParams] = ['statuses/update', { status: fakeMessage, in_reply_to_status_id: fakeTweetID }];
        assert(actualEndpoint === expectedEnpoint, `expected ${expectedEnpoint} arg but got ${actualEndpoint}`);
        assert.deepEqual(actualParams, expectedParams);
      });
    return returnVal;
  });
  it('should reject with error if client.post() fails', function() {
    twitterClientStub = { post: sinon.stub().rejects(new Error('Post failed')) };
    const promise = respondToTweet(fakeTweetID, fakeMessage, twitterClientStub)
      .then(() => {}, function failedCB(err) {
        assert.match(err.message, /Post failed/);
        return true;
      });
    return promise;
  });
  it('should resolve with idk if client.post() resolves', function() {
    const promise = respondToTweet(fakeTweetID, fakeMessage, twitterClientStub)
      .then(() => {}, () => { throw new Error('Should not have rejected'); });
    return promise;
  });
});
