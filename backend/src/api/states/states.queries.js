const db = require("@services/db");

const tableNames = require("@constants/tableNames");

const fields = ["id", "name", "code"];

const findAll = () => {
  // TODO: filter by country
  // TODO: join to country table
  return db(tableNames.state).select(fields);
};

const getById = async (id) => {
  return db(tableNames.state).select(fields).where({ id }).first();
};

module.exports = {
  findAll,
  getById,
};
