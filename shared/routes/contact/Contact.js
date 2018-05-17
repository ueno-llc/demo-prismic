import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getField } from 'utils/prismic';

import Slices from 'containers/slices';
import Intro from 'components/intro';

class Contact extends PureComponent {

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
    const { jobResult: contact } = this.props;

    const slicesData = getField(contact.data.body, 'body');

    return (
      <div>
        <Helmet title={getField(contact.data.title, 'text')} />

        <Intro>
          <h1>{getField(contact.data.title, 'text')}</h1>
          <h2>{getField(contact.data.subheading, 'text')}</h2>
          <p>{getField(contact.data.text, 'text')}</p>
        </Intro>

        <Slices data={slicesData} />
      </div>
    );
  }
}

const contactWithJob = withJob({
  work: ({ prismic }) => prismic.getByType({ type: 'custom_page', uid: 'contact' }),
  LoadingComponent: () => (
    <div>
      <Intro isLoading />
    </div>
  ),
})(Contact);

export default inject('prismic')(contactWithJob);
