const { response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

  //Error handler
  const errors = validationResult( req );
  if( !errors.isEmpty() ){
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    })
  }

  res.status(201).json({
    ok: true,
    msg: "new",
    name,
    email,
    password
  });
};

const login = (req, res = response) => {
  const { email, password } = req.body;
  
  //Error handler
  const errors = validationResult( req );
  if( !errors.isEmpty() ){
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    })
  }

  res.json({
    ok: true,
    msg: "login",
    email,
    password
  });
};

const renewToken = (req, res = response) => {
  const { name, email, password } = req.body;
  res.json({
    ok: true,
    msg: "renew",
    name,
    email,
    password
  });
};

module.exports = { createUser, login, renewToken };
