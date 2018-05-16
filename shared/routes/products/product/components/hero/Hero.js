import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PictureContainer from 'containers/picture-container';

import s from './Hero.scss';

export default class Hero extends Component {

  static propTypes = {
    image: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string,
    loading: PropTypes.bool,
  };

  render() {
    const { image, name, description, loading } = this.props;

    return (
      <div className={s(s.hero, { isLoading: loading })}>
        <div className={s.hero__container}>
          <div className={s.hero__title}>
            <h1 className={s.hero__name}>{name}</h1>
          </div>
          <div className={s.hero__image}>
            <PictureContainer
              image={image}
            />
          </div>
          <div className={s.hero__detail}>
            <p className={s.hero__description}>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
