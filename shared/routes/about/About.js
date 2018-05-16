import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getField } from 'utils/prismic';

import Slices from 'containers/slices';
import Intro from 'components/intro';

class About extends PureComponent {

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
    const { jobResult: about } = this.props;

    const slicesData = getField(about.data.body, 'body');

    return (
      <div>
        <Helmet title={getField(about.data.title, 'text')} />
        <Intro>
          <h1>{getField(about.data.title, 'text')}</h1>
          <h2>{getField(about.data.subheading, 'text')}</h2>
          <p>{getField(about.data.text, 'text')}</p>
        </Intro>

        <Slices data={slicesData} />

      </div>
    );
  }
}

const aboutWithJob = withJob({
  work: ({ prismic }) => prismic.getSingleByType({ type: 'custom_page', uid: 'about', links: 'author.name,author.bio,author.image' }),
  LoadingComponent: () => (
    <div>
      <Intro isLoading />
    </div>
  ),
})(About);

export default inject('prismic')(aboutWithJob);
