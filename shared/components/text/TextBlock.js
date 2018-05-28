import React from 'react';
import PropTypes from 'prop-types';

import { getField } from 'utils/prismic';

import s from './Text.scss';

const TextBlock = ({ text }) => (
  <div className={s.textblock}>
    {getField(text, 'richtext')}
  </div>
);

TextBlock.propTypes = {
  text: PropTypes.array,
};

export default TextBlock;
