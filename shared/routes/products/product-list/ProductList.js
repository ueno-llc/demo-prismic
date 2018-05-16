import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { getField } from 'utils/prismic';

import Intro from 'components/intro';
import List, { Item } from './components/list';

class Products extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult: { page, products } } = this.props;

    return (
      <div>
        <Helmet title={getField(page.data.title, 'text')} />

        <Intro>
          <h1>{getField(page.data.title, 'text')}</h1>
          <h2>{getField(page.data.subheading, 'text')}</h2>
          <p>{getField(page.data.text, 'text')}</p>
        </Intro>

        {products && (
          <List>
            {products.map((product) => {
              const { uid, data } = product;

              if (!uid) {
                return null;
              }

              const image = getField(data.hero_image);
              const src = image && image.square
                && image.square.url;

              return (
                <Item
                  key={uid}
                  url={`/products/${uid}`}
                  title={getField(data.name, 'text')}
                  description={getField(data.description, 'text')}
                  image={image}
                  src={src}
                />
              );
            })}
          </List>
        )}

        {!products && (
          <p>No products at the momednt.</p>
        )}
      </div>
    );
  }
}

const productsWithJob = withJob({
  work: async ({ prismic }) => {
    const [page, products] = await Promise.all([
      prismic.getByType({ type: 'custom_page', uid: 'products' }),
      prismic.getByType({ type: 'product', links: 'product.gallery' }),
    ]);

    return { page, products };
  },
  LoadingComponent: () => (
    <Intro isLoading />
  ),
})(Products);

export default inject('prismic')(productsWithJob);
