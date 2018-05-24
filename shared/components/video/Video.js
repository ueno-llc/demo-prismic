import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Video.scss';

import VideoBlock from './VideoBlock';

export default class Video extends PureComponent {

  static propTypes = {
    url: PropTypes.string,
    caption: PropTypes.node,
  }

  render() {
    const { url, caption } = this.props;

    return (
      <div className={s.video}>
        <div className={s.video__container}>
          <VideoBlock url={url} caption={caption} />
        </div>
      </div>
    );
  }
}
