import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getString, getArray, getObject } from 'utils/prismic';

import Intro from 'components/intro';
import Peoples, { People } from './components/peoples';

class About extends PureComponent {

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
    const { jobResult: about } = this.props;

    const people = getArray(about.data.people);

    return (
      <div>
        <Helmet
          title={getString(about, 'data.title_seo')}
          meta={[{ name: 'description', content: getString(about, 'data.description_seo') }]}
        />

        <Intro>
          <h1>{getString(about, 'data.title')}</h1>
          <h2>{getString(about, 'data.subheading')}</h2>
          <p>{getString(about, 'data.text')}</p>
        </Intro>

        <Peoples title={getString(about, 'data.people_title')}>
          {people.map(({ person: { data: { name, bio, image } } }, i) => (
            <People
              key={`people-${i}`} // eslint-disable-line
              image={getObject(image).url}
              name={getString(name)}
              description={getString(bio)}
            />
          ))}
        </Peoples>
      </div>
    );
  }
}

const aboutWithJob = withJob({
  work: ({ prismic }) => prismic.getAbout(),
  LoadingComponent: () => (
    <div>
      <Intro isLoading />
      <Peoples />
    </div>
  ),
})(About);

export default inject('prismic')(aboutWithJob);
