import React from 'react';
import PropTypes from 'prop-types';

import Tweet from 'components/tweet';

// lol
function tweetFromTitle(name, title) {
  return title.replace(`${name} on Twitter: "`, '').slice(0, -1);
}

const TwitterContainer = ({ data }) => (
  <div>
    {data && data.map(item => (
      <Tweet
        key={item.url}
        url={item.url}
        authorName={item.author_name}
        tweet={tweetFromTitle(item.author_name, item.title)}
      />
    ))}
  </div>
);

TwitterContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      author_name: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};

export default TwitterContainer;
