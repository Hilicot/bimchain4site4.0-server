'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersAPI = require('./api/users-api');
const { createDBifNotExists } = require('./dao/db');

// init express
const app = new express();
const port = 3001;

// make sure database exists
createDBifNotExists();

// init middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'], 
  credentials: true
};
app.use(cors(corsOptions));

// register apis
usersAPI.register(app);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});