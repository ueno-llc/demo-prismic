import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import s from './List.scss';

export default class Item extends PureComponent {

  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    src: PropTypes.node,
  }

  render() {
    const { url, title, description, src } = this.props;
    return (
      <li className={s.list__item}>
        <Link to={url} className={s.list__block}>
          <div className={s.articelList__top}>
            <div className={s.list__image}>
              {src && (<img src={src} alt="" />)}
            </div>
          </div>
          <div className={s.list__middle}>
            <div className={s.list__title}>{title}</div>
            <div className={s.list__description}>{description}</div>
          </div>
          <div className={s.list__bottom}>
            <div className={s.list__link}>Read more</div>
          </div>
        </Link>
      </li>
    );
  }
}
