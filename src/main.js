require("dotenv").config();
import pasteRepository from './pasteRepository';

const api = require('express')();
const bodyParser = require('body-parser');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.post('/storage', async (req, res) => {
  try {
    const newPaste = await pasteRepository.store(req.body.content);
    res.status(200);
    res.send(newPaste);
  } catch (err) {
    res.status(401);
    return res.send('401 Forbidden');
  }
});

api.get('/:id', async (req, res) => {
  let data;
  try {
    data = await pasteRepository.get(req.params.id);
  } catch (err) {
    res.status(403);
    return res.send('403 Forbidden');
  }
  return res.send(data);
});

api.listen(process.env.PORT || 3000);
