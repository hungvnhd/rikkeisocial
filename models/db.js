// const mysql = require("mysql2");
// // liên kết đến database: lấy và lưu dữ liệu trên db
// let pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "rikkeisocial",
//   password: "12345",
//   multipleStatements: true,
// });

// module.exports = pool.promise();

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

// module.exports = pool.promise();
//Viet Anh
// const mysql = require("mysql2");
// // liên kết đến database: lấy và lưu dữ liệu trên db
// let pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "rikkeisocial",
//   password: "12345678",
//   multipleStatements: true,
// });

// module.exports = pool.promise();

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, conn) => {
  if (err) console.log(err);
  console.log("Connected successfully");
});

module.exports = pool.promise();
