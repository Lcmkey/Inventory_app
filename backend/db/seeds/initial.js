require("module-alias/register");

const Knex = require("knex");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const { tableNames, countries, us_states } = require("@constants");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await Promise.all(
    Object.keys(tableNames).map((tableName) => {
      console.log("Clearing", tableName);
      return knex(tableName).del();
    })
  );

  const ram_str = crypto.randomBytes(15).toString("hex");
  const password = await bcrypt.hash(ram_str, 12);

  const user = {
    email: "sam.leung@test.com",
    name: "sam.leung",
    password,
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning("*");

  if (process.env.NODE_ENV !== "test") {
    console.log(
      "User created:",
      {
        password,
      },
      createdUser
    );
  }

  const insertedCountries = await knex(tableNames.country).insert(
    countries,
    "*"
  );

  const usa = insertedCountries.find((country) => country.code === "US");

  us_states.forEach((state) => {
    if (state) {
      state.country_id = usa.id;
    }
  });

  await knex(tableNames.state).insert(us_states);
};
