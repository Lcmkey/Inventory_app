const addDefaultColumns = (table) => {
  table.timestamps(false, true);
  table.datetime("deleted_at");
};

const createNameTable = (knex, table_name) => {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.string("name").notNullable().unique();
    addDefaultColumns(table);
  });
};

const url = (table, columnName) => {
  table.string(columnName, 2000);
};

const email = (table, columnName) => {
  return table.string(columnName, 254);
};

const references = (table, tableName, notNullable = true, columnName = "") => {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("cascade");

  if (notNullable) {
    definition.notNullable();
  }

  return definition;
};

module.exports = {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
};
