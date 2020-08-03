const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateMail = require("../services/validateMail");
const validateId = require("../services/validateId");
const jwt = require("jsonwebtoken");

// Create a new user
/**
 * @api {post} /api/v1/user/signup Create a new user
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} firstName User's First Name,
 * @apiParam {String} lastName User's Last Name,
 * @apiParam {String} email address User's email Address, must be unique
 * @apiParam {String} password User's password
 *
 * @apiParamExample Sample body:
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "johndoe@mymail.com",
 *   "password": "wdergghyjj"
 * }
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Created
 * {
 *    "status": "Success",
 *    "message": "New User Added Successfully!",
 *    "data": {
 *       "_id": "5ebab441ba94a73ab4d970a5",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "email": "johndoe@gmail.com",
 *       "password": "$2b$10$X5DpLWY0GFVj0im8i61JgeSxPx8.Uqv7CiS5SDOCngN8Qqyn1pc02"
 *     }
 * }
 *
 * @apiError Invalid email address
 *
 * @apiErrorExample Error Response:
 * HTTP/1.1 500 Not Internal Server Error
 * {
 *    "error": "Invalid email address"
 * }
 *
 * @apiErrorExample Error Response:
 * HTTP/1.1 409 Conflict
 * {
 *    "error": "A user with the email already exists"
 * }
 */
const userSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    validateMail(email);

    // Check if someone has registered with the email supplied
    const user = await User.find({ email });

    if (user.length >= 1) {
      return res.status(409).json({
        error: "A user with the email already exists",
      });
    }

    // Hash password and save user to database
    bcrypt.hash(password, 10, (err, hash) => {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hash,
      });

      newUser.save();

      res.status(201).send({
        status: "Success",
        message: "New User Added Successfully!",
        data: newUser,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Get all users
/**
 * @api {get} /api/v1/user Get all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} Array of users Object
 *
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "_id": "5e1263983c634b00171f4a8f",
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "email": "johndoe@gmail.com"
 *   },
 *   {
 *       "_id": "5e1263983c634b00171f4a8f",
 *       "firstName": "Jane",
 *       "lastName": "Doe",
 *       "email": "janedoe@gmail.com"
 *   }
 * ]
 */
const allUsers = async (req, res, next) => {
  const user = await User.find()
    .select("firstName lastName email")
    .sort("lastName");
  res.status(200).json(user);
};

// Delete a single user
/**
 * @api {delete} /api/v1/user/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String} id User id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 OK
 * {
 *    "status": "Success",
 *    "message": "User deleted Successfully!",
 * }
 */
const deleteUser = async (req, res, next) => {
  try {
    validateId(req.params.id);

    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("User with the ID does not exist");
    res.send({
      status: "Success",
      message: "User Deleted Successfully!",
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

// Login an existing user
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user with email exists
    const user = await User.find({ email });

    if (user.length < 1) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }

    bcrypt.compare(password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Authentication failed",
        });
      }

      if (result) {
        const token = jwt.sign(
          { email: user[0].email, userId: user[0]._id },
          process.env.JWT_KEY,
          { expiresIn: "24hr" }
        );
        return res.status(200).json({
          message: "Authentication Successfull!",
          token,
        });
      }

      res.status(401).json({
        error: "Authentication failed",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { userSignup, allUsers, deleteUser, userLogin };
