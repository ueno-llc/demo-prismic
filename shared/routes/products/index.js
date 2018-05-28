import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ProductList from './product-list';
import Product from './product';

const ProductsRoute = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/:id`} component={Product} />
      <Route exact path={`${match.url}`} component={ProductList} />
    </Switch>
  </div>
);

ProductsRoute.propTypes = {
  match: PropTypes.object,
};

export default ProductsRoute;
