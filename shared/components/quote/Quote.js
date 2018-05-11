import React from 'react';
import PropTypes from 'prop-types';

import { getRichtext } from 'utils/prismic';

import s from './Quote.scss';

const Quote = ({ text }) => (
  <div className={s.quote}>
    <div className={s.quote__container}>
      <div className={s.quote__row}>
        <div className={s.quote__col}>
          <blockquote className={s.quote__block}>
            {getRichtext(text)}
          </blockquote>
        </div>
      </div>
    </div>
  </div>
);

Quote.propTypes = {
  text: PropTypes.array,
};

export default Quote;
