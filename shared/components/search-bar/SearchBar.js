import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import s from './SearchBar.scss';

class SearchBar extends Component {

  static propTypes = {
    history: PropTypes.object,
  };

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
