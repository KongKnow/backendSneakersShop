const { validatorResults } = require("express-validator")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

exports.singup = (req, res, next) => {
  const errors = validatorResults(req)
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed")
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }

  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        password: hashedPassword,
        email: email,
      })
      return user.save()
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.login = (req, res, next) => {}
