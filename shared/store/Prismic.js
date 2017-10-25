import { extendObservable } from 'mobx';
import timing from 'utils/timing';
import config from '../../config';

const localApiUrl = config('localApiUrl');
const clientLocalApiUrl = config('clientLocalApiUrl');

// different api url dependant on if we're fetching on server or client
// makes "yarn run dev-remote" work with ngrok
const apiUrl = typeof window === 'undefined' ? localApiUrl : clientLocalApiUrl;

export default class Prismic {

  constructor({ prismic = {} }, network) {
    this.fetch = network.fetch;
    extendObservable(this, prismic);
  }

  @timing.promise
  homepage() {
    const url = `${apiUrl}/prismic/contentType/homepage?fetchLinks=article.title,article.short_description,article.publication_date`;

    return this.fetch(url)
      .then(data => data.results)
      .then((results) => {
        if (results.length === 1) {
          return results[0];
        }
        return [];
      })
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return [];
      });
  }

  @timing.promise
  about() {
    const url = `${apiUrl}/prismic/contentType/about?fetchLinks=author.name,author.bio,author.image`;

    return this.fetch(url)
      .then(data => data.results)
      .then((results) => {
        if (results.length === 1) {
          return results[0];
        }
        return [];
      })
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return [];
      });
  }

  @timing.promise
  articlesPage() {
    const url = `${apiUrl}/prismic/contentType/articles?fetchLinks=author.name,author.bio,author.image`;

    return this.fetch(url)
      .then(data => data.results)
      .then((results) => {
        if (results.length === 1) {
          return results[0];
        }
        return [];
      })
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return [];
      });
  }

  @timing.promise
  articles() {
    const url = `${apiUrl}/prismic/contentType/article?fetchLinks=author.name`;

    return this.fetch(url)
      .then(data => data.results)
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return [];
      });
  }

  @timing.promise
  article(uid) {
    const url = `${apiUrl}/prismic/contentType/article/${uid}?fetchLinks=author.name,author.bio,author.image`;

    return this.fetch(url)
      .then(data => data.results)
      .then((results) => {
        if (results.length === 1) {
          return results[0];
        }
        return [];
      })
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return [];
      });
  }
}
