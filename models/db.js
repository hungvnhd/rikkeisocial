const mysql = require("mysql2");
// liên kết đến database: lấy và lưu dữ liệu trên db
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "rikkeisocial",
  password: "12345",
  multipleStatements: true,
});

module.exports = pool.promise();

//THINH

// const mysql = require("mysql2");
// // liên kết đến database: lấy và lưu dữ liệu trên db
// let pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "linkedin_schemas",
//   password: "12345678",
//   multipleStatements: true,
// });

// module.exports = pool.promise();

// const mysql = require("mysql2");
// // liên kết đến database: lấy và lưu dữ liệu trên db
// let pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "rikkeisocial",
//   password: "giadinhno1",
//   multipleStatements: true,
// });

module.exports = pool.promise();
