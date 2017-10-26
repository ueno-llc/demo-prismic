import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './styles.scss';

export default class Results extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  onKeyUp = (e) => {
    const value = this.inputEl.value;

    if (e.keyCode === 13) {
      this.props.onSearch(value);
    }
  }

  render() {
    const { query, count } = this.props;

    return (
      <div className={s.results}>
        <div className={s.results__container}>
          <h1 className={s.results__header}>{query}, {count} results</h1>

          <input
            ref={(el) => { this.inputEl = el; }}
            className={s.results__input}
            type="text"
            defaultValue={query}
            onKeyUp={this.onKeyUp}
          />

          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
