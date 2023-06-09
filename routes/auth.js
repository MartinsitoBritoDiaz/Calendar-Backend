/* 
    User Endpoints / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwtValidator');

const router = Router();

router.post(
  '/new',
  [
    // middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6
    }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    // middlewares
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6
    }),
    fieldsValidator,
  ],
  login
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
