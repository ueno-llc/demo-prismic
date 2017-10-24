import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

import Slices from 'components/slices';
import s from './Article.scss';

const slicesType = (<Slices />).type;

const Article = ({ children }) => (
  <div className={s.article}>
    {Children.map(children, (child, i) => {
      if (!child) {
        return null;
      }
      const type = child.type;

      if (type === slicesType) {
        return cloneElement(child, {
          className: s.article__slices,
          key: i,
        });
      }

      return React.cloneElement(child);
    })}
  </div>
);

Article.propTypes = {
  children: PropTypes.node,
};

export default Article;
