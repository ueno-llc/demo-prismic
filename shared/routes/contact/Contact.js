import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import Forms from 'store/Forms';
import Segment from 'components/segment';
import ContactForm from './components/form';

export default class Contact extends PureComponent {
  @autobind
  send(data) {
    console.log('send', data);
    Forms.contactUs(data);
  }

  render() {
    return (
      <div>
        <Helmet title="Contact Us" />
        <Segment>
          <h1>Contact Us</h1>
        </Segment>
        <Segment>
          <ContactForm onSubmit={this.send} />
        </Segment>
      </div>
    );
  }
}
