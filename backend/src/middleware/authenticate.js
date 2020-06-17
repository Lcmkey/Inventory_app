const jwt = require("@lib/jwt");

const authenticate = async (req, res, next) => {
  const token = req.headers["token"];
  await jwt.verifyJwt(token).catch((err) => next(err));

  next();
};

module.exports = authenticate;
