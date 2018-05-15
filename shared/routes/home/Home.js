import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getString, getArray, getRichtext } from 'utils/prismic';

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
          title={getString(homepage, 'data.title_seo')}
          meta={[{ name: 'description', content: getString(homepage, 'data.description_seo') }]}
        />

        <Hero carousel={getArray(homepage, 'data.carousel')} />

        <Columns
          heading={getString(homepage, 'data.column_title')}
          subline={getString(homepage, 'data.column_subheading')}
        >
          {getArray(homepage, 'data.content_columns').map((item, i) => (
            <Column
              key={i} // eslint-disable-line
              title={getString(item, 'title')}
              text={getRichtext(item, 'text')}
            />
          ))}
        </Columns>

        <Articles
          title={getString(homepage, 'data.articles_title')}
          subheading={getString(homepage, 'data.articles_subheading')}
          articles={getArray(homepage, 'data.featured_articles')}
          show={4}
        />

        <Cta>
          <p>Want to talk more.</p>
          <Button to="/contact-us" large stroke>Contact us</Button>
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
