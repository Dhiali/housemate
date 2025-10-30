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
    host: process.env.MYSQL_HOST || process.env.DB_HOST || '34.35.107.158',
    user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'housemate_db',
    port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
    ssl: {
      rejectUnauthorized: false
    },
    // Connection timeout settings for Cloud Run
    connectTimeout: 60000, // 60 seconds
    acquireTimeout: 60000, // 60 seconds
    timeout: 60000, // 60 seconds
    reconnect: true,
    // Connection pool settings
    connectionLimit: 10,
    queueLimit: 0
  };
}

console.log('🔧 Database config:', {
  host: dbConfig.host || 'using DATABASE_URL',
  user: dbConfig.user || 'from DATABASE_URL',
  database: dbConfig.database || 'from DATABASE_URL',
  port: dbConfig.port || 'from DATABASE_URL',
  passwordSet: dbConfig.password ? 'YES' : 'NO'
});

const db = mysql.createPool(dbConfig);

// Test connection with detailed logging (non-blocking)
setTimeout(() => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("❌ MySQL connection failed!");
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      
      // Check for common connection issues
      if (err.code === 'ECONNREFUSED') {
        console.error("🔍 ECONNREFUSED suggests:");
        console.error("  - Cloud SQL instance may not be running");
        console.error("  - Environment variables may not be set correctly");
        console.error("  - Host/port may be incorrect");
      } else if (err.code === 'ETIMEDOUT') {
        console.error("🔍 ETIMEDOUT suggests:");
        console.error("  - Cloud SQL instance may be unreachable from Cloud Run");
        console.error("  - Network connectivity issues");
        console.error("  - Firewall blocking connection");
        console.error("  - Consider using Cloud SQL Proxy or Private IP");
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
}, 2000); // Delay connection test to not block server startup

export default db;
