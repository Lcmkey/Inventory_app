const express = require("express");

const User = require("./users.model");
const { updateSchema } = require("./users.schema");

const router = express.Router();

const userFields = ["id", "email", "name", "created_at", "updated_at"];

router.get("/", async (req, res) => {
  const users = await User.query({ where: { "deleted_at": null } }).fetchAll(
    { columns: userFields },
  );

  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.query({ where: { id } }).fetch(
      { columns: userFields },
      { require: true },
    ).catch((err) => {
      // const error = new Error("Not Found");
      // res.status(404);

      throw err;
    });

    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const updateUser = { name, password };
    await updateSchema.validate(updateUser, {
      abortEarly: false,
    });

    const user = await User.query({ where: { id } }).fetch(
      { columns: userFields },
    ).catch((err) => {
      throw err;
    });

    const allowedUpdateFields = ["name", "password"];
    Object.keys(req.body).map((key) => {
      if (allowedUpdateFields.includes(key)) {
        user.set(key, req.body[key]);
      }
    });
    user.set("updated_at", new Date());

    await user.save();

    // const user = await User.where({ id }).save(
    //   { ...req.body },
    //   { method: "update", patch: true, require: false, debug: true },
    // );

    delete user.attributes.password;

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const updateUser = { name, password };
    await updateSchema.validate(updateUser, {
      abortEarly: false,
    });

    const user = await User.query({ where: { id } }).fetch(
      { columns: userFields },
    ).catch((err) => {
      throw err;
    });

    user.destroy();

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
