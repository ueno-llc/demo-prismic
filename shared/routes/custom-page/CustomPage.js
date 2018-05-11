import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';

import NotFound from 'routes/not-found';
import { get, getCollection } from 'utils/prismic';

import Intro from 'components/intro';
import Slices from 'components/slices';
import Article from 'components/article';

class CustomPage extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  render() {
    const { jobResult: page } = this.props;

    if (isEmpty(page)) {
      return <Route component={NotFound} />;
    }

    const body = getCollection(page, 'data.body');

    return (
      <div>
        <Helmet title={get(page, 'data.title')} />

        <Intro>
          <h1>{get(page, 'data.title')}</h1>
          <h2>{get(page, 'data.subheading')}</h2>
          <p>{get(page, 'data.text')}</p>
        </Intro>

        <Article>
          <Slices data={body} />
        </Article>
      </div>
    );
  }
}

const customPageWithJob = withJob({
  work: ({ prismic, match }) => prismic.getCustomPage(match.params.id),

  shouldWorkAgain: (prevProps, nextProps) =>
    prevProps.match.params.id !== nextProps.match.params.id,

  LoadingComponent: () => <Intro isLoading />,
})(CustomPage);

export default inject('prismic')(customPageWithJob);
