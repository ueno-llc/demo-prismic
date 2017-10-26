import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { getField } from 'utils/prismic';

import Intro from 'components/intro';
import PrismicToolbar from 'components/prismic-toolbar';
import List, { Item } from './components/list';

class Articles extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult: { page, articles } } = this.props;
    const { id } = page;

    return (
      <div>
        <PrismicToolbar id={id} />
        <Helmet
          title={getField(page.data.title_seo, 'text').trim()}
          meta={[{ name: 'description', content: getField(page.data.description_seo, 'text').trim() }]}
        />

        <Intro>
          <h1>{getField(page.data.title, 'text')}</h1>
          <h2>{getField(page.data.subtitle, 'text')}</h2>
          <p>{getField(page.data.text, 'text')}</p>
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
      prismic.getByType({ type: 'articles', links: 'author.name,author.bio,author.image' }),
      prismic.getByType({ type: 'article', links: 'author.name' }),
    ]);

    return { page, articles };
  },
})(Articles);

export default inject('prismic')(articlesWithJob);
