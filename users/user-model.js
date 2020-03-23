const db = require('../data/db-config.js');

module.exports = {
  find,
  add
}

function find() {
  return db('users').select('id', 'username');
}