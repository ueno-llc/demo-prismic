import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { TransitionGroup } from 'react-transition-group';

import { getString } from 'utils/prismic';

import Content from './Content';
import s from './Hero.scss';

export default class Hero extends PureComponent {
  static propTypes = {
    carousel: PropTypes.array,
  }

  static defaultProps = {
    carousel: [],
  }

  state = {
    current: 0,
  }

  changeSlide = (index, color) => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.to(this.el, 0.6, {
      backgroundColor: color,
      ease,
    });

    this.setState({ current: index });
  }

  render() {
    const { carousel } = this.props;
    const { current } = this.state;

    const slide = carousel[current];

    return (
      <div className={s.hero} ref={(el) => { this.el = el; }}>
        <div className={s(s.hero__container, s.hero__top)}>
          <div className={s.hero__row}>
            {Array.isArray(carousel) && (
              <TransitionGroup className={s.hero__content}>
                <Content
                  key={`content-slide-${current}`}
                  title={getString(slide, 'title')}
                  text={getString(slide, 'text')}
                />
              </TransitionGroup>
            )}
          </div>
        </div>

        <div className={s.hero__container}>
          <ul className={s.hero__pagination}>
            {Array.isArray(carousel) && carousel.map((c, i) => {
              return (
                <li // eslint-disable-line
                  onClick={() => this.changeSlide(i, getString(carousel[i], 'color'))}
                  className={s(s.hero__item, { active: current === i })}
                  key={`pagination-item-${i}`} // eslint-disable-line
                />
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
