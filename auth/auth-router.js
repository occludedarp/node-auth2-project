const router = require('express').Router();

const Users = require('../users/users-model.js');

const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const userInfo = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  Users.add(userInfo)
  .then(user => {
    res.json(user);
    console.log(user);
  })
  .catch(error => {
    res.send({ error: error.message });
  });
})

router.post('/login', (req, res) => {
  const {username, password} = req.body

  Users.findBy({ username })
  .then(([user]) => {
    if(user && bcrypt.compareSync(password, user.password)){
      req.session.user = {
        id: user.id,
        username: user.username
      };
      
      res.status(200).json({"hello": user.username})
    } else {
      res.status(401).json({"message": "invalid credentials"})
    }
  })
  .catch(error => res.status(500).json({"error message":"there was an error finding that user"}))
})

module.exports = router;