const { Pool } = require("pg");

// Update the connection string with your Neon PostgreSQL credentials
const pool = new Pool({
    connectionString: 'postgresql://devakarkesavan:Cyj0XpbW4rHM@ep-royal-cherry-a1pd1vdv.ap-southeast-1.aws.neon.tech/Lib-manage?sslmode=require'
});

module.exports = pool;
