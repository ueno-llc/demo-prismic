import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import Heading from 'components/heading';

import s from './ArticleList.scss';

class Articles extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { jobResult: articles } = this.props;

    return (
      <div className={s.articleList__container}>
        <Helmet title="Articles" />
        <Heading>Articles</Heading>

        {articles && (
          <ul>
            {articles.map((article) => {
              const uid = article.uid;

              if (!uid) {
                return null;
              }

              const url = `/articles/${uid}`;
              const title = article.data.title[0].text;
              const published = new Date(article.first_publication_date);

              return (
                <li key={uid}>
                  <Link to={url}>{title}</Link>,
                  published {published.toUTCString()}
                </li>
              );
            })}
          </ul>
        )}

        {!articles && (
          <p>No articles at the moment.</p>
        )}
      </div>
    );
  }
}

const articlesWithJob = withJob({
  work: ({ prismic }) => prismic.articles(),
})(Articles);

export default inject('prismic')(articlesWithJob);
