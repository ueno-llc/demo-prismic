import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Picture from 'components/picture';

const PictureContainer = ({ image }) => {
  const mobileImage = _get(image, 'mobile', {});
  const tabletImage = _get(image, 'tablet', {});
  const desktopImage = _get(image, 'desktop', {});

  return (
    <Picture
      mobileView={mobileImage}
      tabletView={tabletImage}
      mainView={desktopImage}
    />
  );
};

PictureContainer.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    dimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    desktop: PropTypes.object,
    tablet: PropTypes.object,
    mobile: PropTypes.object,
  }),
};

PictureContainer.defaultProps = {
  image: {},
};

export default PictureContainer;
