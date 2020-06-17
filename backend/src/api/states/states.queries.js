const State = require("./states.model");
const tableNames = require("@constants/tableNames");

const fields = ["id", "name", "code"];

const findAll = async () => {
  // TODO: filter by country
  // TODO: join to country table
  const result = await State.fetchAll({ columns: fields });

  return result;
};

const getById = async (id) => {
  const result = await State.query({ where: { id } }).fetch(
    { columns: fields },
  );

  return result;
};

module.exports = {
  findAll,
  getById,
};
