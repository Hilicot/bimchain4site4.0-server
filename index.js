'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersAPI = require('./api/users-api');
const projectsAPI = require('./api/projects-api');
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
app.use(express.json({ limit: "200mb" })); // allow large payloads
app.use(express.urlencoded({limit: '200mb', extended: true}));

// register apis
usersAPI.register(app);
projectsAPI.register(app);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});