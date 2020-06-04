require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production'
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.use(function errorHandler(error, req, res, next) {  // eslint-disable-line no-unused-vars
  let response;
  if (NODE_ENV === 'production') {
    response = { message: 'Internal server error occurred.' };
  } else {
    console.log(error);
    response = { message: error.message };
  }

  res.status(500).json(response);
});

module.exports = app;
