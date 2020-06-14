const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const csvData = fs.readFileSync(
  path.join(__dirname, "..", "..", "db", "sources", "countries.csv"),
  "utf8"
);

const countryList = Papa.parse(csvData, {
  header: true,
});

const countries = countryList.data.map(({ name, "alpha-2": code }) => ({
  name,
  code,
}));

module.exports = countries;
