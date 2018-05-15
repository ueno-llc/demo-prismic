import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';

import { AuthorBlock } from 'components/author';
import { getString, getObject } from 'utils/prismic';

import s from './Articles.scss';

export default class Articles extends Component {

  static propTypes = {
    title: PropTypes.string,
    subheading: PropTypes.string,
    articles: PropTypes.array,
    show: PropTypes.number,
  }

  render() {
    const { title, subheading, articles, show } = this.props;

    if (articles.length === 0) {
      return null;
    }

    return (
      <div className={s.articles}>
        <div className={s.articles__container}>
          <div className={s.articles__row}>
            <div className={s.articles__header}>
              <h2 className={s.articles__headerTitle}>{title}</h2>
              <h2 className={s.articles__headerTitle}>{subheading}</h2>
            </div>

            {articles && (
              <ul className={s.articles__list}>
                {articles.slice(0, show).map(({ article = {} }) => {
                  const { uid, data } = article;

                  const itemTitle = getString(data, 'title').trim();

                  if (!uid || !itemTitle) {
                    return null;
                  }

                  const url = `/articles/${uid}`;
                  const description = getString(data, 'short_description');
                  const date = data.publication_date;
                  const { author } = data;
                  const hasAuthor = !isEmpty(author) && !isEmpty(author.data);

                  return (
                    <li
                      className={s.articles__item}
                      key={`article-${uid}`}
                    >
                      <Link className={s.articles__link} to={url}>
                        {date && (
                          <p className={s.articles__date}>{format(date, 'DD MMMM')}</p>
                        )}

                        <div className={s.articles__inner}>
                          <div className={s.articles__lead}>
                            <h2 className={s.articles__title}>{itemTitle}</h2>
                            {hasAuthor && (
                              <div className={s.articles__author}>
                                <AuthorBlock
                                  name={getString(author, 'data.name')}
                                  bio={getString(author, 'data.bio')}
                                  image={(getObject(author, 'data.image')).thumb}
                                />
                              </div>
                            )}
                          </div>
                          <p className={s.articles__description}>{description}</p>
                          <span className={s.articles__button}>Read more</span>
                        </div>
                      </Link>
                    </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}
