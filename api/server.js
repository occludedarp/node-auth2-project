const express = require('express');

const apiRouter = require('./api-router.js');

const server = express();

server.use(express.json());

//middleware here

//or before apiRouter in the server.use function below

server.get('/', (req, res) => {
  res.json({"root":"message from the root"})
})
server.use('/api', apiRouter)

module.exports = server;