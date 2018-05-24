/* eslint-disable jsx-a11y/media-has-caption */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Video.scss';

export default class VideoBlock extends PureComponent {

  static propTypes = {
    url: PropTypes.string,
    caption: PropTypes.node,
  }

  render() {
    const { url, caption } = this.props;

    return (
      <figure className={s.video__figure}>
        <video
          className={s.video__tag}
          src={url}
          height={574}
          autoPlay
          muted
          controls
          loop
        />
        {caption && (
          <figcaption className={s.video__caption}>{caption}</figcaption>
        )}
      </figure>
    );
  }
}
