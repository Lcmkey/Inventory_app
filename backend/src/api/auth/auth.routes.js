const express = require("express");
// TODO: extract to general hashing util
const bcrypt = require("bcrypt");

const jwt = require("@lib/jwt");
const User = require("@api/users/users.model");
const { signupSchema, signinSchema } = require("./auth.schema");

const router = express.Router();

const errorMessages = {
  invalidLogin: "Invalid login.",
  emailInUse: "Email in use.",
};

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const createUser = {
      name,
      email,
      password,
    };

    await signupSchema.validate(createUser, {
      abortEarly: false,
    });

    const existingUser = await User.query({ where: { email } }).fetch().catch(
      (err) => {
        if (err.message !== "EmptyResponse") {
          return next(err);
        }
      },
    );

    if (existingUser) {
      const error = new Error(errorMessages.emailInUse);
      res.status(403);

      throw error;
    }

    // TODO: get rounds from config
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const insertedUser = await User.forge({
      name,
      email,
      password: hashedPassword,
    }).save();

    // Delete the user password
    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      name,
      email,
    };

    const token = await jwt.sign(payload);

    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await signinSchema.validate(
      {
        email,
        password,
      },
      {
        abortEarly: false,
      },
    );

    const user = await User.query({ where: { email } }).fetch().catch(
      (err) => {
        if (err.message !== "EmptyResponse") {
          return next(err);
        }
      },
    );

    if (!user) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);

      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.attributes.password);

    if (!validPassword) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);

      throw error;
    }

    const payload = {
      id: user.id,
      name: user.name,
      email,
    };

    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
