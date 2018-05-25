import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import s from './Smartlink.scss';

export default class Smartlink extends PureComponent {

  static propTypes = {
    to: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    stroke: PropTypes.bool,
  };

  render() {
    const {
      to,
      children,
      className,
      disabled,
      stroke,
      ...rest
    } = this.props;

    const isExternal = (typeof to !== 'undefined') && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to);

    // Extend className of the rest
    rest.className = s(s.smartlink, className);

    // http, https, //, mailto, etc.
    if (isExternal) {
      return <a target="_blank" rel="noopener noreferrer" href={to} {...rest}>{children}</a>;
    }

    // Default
    return <Link to={to} {...rest}>{children}</Link>;
  }
}
