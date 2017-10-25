import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Articles.scss';

export default class Articles extends Component {

  static propTypes = {
    articles: PropTypes.node,
    show: PropTypes.number,
  }

  render() {
    const { articles, show } = this.props;

    return (
      <div className={s.articles}>
        <div className={s.articles__row}>
          <div className={s.articles__header}>
            <h2 className={s.articles__headerTitle}>From our lovely people</h2>
            <h2 className={s.articles__headerTitle}>or almost</h2>
          </div>

          <ul className={s.articles__list}>
            <li className={s.articles__item}>
              <a className={s.articles__link} href="#">
                <p className={s.articles__date}>25 october</p>

                <div className={s.articles__inner}>
                  <h2 className={s.articles__title}>The 3 most important lessons from my first year at Ueno</h2>
                  <p className={s.articles__description}>Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days.</p>
                  <span className={s.articles__button}>Read more</span>
                </div>
              </a>
            </li>
            <li className={s.articles__item}>
              <a className={s.articles__link} href="#">
                <p className={s.articles__date}>25 october</p>

                <div className={s.articles__inner}>
                  <h2 className={s.articles__title}>The 3 most important lessons from my first year at Ueno</h2>
                  <p className={s.articles__description}>Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days.</p>
                  <span className={s.articles__button}>Read more</span>
                </div>
              </a>
            </li>
            <li className={s.articles__item}>
              <a className={s.articles__link} href="#">
                <p className={s.articles__date}>25 october</p>

                <div className={s.articles__inner}>
                  <h2 className={s.articles__title}>The 3 most important lessons from my first year at Ueno</h2>
                  <p className={s.articles__description}>Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days.</p>
                  <span className={s.articles__button}>Read more</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
