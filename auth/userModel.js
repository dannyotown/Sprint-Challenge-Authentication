const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("*");
}

async function registerUser(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);
  return findBy({ id }).first();
}

module.exports = {
  registerUser,
  findBy
};
