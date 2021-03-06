'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { resolve } = require('path');
const app = express();


// Create Database
const url = process.env.DATABASE_URL || 'postgres://localhost:5432/speech_writer'
const db = new Sequelize(url, {
  logging: false
});

// Models
const Document = db.define('documents', {
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT
  }
})

// logging middleware
app.use(morgan('dev'));

// body-parser middlerware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public
app.use('/public', express.static('public'));

// Express Routes
app.get('/api/docs', function(req, res, next) {
  Document.findAll()
  .then(doc => res.send(doc))
  .catch(next)
})

app.get('/api/docs/:id', function(req, res, next) {
  Document.findById(req.params.id)
  .then(doc => {
    res.send(doc)})
  .catch(next)
})

app.delete('/api/docs/:id', function(req, res, next) {
  Document.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    console.log(`Id: ${req.params.id} destroyed`)
    Document.findAll()
    .then(docs => {
      res.send(docs)
    })
  })
  .catch(next)
})

app.post('/api/docs', function(req, res, next) {
  Document.create(req.body)
  .then(savedDoc => res.send(savedDoc))
  .catch(err => console.error(err))
})

// request any page and receive index.html
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, 'public/index.html')))

// server listening!
app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on http://localhost:3000');
  db.sync()
  .then(function() {
    console.log('Database synced')
  })
  .catch(err => console.error(err))
})
