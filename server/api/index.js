import express from 'express';
import prismic from './prismic';

const api = express.Router(); // eslint-disable-line
api.use('/prismic', prismic);

export default api;
