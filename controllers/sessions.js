const express = require('express');
const session = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

session.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});

session.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect('/recipes');
      console.log(foundUser);
    } else {
      res.send('wrong password');
    }
  });
});

session.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.redirect('/recipes');
  } else {
    res.redirect('/recipes');
  }
});

module.exports = session;
