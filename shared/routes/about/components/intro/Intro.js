import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Intro.scss';

export default class Intro extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.intro}>
        <div className={s.intro__container}>
          <div className={s.intro__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
