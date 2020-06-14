const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const csvData = fs.readFileSync(
  path.join(__dirname, "..", "..", "db", "sources", "us_states.csv"),
  "utf8"
);

const stateList = Papa.parse(csvData, {
  header: true,
});

// filter empty object
stateList.data = stateList.data.filter((item) => Boolean(item.state));

const states = stateList.data.map(({ state: name, code }) => ({
  name,
  code,
}));

module.exports = states;
