import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Success.scss';

export default class Success extends Component {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
  }

  render() {
    const { title, text } = this.props;

    return (
      <div className={s.success}>
        <h2 className={s.success__title}>{title}</h2>
        <p className={s.success__text}>{text}</p>
      </div>
    );
  }
}
