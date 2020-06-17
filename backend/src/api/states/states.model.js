const bookshelf = require("@services/db");

const tableNames = require("@constants/tableNames");

const State = bookshelf.model(tableNames.state, {
  tableName: tableNames.state,
});

module.exports = State;
