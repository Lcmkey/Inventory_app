const db = require("@services/db");

module.exports = async () => {
  await db.destroy();
};
