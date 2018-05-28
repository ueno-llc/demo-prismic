import React from 'react';
import PropTypes from 'prop-types';

import { getField } from 'utils/prismic';

import s from './Quote.scss';

const Quote = ({ text }) => (
  <blockquote className={s.quote__block}>
    {getField(text, 'richtext')}
  </blockquote>
);

Quote.propTypes = {
  text: PropTypes.array,
};

export default Quote;
