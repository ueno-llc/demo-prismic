import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UenoLogoSvg from 'assets/images/ueno-logo.svg';

import s from './Footer.scss';

export default class Footer extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const social = [
      { text: 'Twitter', url: 'http://twitter.com' },
      { text: 'Facebook', url: 'http://facebook.com' },
    ];

    return (
      <footer className={s.footer}>
        <div className={s.footer__container}>
          <div className={s.footer__row}>
            <div className={s.footer__logo}>
              <UenoLogoSvg className={s.footer__svg} />
            </div>

            <div className={s.footer__navigation}>
              <ul className={s.footer__list}>
                {React.Children.map(this.props.children, (c, i) => (
                  <li key={i} className={s.footer__item}>
                    {React.cloneElement(c, {
                      className: s.footer__link,
                    })}
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.footer__social}>
              <ul className={s.footer__list}>
                {social.map(c => (
                  <li key={c.text} className={s.footer__item}>
                    <a className={s.footer__link} href={c.url}>{c.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
