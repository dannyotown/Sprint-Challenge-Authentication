const router = require("express").Router();
const userModel = require("./userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = require("./secret");

router.post("/register", async (req, res, next) => {
  // implement registration
  try {
    res.status(200).json(await userModel.registerUser(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body;
    const user = await userModel.findBy({ username }).first();
    const validPassword = await bcrypt.compare(password, user.password);
    if (user && validPassword) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username
        },
        secret.string,
        { expiresIn: "3d" }
      );
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: token
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
