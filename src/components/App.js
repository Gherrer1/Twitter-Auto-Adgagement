import React from 'react';
import TweetLink from './TweetLink';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    };
  }

  componentDidMount() {
    const that = this;
    this.props.socket.on('tweet', function(data) {
      let tweet = data.tweet;
      that.setState(prev => ({
        tweets: [tweet].concat(prev.tweets)
      }));
    });
  }

  render() {
    return (
      <div>
        <h2>Await new tweets</h2>
        <div>{this.state.tweets.map(tweet => (<TweetLink key={tweet.id_str} text={tweet.text} />))}</div>
      </div>
    );
  }
}

export default App;
