import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Content.scss';

export default class Content extends Component {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
  }

  componentWillEnter(cb) {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.staggerFromTo(
      [this.title, this.text],
      0.7,
      { alpha: 0 },
      { alpha: 1, ease },
      '-=0.15',
    );

    cb();
  }

  componentWillLeave(cb) {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.staggerFromTo(
      [this.title, this.text],
      0.2,
      { alpha: 1 },
      { alpha: 0, ease },
    );

    cb();
  }

  render() {
    const { title, text } = this.props;

    return (
      <div className={s.content}>
        <h1
          className={s.content__title}
          ref={(c) => { this.title = c; }}
        >
          {title}
        </h1>

        <p
          className={s.content__text}
          ref={(c) => { this.text = c; }}
        >
          {text}
        </p>
      </div>
    );
  }
}
