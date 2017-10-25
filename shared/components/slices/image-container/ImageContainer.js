import React from 'react';
import PropTypes from 'prop-types';

import Image from 'components/image';

import { getField } from 'utils/prismic';

const ImageContainer = ({ data }) => {
  const { width, height } = data.image.dimensions;
  const { alt, url } = data.image;
  const caption = getField(data.caption, 'richtext');

  return (
    <Image
      width={width}
      height={height}
      alt={alt}
      src={url}
      caption={caption}
    />
  );
};

ImageContainer.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.object,
    caption: PropTypes.array,
  }),
};

export default ImageContainer;
