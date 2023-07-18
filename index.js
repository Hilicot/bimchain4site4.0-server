'use strict';

const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');
const usersAPI = require('./api/users-api');
const projectsAPI = require('./api/projects-api');
const filesAPI = require('./api/files-api');
const variablesAPI = require('./api/variables-api');
const { createDBifNotExists } = require('./dao/db');

// init express
const app = new express();
const port = 3001;

// make sure database exists
createDBifNotExists();

// init multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.baseUrl)
    cb(null, './database/files')
  },
  filename: function (req, file, cb) {
    let name = req.body.project_id + '_' + req.body.name;
    if (req.body.version) 
      name += '_' + req.body.version;
    cb(null, name)
  }
})
const upload = multer({ storage: storage,limits: { fieldSize: 200*1024*1024 } })

// init middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3000'], 
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json()); // allow large payloads

// register apis
usersAPI.register(app);
projectsAPI.register(app);
filesAPI.register(app, upload);
variablesAPI.register(app,upload);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});