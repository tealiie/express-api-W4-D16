var express = require('express')
var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  get: get,
  getUser: getUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  newUser: newUser,
  filter: filter
}

function get (req, res) {
  knex('users')
    .select()
    .then(function (users) {
      res.json({users: users})
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function getUser (req,res) {
  knex('users')
    .select ()
    .where ('id', '=', req.params.id)
    .then (function (users) {
      res.json (users[0])
  })
    .catch(function (err) {
      res.status(404).send('DATABASE ERROR: ' + err.messge)
    })
}

function deleteUser (req, res) {
  knex('users')
    .select ()
    .where ('id', '=', req.params.id)
    .del ()
    .then (function (delCount) {
      if (delCount == 1) {
        res.send (204)
      } else {
        res.send (404)
      }
    })
    .catch(function (err) {
      res.status(404).send('DATABASE ERROR: ' + err.message)
    })
}

function updateUser (req, res) {
  knex ('users')
    .where ('id', '=', req.params.id)
    .update ({
      name: req.body.name,
      email: req.body.email
    })
    .then (function (updateCount) {
      res.send (204)
    })
    .catch(function (err) {
      res.status(204).send('DATABASE ERROR: ' + err.message)
    })
}

function newUser (req, res) {
  knex('users')
    .select ()
    .insert ({
      name: req.body.name,
      email: req.body.email
    })
    .then (function (updateCount) {
      res.send (201)
    })
    .catch(function (err) {
      res.status(204).send('DATABSE ERROR: ' + err.message)
    })
}

function filter (req, res) {
  knex('users')
  .select ()
  .where ('name', '=', req.query.search)
  .then(function (users) {
    res.json(users)
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}
