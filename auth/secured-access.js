const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET || 'just a string, a secret string'

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'Invalid Credentials'});
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ "message": "not in my house" });
  } 
  // if (req.session && req.session.user) {
  //   console.log("session", req.session)
  //   next();
  // } else {
  //   res.status(401).json({ "message": "not in my house" });
  // }
};
