const express = require("express");

const queries = require("./states.queries");

const router = express.Router();

router.get("/", async (req, res) => {
  const states = await queries.findAll();

  res.json(states);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const state = await queries.getById(parseInt(id, 10) || 0).catch((err) => {
      // const error = new Error("Not Found");
      // res.status(404);

      // throw error;
      throw err;
    });

    res.json(state);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
