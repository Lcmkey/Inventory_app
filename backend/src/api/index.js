const express = require("express");

const authenticate = require("@middleware/authenticate");
const project = require("@constants/project");
const states = require("./states/states.routes");
const users = require("./users/users.routes");
const auth = require("./auth/auth.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use("/states", authenticate, states);
router.use("/users", authenticate, users);
router.use("/auth", auth);

module.exports = router;
