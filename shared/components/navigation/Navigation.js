import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { Portal } from 'react-overlays';

import Button from '../button';

import Mobile from './Mobile';
import s from './Navigation.scss';

export default class Navigation extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isMobile: null,
    isOpen: false,
  }

  componentDidMount() {
    setTimeout(this.onResize);
    window.addEventListener('resize', this.resizeRef = this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeRef);
  }

  onResize = () => {
    this.setState({ isMobile: !window.matchMedia('(min-width: 719px)').matches });
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  link(c) {
    const { isMobile } = this.state;
    const evt = { className: s.navigation__link };

    if (isMobile) {
      evt.onClick = this.toggleMenu;
    }

    return (
      <li className={s.navigation__item}>
        {React.cloneElement(c, { ...evt })}
      </li>
    );
  }

  get mobileNavigation() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <button
          className={s(s.navigation__button, { isOpen })}
          onClick={this.toggleMenu}
        >
          open
        </button>

        <Portal>
          <TransitionGroup>
            {isOpen && (
              <Mobile>
                {Children.map(children, c => this.link(c))}
              </Mobile>
            )}
          </TransitionGroup>
        </Portal>
      </div>
    );
  }

  get desktopNavigation() {
    const { children } = this.props;

    return (
      <nav className={s.navigation}>
        <ul className={s.navigation__list}>
          {Children.map(children, (c) => {
            if (c.key === 'contact') {
              return (
                <div className={s.navigation__cta}>
                  <Button to="/contact-us" stroke>Contact</Button>
                </div>
              );
            }

            return this.link(c);
          })}
        </ul>
      </nav>
    );
  }

  render() {
    const { isMobile } = this.state;

    return isMobile ? this.mobileNavigation : this.desktopNavigation;
  }
}
