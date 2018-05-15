import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { getString, getObject } from 'utils/prismic';

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
        <Helmet
          title={getString(page, 'data.title_seo')}
          meta={[{ name: 'description', content: getString(page, 'data.description_seo') }]}
        />

        <Intro>
          <h1>{getString(page, 'data.title')}</h1>
          <h2>{getString(page, 'data.subtitle')}</h2>
          <p>{getString(page, 'data.text')}</p>
        </Intro>

        {articles && (
          <List>
            {articles.map((article) => {
              const { uid, data } = article;

              if (!uid) {
                return null;
              }

              const image = getObject(data, 'image');
              const src = image && image.url;

              return (
                <Item
                  key={uid}
                  url={`/articles/${uid}`}
                  title={getString(data, 'title')}
                  description={getString(data, 'short_description')}
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
  work: async ({ prismic }) => prismic.getArticles(),
  LoadingComponent: () => (
    <Intro isLoading />
  ),
})(Articles);

export default inject('prismic')(articlesWithJob);
