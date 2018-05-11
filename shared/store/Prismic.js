import { extendObservable } from 'mobx';
import Prismic from 'prismic-javascript';
import groupBy from 'lodash/groupBy';
import { get, linkResolver } from 'utils/prismic';
import apiUrl from 'utils/localApiUrl';
import config from 'utils/config';

const prismicApiUrl = config('prismicApiUrl');
const accessToken = config('prismicAccessToken');

/**
 * This stores takes care of getting all data from Prismic to routes/components.
 * There are two ways to get the data:
 *
 * 1. Use `prismic-javascript`, the official API
 * 2. Fetch via API – Only do this if there is a need to cache the data on our
 *    end. Otherwise it adds needless complexity.
 */
export default class PrismicStore {

  constructor({ prismic = {} }, network) {
    this.fetch = network.fetch;
    extendObservable(this, prismic);
  }

  /* Via official API */

  async getHome() {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    let home = {};

    try {
      home = await api.getSingle('homepage', {
        fetchLinks: ['article.title', 'article.short_description', 'article.publication_date'],
      });
    } catch (e) {
      console.warn('Unable to get home', e);
      return {};
    }

    try {
      const articleIds = home.data.featured_articles
        .map(a => a.article.id)
        .filter(Boolean); // filter out empty links

      const { results: articles = [] } = await api.getByIDs(articleIds, {
        fetchLinks: ['author.name', 'author.bio', 'author.image'],
      });

      // results from getByIDs are not ordered based on arguments
      const replaced = home.data.featured_articles.map(({ article: featuredArticle = {} }) => {

        const replacement = articles.find(({ id }) => id === featuredArticle.id);

        return { article: replacement || featuredArticle };
      });

      home.data.featured_articles = replaced;
    } catch (e) {
      console.warn('Unable to get all article metadata', e);
    }

    return home;
  }

  async getArticles() {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    let page = {};
    let articles = [];

    try {
      [page, articles] = await Promise.all([
        api.getSingle('about', {
          fetchLinks: ['author.name', 'author.bio', 'author.image'],
        }),
        api.query(
          Prismic.Predicates.at('document.type', 'article'),
          { fetchLinks: ['author.name'] },
        ),
      ]);
    } catch (e) {
      console.warn('Unable to get articles', e);
    }

    return { page, articles: articles.results };
  }

  async getArticle(id) {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    try {
      const data = await api.query(
        Prismic.Predicates.at('my.article.uid', id),
        { fetchLinks: ['author.name', 'author.bio', 'author.image'] },
      );

      if (data.results.length === 1) {
        return data.results[0];
      }
    } catch (e) {
      console.warn(`Unable to get article "${id}"`, e);
    }

    return {};
  }

  async getAbout() {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    try {
      return await api.getSingle('about', {
        fetchLinks: ['author.name', 'author.bio', 'author.image'],
      });
    } catch (e) {
      console.warn('Unable to get about', e);
      return {};
    }
  }

  async getContact() {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    try {
      return await api.getSingle('contact');
    } catch (e) {
      console.warn('Unable to get about', e);
      return {};
    }
  }

  async getCustomPages() {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    try {
      return await api.getSingle('homepage', {
        fetchLinks: ['custom_page.title'],
      });
    } catch (e) {
      console.warn('Unable to get about', e);
      return {};
    }
  }

  async getCustomPage(id) {
    const api = await Prismic.getApi(prismicApiUrl, { accessToken });

    try {
      const data = await api.query(Prismic.Predicates.at('my.custom_page.uid', id));

      if (data.results.length === 1) {
        return data.results[0];
      }
    } catch (e) {
      console.warn(`Unable to get custom page "${id}"`, e);
    }

    return {};
  }

  /* Via proxied API, see `server/api` */

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

  getSingleByType({ type, links }) {
    return this.getByType({ type, links })
      .then((results) => {
        if (results.length > 0) {
          return results[0];
        }

        return {};
      });
  }

  search(q) {
    const url = `${apiUrl}/prismic/search/${q}`;

    return this.fetch(url)
      .then(data => data.results)
      .then(results => results.map(m => ({ // map it to search results
        id: m.id,
        title: get(m, 'data.title'),
        description: m.type === 'article'
          ? get(m, 'data.short_description')
          : get(m, 'data.description_seo'),
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
