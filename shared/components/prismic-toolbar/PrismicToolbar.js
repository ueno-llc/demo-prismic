import React, { PureComponent } from 'react';

import toolbar from 'prismic-toolbar';

import config from 'utils/config';

const endpoint = config('prismicApiUrl');

export default class PrismicToolbar extends PureComponent {
  componentDidMount() {
    toolbar.setup(endpoint);
  }

  componentDidUpdate() {
    toolbar.setup(endpoint);
  }

  render() {
    return (
      <div />
    );
  }
}
