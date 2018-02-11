function takeOnlyWhatYouNeed(fatTweetsArray) {
  let skinnyTweetsArray = fatTweetsArray.map(fatTweetObj => {
    // these are the only fields we want for now
    const { id_str, created_at, text, source, user, truncated } = fatTweetObj;
    return {
      id_str, created_at, text, source, truncated, user: user.screen_name
    };
  });

  return skinnyTweetsArray;
}

module.exports = takeOnlyWhatYouNeed;
