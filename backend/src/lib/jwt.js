const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("@config/envConfig");

const sign = (payload) => {
  const expiresIn = 1 * 60 * 60;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn }, (error, token) => {
      if (error) {
        return reject(error);
      }

      return resolve(token);
    });
  });
};

const verifyJwt = async (token) => {
  const result = await jwt.verify(
    token,
    JWT_SECRET,
    (err, decoded) => {
      if (err) {
        throw new Error("401: User is not authenticated");
      }

      return decoded;
    },
  );

  return result;
};

module.exports = { sign, verifyJwt };
