// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the backend directory
const envPath = path.join(__dirname, '../.env');
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.log('❌ Error loading .env file:', result.error.message);
} else {
  console.log('✅ Environment variables loaded from .env file');
}

import express from 'express';
import { initializeDatabase } from './database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import { body, validationResult, param } from 'express-validator';
import upload, { processImage, processHouseAvatar, bufferToDataUrl } from './avatarUploadWebP.js';
import axios from 'axios';

const app = express();

// Database connection - will be initialized later
let db = null;
let dbAvailable = false;

// Helper function to check database availability
function isDatabaseAvailable() {
  return db && dbAvailable;
}

// Helper function to handle database errors gracefully
function handleDatabaseError(res, error, message = 'Database connection failed') {
  console.error(`❌ ${message}:`, error);
  res.status(503).json({ 
    error: 'Service temporarily unavailable', 
    message: 'Database connection issues. Please try again later.',
    code: 'DATABASE_UNAVAILABLE'
  });
}

// Validate critical environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please ensure all database environment variables are set');
} else {
  console.log('✅ All required environment variables are set');
  console.log('🔧 Database config loaded:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });
}

// Configure CORS with environment variables
const corsOrigins = [
  "https://white-water-0fbd05910.3.azurestaticapps.net",
  "https://www.housemate.website"
];
// Only use enhanced CORS configuration below

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(xss()); // Clean user input from malicious HTML

// Enhanced CORS configuration
app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (corsOrigins.includes(origin)) {
      console.log(`✅ CORS allowed for origin: ${origin}`);
      return callback(null, true);
    } else {
      console.log(`❌ CORS blocked for origin: ${origin}`);
      console.log(`📝 Allowed origins:`, corsOrigins);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type', 
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['X-Total-Count'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get('origin') || 'none'}`);
  next();
});

app.use(express.json({ limit: '10mb' }));

// Proxy endpoint for ReasonLabs API to bypass CORS
app.get('/proxy/reasonlabs', async (req, res) => {
  try {
    // Forward query params if present
    const reasonlabsUrl = 'https://ab.reasonlabsapi.com/sub/sdk-QtSYWOMLlkHBbNMB';
    const response = await axios.get(reasonlabsUrl, {
      params: req.query,
      headers: {
        'Accept': 'application/json',
      },
    });
    res.set('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
});

// Start database initialization and table creation

initializeDatabaseWithRetry().catch((err) => {
  console.error('❌ Database initialization error (non-fatal):', err);
});

// Database initialization functions
async function initializeDatabaseWithRetry() {
  console.log('🔧 Initializing database tables...');
  
  try {
    // Initialize database connection first
    db = initializeDatabase();
    
    // Don't block server startup - do database initialization in background
    setTimeout(async () => {
      try {
        await createDatabaseTables();
      } catch (error) {
        console.error('❌ Database table creation failed, will retry in 30 seconds:', error.message);
        // Retry after 30 seconds
        setTimeout(() => createDatabaseTables(), 30000);
      }
    }, 5000); // Start after 5 seconds to let server start first
    
  } catch (error) {
    console.error('❌ Database initialization failed, server will continue without database:', error.message);
  }
}

async function createDatabaseTables() {
  return new Promise((resolve, reject) => {
    console.log('🔧 Creating database tables...');
  
  // Create houses table first (referenced by users)
  const createHousesQuery = `
    CREATE TABLE IF NOT EXISTS houses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT,
      house_rules TEXT,
      avatar VARCHAR(500),
      created_by INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  // Create users table
  const createUsersQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      surname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      bio TEXT,
      phone VARCHAR(20),
      preferred_contact ENUM('email', 'phone', 'app') DEFAULT 'app',
      avatar VARCHAR(500),
      house_id INT,
      role ENUM('admin', 'member', 'guest') DEFAULT 'member',
      status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
      last_login TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE SET NULL
    )
  `;

  // Create tasks table
  const createTasksQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      assigned_to INT,
      created_by INT NOT NULL,
      house_id INT NOT NULL,
      status ENUM('open', 'pending', 'in_progress', 'completed') DEFAULT 'open',
      priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
      due_date DATE,
      category VARCHAR(100) DEFAULT 'general',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE
    )
  `;

  // Create bills table
  const createBillsQuery = `
    CREATE TABLE IF NOT EXISTS bills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(100) DEFAULT 'utilities',
      house_id INT NOT NULL,
      created_by INT NOT NULL,
      due_date DATE,
      status ENUM('active', 'paid', 'overdue') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  
  // Create bill_share table
  const createBillShareQuery = `
    CREATE TABLE IF NOT EXISTS bill_share (
      id INT AUTO_INCREMENT PRIMARY KEY,
      bill_id INT NOT NULL,
      user_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      amount_paid DECIMAL(10,2) DEFAULT 0.00,
      status ENUM('pending', 'paid') DEFAULT 'pending',
      paid_by_user_id INT NULL,
      paid_at TIMESTAMP NULL,
      payment_method VARCHAR(50) NULL,
      payment_notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (paid_by_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `;

  // Create bill_history table
  const createBillHistoryQuery = `
    CREATE TABLE IF NOT EXISTS bill_history (
      id INT AUTO_INCREMENT PRIMARY KEY,
      bill_id INT NOT NULL,
      user_id INT NOT NULL,
      action ENUM('created', 'paid', 'updated') NOT NULL,
      amount DECIMAL(10,2),
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

    // Execute table creation in sequence to handle foreign key dependencies
    db.query(createHousesQuery, (err) => {
      if (err) {
        console.error('❌ Error creating houses table:', err);
        reject(err);
      } else {
        console.log('✅ Houses table ready');
        
        // Create users table after houses
        db.query(createUsersQuery, (err) => {
          if (err) {
            console.error('❌ Error creating users table:', err);
            reject(err);
          } else {
            console.log('✅ Users table ready');
            
            // Create tasks table after users
            db.query(createTasksQuery, (err) => {
              if (err) {
                console.error('❌ Error creating tasks table:', err);
                reject(err);
              } else {
                console.log('✅ Tasks table ready');
              }
            });
            
            // Create bills table after users
            db.query(createBillsQuery, (err) => {
              if (err) {
                console.error('❌ Error creating bills table:', err);
                reject(err);
              } else {
                console.log('✅ Bills table ready');
                
                // Create bill_share table after bills
                db.query(createBillShareQuery, (err) => {
                  if (err) {
                    console.error('❌ Error creating bill_share table:', err);
                    reject(err);
                  } else {
                    console.log('✅ Bill share table ready');
                    
                    // Ensure bill_share table has all required columns (migration)
                    const checkAndAddColumn = (columnName, columnDef, callback) => {
                      db.query(`SHOW COLUMNS FROM bill_share LIKE '${columnName}'`, (err, results) => {
                        if (err) {
                          console.error(`Error checking column ${columnName}:`, err);
                          callback();
                          return;
                        }
                        
                        if (results.length === 0) {
                          // Column doesn't exist, add it
                          db.query(`ALTER TABLE bill_share ADD COLUMN ${columnName} ${columnDef}`, (addErr) => {
                            if (addErr) {
                              console.error(`Error adding column ${columnName}:`, addErr);
                            } else {
                              console.log(`✅ Added column ${columnName} to bill_share`);
                            }
                            callback();
                          });
                        } else {
                          console.log(`✅ Column ${columnName} already exists in bill_share`);
                          callback();
                        }
                      });
                    };
                    
                    // Check and add required columns
                    const migrations = [
                      { name: 'status', def: `ENUM('pending', 'paid') DEFAULT 'pending'` },
                      { name: 'amount_paid', def: `DECIMAL(10,2) DEFAULT 0.00` },
                      { name: 'paid_by_user_id', def: `INT NULL` },
                      { name: 'paid_at', def: `TIMESTAMP NULL` },
                      { name: 'payment_method', def: `VARCHAR(50) NULL` },
                      { name: 'payment_notes', def: `TEXT NULL` }
                    ];
                    
                    let completedMigrations = 0;
                    migrations.forEach((migration) => {
                      checkAndAddColumn(migration.name, migration.def, () => {
                        completedMigrations++;
                        if (completedMigrations === migrations.length) {
                          console.log('🔄 Bill share table migrations completed');
                        }
                      });
                    });
                  }
                });

                // Create bill_history table after bills
                db.query(createBillHistoryQuery, (err) => {
                  if (err) {
                    console.error('❌ Error creating bill_history table:', err);
                    reject(err);
                  } else {
                    console.log('✅ Bill history table ready');
                    
                    // Create schedule table for events
                    const createScheduleQuery = `
                      CREATE TABLE IF NOT EXISTS schedule (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        house_id INT NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        scheduled_date DATE NOT NULL,
                        scheduled_time TIME,
                        type ENUM('meeting', 'recurring', 'social', 'maintenance') DEFAULT 'meeting',
                        attendees TEXT,
                        recurrence ENUM('none', 'daily', 'weekly', 'monthly') DEFAULT 'none',
                        created_by INT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
                        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
                      )
                    `;
                    
                    db.query(createScheduleQuery, (err) => {
                      if (err) {
                        console.error('❌ Error creating schedule table:', err);
                        reject(err);
                      } else {
                        console.log('✅ Schedule table ready');
                        console.log('🎉 All database tables created successfully!');
                        dbAvailable = true;
                        resolve();
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
}

// Ensure bills and related tables exist
const createBillsTables = () => {
  // This is now handled by createAllTables() above
  console.log('📝 Legacy createBillsTables() called - tables handled by createAllTables()');
};

// Create tables on startup (non-blocking)
initializeDatabaseWithRetry();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: {
      connected: isDatabaseAvailable(),
      status: isDatabaseAvailable() ? 'connected' : 'connecting/unavailable'
    },
    environment: process.env.NODE_ENV || 'development'
  });
  
  // Test database connection if available
  if (db) {
    db.query('SELECT 1', (err, results) => {
      if (err) {
        console.error('❌ Database health check failed:', err.message);
        dbAvailable = false;
      } else {
        console.log('✅ Database health check passed');
        dbAvailable = true;
      }
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'HouseMate API Server', version: '1.0.0' });
});

// CORS test endpoint
app.get('/cors-test', (req, res) => {
  res.json({ 
    message: 'CORS test successful!',
    origin: req.get('origin'),
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  console.log(`📋 OPTIONS request for ${req.path} from origin: ${req.get('origin')}`);
  res.status(204).send();
});

// Login endpoint
app.post('/login', 
  authLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
  // Check if database is available
  if (!isDatabaseAvailable()) {
    return handleDatabaseError(res, new Error('Database not available'), 'Login failed');
  }

  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  console.log('🔍 Login attempt:', { email: req.body.email, hasPassword: !!req.body.password });
  
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('❌ Login failed: Missing email or password');
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  try {
    console.log('🔍 Querying database for user:', email);
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('❌ Database error during login:', err.message);
        return res.status(500).json({ error: err.message });
      }
      
      console.log('🔍 Database query result:', { userFound: results.length > 0 });
      
      if (!results.length) {
        console.log('❌ Login failed: User not found');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const user = results[0];
      console.log('🔍 Comparing passwords for user:', user.id);
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        console.log('❌ Login failed: Invalid password');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      console.log('✅ Login successful for user:', user.id);
      
      // Generate JWT with environment variable
      const jwtSecret = process.env.JWT_SECRET || 'fallback-jwt-secret-change-in-production';
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
      
      // Update last_login
      db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);
      
      res.json({ token, user: { id: user.id, name: user.name, surname: user.surname, email: user.email, role: user.role, house_id: user.house_id } });
    });
  } catch (err) {
    console.error('❌ Unexpected error during login:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Register endpoint
app.post('/register',
  authLimiter,
  [
    body('name').trim().isLength({ min: 1, max: 255 }).withMessage('Name is required'),
    body('surname').trim().isLength({ min: 1, max: 255 }).withMessage('Surname is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain uppercase, lowercase, number and special character'),
    body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio too long'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  async (req, res) => {
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  const {
    name,
    surname,
    email,
    password,
    bio = null,
    phone = null,
    preferred_contact = 'email',
    avatar = null,
    address = null,
    house_rules = null,
    house_name = null, // Expect house_name from frontend
    house_id = null, // For housemate creation
    role = 'admin' // Default to admin for house creation, can be overridden for housemates
  } = req.body;
  if (!email || !password || !name || !surname) {
    console.error('Register error: missing required fields', { name, surname, email, password });
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Check if user exists
    const [existing] = await new Promise((resolve, reject) => {
      db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Register error: DB select', err);
          reject(err);
        } else resolve(results);
      });
    });
    if (existing) {
      console.error('Register error: Email already registered', email);
      return res.status(409).json({ error: 'Email already registered' });
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Insert user with house_id and role
    const userId = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, surname, email, password, bio, phone, preferred_contact, avatar, house_id, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
        [name, surname, email, hashed, bio, phone, preferred_contact, avatar, house_id, role],
        (err, results) => {
          if (err) {
            console.error('Register error: DB insert user', err);
            reject(err);
          } else resolve(results.insertId);
        }
      );
    });
    res.json({ message: 'User registered!', user_id: userId });
  } catch (err) {
    console.error('Register error: General', err);
    res.status(500).json({ error: err.message });
  }
});
// Houses endpoints
app.get('/houses', (req, res) => {
  db.query("SELECT * FROM houses", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
app.get('/houses/:id', (req, res) => {
  db.query("SELECT * FROM houses WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || null);
  });
});
app.post('/houses', (req, res) => {
  const { name, address = null, house_rules = null, avatar = null, created_by } = req.body;
  if (!created_by) {
    return res.status(400).json({ error: "Missing created_by (user id)" });
  }
  db.query(
    "INSERT INTO houses (name, address, house_rules, avatar, created_by) VALUES (?, ?, ?, ?, ?)",
    [name, address, house_rules, avatar, created_by],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const houseId = results.insertId;
      // Update the user to set their house_id to the new house's ID
      db.query(
        "UPDATE users SET house_id = ? WHERE id = ?",
        [houseId, created_by],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json({ message: "House created!", id: houseId });
        }
      );
    }
  );
});
app.put('/houses/:id', (req, res) => {
  // Validate and sanitize input
  const { name, address, house_rules, avatar } = req.body;
  const houseId = parseInt(req.params.id);
  
  if (!houseId || isNaN(houseId)) {
    return res.status(400).json({ error: 'Invalid house ID' });
  }
  
  // Build update query with only allowed fields
  const updates = [];
  const values = [];
  
  if (name !== undefined) {
    updates.push('name = ?');
    values.push(name);
  }
  if (address !== undefined) {
    updates.push('address = ?');
    values.push(address);
  }
  if (house_rules !== undefined) {
    updates.push('house_rules = ?');
    values.push(house_rules);
  }
  if (avatar !== undefined) {
    updates.push('avatar = ?');
    values.push(avatar);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }
  
  const query = `UPDATE houses SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  values.push(houseId);
  
  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "House updated!" });
  });
});
app.delete('/houses/:id', (req, res) => {
  db.query("DELETE FROM houses WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "House deleted!" });
  });
});

// House statistics endpoint
app.get('/houses/:houseId/statistics', (req, res) => {
  const { houseId } = req.params;
  console.log('Fetching statistics for house_id:', houseId);
  
  const queries = {
    // Tasks statistics
    totalTasks: "SELECT COUNT(*) as count FROM tasks WHERE house_id = ?",
    completedTasks: "SELECT COUNT(*) as count FROM tasks WHERE house_id = ? AND status = 'completed'",
    pendingTasks: "SELECT COUNT(*) as count FROM tasks WHERE house_id = ? AND status IN ('open', 'pending', 'in_progress')",
    overdueTasks: `
      SELECT COUNT(*) as count FROM tasks 
      WHERE house_id = ? 
      AND status != 'completed' 
      AND due_date < CURDATE()
    `,
    // Bills statistics
    totalBills: "SELECT COUNT(*) as count FROM bills WHERE house_id = ?",
    unpaidBills: "SELECT COUNT(*) as count FROM bills WHERE house_id = ? AND status = 'unpaid'",
    totalBillsAmount: "SELECT COALESCE(SUM(amount), 0) as total FROM bills WHERE house_id = ?",
    unpaidBillsAmount: "SELECT COALESCE(SUM(amount), 0) as total FROM bills WHERE house_id = ? AND status = 'unpaid'",
    // Users statistics
    totalHousemates: "SELECT COUNT(*) as count FROM users WHERE house_id = ?",
    activeHousemates: "SELECT COUNT(*) as count FROM users WHERE house_id = ? AND status = 'active'"
  };

  const results = {};
  const promises = [];

  // Execute all queries
  for (const [key, query] of Object.entries(queries)) {
    promises.push(
      new Promise((resolve, reject) => {
        db.query(query, [houseId], (err, queryResults) => {
          if (err) {
            console.error(`Error in ${key} query:`, err);
            reject(err);
          } else {
            results[key] = queryResults[0].count !== undefined ? queryResults[0].count : queryResults[0].total;
            resolve();
          }
        });
      })
    );
  }

  Promise.all(promises)
    .then(() => {
      // Calculate additional metrics
      const completionRate = results.totalTasks > 0 ? 
        Math.round((results.completedTasks / results.totalTasks) * 100) : 0;
      
      const response = {
        tasks: {
          total: results.totalTasks,
          completed: results.completedTasks,
          pending: results.pendingTasks,
          overdue: results.overdueTasks,
          completionRate: completionRate
        },
        bills: {
          total: results.totalBills,
          unpaid: results.unpaidBills,
          totalAmount: parseFloat(results.totalBillsAmount || 0),
          unpaidAmount: parseFloat(results.unpaidBillsAmount || 0)
        },
        housemates: {
          total: results.totalHousemates,
          active: results.activeHousemates
        }
      };
      
      console.log('House statistics:', response);
      res.json({ data: response });
    })
    .catch(error => {
      console.error('Error fetching house statistics:', error);
      res.status(500).json({ error: 'Failed to fetch house statistics' });
    });
});

// Bills endpoints

// Get all bills for a house with sharing information
app.get('/bills', (req, res) => {
  const { house_id } = req.query;
  console.log('Fetching bills for house_id:', house_id);
  
  try {
    let query = `SELECT * FROM bills`;
    const values = [];
    
    if (house_id) {
      query += ' WHERE house_id = ?';
      values.push(house_id);
    }
    
    // Temporarily remove ORDER BY to fix the unknown column error
    // query += ' ORDER BY created_at DESC';
    
    console.log('Executing query:', query, 'with values:', values);
    
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Database error in bills endpoint:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        
        // Return empty array instead of error to prevent frontend crashes
        console.log('Returning empty bills array due to database error');
        return res.json({ data: [] });
      }
      console.log('Bills query successful, found', results.length, 'bills');
      console.log('Bills data:', results);
      res.json({ data: results });
    });
  } catch (error) {
    console.error('Unexpected error in bills endpoint:', error);
    res.json({ data: [] }); // Return empty array instead of error
  }
});

// Get single bill with detailed sharing information
app.get('/bills/:id', (req, res) => {
  const billId = req.params.id;
  
  // Get bill details
  const billQuery = `
    SELECT 
      b.*,
      u.first_name as created_by_name,
      u.last_name as created_by_surname
    FROM bills b
    LEFT JOIN users u ON b.created_by = u.id
    WHERE b.id = ?
  `;
  
  db.query(billQuery, [billId], (err, billResults) => {
    if (err) {
      console.error('Error fetching bill:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (billResults.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    
    // Get sharing details
    const sharesQuery = `
      SELECT 
        bs.*,
        u.name as user_name,
        u.surname as user_surname,
        u.email as user_email,
        paid_by.name as paid_by_name,
        paid_by.surname as paid_by_surname,
        paid_by.email as paid_by_email
      FROM bill_share bs
      LEFT JOIN users u ON bs.user_id = u.id
      LEFT JOIN users paid_by ON bs.paid_by_user_id = paid_by.id
      WHERE bs.bill_id = ?
      ORDER BY u.name
    `;
    
    db.query(sharesQuery, [billId], (err2, sharesResults) => {
      if (err2) {
        console.error('Error fetching bill shares:', err2);
        return res.status(500).json({ error: err2.message });
      }
      
      const bill = billResults[0];
      bill.shares = sharesResults;
      
      res.json({ data: bill });
    });
  });
});

// Create new bill with sharing
app.post('/bills', (req, res) => {
  console.log('POST /bills endpoint hit');
  console.log('Request body:', req.body);
  
  const { 
    title, 
    description,
    amount, 
    category,
    split_method,
    house_id, 
    created_by, 
    due_date,
    paid_by,
    bill_share // Array of bill share objects
  } = req.body;

  if (!title || !amount || !house_id || !created_by) {
    console.log('Missing required fields validation failed');
    return res.status(400).json({ 
      error: 'Missing required fields: title, amount, house_id, created_by' 
    });
  }
  
  console.log('Validation passed, creating bill...');

  // Insert bill with new fields
  const billQuery = `
    INSERT INTO bills (title, description, amount, category, split_method, house_id, created_by, due_date, paid_by, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', NOW())
  `;

  const billValues = [
    title,
    description || null,
    amount,
    category || 'utilities',
    split_method || 'equal',
    house_id,
    created_by,
    due_date || null,
    paid_by || null
  ];

  console.log('Executing bill query:', billQuery);
  console.log('With values:', billValues);
  
  db.query(billQuery, billValues, (err, billResult) => {
    if (err) {
      console.error('Error creating bill:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      return res.status(500).json({ error: err.message });
    }
    
    console.log('Bill created successfully, ID:', billResult.insertId);

    const billId = billResult.insertId;

    // Create bill_share entries if they exist
    if (bill_share && Array.isArray(bill_share) && bill_share.length > 0) {
      console.log('Creating bill_share entries for', bill_share.length, 'users');
      
      const shareQuery = `
        INSERT INTO bill_share (bill_id, user_id, amount, status, payment_method, payment_notes, paid_by_user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      let completedShares = 0;
      const totalShares = bill_share.length;
      
      bill_share.forEach((share, index) => {
        db.query(shareQuery, [
          billId,
          share.user_id,
          share.share_amount,
          share.is_settled ? 'paid' : 'pending', // Convert boolean to status enum
          null, // payment_method
          null, // payment_notes
          null  // paid_by_user_id
        ], (shareErr, shareResult) => {
          if (shareErr) {
            console.error(`Error creating bill_share ${index + 1}:`, shareErr);
          } else {
            console.log(`Created bill_share for user ${share.user_id}, amount: ${share.share_amount}`);
          }
          
          completedShares++;
          
          // Send response when all shares are processed
          if (completedShares === totalShares) {
            console.log('All bill_share entries processed');
            res.json({ 
              message: "Bill and bill shares created successfully!", 
              data: { id: billId },
              shares_created: totalShares
            });
          }
        });
      });
    } else {
      // No bill shares to create
      console.log('No bill_share entries to create');
      res.json({ 
        message: "Bill created successfully!", 
        data: { id: billId },
        shares_created: 0
      });
    }
  });
});

// Update bill payment status
app.put('/bills/:id/pay', (req, res) => {
  const billId = req.params.id;
  const { user_id, amount_paid, paid_by_user_id, payment_method, payment_notes } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required (the person this payment is for)' });
  }

  if (!paid_by_user_id) {
    return res.status(400).json({ error: 'paid_by_user_id is required (the person making the payment)' });
  }

  console.log(`Recording payment: Bill ${billId}, User ${user_id}, Paid by ${paid_by_user_id}, Amount ${amount_paid}`);

  // Helper function to log payment history
  const logPaymentHistory = (billId, user_id, paid_by_user_id, amount_paid, payment_method, payment_notes, res) => {
    const historyQuery = `
      INSERT INTO bill_history (bill_id, user_id, action, amount, notes, created_at)
      VALUES (?, ?, 'payment', ?, ?, NOW())
    `;

    const historyNotes = `Payment of ${amount_paid || 'full amount'} made by user ${paid_by_user_id} for user ${user_id}${payment_method ? ` via ${payment_method}` : ''}${payment_notes ? `. Notes: ${payment_notes}` : ''}`;

    db.query(historyQuery, [billId, paid_by_user_id, amount_paid, historyNotes], (err2) => {
      if (err2) {
        console.error('Error logging payment history:', err2);
      }

      res.json({ 
        message: "Payment recorded successfully!",
        payment_details: {
          bill_id: billId,
          user_id: user_id,
          paid_by_user_id: paid_by_user_id,
          amount_paid: amount_paid,
          payment_method: payment_method,
          payment_notes: payment_notes
        }
      });
    });
  };

  // First, check what columns exist in bill_share table
  db.query('SHOW COLUMNS FROM bill_share', (err, columns) => {
    if (err) {
      console.error('Error checking bill_share columns:', err);
      return res.status(500).json({ error: err.message });
    }

    const columnNames = columns.map(col => col.Field);
    const hasStatus = columnNames.includes('status');
    const hasAmountPaid = columnNames.includes('amount_paid');
    const hasPaidBy = columnNames.includes('paid_by_user_id');
    const hasPaidAt = columnNames.includes('paid_at');
    const hasPaymentMethod = columnNames.includes('payment_method');
    const hasPaymentNotes = columnNames.includes('payment_notes');

    console.log('Available columns in bill_share:', columnNames);

    // Check if a bill_share record exists
    const checkShareQuery = 'SELECT * FROM bill_share WHERE bill_id = ? AND user_id = ?';
    
    db.query(checkShareQuery, [billId, user_id], (err, existingShares) => {
      if (err) {
        console.error('Error checking bill share:', err);
        return res.status(500).json({ error: err.message });
      }

      if (existingShares.length > 0) {
        // Build update query based on available columns
        const updateFields = [];
        const updateValues = [];

        if (hasStatus) {
          updateFields.push('status = ?');
          updateValues.push('paid');
        }
        if (hasAmountPaid) {
          updateFields.push('amount_paid = ?');
          updateValues.push(amount_paid || null);
        }
        if (hasPaidBy) {
          updateFields.push('paid_by_user_id = ?');
          updateValues.push(paid_by_user_id);
        }
        if (hasPaidAt) {
          updateFields.push('paid_at = NOW()');
        }
        if (hasPaymentMethod) {
          updateFields.push('payment_method = ?');
          updateValues.push(payment_method || null);
        }
        if (hasPaymentNotes) {
          updateFields.push('payment_notes = ?');
          updateValues.push(payment_notes || null);
        }

        if (updateFields.length === 0) {
          // No payment-related columns available, just log to history
          console.log('No payment columns available in bill_share, logging to history only');
          logPaymentHistory(billId, user_id, paid_by_user_id, amount_paid, payment_method, payment_notes, res);
          return;
        }

        const updateQuery = `UPDATE bill_share SET ${updateFields.join(', ')} WHERE bill_id = ? AND user_id = ?`;
        updateValues.push(billId, user_id);

        db.query(updateQuery, updateValues, (err, results) => {
          if (err) {
            console.error('Error updating bill payment:', err);
            return res.status(500).json({ error: err.message });
          }

          logPaymentHistory(billId, user_id, paid_by_user_id, amount_paid, payment_method, payment_notes, res);
        });
      } else {
        // Build insert query based on available columns
        const insertFields = ['bill_id', 'user_id', 'amount'];
        const insertValues = [billId, user_id, amount_paid || 0];
        const insertPlaceholders = ['?', '?', '?'];

        if (hasAmountPaid) {
          insertFields.push('amount_paid');
          insertValues.push(amount_paid || 0);
          insertPlaceholders.push('?');
        }
        if (hasStatus) {
          insertFields.push('status');
          insertValues.push('paid');
          insertPlaceholders.push('?');
        }
        if (hasPaidBy) {
          insertFields.push('paid_by_user_id');
          insertValues.push(paid_by_user_id);
          insertPlaceholders.push('?');
        }
        if (hasPaidAt) {
          insertFields.push('paid_at');
          insertValues.push(new Date());
          insertPlaceholders.push('NOW()');
        }
        if (hasPaymentMethod) {
          insertFields.push('payment_method');
          insertValues.push(payment_method || null);
          insertPlaceholders.push('?');
        }
        if (hasPaymentNotes) {
          insertFields.push('payment_notes');
          insertValues.push(payment_notes || null);
          insertPlaceholders.push('?');
        }

        const insertQuery = `INSERT INTO bill_share (${insertFields.join(', ')}) VALUES (${insertPlaceholders.join(', ')})`;
        
        // Remove NOW() from values array since it's a SQL function
        const finalValues = insertValues.filter((val, index) => insertPlaceholders[index] !== 'NOW()');

        db.query(insertQuery, finalValues, (err, results) => {
          if (err) {
            console.error('Error creating bill share payment:', err);
            return res.status(500).json({ error: err.message });
          }

          logPaymentHistory(billId, user_id, paid_by_user_id, amount_paid, payment_method, payment_notes, res);
        });
      }
    });
  });
});

// Update bill details
app.put('/bills/:id', (req, res) => {
  const billId = req.params.id;
  const { title, description, amount, category, due_date, status, updated_by } = req.body;

  // Get current bill for history
  db.query('SELECT * FROM bills WHERE id = ?', [billId], (err, currentBill) => {
    if (err) {
      console.error('Error fetching current bill:', err);
      return res.status(500).json({ error: err.message });
    }

    if (currentBill.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    const current = currentBill[0];
    
    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];
    const changes = [];

    if (title !== undefined && title !== current.title) {
      updateFields.push('title = ?');
      updateValues.push(title);
      changes.push({ field: 'title', oldValue: current.title, newValue: title });
    }
    
    if (description !== undefined && description !== current.description) {
      updateFields.push('description = ?');
      updateValues.push(description);
      changes.push({ field: 'description', oldValue: current.description, newValue: description });
    }
    
    if (amount !== undefined && amount !== current.amount) {
      updateFields.push('amount = ?');
      updateValues.push(amount);
      changes.push({ field: 'amount', oldValue: current.amount, newValue: amount });
    }
    
    if (category !== undefined && category !== current.category) {
      updateFields.push('category = ?');
      updateValues.push(category);
      changes.push({ field: 'category', oldValue: current.category, newValue: category });
    }
    
    if (due_date !== undefined && due_date !== current.due_date) {
      updateFields.push('due_date = ?');
      updateValues.push(due_date);
      changes.push({ field: 'due_date', oldValue: current.due_date, newValue: due_date });
    }
    
    if (status !== undefined && status !== current.status) {
      updateFields.push('status = ?');
      updateValues.push(status);
      changes.push({ field: 'status', oldValue: current.status, newValue: status });
    }

    if (updateFields.length === 0) {
      return res.json({ message: 'No changes detected' });
    }

    // Add updated_at
    updateFields.push('updated_at = NOW()');
    updateValues.push(billId);

    const updateQuery = `UPDATE bills SET ${updateFields.join(', ')} WHERE id = ?`;

    db.query(updateQuery, updateValues, (updateErr) => {
      if (updateErr) {
        console.error('Error updating bill:', updateErr);
        return res.status(500).json({ error: updateErr.message });
      }

      // Log changes to bill_history
      if (changes.length > 0 && updated_by) {
        const historyPromises = changes.map(change => {
          return new Promise((resolve, reject) => {
            const historyQuery = `
              INSERT INTO bill_history (bill_id, user_id, action, field_changed, old_value, new_value, created_at)
              VALUES (?, ?, 'updated', ?, ?, ?, NOW())
            `;
            db.query(historyQuery, [billId, updated_by, change.field, change.oldValue, change.newValue], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        });

        Promise.allSettled(historyPromises).then(() => {
          res.json({ 
            message: "Bill updated successfully!", 
            changes: changes.length 
          });
        });
      } else {
        res.json({ 
          message: "Bill updated successfully!", 
          changes: changes.length 
        });
      }
    });
  });
});

// Delete bill
app.delete('/bills/:id', (req, res) => {
  const billId = req.params.id;
  const { deleted_by } = req.body;

  // First, delete related bill_shares
  db.query('DELETE FROM bill_share WHERE bill_id = ?', [billId], (err1) => {
    if (err1) {
      console.error('Error deleting bill shares:', err1);
      return res.status(500).json({ error: err1.message });
    }

    // Log deletion to history before deleting bill
    if (deleted_by) {
      const historyQuery = `
        INSERT INTO bill_history (bill_id, user_id, action, old_value, new_value, created_at)
        VALUES (?, ?, 'deleted', 'active', 'deleted', NOW())
      `;
      
      db.query(historyQuery, [billId, deleted_by], () => {
        // Continue with deletion even if history fails
      });
    }

    // Delete the bill
    db.query('DELETE FROM bills WHERE id = ?', [billId], (err2, results) => {
      if (err2) {
        console.error('Error deleting bill:', err2);
        return res.status(500).json({ error: err2.message });
      }
      
      res.json({ message: "Bill deleted successfully!" });
    });
  });
});

// Get bill payment history
app.get('/bills/:id/payments', (req, res) => {
  const billId = req.params.id;

  const paymentsQuery = `
    SELECT 
      bs.*,
      u.name as user_name,
      u.surname as user_surname,
      u.email as user_email,
      paid_by.name as paid_by_name,
      paid_by.surname as paid_by_surname,
      paid_by.email as paid_by_email
    FROM bill_share bs
    LEFT JOIN users u ON bs.user_id = u.id
    LEFT JOIN users paid_by ON bs.paid_by_user_id = paid_by.id
    WHERE bs.bill_id = ? AND bs.status = 'paid'
    ORDER BY bs.paid_at DESC
  `;

  db.query(paymentsQuery, [billId], (err, results) => {
    if (err) {
      console.error('Error fetching bill payments:', err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ 
      data: results.map(payment => ({
        id: payment.id,
        bill_id: payment.bill_id,
        user_id: payment.user_id,
        user_name: `${payment.user_name} ${payment.user_surname}`,
        user_email: payment.user_email,
        amount: payment.amount,
        amount_paid: payment.amount_paid,
        paid_by_user_id: payment.paid_by_user_id,
        paid_by_name: payment.paid_by_name ? `${payment.paid_by_name} ${payment.paid_by_surname}` : null,
        paid_by_email: payment.paid_by_email,
        paid_at: payment.paid_at,
        payment_method: payment.payment_method,
        payment_notes: payment.payment_notes,
        status: payment.status
      }))
    });
  });
});

// Schedule endpoints
app.get('/schedule', (req, res) => {
  const houseId = req.query.house_id;
  let query = "SELECT * FROM schedule";
  let params = [];
  
  if (houseId) {
    query += " WHERE house_id = ?";
    params.push(houseId);
  }
  
  query += " ORDER BY scheduled_date ASC, scheduled_time ASC";
  
  console.log('📅 Fetching schedule for house_id:', houseId);
  
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('❌ Error fetching schedule:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('✅ Schedule fetched successfully, count:', results.length);
    res.json(results);
  });
});

// Debug endpoint to check if schedule table exists
app.get('/debug/schedule-table', (req, res) => {
  console.log('🔍 Checking if schedule table exists...');
  db.query("SHOW TABLES LIKE 'schedule'", (err, results) => {
    if (err) {
      console.error('❌ Error checking schedule table:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (results.length === 0) {
      console.log('❌ Schedule table does not exist');
      return res.json({ 
        exists: false, 
        message: "Schedule table does not exist",
        suggestion: "Table creation might be in progress or failed"
      });
    }
    
    // If table exists, get its structure
    db.query("DESCRIBE schedule", (err, structure) => {
      if (err) {
        console.error('❌ Error describing schedule table:', err);
        return res.status(500).json({ error: err.message });
      }
      
      console.log('✅ Schedule table exists with structure:', structure);
      res.json({ 
        exists: true, 
        message: "Schedule table exists",
        structure: structure
      });
    });
  });
});
app.get('/schedule/:id', (req, res) => {
  db.query("SELECT * FROM schedule WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || null);
  });
});
app.post('/schedule', (req, res) => {
  console.log('📅 Creating new schedule event:', req.body);
  
  const { 
    house_id, 
    title, 
    description, 
    scheduled_date, 
    scheduled_time, 
    type, 
    attendees, 
    recurrence,
    created_by 
  } = req.body;
  
  // Validate required fields
  if (!house_id || !title || !scheduled_date) {
    console.log('❌ Validation failed - missing required fields');
    return res.status(400).json({ 
      error: "Missing required fields: house_id, title, and scheduled_date are required" 
    });
  }
  
  const attendeesStr = Array.isArray(attendees) ? attendees.join(',') : attendees || 'All';
  console.log('✅ Validation passed, inserting into database...');
  
  db.query(
    "INSERT INTO schedule (house_id, title, description, scheduled_date, scheduled_time, type, attendees, recurrence, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())", 
    [house_id, title, description || '', scheduled_date, scheduled_time || null, type || 'meeting', attendeesStr, recurrence || 'none', created_by || null], 
    (err, results) => {
      if (err) {
        console.error('❌ Database error when creating schedule:', err);
        console.error('Error details:', {
          code: err.code,
          errno: err.errno,
          sqlMessage: err.sqlMessage,
          sqlState: err.sqlState
        });
        return res.status(500).json({ error: err.message });
      }
      
      console.log('✅ Schedule event created successfully with ID:', results.insertId);
      res.json({ 
        message: "Event created successfully!", 
        id: results.insertId,
        event: {
          id: results.insertId,
          house_id,
          title,
          description: description || '',
          scheduled_date,
          scheduled_time: scheduled_time || null,
          type: type || 'meeting',
          attendees: attendeesStr,
          recurrence: recurrence || 'none',
          created_by: created_by || null
        }
      });
    }
  );
});
app.put('/schedule/:id', (req, res) => {
  db.query("UPDATE schedule SET ? WHERE id = ?", [req.body, req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Schedule updated!" });
  });
});
app.delete('/schedule/:id', (req, res) => {
  db.query("DELETE FROM schedule WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Schedule deleted!" });
  });
});
// ...existing code...
// Serve uploaded avatars statically
app.use('/uploads/avatars', express.static(path.join(process.cwd(), 'uploads', 'avatars')));
// Avatar upload endpoint with WebP optimization
app.put('/users/:id/avatar', upload.single('avatar'), processImage, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Convert processed WebP image buffer to base64 data URL
  const dataUrl = bufferToDataUrl(req.file.buffer, req.file.mimetype);
  
  db.query('UPDATE users SET avatar = ? WHERE id = ?', [dataUrl, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      message: 'Avatar updated with WebP optimization!', 
      avatar: dataUrl,
      originalSize: req.file.size,
      optimizedFormat: 'webp'
    });
  });
});

// House avatar upload endpoint with WebP optimization
app.put('/houses/:id/avatar', upload.single('avatar'), processHouseAvatar, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Convert processed WebP image buffer to base64 data URL
  const dataUrl = bufferToDataUrl(req.file.buffer, req.file.mimetype);
  
  db.query('UPDATE houses SET avatar = ? WHERE id = ?', [dataUrl, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      message: 'House avatar updated with WebP optimization!', 
      avatar: dataUrl,
      originalSize: req.file.size,
      optimizedFormat: 'webp'
    });
  });
});

// Get all tasks for a house
app.get('/tasks', (req, res) => {
  const { house_id } = req.query;
  
  if (!house_id) {
    return res.status(400).json({ error: 'house_id is required' });
  }

  const query = `
    SELECT 
      t.*,
      u_assigned.name as assigned_to_name,
      u_assigned.surname as assigned_to_surname,
      u_assigned.avatar as assigned_to_avatar,
      u_created.name as created_by_name,
      u_created.surname as created_by_surname
    FROM tasks t
    LEFT JOIN users u_assigned ON t.assigned_to = u_assigned.id
    LEFT JOIN users u_created ON t.created_by = u_created.id
    WHERE t.house_id = ?
    ORDER BY t.created_at DESC
  `;

  db.query(query, [house_id], (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  const query = `
    SELECT 
      t.*,
      u_assigned.name as assigned_to_name,
      u_assigned.surname as assigned_to_surname,
      u_assigned.avatar as assigned_to_avatar,
      u_created.name as created_by_name,
      u_created.surname as created_by_surname
    FROM tasks t
    LEFT JOIN users u_assigned ON t.assigned_to = u_assigned.id
    LEFT JOIN users u_created ON t.created_by = u_created.id
    WHERE t.id = ?
  `;

  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { 
    house_id, 
    title, 
    description, 
    category, 
    location, 
    due_date, 
    priority, 
    assigned_to, 
    created_by 
  } = req.body;

  // Validate required fields
  if (!house_id || !title || !assigned_to || !created_by) {
    return res.status(400).json({ 
      error: 'Missing required fields: house_id, title, assigned_to, created_by' 
    });
  }

  const query = `
    INSERT INTO tasks 
    (house_id, title, description, category, location, due_date, priority, assigned_to, created_by, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'open')
  `;

  const values = [
    house_id,
    title,
    description || null,
    category || 'other',
    location || null,
    due_date || null,
    priority || 'medium',
    assigned_to,
    created_by
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ error: err.message });
    }

    // Log task creation in task_history
    const historyQuery = `
      INSERT INTO task_history (task_id, changed_by, field_name, old_value, new_value)
      VALUES (?, ?, ?, NULL, ?)
    `;

    db.query(historyQuery, [results.insertId, created_by, 'task_created', 'open'], (histErr) => {
      if (histErr) {
        console.error('Error logging task history:', histErr);
      }
    });

    res.json({ 
      message: "Task created successfully!", 
      id: results.insertId,
      task: {
        id: results.insertId,
        house_id,
        title,
        description,
        category,
        location,
        due_date,
        priority,
        assigned_to,
        created_by,
        status: 'open'
      }
    });
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { 
    title, 
    description, 
    category, 
    location, 
    due_date, 
    priority, 
    assigned_to, 
    status,
    updated_by
  } = req.body;

  // First, get the current task to track changes
  db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, currentTask) => {
    if (err) {
      console.error('Error fetching current task:', err);
      return res.status(500).json({ error: err.message });
    }

    if (currentTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const current = currentTask[0];
    
    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];
    const changes = [];

    if (title !== undefined && title !== current.title) {
      updateFields.push('title = ?');
      updateValues.push(title);
      changes.push({ field: 'title', oldValue: current.title, newValue: title });
    }
    
    if (description !== undefined && description !== current.description) {
      updateFields.push('description = ?');
      updateValues.push(description);
      changes.push({ field: 'description', oldValue: current.description, newValue: description });
    }
    
    if (category !== undefined && category !== current.category) {
      updateFields.push('category = ?');
      updateValues.push(category);
      changes.push({ field: 'category', oldValue: current.category, newValue: category });
    }
    
    if (location !== undefined && location !== current.location) {
      updateFields.push('location = ?');
      updateValues.push(location);
      changes.push({ field: 'location', oldValue: current.location, newValue: location });
    }
    
    if (due_date !== undefined && due_date !== current.due_date) {
      updateFields.push('due_date = ?');
      updateValues.push(due_date);
      changes.push({ field: 'due_date', oldValue: current.due_date, newValue: due_date });
    }
    
    if (priority !== undefined && priority !== current.priority) {
      updateFields.push('priority = ?');
      updateValues.push(priority);
      changes.push({ field: 'priority', oldValue: current.priority, newValue: priority });
    }
    
    if (assigned_to !== undefined && assigned_to !== current.assigned_to) {
      updateFields.push('assigned_to = ?');
      updateValues.push(assigned_to);
      changes.push({ field: 'assigned_to', oldValue: current.assigned_to, newValue: assigned_to });
    }
    
    if (status !== undefined && status !== current.status) {
      updateFields.push('status = ?');
      updateValues.push(status);
      changes.push({ field: 'status', oldValue: current.status, newValue: status });
    }

    if (updateFields.length === 0) {
      return res.json({ message: 'No changes detected' });
    }

    // Add updated_at
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(taskId);

    const updateQuery = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`;

    db.query(updateQuery, updateValues, (updateErr) => {
      if (updateErr) {
        console.error('Error updating task:', updateErr);
        return res.status(500).json({ error: updateErr.message });
      }

      // Log changes in task_history
      changes.forEach(change => {
        const historyQuery = `
          INSERT INTO task_history (task_id, changed_by, field_name, old_value, new_value)
          VALUES (?, ?, ?, ?, ?)
        `;
        
        db.query(historyQuery, [
          taskId, 
          updated_by || null, 
          change.field, 
          change.oldValue, 
          change.newValue
        ], (histErr) => {
          if (histErr) {
            console.error('Error logging task history:', histErr);
          }
        });
      });

      res.json({ message: 'Task updated successfully', changes: changes.length });
    });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { deleted_by } = req.body;

  // First check if task exists
  db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      console.error('Error checking task:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Log deletion in history before deleting
    const historyQuery = `
      INSERT INTO task_history (task_id, changed_by, field_name, old_value, new_value)
      VALUES (?, ?, 'task_deleted', 'active', 'deleted')
    `;

    db.query(historyQuery, [taskId, deleted_by || null], (histErr) => {
      if (histErr) {
        console.error('Error logging task deletion:', histErr);
      }

      // Delete the task
      db.query('DELETE FROM tasks WHERE id = ?', [taskId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error deleting task:', deleteErr);
          return res.status(500).json({ error: deleteErr.message });
        }

        res.json({ message: 'Task deleted successfully' });
      });
    });
  });
});

// Get task history
app.get('/tasks/:id/history', (req, res) => {
  const taskId = req.params.id;

  const query = `
    SELECT 
      th.*,
      u.name as changed_by_name,
      u.surname as changed_by_surname
    FROM task_history th
    LEFT JOIN users u ON th.changed_by = u.id
    WHERE th.task_id = ?
    ORDER BY th.changed_at DESC
  `;

  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error('Error fetching task history:', err);
      return res.status(500).json({ error: err.message });
    }
    
    res.json(results);
  });
});

// ...existing code...


// Get all users

// Get all users
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
    console.log('GET /users/:id', req.params.id, 'results:', results);
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Get users by house ID (housemates) - includes all members, admins, and house creator
app.get('/houses/:houseId/users', (req, res) => {
  const houseId = req.params.houseId;
  console.log('GET /houses/:houseId/users', houseId);
  
  if (isNaN(Number(houseId))) {
    return res.status(400).json({ error: 'House ID must be a number' });
  }

  // Query to get all users associated with the house:
  // 1. Users who belong to the house (house_id = houseId)
  // 2. The user who created the house (from houses.created_by)
  const query = `
    SELECT DISTINCT u.id, u.name, u.surname, u.email, u.role, u.bio, u.phone, 
           u.preferred_contact, u.avatar, u.created_at, u.last_login, u.show_contact_info,
           CASE WHEN h.created_by = u.id THEN 1 ELSE 0 END as is_house_creator
    FROM users u
    LEFT JOIN houses h ON h.id = ?
    WHERE u.house_id = ? OR u.id = h.created_by
    ORDER BY is_house_creator DESC, u.role DESC, u.name ASC
  `;

  db.query(query, [houseId, houseId], (err, results) => {
    if (err) {
      console.error('Error fetching housemates:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Housemates found:', results.length);
    res.json(results);
  });
});

// Get user statistics (tasks and bills)
app.get('/users/:userId/statistics', (req, res) => {
  const userId = req.params.userId;
  console.log('GET /users/:userId/statistics', userId);

  if (isNaN(Number(userId))) {
    return res.status(400).json({ error: 'User ID must be a number' });
  }

  // Get statistics in parallel
  const tasksCompletedQuery = `
    SELECT COUNT(*) as count FROM tasks 
    WHERE assigned_to = ? AND status = 'completed'
  `;

  const tasksPendingQuery = `
    SELECT COUNT(*) as count FROM tasks 
    WHERE assigned_to = ? AND status IN ('open', 'in_progress')
  `;

  const billsContributedQuery = `
    SELECT COUNT(*) as count FROM bills 
    WHERE id IN (
      SELECT DISTINCT bill_id FROM bill_share 
      WHERE user_id = ? AND status = 'paid'
    )
  `;

  // Execute all queries
  db.query(tasksCompletedQuery, [userId], (err1, completedResults) => {
    if (err1) {
      console.error('Error fetching completed tasks:', err1);
      return res.status(500).json({ error: err1.message });
    }

    db.query(tasksPendingQuery, [userId], (err2, pendingResults) => {
      if (err2) {
        console.error('Error fetching pending tasks:', err2);
        return res.status(500).json({ error: err2.message });
      }

      db.query(billsContributedQuery, [userId], (err3, billsResults) => {
        if (err3) {
          console.error('Error fetching bills contributed:', err3);
          return res.status(500).json({ error: err3.message });
        }

        const statistics = {
          tasksCompleted: completedResults[0].count,
          tasksPending: pendingResults[0].count,
          billsContributed: billsResults[0].count
        };

        console.log('User statistics:', statistics);
        res.json(statistics);
      });
    });
  });
});

// Get user's completed tasks
app.get('/users/:userId/tasks/completed', (req, res) => {
  const userId = req.params.userId;
  console.log('GET /users/:userId/tasks/completed', userId);

  if (isNaN(Number(userId))) {
    return res.status(400).json({ error: 'User ID must be a number' });
  }

  const query = `
    SELECT t.*, u.name as created_by_name, u.surname as created_by_surname
    FROM tasks t
    LEFT JOIN users u ON t.created_by = u.id
    WHERE t.assigned_to = ? AND t.status = 'completed'
    ORDER BY t.updated_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching completed tasks:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get user's pending tasks
app.get('/users/:userId/tasks/pending', (req, res) => {
  const userId = req.params.userId;
  console.log('GET /users/:userId/tasks/pending', userId);

  if (isNaN(Number(userId))) {
    return res.status(400).json({ error: 'User ID must be a number' });
  }

  const query = `
    SELECT t.*, u.name as created_by_name, u.surname as created_by_surname
    FROM tasks t
    LEFT JOIN users u ON t.created_by = u.id
    WHERE t.assigned_to = ? AND t.status IN ('open', 'in_progress')
    ORDER BY t.due_date ASC, t.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching pending tasks:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get user's contributed bills
app.get('/users/:userId/bills/contributed', (req, res) => {
  const userId = req.params.userId;
  console.log('GET /users/:userId/bills/contributed', userId);

  if (isNaN(Number(userId))) {
    return res.status(400).json({ error: 'User ID must be a number' });
  }

  const query = `
    SELECT b.*, bs.amount_paid, bs.paid_date, bs.status as payment_status,
           u.name as created_by_name, u.surname as created_by_surname
    FROM bills b
    JOIN bill_share bs ON b.id = bs.bill_id
    LEFT JOIN users u ON b.created_by = u.id
    WHERE bs.user_id = ? AND bs.status = 'paid'
    ORDER BY bs.paid_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching contributed bills:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get recent activities for a house
app.get('/houses/:houseId/activities', (req, res) => {
  const houseId = req.params.houseId;
  console.log('GET /houses/:houseId/activities', houseId);
  
  if (isNaN(Number(houseId))) {
    return res.status(400).json({ error: 'House ID must be a number' });
  }

  // Get recent activities from various sources
  // For now, we'll create sample activities based on user data
  // In a real app, you'd have separate tables for tasks, bills, etc.
  const query = `
    SELECT 
      u.name, 
      u.surname, 
      u.avatar,
      u.created_at,
      'joined' as activity_type,
      'Joined the house' as description,
      u.created_at as activity_date
    FROM users u
    WHERE u.house_id = ?
    ORDER BY u.created_at DESC
    LIMIT 10
  `;

  db.query(query, [houseId], (err, results) => {
    if (err) {
      console.error('Error fetching activities:', err);
      return res.status(500).json({ error: err.message });
    }
    
    // Format activities for frontend
    const activities = results.map(result => ({
      id: `user-joined-${result.name}-${result.created_at}`,
      type: result.activity_type,
      description: `${result.name} ${result.surname} ${result.description}`,
      user: {
        name: `${result.name} ${result.surname}`,
        avatar: result.avatar
      },
      timestamp: result.activity_date,
      timeAgo: getTimeAgo(new Date(result.activity_date))
    }));
    
    console.log('Activities found:', activities.length);
    res.json(activities);
  });
});

// Helper function to calculate time ago
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

// Update user bio
app.put('/users/:id/bio', (req, res) => {
  const { bio } = req.body;
  console.log('PUT /users/:id/bio', req.params.id, 'bio:', JSON.stringify(bio));
  console.log('Bio type:', typeof bio, 'Bio length:', bio?.length);
  console.log('SQL params:', [bio, req.params.id]);
  // Check if id is a number
  if (isNaN(Number(req.params.id))) {
    console.error('Bio update failed: id is not a number', req.params.id);
    return res.status(400).json({ error: 'User id must be a number' });
  }
  if (typeof bio !== 'string') {
    console.log('Bio update failed: bio is not a string', bio);
    return res.status(400).json({ error: 'Bio must be a string' });
  }
  db.query('UPDATE users SET bio = ? WHERE id = ?', [bio, req.params.id], (err, results) => {
    if (err) {
      console.error('Bio update DB error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Bio update DB results:', results);
    // Immediately query the user to verify bio value
    db.query('SELECT bio FROM users WHERE id = ?', [req.params.id], (err2, results2) => {
      if (err2) {
        console.error('Bio select DB error:', err2);
        return res.status(500).json({ error: err2.message });
      }
      console.log('Bio after update:', results2);
      res.json({ message: 'Bio updated!', bio: results2[0]?.bio });
    });
  });
});

// Update user preferred contact method
app.put('/users/:id/preferred_contact', (req, res) => {
  const { preferred_contact } = req.body;
  console.log('PUT /users/:id/preferred_contact', req.params.id, 'preferred_contact:', JSON.stringify(preferred_contact));
  if (isNaN(Number(req.params.id))) {
    console.error('Preferred contact update failed: id is not a number', req.params.id);
    return res.status(400).json({ error: 'User id must be a number' });
  }
  if (preferred_contact !== 'email' && preferred_contact !== 'phone') {
    console.log('Preferred contact update failed: invalid value', preferred_contact);
    return res.status(400).json({ error: 'Preferred contact must be "email" or "phone"' });
  }
  db.query('UPDATE users SET preferred_contact = ? WHERE id = ?', [preferred_contact, req.params.id], (err, results) => {
    if (err) {
      console.error('Preferred contact update DB error:', err);
      return res.status(500).json({ error: err.message });
    }
    db.query('SELECT preferred_contact FROM users WHERE id = ?', [req.params.id], (err2, results2) => {
      if (err2) {
        console.error('Preferred contact select DB error:', err2);
        return res.status(500).json({ error: err2.message });
      }
      res.json({ message: 'Preferred contact updated!', preferred_contact: results2[0]?.preferred_contact });
    });
  });
});


// Update user name
app.put('/users/:id/name', (req, res) => {
  const { name } = req.body;
  console.log('PUT /users/:id/name', req.params.id, 'name:', JSON.stringify(name));
  if (isNaN(Number(req.params.id))) {
    console.error('Name update failed: id is not a number', req.params.id);
    return res.status(400).json({ error: 'User id must be a number' });
  }
  if (typeof name !== 'string') {
    console.log('Name update failed: name is not a string', name);
    return res.status(400).json({ error: 'Name must be a string' });
  }
  db.query('UPDATE users SET name = ? WHERE id = ?', [name, req.params.id], (err, results) => {
    if (err) {
      console.error('Name update DB error:', err);
      return res.status(500).json({ error: err.message });
    }
    db.query('SELECT name FROM users WHERE id = ?', [req.params.id], (err2, results2) => {
      if (err2) {
        console.error('Name select DB error:', err2);
        return res.status(500).json({ error: err2.message });
      }
      res.json({ message: 'Name updated!', name: results2[0]?.name });
    });
  });
});

// Update user email
app.put('/users/:id/email', (req, res) => {
  const { email } = req.body;
  console.log('PUT /users/:id/email', req.params.id, 'email:', JSON.stringify(email));
  if (isNaN(Number(req.params.id))) {
    console.error('Email update failed: id is not a number', req.params.id);
    return res.status(400).json({ error: 'User id must be a number' });
  }
  if (typeof email !== 'string') {
    console.log('Email update failed: email is not a string', email);
    return res.status(400).json({ error: 'Email must be a string' });
  }
  db.query('UPDATE users SET email = ? WHERE id = ?', [email, req.params.id], (err, results) => {
    if (err) {
      console.error('Email update DB error:', err);
      return res.status(500).json({ error: err.message });
    }
    db.query('SELECT email FROM users WHERE id = ?', [req.params.id], (err2, results2) => {
      if (err2) {
        console.error('Email select DB error:', err2);
        return res.status(500).json({ error: err2.message });
      }
      res.json({ message: 'Email updated!', email: results2[0]?.email });
    });
  });
});

// Update user phone number
app.put('/users/:id/phone', (req, res) => {
  const { phone } = req.body;
  console.log('PUT /users/:id/phone', req.params.id, 'phone:', JSON.stringify(phone));
  console.log('Phone type:', typeof phone, 'Phone length:', phone?.length);
  console.log('SQL params:', [phone, req.params.id]);
  if (isNaN(Number(req.params.id))) {
    console.error('Phone update failed: id is not a number', req.params.id);
    return res.status(400).json({ error: 'User id must be a number' });
  }
  if (typeof phone !== 'string') {
    console.log('Phone update failed: phone is not a string', phone);
    return res.status(400).json({ error: 'Phone must be a string' });
  }
  db.query('UPDATE users SET phone = ? WHERE id = ?', [phone, req.params.id], (err, results) => {
    if (err) {
      console.error('Phone update DB error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Phone update DB results:', results);
    db.query('SELECT phone FROM users WHERE id = ?', [req.params.id], (err2, results2) => {
      if (err2) {
        console.error('Phone select DB error:', err2);
        return res.status(500).json({ error: err2.message });
      }
      console.log('Phone after update:', results2);
      res.json({ message: 'Phone updated!', phone: results2[0]?.phone });
    });
  });
});

app.post('/users', (req, res) => {
  const { name, email, password, role } = req.body;
  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User created!", id: results.insertId });
    }
  );
});

// Update user privacy settings
app.put('/users/:id/privacy', (req, res) => {
  const { show_contact_info } = req.body;
  const { id } = req.params;

  // First check if the column exists, if not, add it
  db.query('SHOW COLUMNS FROM users LIKE "show_contact_info"', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (result.length === 0) {
      // Column doesn't exist, add it
      db.query('ALTER TABLE users ADD COLUMN show_contact_info BOOLEAN DEFAULT 1', (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to add privacy column: ' + err.message });
        }
        // Now update the user's privacy setting
        updatePrivacySetting();
      });
    } else {
      // Column exists, update directly
      updatePrivacySetting();
    }
  });

  function updatePrivacySetting() {
    db.query('UPDATE users SET show_contact_info = ? WHERE id = ?', [show_contact_info, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Privacy settings updated!' });
    });
  }
});

// Health check endpoint for deployment platforms
app.get('/', (req, res) => {
  res.json({ 
    message: 'Housemate API is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 8080;
console.log('🟢 About to start app.listen...');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Database: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
  console.log(`🔐 JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No (using fallback)'}`);
  console.log('🟢 app.listen callback reached, server should be alive!');
});

// Start database initialization and table creation in the background
initializeDatabaseWithRetry().catch((err) => {
  console.error('❌ Database initialization error (non-fatal):', err);});
