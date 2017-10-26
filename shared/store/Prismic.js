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
  getByType({ type, uid, links }) {
    if (!type) throw new Error('Missing type');

    let url = `${apiUrl}/prismic/contentType/${type}`;

    if (uid !== undefined) {
      url += `/${uid}`;
    }

    if (links !== undefined) {
      url += `?fetchLinks=${links}`;
    }

    return this.fetch(url)
      .then(data => data.results)
      .then((results) => {
        if (results.length === 1) {
          return results[0];
        }

        return results;
      })
      .catch((err) => {
        console.warn('Error fetching prismic data', err);
        return [];
      });
  }
}
