import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Picture from 'components/picture';

const PictureContainer = ({ image }) => {
  const mobileImage = _get(image, 'mobile', {});
  const mobileImage2x = _get(image, 'mobile_2x', {});
  const tabletImage = _get(image, 'tablet', {});
  const tabletImage2x = _get(image, 'tablet_2x', {});
  const desktopImage = _get(image, 'desktop', {});
  const desktopImage2x = _get(image, 'desktop_2x', {});

  return (
    <Picture
      mobileView={mobileImage}
      mobileView2x={mobileImage2x}
      tabletView={tabletImage}
      tabletView2x={tabletImage2x}
      mainView={desktopImage}
      mainView2x={desktopImage2x}
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
    desktop_2x: PropTypes.object,
    tablet: PropTypes.object,
    tablet_2x: PropTypes.object,
    mobile: PropTypes.object,
    mobile_2x: PropTypes.object,
  }),
};

PictureContainer.defaultProps = {
  image: {},
};

export default PictureContainer;
