import { RichText } from 'prismic-reactjs';
import { asText } from 'prismic-richtext';
import _get from 'lodash/get';

function linkResolver(doc) {
  if (!doc) {
    return '/';
  }

  switch (doc.type) {
    case 'homepage':
      return '/';
    case 'about':
      return '/about';
    case 'articles':
      return '/articles';
    case 'article':
      return `/articles/${doc.uid}`;
    case 'custom_page':
      return `/${doc.uid}`;
    default:
      return '/';
  }
}

const SHOULD_WARN = true;

function warn(...m) {
  if (SHOULD_WARN) {
    console.warn(...m);
  }
}

function get(obj, path = undefined, defaultValue = '') {
  const value = path ? _get(obj, path) : obj;

  if (!value) {
    return defaultValue;
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return asText(value).trim();
  } catch (e) {
    warn(`unable to render field "${path}" as text`, e);
  }

  return defaultValue;
}

function getCollection(obj, path) {
  const value = path ? _get(obj, path) : obj;

  return Array.isArray(value) ? value : [];
}

function getObject(obj, path) {
  const value = path ? _get(obj, path) : obj;

  return !(typeof obj !== 'object' || Array.isArray(obj)) ? value : {};
}

function getRichtext(obj, path = undefined, defaultValue = '') {
  const value = path ? _get(obj, path) : obj;

  if (!Array.isArray(value)) {
    return defaultValue;
  }

  try {
    return RichText.render(value, linkResolver);
  } catch (e) {
    warn(`unable to render field "${path}" as richtext`, e);
  }

  return defaultValue;
}

export {
  linkResolver,
  get,
  getObject,
  getCollection,
  getRichtext,
};
