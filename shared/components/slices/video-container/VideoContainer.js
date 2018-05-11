import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Video from 'components/video';
import { getRichtext } from 'utils/prismic';

export default class VideoContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  render() {
    const { data } = this.props;
    const caption = getRichtext(data, 'caption');

    return (
      <Video
        url={data.video.url}
        caption={caption}
      />
    );
  }
}
