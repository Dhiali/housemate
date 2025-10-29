import mysql from 'mysql2';

// Configuration for Google Cloud SQL
let dbConfig;

if (process.env.DATABASE_URL) {
  // For Google Cloud SQL, use individual environment variables
  console.log('🔗 Using DATABASE_URL for connection');
  dbConfig = {
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  // Fallback to individual environment variables
  console.log('🔗 Using individual environment variables for connection');
  dbConfig = {
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'housemate_db',
    port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
    ssl: {
      rejectUnauthorized: false
    }
  };
}

console.log('🔧 Database config:', {
  host: dbConfig.host || 'using DATABASE_URL',
  user: dbConfig.user || 'from DATABASE_URL',
  database: dbConfig.database || 'from DATABASE_URL',
  port: dbConfig.port || 'from DATABASE_URL'
});

const db = mysql.createPool(dbConfig);

// Test connection with detailed logging
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed!");
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    
    // Check for common connection issues
    if (err.code === 'ECONNREFUSED') {
      console.error("🔍 ECONNREFUSED suggests:");
      console.error("  - Cloud SQL instance may not be running");
      console.error("  - Environment variables may not be set correctly");
      console.error("  - Host/port may be incorrect");
    }
  } else {
    console.log("✅ Connected to MySQL successfully!");
    console.log("🔍 Connection details:");
    console.log("  - Host:", connection.config.host);
    console.log("  - User:", connection.config.user);
    console.log("  - Database:", connection.config.database);
    console.log("  - Port:", connection.config.port);
    connection.release();
  }
});

export default db;
