import express from 'express';
import prismic from 'prismic-javascript';
import config from '../../config';

const app = express();
const endpoint = config('prismicApiUrl');
const accessToken = config('prismicAccessToken');

function primiscApi(req) {
  return prismic.getApi(endpoint, {
    accessToken,
    req,
  });
}

function parseFetchLinks(str) {
  if (str && str !== '') {
    return str.split(',');
  }

  return [];
}

async function fetchByContentType(req, res) {
  const hasUid = req.params.uid && req.params.uid !== '';

  const api = await primiscApi(req);

  const predicates = [];
  const settings = {};

  const contentType = req.params.contentType || '';
  if (contentType && contentType !== '') {
    if (hasUid) {
      predicates.push(prismic.Predicates.at(`my.${contentType}.uid`, req.params.uid));
    } else {
      predicates.push(prismic.Predicates.at('document.type', contentType));
    }
  }

  settings.fetchLinks = parseFetchLinks(req.query.fetchLinks);

  const response = await api.query(predicates, settings);

  res.send(response);
}

async function fetchById(req, res) {
  const api = await primiscApi(req);

  const predicates = [];
  const settings = {};

  const id = req.params.id || '';
  if (id && id !== '') {

    predicates.push(prismic.Predicates.at('sys.id', id));
  }

  try {
    const response = await api.query(predicates, settings);
    res.send(response);
  } catch (e) {
    console.error('error querying prismic', e);
    res.status(500).send('500');
  }
}

async function fetchSearchResults(req, res) {
  try {
    const api = await primiscApi(req);
    const q = req.params.q || '';
    const response = await api.query([
      prismic.Predicates.any('document.type', ['about', 'article', 'articles', 'custom_page', 'homepage']),
      prismic.Predicates.fulltext('document', q),
    ]);

    res.send(response);
  } catch (e) {
    console.error('error querying prismic', e);
    res.status(500).send('500');
  }
}

app.get('/contentType/:contentType/:uid?', fetchByContentType);
app.get('/id/:id', fetchById);
app.get('/search/:q', fetchSearchResults);

export default app;
