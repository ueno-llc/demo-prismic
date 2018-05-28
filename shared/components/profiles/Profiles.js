import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Profiles.scss';

export default class Profiles extends Component {

  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  }

  render() {
    const { children, title } = this.props;

    return (
      <div className={s.profiles}>
        <div className={s.profiles__container}>
          <h2 className={s.profiles__title}>{title}</h2>
          <div className={s.profiles__list}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
