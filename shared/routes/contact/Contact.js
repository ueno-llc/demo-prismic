import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Segment from 'components/segment';
import ContactForm from './components/form';

export default class Contact extends PureComponent {
  static propTypes = {
    match: PropTypes.object,
  }

  render() {
    const { success } = this.props.match.params;

    return (
      <div>
        <Helmet title="Contact Us" />
        <Segment>
          <h1>Contact Us</h1>
        </Segment>
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
