const { Pool } = require("pg");

// Update the connection string with your Neon PostgreSQL credentials
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;
