// const User = require("../models/user");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateUserToken = async (user) => {
  const { id, email } = user;

  const token = await jwt.sign(
    {
      email,
      id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24hr",
    }
  );

  return token;
};

module.exports = { generateUserToken };
