import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TweetBlock from './TweetBlock';

import s from './Tweet.scss';

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
              <TweetBlock authorName={authorName} url={url} title={title} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
