import React from 'react';
import PropTypes from 'prop-types';

import s from './Heading.scss';

const Heading = ({ children }) => (
  <h2 className={s.heading}>
    {children}
  </h2>
);

Heading.propTypes = {
  children: PropTypes.node,
};


export default Heading;
