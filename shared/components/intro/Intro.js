import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Intro.scss';

export default class Intro extends Component {

  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
  }

  loadingContent() {
    return (
      <div>
        <h1>Loading Loding </h1>
        <h1>Loading Loa ding</h1>
        <h2>ding Loading </h2>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading</p>
      </div>
    );
  }

  render() {
    const { children, isLoading } = this.props;

    return (
      <div className={s(s.intro, { isLoading })}>
        <div className={s.intro__container}>
          <div className={s.intro__row}>
            <div className={s.intro__col}>
              {isLoading ? (this.loadingContent())
                : (children)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
