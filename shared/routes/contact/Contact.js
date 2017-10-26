import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withJob } from 'react-jobs';
import { autobind } from 'core-decorators';

import { getField } from 'utils/prismic';

import Intro from 'components/intro';
import Segment from 'components/segment';

import Success from './components/success';
import ContactForm from './components/form';

@observer
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

  @observable
  success = false;

  @autobind
  onSend(form) {
    fetch('https://formkeep.com/f/37771b24266b', {
      method: 'POST',
      body: form,
    }).then((res) => {
      if (res.status === 200) { // success
        this.success = true;
      }
    });
  }

  render() {
    const { jobResult: contact } = this.props;

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
          {this.success ? (
            <Success
              title={getField(contact.data.success_message_title, 'text')}
              text={getField(contact.data.success_message_text, 'text')}
            />
          ) : (
            <ContactForm onSend={this.onSend} />
          )}
        </Segment>
      </div>
    );
  }
}

const contactWithJob = withJob({
  work: ({ prismic }) => prismic.getSingleByType({ type: 'contact' }),
  LoadingComponent: () => (
    <div>
      <Intro isLoading />
    </div>
  ),
})(Contact);

export default inject('prismic')(contactWithJob);
