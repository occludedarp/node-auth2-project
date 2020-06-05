const router = require('express').Router();
const securedAccess = require('../auth/secured-access.js')
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js')

router.use('/auth', authRouter);
router.use('/users', securedAccess, usersRouter);

router.get('/', (req, res) => {
  res.status(200).json({"api":"up and running"})
})

module.exports = router;