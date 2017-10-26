import React, { Component } from 'react';

import Video from 'components/video';

export default class VideoContainer extends Component {
  render() {
    const { caption, video } = this.props.data;
    console.log(this.props);

    return (
      <Video
        url={video.url}
      />
    );
  }
}
