require("dotenv").config();

const database = process.env.POSTGRES_DB;
const database_test = process.env.POSTGRES_TEST_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

module.exports = {
  development: {
    debug: true,
    client: "pg",
    connection: {
      database,
      user,
      password,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  test: {
    // debug: true,
    client: "pg",
    connection: {
      // TODO: update postgres container to create test db on start
      database,
      user,
      password,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
