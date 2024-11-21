const { createPool } = require("mysql2");


const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PSW,
  database: process.env.MYSQL_DB,
  connectionLimit: 10  
})


module.exports = pool;