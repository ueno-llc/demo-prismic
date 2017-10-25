import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getField } from 'utils/prismic';

import Segment from 'components/segment';
import Button from 'components/button';
import Columns, { Column } from 'components/columns';

import Hero from './components/hero';
import Articles from './components/articles';
import Cta from './components/cta';

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

        <Columns
          heading="Who we are, and who we want to be"
          subline="A few things you should know about Ueno"
        >
          {getField(homepage.data.content_columns, 'group').map((item, i) => (
            <Column
              key={i}
              title={getField(item.title, 'title')}
              text={getField(item.text, 'richtext')}
            />
          ))}
        </Columns>

        <Articles
          articles={homepage.data.featured_articles}
          show={4}
        />

        <Segment>
          Image split
        </Segment>

        <Cta>
          <p>Want to talk more.</p>
          <Button to="/contact" large stroke>Contact us</Button>
        </Cta>
      </div>
    );
  }
}

const homeWithJob = withJob({
  work: ({ prismic }) => prismic.homepage(),
  LoadingComponent: () => (
    <div>
      <Hero />
      <Segment />
    </div>
  ),
})(Home);

export default inject('prismic')(homeWithJob);
