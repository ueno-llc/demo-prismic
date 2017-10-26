import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './List.scss';

export default class List extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;
    return (
      <div className={s.list}>
        <div className={s.list__container}>
          <ul className={s.list__list}>
            {children}
          </ul>
        </div>
      </div>
    );
  }
}
