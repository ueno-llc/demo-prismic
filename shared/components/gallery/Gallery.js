import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import s from './Gallery.scss';

export default class Gallery extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
  }

  render() {
    const {
      title,
      data,
    } = this.props;

    return (
      <div className={s.gallery}>
        <div className={s.gallery__container}>
          <div className={s.gallery_title}>
            <h1 className={s.gallery__name}>{title}</h1>
          </div>
          <div className={s.gallery__list}>
            {!_isEmpty(data) && (
              data.map((item, i) => (
                <div key={i} className={s.gallery__item}>
                  <img
                    src={item.image.url}
                    alt={item.caption}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
