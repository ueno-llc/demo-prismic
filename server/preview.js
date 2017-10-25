import express from 'express';
import prismic from 'prismic-javascript';
import Cookies from 'cookies';
import { linkResolver } from 'utils/prismic';
import config from '../config';

const app = express();
const endpoint = config('prismicApiUrl');
const accessToken = config('prismicAccessToken');

function primiscApi(req) {
  return prismic.getApi(endpoint, {
    accessToken,
    req,
  });
}
app.get('/', async (req, res) => {
  const { token } = req.query;

  const api = await primiscApi(req);

  api.previewSession(token, linkResolver, '/')
    .then((url) => {
      const cookies = new Cookies(req, res);
      cookies.set(prismic.previewCookie, token, { maxAge: 30 * 60 * 1000, path: '/', httpOnly: false });
      res.redirect(302, url);
    });
});

export default app;
