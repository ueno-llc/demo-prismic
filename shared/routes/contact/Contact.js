import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getField } from 'utils/prismic';

import Intro from 'components/intro';
import Segment from 'components/segment';

import ContactForm from './components/form';

class Contact extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.shape({
      data: PropTypes.shape({
        content: PropTypes.array,
        title: PropTypes.array,
        featured_article: PropTypes.object,
      }),
    }),
    match: PropTypes.object,
  };

  render() {
    const { jobResult: contact, match } = this.props;
    const { success } = match.params;

    return (
      <div>
        <Helmet
          title={getField(contact.data.title_seo, 'text').trim()}
          meta={[{ name: 'description', content: getField(contact.data.description_seo, 'text').trim() }]}
        />

        <Intro>
          <h1>{getField(contact.data.title, 'text')}</h1>
          <h2>{getField(contact.data.subheading, 'text')}</h2>
          <p>{getField(contact.data.text, 'text')}</p>
        </Intro>

        <Segment>
          {success ? (
            <h1>Success</h1>
          ) : (
            <ContactForm />
          )}
        </Segment>
      </div>
    );
  }
}

const contactWithJob = withJob({
  work: ({ prismic }) => prismic.getByType({ type: 'contact' }),
  LoadingComponent: () => (
    <div>
      <Intro>
        <h1>&nbsp;</h1>
        <h2>&nbsp;</h2>
        <p>&nbsp;</p>
      </Intro>
    </div>
  ),
})(Contact);

export default inject('prismic')(contactWithJob);
