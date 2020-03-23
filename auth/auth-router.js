const router = require('express').Router();

const Users = require('../users/users-model.js');

const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const userInfo = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;

  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    res.status(500).json(error);
  });
})

router.post('/login', (req, res) => {
  const {username, password} = req.body

  Users.find()
})