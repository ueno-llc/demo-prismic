import React from 'react';
import PropTypes from 'prop-types';

import TextBlock from './TextBlock';

import s from './Text.scss';

const Text = ({ text }) => (
  <div className={s.text}>
    <div className={s.text__container}>
      <div className={s.text__row}>
        <div className={s.text__col}>
          <TextBlock text={text} />
        </div>
      </div>
    </div>
  </div>
);

Text.propTypes = {
  text: PropTypes.array,
};

export default Text;
