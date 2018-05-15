import { RichText } from 'prismic-reactjs';
import _get from 'lodash/get';
import _isPlainObject from 'lodash/isPlainObject';

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

const SHOULD_WARN = process.env.NODE_ENV === 'development';

function warn(...m) {
  if (SHOULD_WARN) {
    console.warn(...m);
  }
}

/**
 * Get string value from object, optionally by path. If `obj` is a string
 * it is returned. If no path is given `obj` is used as the value.
 *
 * @param {Object} The object to query
 * @param {string} [path=undefined] The path of the property to get
 * @param {string} [defaultValue=''] Default value returned if no value is found
 * @returns {*} Resolved value or the empty array if not possible
 */
function getString(obj, path = undefined, defaultValue = '') {
  const value = path ? _get(obj, path) : obj;

  if (!value) {
    return defaultValue;
  }

  if (typeof value === 'string') {
    return value;
  }

  // if we run `asText` on an array that does not have a text key we'll get
  // undefined for that value
  if (Array.isArray(value) && !value.every(i => _isPlainObject(i) && 'text' in i)) {
    return defaultValue;
  }

  try {
    return RichText.asText(value).trim();
  } catch (e) {

    warn(`unable to render field "${path}" as text`, e);
  }

  return defaultValue;
}

/**
 * Get array value from object by path or empty array. If no path is given
 * `obj` is used as the value. If `obj` is an array it is returned.
 *
 * @param {Object} The object to query
 * @param {string} [path=undefined] The path of the property to get
 * @returns {*} Resolved value or the empty array if not possible
 */
function getArray(obj, path = undefined) {
  if (Array.isArray(obj)) {
    return obj;
  }

  const value = path ? _get(obj, path) : obj;

  return Array.isArray(value) ? value : [];
}

/**
 * Get object value from object by path or empty object. If no path is given
 * `obj` is used as the value.
 *
 * @param {Object} The object to query
 * @param {string} [path=undefined] The path of the property to get
 * @returns {*} Resolved value or the empty object if not possible
 */
function getObject(obj, path = undefined) {
  const value = path ? _get(obj, path) : obj;

  return _isPlainObject(value) ? value : {};
}

/**
 * Get richtext value from object by path or defaultValue. If no path is given
 * `obj` is used as the value.
 *
 * @param {Object} The object to query
 * @param {string} [path=undefined] The path of the property to get
 * @param {string} [defaultValue=''] Default value returned if no value is found
 * @returns {*} Resolved value or `defaultValue` if not possible
 */
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
  getString,
  getObject,
  getArray,
  getRichtext,
};
