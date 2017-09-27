import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/text';

const TextContainer = ({ data }) => (
  <Text
    text={data.text}
  />
);

TextContainer.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
      }),
    ),
  }),
};

export default TextContainer;
