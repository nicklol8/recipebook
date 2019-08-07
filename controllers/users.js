const express = require('express');
const user = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

user.get('/new', (req, res) => {
  res.render('users/new.ejs', { currentUser: req.session.currentUser });
});

user.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect('/recipes');
  });
});

module.exports = user;
