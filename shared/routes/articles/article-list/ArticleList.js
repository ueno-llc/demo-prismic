import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { getField } from 'utils/prismic';

import Loading from 'components/loading';
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
        <Helmet title="Articles" />

        <Intro>
          <h1>{getField(page.data.title, 'title')}</h1>
          <h2>{getField(page.data.subtitle, 'title')}</h2>
          <p>{getField(page.data.text, 'title')}</p>
        </Intro>

        {articles && (
          <List>
            {articles.map((article, i) => {
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
                  title={getField(data.title, 'title')}
                  description={getField(data.short_description, 'title')}
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
    const [page, articles] = await Promise.all([prismic.articlesPage(), prismic.articles()]);

    return { page, articles };
  },
  LoadingComponent: () => (
    <Intro isLoading />
  ),
})(Articles);

export default inject('prismic')(articlesWithJob);
