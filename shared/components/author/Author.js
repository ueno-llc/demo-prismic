import React from 'react';
import PropTypes from 'prop-types';
import AuthorBlock from './AuthorBlock';

import s from './Author.scss';

const Author = ({ name, bio, image, loading }) => (
  <div className={s(s.author, { isLoading: loading })}>
    <div className={s.author__container}>
      <div className={s.author__row}>
        <div className={s.author__col}>
          <div className={s.author__block}>
            <AuthorBlock name={name} bio={bio} image={image} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Author.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default Author;
