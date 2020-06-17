const express = require("express");
const bcrypt = require("bcrypt");

const User = require("./users.model");

const router = express.Router();

const userFields = ["id", "email", "name", "created_at", "updated_at"];

router.get("/", async (req, res) => {
  const users = await User.query()
    .select(userFields)
    .where("deleted_at", null);

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.query()
    .select(userFields)
    .where("id", id).first();

  if (!user) {
    return res.status(404).json("not found");
  }

  res.json(user);
});

module.exports = router;
