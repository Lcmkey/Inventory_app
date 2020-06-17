require("module-alias/register");

const {
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = require("@config/envConfig");

console.log(POSTGRES_DB);
console.log(POSTGRES_USER);
console.log(POSTGRES_PASSWORD);

const database = POSTGRES_DB;
const database_test = POSTGRES_TEST_DB;
const user = POSTGRES_USER;
const password = POSTGRES_PASSWORD;

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
