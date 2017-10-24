import React from 'react';
import PropTypes from 'prop-types';

import Quote from 'components/quote';

const QuoteContainer = ({ data }) => (
  <Quote
    text={data.quote}
  />
);

QuoteContainer.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default QuoteContainer;
