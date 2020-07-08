const userSignup = async (req, res, next) => {
  res.status(200).json({ users: "User Signup" });
};

const userLogin = async (req, res, next) => {
  res.status(200).json({ users: "User Login" });
};

module.exports = { userSignup, userLogin };
