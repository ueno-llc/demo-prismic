/* eslint-disable jsx-a11y/media-has-caption */

import React, { PureComponent } from 'react';

import s from './Video.scss';

export default class Video extends PureComponent {
  render() {
    console.log(this.props.url);
    const { url } = this.props;

    return (
      <div className={s.video}>
        <div className={s.video__container}>
          <figure className={s.video__figure}>
            <video
              className={s.video__tag}
              src={url}
              height={500}
              autoPlay
            />
            {/*
            <img className={s.video__img} src={src} alt={alt} width={width} height={height} />
            {caption && (
              <figcaption className={s.video__caption}>{caption}</figcaption>
            )}
            */}
          </figure>
        </div>
      </div>
    );
  }
}
