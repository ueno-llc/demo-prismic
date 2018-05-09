import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Picture.scss';

export default class Picture extends PureComponent {

  static propTypes = {
    mobileView: PropTypes.object,
    tabletView: PropTypes.object,
    mainView: PropTypes.object,
  }

  static defaultProps = {
    mobileView: {},
    tabletView: {},
    mainView: {},
  }

  render() {
    const {
      mobileView,
      tabletView,
      mainView,
    } = this.props;

    return (
      <picture className={s.picture}>
        <source media="(max-width: 720px)" srcSet={mobileView.url} />
        <source media="(max-width: 1080px)" srcSet={tabletView.url} />
        <source srcSet={mainView.url} />
        <img src={mainView.url} alt={mainView.alt} />
      </picture>
    );
  }
}
