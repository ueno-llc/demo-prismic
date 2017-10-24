import React from 'react';
import PropTypes from 'prop-types';

import s from './Heading.scss';

const Heading = ({ children }) => (
  <div className={s.heading}>
    <div className={s.heading__container}>
      <div className={s.heading__row}>
        <div className={s.heading__col}>
          <h1>
            {children}
          </h1>
        </div>
      </div>
    </div>
  </div>
);

Heading.propTypes = {
  children: PropTypes.node,
};


export default Heading;
