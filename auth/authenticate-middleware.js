/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, secret.string);
    next();
  } catch (err) {
    return res.status(401).json({ you: "shall not pass!" });
  }
};
