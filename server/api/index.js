import express from 'express';
import prismic from './prismic';
import forms from './forms';

const api = express.Router(); // eslint-disable-line
api.use('/prismic', prismic);
api.use('/forms', forms);

export default api;
