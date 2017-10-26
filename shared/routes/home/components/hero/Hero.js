import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { TransitionGroup } from 'react-transition-group';
import { random } from 'lodash';

import { getField } from 'utils/prismic';

import Content from './Content';
import s from './Hero.scss';

const colors = ['#fe5830', '#c948b4', '#93cfe3', '#ffce5a', '#6dd9d1'];

export default class Hero extends PureComponent {
  static propTypes = {
    carousel: PropTypes.array,
  }

  state = {
    current: 0,
  }

  changeSlide = (index) => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.to(this.el, 0.6, {
      backgroundColor: colors[random(colors.length - 1)],
      ease,
    });

    this.setState({ current: index });
  }

  render() {
    const { carousel } = this.props;
    const { current } = this.state;

    return (
      <div className={s.hero} ref={(el) => { this.el = el; }}>
        <div className={s(s.hero__container, s.hero__top)}>
          <div className={s.hero__row}>
            {carousel && (
              <TransitionGroup className={s.hero__content}>
                <Content
                  key={`content-slide-${current}`}
                  title={getField(carousel[current].title, 'text')}
                  text={getField(carousel[current].text, 'text')}
                />
              </TransitionGroup>
            )}
          </div>
        </div>

        <div className={s.hero__container}>
          <ul className={s.hero__pagination}>
            {carousel && carousel.map((_, i) => (
              <li // eslint-disable-line
                onClick={() => this.changeSlide(i)}
                className={s(s.hero__item, { active: current === i })}
                key={`pagination-item-${i}`} // eslint-disable-line
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
