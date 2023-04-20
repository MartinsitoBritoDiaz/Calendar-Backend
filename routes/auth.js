/* 
    User Endpoints / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("name", "Name is required").not().isEmpty(),
    check("email", "A valid email is required").isEmail(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6
    }),
  ],
  createUser
);

router.post(
  "/",
  [
    // middlewares
    check("email", "A valid email is required").isEmail(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6
    }),
  ],
  login
);

router.get("/renew", renewToken);

module.exports = router;
