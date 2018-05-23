import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Tweet.scss';

function tweetFromTitle(name, title) {
  return title.replace(`${name} on Twitter: "`, '').slice(0, -1);
}

export default class Tweet extends PureComponent {

  static propTypes = {
    authorName: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
  }

  render() {
    const { authorName, title, url } = this.props;

    return (
      <div className={s.tweet}>
        <div className={s.tweet__container}>
          <div className={s.tweet__row}>
            <div className={s.tweet__col}>
              <blockquote className={s(s.tweet__block, 'twitter-tweet')}>
                <p className={s.tweet__text} lang="en" dir="ltr">{tweetFromTitle(authorName, title)}</p>
                &mdash; <a className={s.tweet__url} href={url}>{authorName}</a>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
