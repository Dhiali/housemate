import mysql from 'mysql2';

let db = null;

export function initializeDatabase() {
  if (db) {
    return db; // Already initialized
  }

  console.log('🔧 Initializing database connection...');
  
  // Configuration for Google Cloud SQL
  let dbConfig;

  if (process.env.DATABASE_URL) {
    console.log('🔗 Using DATABASE_URL for connection');
    dbConfig = {
      uri: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    };
  } else {
    console.log('🔗 Using individual environment variables for connection');
    
    dbConfig = {
      host: process.env.MYSQL_HOST || process.env.DB_HOST || '34.35.107.158',
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
    port: dbConfig.port || 'from DATABASE_URL',
    passwordSet: dbConfig.password ? 'YES' : 'NO'
  });

  db = mysql.createPool(dbConfig);

  // Test connection with detailed logging
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
        console.error("  - Cloud SQL instance may be paused or under load");
        console.error("  - Network connectivity issues");
        console.error("  - Firewall rules may be blocking the connection");
      } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error("🔍 ACCESS_DENIED suggests:");
        console.error("  - Incorrect username or password");
        console.error("  - User may not have permission to access the database");
        console.error("  - IP address may not be authorized");
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

  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

export default getDatabase;