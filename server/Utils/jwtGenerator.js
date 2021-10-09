const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  return jwt.sign({ id: payload }, process.env.jwtSecret, {
    expiresIn: 60 * 30,
  });
}

module.exports = jwtGenerator;
