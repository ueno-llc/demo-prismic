import React from 'react';
import PropTypes from 'prop-types';

import ImageContainer from 'components/slices/image-container';
import TextContainer from 'components/slices/text-container';
import QuoteContainer from 'components/slices/quote-container';
import TwitterContainer from 'components/slices/twitter-container';

const Slices = ({ data, className }) => (
  <div className={className}>
    {data.map((s, i) => {
      const key = `slice-${s.slice_type}-${i}`;
      switch (s.slice_type) {
        case 'image':
          return (<ImageContainer key={key} data={s.primary} />);
        case 'text':
          return (<TextContainer key={key} data={s.primary} />);
        case 'quote':
          return (<QuoteContainer key={key} data={s.primary} />);
        case 'tweets':
          return (
            <TwitterContainer key={key} data={s.items.map(t => t.tweet)} />
          );
        default:
          return null;
      }
    })}
  </div>
);

Slices.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};

export default Slices;
