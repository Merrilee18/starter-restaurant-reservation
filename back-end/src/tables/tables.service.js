
const knex = require("../db/connection");
const tableName = "tables";

function read(tableId){
    return knex(tableName).select("*").where({table_id: tableId}).first();
}

function update(updatedTable){
    return knex(tableName).where({table_id: updatedTable.table_id}).update(updatedTable, "*");
}

module.exports = read, update;