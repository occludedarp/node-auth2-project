module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("session", req.session)
    next();
  } else {
    res.status(401).json({ "put some": "respec on my name" });
  }
};
