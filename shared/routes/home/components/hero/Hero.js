import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import s from './Hero.scss';

export default class Hero extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.node,
  }

  componentDidMount() {
    const t = new TimelineLite({ onComplete: () => t.restart() });
    const ease = 'Power4.easeInOut';

    t.fromTo(this.el, 1, { backgroundColor: '#fe5830' }, { backgroundColor: '#db6e86', ease }, '+=3');
    t.to(this.el, 1, { backgroundColor: '#c948b4', ease }, '+=3');
    t.to(this.el, 1, { backgroundColor: '#93cfe3', ease }, '+=3');
    t.to(this.el, 1, { backgroundColor: '#ffce5a', ease }, '+=3');
    t.to(this.el, 1, { backgroundColor: '#6dd9d1', ease }, '+=3');
    t.to(this.el, 1, { backgroundColor: '#fe5830', ease }, '+=3');
  }

  render() {
    const { title, text } = this.props;

    return (
      <div className={s.hero} ref={(el) => { this.el = el; }}>
        <div className={s.hero__container}>
          <div className={s.hero__row}>
            <div className={s.hero__content}>
              <h1 className={s.hero__title}>
                {title}
              </h1>

              <div className={s.hero__text}>
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
