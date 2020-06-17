const jwt = require("jsonwebtoken");

const sign = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = 1 * 1 * 60;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (error, token) => {
      if (error) {
        return reject(error);
      }

      return resolve(token);
    });
  });
};

module.exports = { sign };
