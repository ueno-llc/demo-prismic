import React from 'react';
import PropTypes from 'prop-types';

import { getField } from 'utils/prismic';

import s from './Text.scss';

const Text = ({ text }) => (
  <div className={s.text}>
    {getField(text, 'richtext')}
  </div>
);

Text.propTypes = {
  text: PropTypes.array,
};

export default Text;
