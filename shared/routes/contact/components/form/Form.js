import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class ContactForm extends Component {

  @observable
  name = '';

  @observable
  email = '';

  @observable
  message = '';

  render() {
    const { name, email, message } = this;

    return (
      <form acceptCharset="UTF-8" action="https://formkeep.com/f/37771b24266b" method="POST">
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={({ target }) => { this.name = target.value; }}
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={({ target }) => { this.email = target.value; }}
            required
          />
        </label>
        <label htmlFor="message">
          Message
          <textarea
            id="message"
            name="message"
            type="text"
            value={message}
            onChange={({ target }) => { this.message = target.value; }}
            required
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    );
  }
}
