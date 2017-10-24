import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import Segment from 'components/segment';
import Heading from 'components/heading';

import { getField, linkResolver } from 'utils/prismic';

class Home extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.shape({
      data: PropTypes.shape({
        content: PropTypes.array,
        title: PropTypes.array,
        featured_article: PropTypes.object,
      }),
    }),
  };

  render() {
    const { jobResult: homepage } = this.props;

    const title = getField(homepage.data.title, 'title');
    const content = getField(homepage.data.content, 'richtext');

    const article = getField(homepage.data.featured_article, 'link');
    const articleLink = linkResolver(article);
    const articleTitle = getField(article.data.title, 'title');

    return (
      <div>
        <Helmet
          title={getField(homepage.data.title_seo, 'title').trim()}
          meta={[{ name: 'description', content: getField(homepage.data.description_seo, 'title').trim() }]}
        />

        <Segment>
          <Heading>{title}</Heading>
          {content}
        </Segment>

        <Segment>
          <h3>Featured article</h3>
          <Link to={articleLink}>{articleTitle}</Link>
        </Segment>

      </div>
    );
  }
}

const homeWithJob = withJob({
  work: ({ prismic }) => prismic.homepage(),
})(Home);

export default inject('prismic')(homeWithJob);
