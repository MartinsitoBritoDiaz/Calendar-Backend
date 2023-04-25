const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res = response, next) => {
  //x-token from header
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: "There is not token in the request",
    });
  }


  try {
        
    const { uid, name } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );

    req.uid = uid;
    req.name = name;

} catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
