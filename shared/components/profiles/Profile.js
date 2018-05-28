import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Profile.scss';

export default class Profile extends Component {

  static propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }

  render() {
    const { image, name, description } = this.props;

    return (
      <div className={s.profile}>
        <div className={s.profile__mask}>
          <img src={image} alt={name} className={s.profile__image} />
        </div>

        <h2 className={s.profile__name}>{name}</h2>
        <p className={s.profile__description}>{description}</p>
      </div>
    );
  }
}
