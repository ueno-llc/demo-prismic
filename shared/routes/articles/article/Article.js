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

import { getField } from 'utils/prismic';

class Articles extends Component {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult: article } = this.props;

    if (isEmpty(article)) {
      return <Route component={NotFound} />;
    }

    const title = getField(article.data.title, 'title');
    const author = getField(article.data.author);
    const body = getField(article.data.body, 'body');

    // const id = getField(article.id);
    // Add data-wio-id={id} to the div for edit button
    return (
      <div>
        <Helmet title={title} />

        <Article>
          {author && (<Author
            key="author"
            name={getField(author.data.name, 'title')}
            bio={getField(author.data.bio, 'title')}
            image={getField(author.data.image)}
          />)}
          <Heading key="heading">{title}</Heading>
          <Slices data={body} />
        </Article>

      </div>
    );
  }
}

const articlesWithJob = withJob({
  work: ({ prismic, match }) => prismic.article(match.params.id),
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
