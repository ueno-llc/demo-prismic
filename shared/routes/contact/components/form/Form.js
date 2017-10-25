import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  @observable
  name = '';

  @observable
  email = '';

  @observable
  message = '';

  @autobind
  onSubmit(e) {
    e.preventDefault();
    const { name, email, message } = this;

    this.props.onSubmit({
      name,
      email,
      message,
    });
  }

  render() {
    const { name, email, message } = this;

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
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
