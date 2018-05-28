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
          title={getField(homepage.data.title_seo, 'text').trim()}
          meta={[{ name: 'description', content: getField(homepage.data.description_seo, 'text').trim() }]}
        />

        <Hero carousel={getField(homepage.data.carousel)} />

        <Columns
          heading={getField(homepage.data.column_title, 'text')}
          subline={getField(homepage.data.column_subheading, 'text')}
        >
          {getField(homepage.data.content_columns, 'group').map((item, i) => (
            <Column
              key={i} // eslint-disable-line
              title={getField(item.title, 'text')}
              text={getField(item.text, 'richtext')}
            />
          ))}
        </Columns>

        <Articles
          title={getField(homepage.data.articles_title, 'text')}
          subheading={getField(homepage.data.articles_subheading, 'text')}
          articles={homepage.data.featured_articles}
          show={4}
        />

        <Cta>
          <p>Want to talk more.</p>
          <Button to="/contact" large stroke>Contact us</Button>
        </Cta>
      </div>
    );
  }
}

const homeWithJob = withJob({
  work: ({ prismic }) => prismic.getHome(),
  LoadingComponent: () => (
    <div>
      <Hero
        isLoading
      />
      <Columns isLoading />
      <Segment />
    </div>
  ),
})(Home);

export default inject('prismic')(homeWithJob);
