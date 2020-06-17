const bookshelf = require("@services/db");

const tableNames = require("@constants/tableNames");

const User = bookshelf.model(tableNames.user, {
  tableName: tableNames.user,
});

module.exports = User;
