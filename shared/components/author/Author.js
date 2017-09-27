import React from 'react';
import PropTypes from 'prop-types';

import s from './Author.scss';

const Author = ({ name, bio, image }) => (
  <div className={s.author}>
    <div className={s.author__container}>
      {image && image.url && (
        <img alt="" src={image.url} />
      )}
      <h3>{name}</h3>
      <p>{bio}</p>
    </div>
  </div>
);

Author.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default Author;
