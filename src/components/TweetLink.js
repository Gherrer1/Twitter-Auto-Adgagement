import React from 'react';

function TweetLink(props) {
  const { user, id_str, text } = props;
  return (
    <div>
      <a href={`https://twitter.com/${user}/status/${id_str}`} target="_blank" >{text}</a>
    </div>
  );
}

export default TweetLink;
