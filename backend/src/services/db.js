const knex = require("knex");
const bookshelf = require("bookshelf");

const knexConfig = require("@root/knexfile");

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

module.exports = bookshelf(connection);
