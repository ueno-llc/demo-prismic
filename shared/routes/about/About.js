import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { getField } from 'utils/prismic';

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

    const people = getField(about.data.people);

    return (
      <div>
        <Helmet title="About" />

        <Intro>
          <h1>{getField(about.data.title, 'text')}</h1>
          <h2>{getField(about.data.subheading, 'text')}</h2>
          <p>{getField(about.data.text, 'text')}</p>
        </Intro>

        <Peoples title={getField(about.data.people_title, 'text')}>
          {people && people.map(({ person: { data: { name, bio, image } } }, i) => (
            <People
              key={`people-${i}`} // eslint-disable-line
              image={getField(image).url}
              name={getField(name, 'text')}
              description={getField(bio, 'text')}
            />
          ))}
        </Peoples>
      </div>
    );
  }
}

const aboutWithJob = withJob({
  work: ({ prismic }) => prismic.about(),
  LoadingComponent: () => (
    <div>
      <Intro>
        <h1>&nbsp;</h1>
        <h2>&nbsp;</h2>
        <p>&nbsp;</p>
      </Intro>
      <Peoples />
    </div>
  ),
})(About);

export default inject('prismic')(aboutWithJob);
