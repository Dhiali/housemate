import mysql from 'mysql2';
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'housemate_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed: " + err.message);
  } else {
    console.log("✅ Connected to MySQL!");
    connection.release();
  }
});

export default db;
