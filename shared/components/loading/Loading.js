import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './Loading.scss';

export default class Loading extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    return (
      <div className={s.host}>
        {this.props.children}
      </div>
    );
  }
}
