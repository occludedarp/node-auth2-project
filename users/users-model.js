const db = require('../data/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById
}

function find() {
  return db("user_creds").select('id', 'username');
}

function findBy(filter) {
  return db("user_creds").where(filter);
}

async function add(user) {
  const [id] = await db("user_creds").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("user_creds").where({ id }).select("id", "username", "password").first();
}