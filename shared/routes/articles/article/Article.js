import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';

import NotFound from 'routes/not-found';

import Heading from 'components/heading';
import Article from 'components/article';
import Author from 'components/author';
import Slices from 'components/slices';

import { getString, getArray, getObject } from 'utils/prismic';

class Articles extends Component {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult: article } = this.props;

    if (isEmpty(article)) {
      return <Route component={NotFound} />;
    }

    const title = getString(article, 'data.title');
    const author = getObject(article, 'data.author');
    const body = getArray(article, 'data.body');

    return (
      <div>
        <Helmet
          title={getString(article, 'data.title_seo')}
          meta={[{ name: 'description', content: getString(article, 'data.description_seo')}]}
        />

        <Article>
          {author && (<Author
            key="author"
            name={getString(author, 'data.name')}
            bio={getString(author, 'data.bio')}
            image={getObject(author, 'data.image').thumb}
          />)}
          <Heading key="heading">{title}</Heading>
          <Slices data={body} />
        </Article>

      </div>
    );
  }
}

const articlesWithJob = withJob({
  work: ({ prismic, match }) => prismic.getArticle(match.params.id),
  LoadingComponent: () => (
    <Article>
      <Author
        loading
      />
      <Heading key="heading" loading />
    </Article>
  ),
})(Articles);

export default inject('prismic')(articlesWithJob);
