import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withJob } from 'react-jobs';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';

class Search extends Component {
  static propTypes = {
    jobResult: PropTypes.object,
    match: PropTypes.object,
  }

  render() {
    const { jobResult, match } = this.props;
    const { q } = match.params;
    const { count, ...results } = jobResult;

    return (
      <div>
        <Helmet title="Search" />
        <h1>{q} returned {count} results</h1>
        {Object.keys(results).map(key => (
          <div key={key}>
            <h1>{key}</h1>
            {results[key].map(r => (
              <div key={r.id}>
                <Link to={r.to}>
                  <h2>{r.title}</h2>
                </Link>
                <p>{r.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const searchWithJob = withJob({
  work: ({ prismic, match }) => prismic.search(match.params.q),
})(Search);

export default inject('prismic')(searchWithJob);
