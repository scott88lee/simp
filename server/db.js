const pg = require('pg');

const db_config = {
  host: process.env.DB_URI,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const pool = new pg.Pool(db_config);

pool.on('connect', () => {
  console.log('DB Connected.');
})
pool.on('remove', () => {
  console.log('DB Closed.');
})

pool.on('error', (err) =>{
  console.log('PG Client error', err.message, err.stack);
  throw err;
});

module.exports = pool;