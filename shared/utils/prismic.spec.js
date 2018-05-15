import React from 'react';
import { getString, getArray, getObject, getRichtext } from './prismic';

/* getString */

test('getString for empty object', () => {
  expect(getString({})).toEqual('');
});

test('getString for object with string key', () => {
  expect(getString({ title: 'Test' }, 'title')).toEqual('Test');
});

test('getString for object with string key nested', () => {
  expect(getString({ item: { title: 'Test' } }, 'item.title')).toEqual('Test');
});

test('getString for object with non-existent path', () => {
  expect(getString({ }, 'item.title')).toEqual('');
});

test('getString default value', () => {
  expect(getString({ }, 'item.title', 'default')).toEqual('default');
});

test('getString with string value', () => {
  expect(getString('Title')).toEqual('Title');
});

test('getString with null value', () => {
  expect(getString(null)).toEqual('');
});

test('getString for object with null value', () => {
  expect(getString({ title: null })).toEqual('');
});

test('getString for object with empty array value', () => {
  expect(getString({ title: [] }, 'title')).toEqual('');
});

test('getString for object with array value that does not fit prismic datatype', () => {
  expect(getString({ title: ['foo', 'bar'] }, 'title')).toEqual('');
});

test('getString for object with array value that fits prismic datatype', () => {
  expect(getString({ title: [{ text: 'foo' }, { text: 'bar' }] }, 'title')).toEqual('foo bar');
});

/* getArray */

test('getArray for null', () => {
  expect(getArray(null)).toEqual([]);
});

test('getArray for path of null', () => {
  expect(getArray(null, 'item')).toEqual([]);
});

test('getArray for array', () => {
  expect(getArray([1, 2])).toEqual([1, 2]);
});

test('getArray for array but with path', () => {
  expect(getArray([1, 2], 'item')).toEqual([1, 2]);
});

test('getArray for object with path', () => {
  expect(getArray({ items: [1, 2] }, 'items')).toEqual([1, 2]);
});

test('getArray for object and no path', () => {
  expect(getArray({ items: [1, 2] })).toEqual([]);
});

/* getObject */

test('getObject for null', () => {
  expect(getObject(null)).toEqual({});
});

test('getObject for path of null', () => {
  expect(getObject(null, 'item')).toEqual({});
});

test('getObject for object', () => {
  expect(getObject({ foo: 1 })).toEqual({ foo: 1 });
});

test('getObject for object and path', () => {
  expect(getObject({ item: { title: 'test' } }, 'item')).toEqual({ title: 'test' });
});

test('getObject for object and path with null', () => {
  expect(getObject({ item: null }, 'item')).toEqual({});
});

/* getRichtext */

test('getRichtext for null', () => {
  expect(getRichtext(null)).toEqual('');
});

test('getRichtext for path of null', () => {
  expect(getRichtext(null, 'item')).toEqual('');
});

test('getRichtext for property that is not array', () => {
  expect(getRichtext({ item: 1 }, 'item')).toEqual('');
});

test('getRichtext for property that is an array', () => {
  expect(getRichtext({ items: [1, 2, 3] }, 'item')).toEqual('');
});

test('getRichtext for property that is a richtext array', () => {
  const rich = {
    type: 'paragraph',
    text: 'foo bar',
    spans: [
      { start: 0, end: 3, type: 'strong' },
      { start: 4, end: 7, type: 'em' },
    ],
  };

  expect(getRichtext({ items: [rich] }, 'items')).toMatchSnapshot();
});

