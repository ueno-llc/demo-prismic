import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getField, linkResolver } from 'utils/prismic';

import Segment from 'components/segment';

import Hero from './components/hero';
import Articles from './components/articles';

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

    const article = getField(homepage.data.featured_article, 'link');

    return (
      <div>
        <Helmet
          title={getField(homepage.data.title_seo, 'title').trim()}
          meta={[{ name: 'description', content: getField(homepage.data.description_seo, 'title').trim() }]}
        />

        <Hero
          title={getField(homepage.data.title, 'title')}
          text={getField(homepage.data.content, 'richtext')}
        />

        <Segment>
          3 column text thingy
        </Segment>

        <Segment>
          Image split
        </Segment>

        <Articles
          articles={article}
          show={3}
        />

        <Segment>
          CTA for contact-us form ?
        </Segment>
      </div>
    );
  }
}

const homeWithJob = withJob({
  work: ({ prismic }) => prismic.homepage(),
})(Home);

export default inject('prismic')(homeWithJob);
