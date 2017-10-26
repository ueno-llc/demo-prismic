import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Tweet.scss';

export default class Tweet extends PureComponent {

  static propTypes = {
    authorName: PropTypes.string,
    url: PropTypes.string,
    tweet: PropTypes.string,
  }

  render() {
    const { tweet, authorName, url } = this.props;
    return (
      <div className={s.tweet}>
        <div className={s.tweet__container}>
          <div className={s.tweet__row}>
            <div className={s.tweet__col}>
              <blockquote className={s(s.tweet__block, 'twitter-tweet')}>
                <p className={s.tweet__text} lang="en" dir="ltr">{tweet}</p>
                &mdash; <a className={s.tweet__url} href={url}>{authorName}</a>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

