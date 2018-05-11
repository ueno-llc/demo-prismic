import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Picture.scss';

export default class Picture extends PureComponent {

  static propTypes = {
    mobileView: PropTypes.object,
    mobileView2x: PropTypes.object,
    tabletView: PropTypes.object,
    tabletView2x: PropTypes.object,
    mainView: PropTypes.object,
    mainView2x: PropTypes.object,
  }

  static defaultProps = {
    mobileView: {},
    mobileView2x: {},
    tabletView: {},
    tabletView2x: {},
    mainView: {},
    mainView2x: {},
  }

  makeSrcSet(src = '', src2x = '') {
    if (src2x !== '') {
      return `${src} 1x, ${src2x} 2x`;
    }

    return undefined;
  }

  render() {
    const {
      mobileView,
      mobileView2x,
      tabletView,
      tabletView2x,
      mainView,
      mainView2x,
    } = this.props;

    return (
      <picture className={s.picture}>
        <source media="(max-width: 719px)" srcSet={this.makeSrcSet(mobileView.url, mobileView2x.url)} />
        <source media="(max-width: 1079px)" srcSet={this.makeSrcSet(tabletView.url, tabletView2x.url)} />
        <source srcSet={this.makeSrcSet(mainView.url, mainView2x.url)} />
        <img src={mainView.url} alt={mainView.alt} />
      </picture>
    );
  }
}
