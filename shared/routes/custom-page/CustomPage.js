import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';

import NotFound from 'routes/not-found';
import { getField } from 'utils/prismic';

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

    const body = getField(page.data.body, 'body');

    return (
      <div>
        <Helmet title={getField(page.data.title, 'text')} />

        <Intro>
          <h1>{getField(page.data.title, 'text')}</h1>
          <h2>{getField(page.data.subheading, 'text')}</h2>
          <p>{getField(page.data.text, 'text')}</p>
        </Intro>

        <Article>
          <Slices data={body} />
        </Article>
      </div>
    );
  }
}

const customPageWithJob = withJob({
  work: ({ prismic, match }) =>
    prismic.getByType({ type: 'custom_page', uid: match.params.id }),

  shouldWorkAgain: (prevProps, nextProps) =>
    prevProps.match.params.id !== nextProps.match.params.id,

  LoadingComponent: () => <Intro isLoading />,
})(CustomPage);

export default inject('prismic')(customPageWithJob);
