import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import s from './Content.scss';

function Content({ children, location }) {
  return (
    <main className={s.content} key={location.pathname}>
      {children}
    </main>
  );
}

Content.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default withRouter(Content);
