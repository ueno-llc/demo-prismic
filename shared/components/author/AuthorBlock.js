import React from 'react';
import PropTypes from 'prop-types';

import s from './Author.scss';

const Author = ({ name, bio, image }) => (
  <React.Fragment>
    {image && image.url && (
      <div className={s.author__image}>
        <img alt="" src={image.url} />
      </div>
    )}

    <div className={s.author__text}>
      <p className={s.author__paragraph}>{name}</p>
      <p className={s.author__paragraph}>{bio}</p>
    </div>
  </React.Fragment>
);

Author.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default Author;
