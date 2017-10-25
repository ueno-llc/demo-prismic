import express from 'express';
import bodyParser from 'body-parser';

const app = express.Router(); // eslint-disable-line

app.use(bodyParser.json({ type: 'application/json' }));

app.post('/contact-us', (req, res) => {
  console.log(req.body);
  res.send({ success: true });
});

export default app;
