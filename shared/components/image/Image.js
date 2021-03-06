import React from 'react';
import PropTypes from 'prop-types';

import ImageBlock from './ImageBlock';

import s from './Image.scss';

const Image = ({ width, height, alt, src, caption }) => (
  <div className={s.image}>
    <div className={s.image__container}>
      <ImageBlock width={width} height={height} alt={alt} src={src} caption={caption} />
    </div>
  </div>
);

Image.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  src: PropTypes.string,
  caption: PropTypes.node,
};

export default Image;
