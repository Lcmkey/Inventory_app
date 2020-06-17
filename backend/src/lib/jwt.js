const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("@config/envConfig");

const sign = (payload) => {
  const expiresIn = 1 * 1 * 60;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn }, (error, token) => {
      if (error) {
        return reject(error);
      }

      return resolve(token);
    });
  });
};

module.exports = { sign };
