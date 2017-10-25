import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ArticleList from './article-list';
import Article from './article';

const ArticlesRoute = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/:id`} component={Article} />
      <Route exact path={`${match.url}`} component={ArticleList} />
    </Switch>
  </div>
);

ArticlesRoute.propTypes = {
  match: PropTypes.object,
};

export default ArticlesRoute;
