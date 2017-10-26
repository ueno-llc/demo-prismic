import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Columns.scss';

export default class Columns extends PureComponent {
  static propTypes = {
    heading: PropTypes.string,
    subline: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { heading, subline, children } = this.props;

    return (
      <div className={s.columns}>
        <div className={s.columns__container}>
          <h2 className={s.columns__heading}>{heading}</h2>
          <h2 className={s.columns__heading}>{subline}</h2>

          <ul className={s.columns__list}>
            {React.Children.map(children, (c, i) => (
              <li key={i} className={s.columns__item}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
