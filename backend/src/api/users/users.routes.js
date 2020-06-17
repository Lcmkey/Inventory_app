const express = require("express");

const User = require("./users.model");
const { LocalChunkSize } = require("papaparse");

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

module.exports = router;
