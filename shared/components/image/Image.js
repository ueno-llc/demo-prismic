import React from 'react';
import PropTypes from 'prop-types';

import s from './Image.scss';

const Image = ({ width, height, alt, src, caption }) => (
  <figure className={s.image}>
    <img src={src} alt={alt} width={width} height={height} />
    {caption && (
      <figcaption>{caption}</figcaption>
    )}
  </figure>
);

Image.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  src: PropTypes.string,
  caption: PropTypes.node,
};

export default Image;
