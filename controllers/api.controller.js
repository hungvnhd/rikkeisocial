const db = require("../models/db");

module.exports.getAll = (req, res) => {
  db.execute("SELECT * FROM tbl_users").then((data) => {
    res.status(200).json(data[0]);
  });
};
