import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import isEmpty from 'lodash/isEmpty';

import { getField } from 'utils/prismic';

import PictureContainer from 'containers/picture-container';

import Intro from 'components/intro';
import Segment from 'components/segment';

class Images extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.shape({
      data: PropTypes.shape({
        content: PropTypes.array,
        title: PropTypes.array,
        featured_article: PropTypes.object,
      }),
    }),
  };

  render() {
    const { jobResult: { data } } = this.props;

    return (
      <div>
        {/* <Helmet
          title={getField(about.data.title_seo, 'text').trim()}
          meta={[{ name: 'description',
          content: getField(about.data.description_seo, 'text').trim() }]}
        /> */}

        <Intro>
          <h1>{getField(data.title, 'text')}</h1>
          <p>{getField(data.description, 'richtext')}</p>
        </Intro>

        <Segment>
          {!isEmpty(data.images) && data.images.map(({ image }, i) => (
            <div key={i}>
              <PictureContainer image={image} />
            </div>
          ))}
        </Segment>

      </div>
    );
  }
}

const aboutWithJob = withJob({
  work: ({ prismic }) => prismic.getSingleByType({ type: 'image_page' }),
  LoadingComponent: () => (
    <div>
      <Intro isLoading />
    </div>
  ),
})(Images);

export default inject('prismic')(aboutWithJob);
