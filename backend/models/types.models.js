const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectTypes = () => {
  return db.query(`SELECT * FROM types;`).then((result) => result.rows);
};