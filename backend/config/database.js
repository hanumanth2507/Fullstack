const { Pool } = require("pg");

// Create a new Pool instance for database connection
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.PG_DB,

  });

  module.exports = pool;