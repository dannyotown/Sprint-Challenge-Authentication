const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("*");
}

async function registerUser(user) {
  user.password = await bcrypt.hash(user.password, 14);
  await db("users").insert(user);
  const newUser = await db("users")
    .select("*")
    .where("username", user.username)
    .first();
  return newUser;
}

module.exports = {
  registerUser,
  findBy
};
