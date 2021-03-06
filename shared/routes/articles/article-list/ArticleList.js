import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { getField } from 'utils/prismic';

import Intro from 'components/intro';
import List, { Item } from './components/list';

class Articles extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult: { page, articles } } = this.props;

    return (
      <div>
        <Helmet title={getField(page.data.title, 'text')} />

        <Intro>
          <h1>{getField(page.data.title, 'text')}</h1>
          <h2>{getField(page.data.subheading, 'text')}</h2>
          <p>{getField(page.data.text, 'text')}</p>
        </Intro>

        {articles && (
          <List>
            {articles.map((article) => {
              const { uid, data } = article;

              if (!uid) {
                return null;
              }

              const image = getField(data.image);
              const src = image && image.url;

              return (
                <Item
                  key={uid}
                  url={`/articles/${uid}`}
                  title={getField(data.title, 'text')}
                  description={getField(data.short_description, 'text')}
                  image={image}
                  src={src}
                />
              );
            })}
          </List>
        )}

        {!articles && (
          <p>No articles at the moment.</p>
        )}
      </div>
    );
  }
}

const articlesWithJob = withJob({
  work: async ({ prismic }) => {
    const [page, articles] = await Promise.all([
      prismic.getSingleByType({ type: 'custom_page', uid: 'articles' }),
      prismic.getByType({ type: 'article', links: 'author.name' }),
    ]);

    return { page, articles };
  },
  LoadingComponent: () => (
    <Intro isLoading />
  ),
})(Articles);

export default inject('prismic')(articlesWithJob);
