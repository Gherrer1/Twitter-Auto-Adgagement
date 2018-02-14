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

    fetch('/last/25')
      .then(data => data.json())
      .then(data => data.error ?
        console.log(data.error) : this.setState(prev => ({ tweets: data.concat(prev.tweets) })))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Await new tweets</h2>
        <div>{this.state.tweets.map(tweet => (<TweetLink key={tweet.id_str} {...tweet} />))}</div>
      </div>
    );
  }
}

export default App;
