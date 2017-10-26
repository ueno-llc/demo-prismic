import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import toolbar from 'prismic-toolbar';

import config from 'utils/config';

import s from './PrismicToolbar.scss';

const endpoint = config('prismicApiUrl');
const isPreview = config('prismicPreviewApp');

export default class PrismicToolbar extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
  };

  componentDidMount() {
    if (isPreview) {
      toolbar.setup(endpoint);
    }
  }

  componentDidUpdate() {
    if (isPreview) {
      toolbar.setup(endpoint);
    }
  }

  render() {
    const { id } = this.props;

    if (!isPreview) {
      return null;
    }

    return (
      <div className={s.toolbar} data-wio-id={id} />
    );
  }
}
