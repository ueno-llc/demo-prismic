import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Cta.scss';

export default class Cta extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.cta}>
        <div className={s.cta__row}>
          <div className={s.cta__inner}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
