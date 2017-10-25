import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { getField } from 'utils/prismic';

import Heading from 'components/heading';

import s from './ArticleList.scss';

class Articles extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { jobResult: articles } = this.props;

    return (
      <div className={s.articleList}>
        <div className={s.articleList__container}>
          <Helmet title="Articles" />

          {articles && (
            <ul className={s.articleList__list}>
              {articles.map((article, i) => {
                const { uid, data } = article;

                if (!uid) {
                  return null;
                }

                const url = `/articles/${uid}`;
                const title = article.data.title[0].text;
                const description = getField(data.short_description, 'title');
                const published = new Date(article.first_publication_date);

                return (
                  <li className={s.articleList__item} key={uid}>
                    <Link to={url} className={s.articleList__block}>
                      <div className={s.articelList__top}>
                        <div className={s.articleList__image}>
                          <img src={require(`assets/images/${i+1}.jpg`)} alt=""/>
                        </div>
                      </div>
                      <div className={s.articleList__middle}>
                        <div className={s.articleList__title}>{title}</div>
                        <div className={s.articleList__description}>{description}</div>
                      </div>
                      <div className={s.articleList__bottom}>
                        <div className={s.articleList__link}>Read more</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {!articles && (
            <p>No articles at the moment.</p>
          )}
        </div>
      </div>
    );
  }
}

const articlesWithJob = withJob({
  work: ({ prismic }) => prismic.articles(),
})(Articles);

export default inject('prismic')(articlesWithJob);
