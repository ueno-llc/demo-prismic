import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Peoples.scss';

export default class Peoples extends Component {

  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  }

  render() {
    const { children, title } = this.props;

    return (
      <div className={s.peoples}>
        <div className={s.peoples__container}>
          <h2 className={s.peoples__title}>{title}</h2>
          <div className={s.peoples__list}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
