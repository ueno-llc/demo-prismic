import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import toolbar from 'prismic-toolbar';

import config from 'utils/config';

import s from './PrismicToolbar.scss';

const endpoint = config('prismicApiUrl');

export default class PrismicToolbar extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
  };

  componentDidMount() {
    toolbar.setup(endpoint);
  }

  componentDidUpdate() {
    toolbar.setup(endpoint);
  }

  render() {
    const { id } = this.props;

    return (
      <div className={s.toolbar} data-wio-id={id} />
    );
  }
}
