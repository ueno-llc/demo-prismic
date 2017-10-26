import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './styles.scss';

export default class Group extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { title, children } = this.props;

    return (
      <div className={s.group}>
        <h2 className={s.group__heading}>{title}</h2>
        {children}
      </div>
    );
  }
}
