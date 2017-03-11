'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const morgan = require('morgan');
const { resolve } = require('path');
// const routes = require('./routes')

const app = express();

// Create Database
const db = new Sequelize('postgres://localhost:5432/speech', {
  logging: false
});

// Models
const Document = db.define('documents', {
  // subject: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  text: {
    type: Sequelize.TEXT
  }
})

// logging middleware
app.use(morgan('dev'));

// serve static files from public
app.use('/public', express.static('public'));

// request any page and receive index.html
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, 'index.html')))

// Express Routes
app.post('/api/save', function(req, res, next) {
  console.log('2. reached route')
  console.log('3. message received', req)
  Document.create(req.body)
  .then(savedDoc => {
    // console.log('4. saved... ', savedDoc)
    res.send(savedDoc)
  })

})

// server listening!
app.listen(3000, () => {
  console.log('Server is listening on port', 3000);
  db.sync({force: true})
  .then(function() {
    console.log('Database is up and running')
  })
})
