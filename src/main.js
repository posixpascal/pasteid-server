import pasteRepository from './pasteRepository';

require('dotenv').config();

const api = require('express')();
const bodyParser = require('body-parser');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

/**
 * By default allow all origins @TODO: replace * with paste.id and www.paste.id
 * It's not possible to use multiple values in the AllowOrigin header
 * So I wait until someone comes up with a better solution.
 */
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * Storage endpoint may return a 200 on successful storage
 * Or a 401 if any error occurs. E.g. if the paste is too large or something.
 */
api.post('/storage', async (req, res) => {
  let response;
  try {
    response = await pasteRepository.store(req.body.content);
    res.status(200);
  } catch (err) {
    res.status(403);
    response = '403 Forbidden';
  }
  return res.send(response);
});

/**
 * Retrieve any paste from the db by specifying the ID.
 * IDs are autoincremented automatically.
 * Since the main use case is to use paste.id encrypted I don't worry
 * about this a lot. We could consider adding a `private` property to
 * the frontend which will generate a more random ID.
 */
api.get('/:id', async (req, res) => {
  let response;

  try {
    response = await pasteRepository.get(req.params.id);
  } catch (err) {
    res.status(404);
    response = '404 Not Found';
  }

  return res.send(response);
});


api.listen(process.env.PORT || 3000);
