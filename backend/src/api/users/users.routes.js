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

router.post("/", async (req, res) => {
  const user = req.body;
  console.log(user.password.toString("hex"));

  const saltRounds = 12;
  const salt = bcrypt.genSaltSync(saltRounds);
  user.password = bcrypt.hashSync(user.password, salt);

  const userList = await User.query().select(userFields).where(
    "email",
    user.email,
  );

  if (userList.length) {
    return res.status(500).json("Email Duplicated");
  }

  try {
    const response = await User.query().insert(user);

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
