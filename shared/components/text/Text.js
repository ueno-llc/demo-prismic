import React from 'react';
import PropTypes from 'prop-types';

import { getRichtext } from 'utils/prismic';

import s from './Text.scss';

const Text = ({ text }) => (
  <div className={s.text}>
    <div className={s.text__container}>
      <div className={s.text__row}>
        <div className={s.text__col}>
          {getRichtext(text)}
        </div>
      </div>
    </div>
  </div>
);

Text.propTypes = {
  text: PropTypes.array,
};

export default Text;
