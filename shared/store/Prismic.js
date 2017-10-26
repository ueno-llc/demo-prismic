import { extendObservable } from 'mobx';
import timing from 'utils/timing';
import groupBy from 'lodash/groupBy';
import { getField, linkResolver } from 'utils/prismic';
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

  @timing.promise
  search(q) {
    const url = `${apiUrl}/prismic/search/${q}`;

    return this.fetch(url)
      .then(data => data.results)
      .then(results => results.map(m => ({ // map it to search results
        id: m.id,
        title: getField(m.data.title, 'title'),
        description: m.type === 'article'
          ? getField(m.data.short_description, 'text')
          : getField(m.data.description_seo, 'text'),
        to: linkResolver(m),
        type: m.type,
        isPage: m.tags.some(s => s === 'page') || m.type === 'custom_page',
      })))
      .then(results => ({ // split into categories
        ...groupBy(results, m => m.isPage ? 'pages' : m.type),
        count: results.length,
      }))
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return { count: 0 };
      });
  }
}
