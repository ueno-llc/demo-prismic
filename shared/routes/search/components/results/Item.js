import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import s from './styles.scss';

export default class Group extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    to: PropTypes.string,
    text: PropTypes.string,
  }

  render() {
    const { title, to, text } = this.props;

    return (
      <div className={s.item}>
        <Link className={s.item__link} to={to}>{title}</Link>
        <p className={s.item__text}>{text}</p>
      </div>
    );
  }
}
