import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import s from './SearchBar.scss';

class SearchBar extends Component {

  static propTypes = {
    text: PropTypes.string,
    history: PropTypes.object,
  };

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
      this.input.value = this.props.text || '';
    }
  }

  componentWillReceiveProps() {
    if (this.input) {
      this.input.value = '';
    }
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
      this.input.value = this.props.text || '';
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.search();
    }
  }

  search = () => {
    const { history } = this.props;
    history.push(`/search/${this.input.value}`);
  }

  render() {

    return (
      <div className={s.search}>
        <input
          ref={(el) => { this.input = el; }}
          className={s.search__input}
          defaultValue={this.props.text}
          type="text"
          placeholder="Search..."
          onKeyDown={this.onKeyDown}
          onBlur={this.onClose}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
