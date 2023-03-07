'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersAPI = require('./api/users-api');

// init express
const app = new express();
const port = 3001;

// load database
const { loadDB } = require('./dao/db');
loadDB();

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