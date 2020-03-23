const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js')

// router.use('/auth', authRouter);
// router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.status(200).json({"api":"up and running"})
})

module.exports = router;