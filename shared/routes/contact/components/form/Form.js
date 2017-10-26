import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from 'components/button';

import Input from './Input';
import s from './Form.scss';

@observer
export default class ContactForm extends Component {

  @observable
  name = '';

  @observable
  email = '';

  @observable
  message = '';

  render() {
    return (
      <div className={s.form}>
        <div className={s.form__row}>
          <div className={s.form__col}>
            <form
              acceptCharset="UTF-8"
              action="https://formkeep.com/f/37771b24266b"
              method="POST"
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
