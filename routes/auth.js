const express = require("express")
const { body } = require("express-validator")

const User = require("../models/user")
const authController = require("../controllers/auth")

const router = express.Router()

router.post(
  "/singup",
  [
    body("name").trim().isLength({ min: 5 }).not().isEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Entered email is invalid")
      .custom((value, { req }) => {
        User.findOne({ email: value })
          .then((userDoc) => {
            if (userDoc) {
              return Promise.reject("Email already exists!")
            }
          })
          .catch((err) => console.log(err))
      }),
    body("password").trim().isLength({ min: 8 }),
  ],
  authController.singup
)
router.post("/login", authController.login)

module.exports = router
