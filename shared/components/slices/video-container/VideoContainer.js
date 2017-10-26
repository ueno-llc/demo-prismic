import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Video from 'components/video';
import { getField } from 'utils/prismic';

export default class VideoContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  render() {
    const { data } = this.props;
    const caption = getField(data.caption, 'richtext');

    return (
      <Video
        url={data.video.url}
        caption={caption}
      />
    );
  }
}
