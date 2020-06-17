const bcrypt = require("bcrypt");

const bookshelf = require("@services/db");
const tableNames = require("@constants/tableNames");

const userFields = ["id", "email", "name", "created_at", "updated_at"];

const User = bookshelf.model(tableNames.user, {
  tableName: tableNames.user,
  initialize() {
    this.on("saving", async (model) => {
      const password = model.get("password");
      
      if (password) {
        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        model.set("password", hashedPassword);
      }
    });
  },
}, {
  byId: function (id) {
    return this.forge().query({ where: { id } }).fetch(
      { columns: userFields },
    );
  },
});

module.exports = User;
