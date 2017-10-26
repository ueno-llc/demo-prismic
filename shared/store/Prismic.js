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
  getByType({ type, uid, links }) {
    if (!type) throw new Error('Missing type');

    const hasUid = uid !== undefined;
    let url = `${apiUrl}/prismic/contentType/${type}`;

    if (hasUid) {
      url += `/${uid}`;
    }

    if (links !== undefined) {
      url += `?fetchLinks=${links}`;
    }

    return this.fetch(url)
      .then(data => data.results)
      .then((results) => {
        if (results.length > 0) {
          return hasUid ? results[0] : results;
        }

        return hasUid ? {} : [];
      })
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return uid ? {} : [];
      });
  }

  @timing.promise
  getSingleByType({ type, links }) {
    return this.getByType({ type, links })
      .then((results) => {
        if (results.length > 0) {
          return results[0];
        }

        return {};
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
