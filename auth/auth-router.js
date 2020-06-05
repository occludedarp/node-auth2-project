const router = require('express').Router();
const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const { username, password } = req.body

  Users.findBy({ username })
  .first()
  .then((user) => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);

      res.status(200).json({
        "hello": user.username,
         token,
      })
    } else {
      res.status(401).json({"message": "invalid credentials"})
    }
  })
  .catch(error => res.status(500).json({"error message":"there was an error finding that user"}))
})

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy();
    res.status(200).json({"message":"successfully logged out"});
  } else {
    res.status(200).json({"message":"you are already logged out"})
  }
})

function generateToken(user){
  const payload = {
    username: user.username,
  }

  const secret = process.env.JWT_SECRET || 'just a string, a secret string'

  const options = {
    expiresIn: '1h',
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;