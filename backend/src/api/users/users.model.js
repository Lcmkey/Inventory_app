const bookshelf = require("@services/db");

const tableNames = require("@constants/tableNames");

const userFields = ["id", "email", "name", "created_at", "updated_at"];

const User = bookshelf.model(tableNames.user, {
  tableName: tableNames.user,
}, {
  byId: function (id) {
    return this.forge().query({ where: { id } }).fetch(
      { columns: userFields },
    );
  },
});

module.exports = User;
