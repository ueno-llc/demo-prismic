import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';

import Button from 'components/button';

import Input from './Input';
import s from './Form.scss';

@observer
export default class ContactForm extends Component {
  static propTypes = {
    onSend: PropTypes.func,
  }

  @observable
  name = '';

  @observable
  email = '';

  @observable
  message = '';

  @autobind
  onSend(e) {
    e.preventDefault();

    const form = new FormData();

    form.append('name', this.name);
    form.append('email', this.email);
    form.append('message', this.message);

    this.props.onSend(form);
  }

  render() {
    return (
      <div className={s.form}>
        <div className={s.form__row}>
          <div className={s.form__col}>
            <form
              acceptCharset="UTF-8"
              onSubmit={this.onSend}
              className={s.form__form}
            >
              <Input
                placeholder="Name"
                id="name"
                type="text"
                onChange={({ target }) => { this.name = target.value; }}
                className={s.form__input}
                required
              />

              <Input
                placeholder="Email"
                id="email"
                type="text"
                onChange={({ target }) => { this.email = target.value; }}
                className={s.form__input}
                required
              />

              <Input
                placeholder="Message"
                id="message"
                type="text"
                onChange={({ target }) => { this.message = target.value; }}
                className={s.form__textarea}
                multiline
                required
              />

              <div className={s.form__button}>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
