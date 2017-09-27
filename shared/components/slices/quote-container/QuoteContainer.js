import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/text';

const QuoteContainer = ({ data }) => (
  <blockquote>
    <Text
      text={data.quote}
    />
  </blockquote>
);

QuoteContainer.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default QuoteContainer;
