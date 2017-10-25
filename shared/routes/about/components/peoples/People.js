import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './People.scss';

export default class People extends Component {

  static propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }

  render() {
    const { image, name, description } = this.props;

    return (
      <div className={s.people}>
        <div className={s.people__mask}>
          <img src={image} alt={name} className={s.people__image} />
        </div>

        <h2 className={s.people__name}>{name}</h2>
        <p className={s.people__description}>{description}</p>
      </div>
    );
  }
}
