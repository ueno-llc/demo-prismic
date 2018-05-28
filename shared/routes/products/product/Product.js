import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';

import { getField } from 'utils/prismic';

import NotFound from 'routes/not-found';

import Slices from 'containers/slices';

import Hero from './components/hero';

class Product extends Component {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult } = this.props;
    const { product } = jobResult;

    if (isEmpty(product)) {
      return <Route component={NotFound} />;
    }

    const slicesData = getField(product.data.body, 'body');

    return (
      <div>
        <Helmet
          title={getField(product.data.meta_title, 'text').trim()}
          meta={[{ name: 'description', content: getField(product.data.meta_description, 'text').trim() }]}
        />

        <Hero
          image={getField(product.data.hero_image)}
          name={getField(product.data.name, 'text')}
          description={getField(product.data.description, 'text')}
        />
        <Slices data={slicesData} />

      </div>
    );
  }
}

const productWithJob = withJob({

  work: async ({ prismic, match }) => {
    const product = await prismic.getByType({
      type: 'product',
      uid: match.params.id,
      links: 'product.name, product.description, product.hero_image',
    });

    return { product };
  },
  LoadingComponent: () => (
    <Hero
      loading
    />
  ),
})(Product);

export default inject('prismic')(productWithJob);
