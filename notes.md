## objectives
-implement secure password storage

-implement authentication using sessions and cookies.

cookies only store the session id
the database on the server stores the username and password data
the server reads the session id from the cookie


-use sessions to protect resources

-use a database to store sessions

file-structure: 
api/server.js
auth/ auth-router.js
      restricted-middleware.js

database/db-config
users/user-model.js - adduser method adds user and returns it

hashes are generated uniquely by adding a "salt" so that each hash is unique
even if password is same bewtween users

hash the password when the user signs up
hash passwords before they are stored in the database

--in router
in post method

destructure the username and signup properties from req.body
const {username, password} = req.body

declare:
const hash = bcrypt.hashSync(password, 8)

// number in production should be high to ensure many rounds of hashing
// number in development should be lower to run faster 

...SO TO DYNAMICALLY HASH -->

const ROUNDS = process.env.HASHING_ROUNDS || 8;
const hash = bcrypt.hashSync(userInfo.password, ROUNDS) //returns the result

userInfo.password = hash;

Users.add(userInfo)
  .then(user => {
    res.json(user);
  })
  .catch(err => res.send(err))

--in server
import the router
const authRouter = require('/path/path')

use the router
server.use('/api/auth', authRouter);

SECTION 2

/ARG1 is passwrod
//ARG 2 must be user.password

never send the password back to the client
(remove from .select in findById knex method)

*IN ROUTER.JS*
for login endpoint

Users.findBy({username}) 
  .then( user => {
    if (user) {
      if (user && bcrypt.compareSync( ARG1, ARG2))
    } else {
      res.status(401).json({message: 'invalid creds})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: ''})
  })

SECTION 3 Middleware 1hr6min+

*IN SERVER.JS*
*import middleware*
const restricted = require('../path/path)

*configure how the session knows when the user comes back*
*the way that the server knows its you*
*is that the client has a cookie to show*
const sessionConfig = {
  secret: "never hardcode this",
  cookie: {
    maxAge: 
  }
}

*endpoint would be on users router*
                          v     v
server.use('/api/users', restricted, usersRouter);

server.use(session(sessionConfig))


*IN RESTRICTEDMIDDLEWARE.JS*
*import the middleware from its own separate file*
module.exports = (req, res, next) => {
<!-- check that we rememner the client -->
  console.log('session', req.session) //put this req.session in ROUTER 
<!-- check that the client logged in already -->
  if(req.session && req.session.user ){
    next();
  } else{
    res.status(401.json({message: "you shall not pass"}))
  }
}

*SESSIONS save information about clients (software used to connect to the server)*
*a way to remember information about a connection that was made to it*
<!-- we used npm i express-sessions -->

*IN ROUTER.JS*
Users.findBy({username}) 
  .then( user => {
    if (user) {
      if (user && bcrypt.compareSync( ARG1, ARG2)){
        *remember this client*
          req.session.user = {
            id: user.id,
            username: user.username
          }
      }
      res.status(200).json()
    } else {
      res.status(401).json({message: 'invalid creds})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: ''})
  })

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({message: 'all done here?'})
      }
    })
  }
})









