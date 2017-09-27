import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Tweet.scss';

export default class Tweet extends PureComponent {

  static propTypes = {
    authorName: PropTypes.string,
    url: PropTypes.string,
    tweet: PropTypes.string,
  }

  componentDidMount() {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }

  render() {
    const { tweet, authorName, url } = this.props;
    return (
      <div className={s.tweet}>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">{tweet}</p>
          &mdash; <a href={url}>{authorName}</a>
        </blockquote>
      </div>
    );
  }
}

/*
"html": "<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">
I just realized a dog is called a dog because the word looks like a dog!!! 🐩🐩</p>&mdash; Steph Jeong (@jeongsteph) <a href=\"https://twitter.com/jeongsteph/status/572284330271232000\">March 2, 2015</a></blockquote>\n<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>",
*/
