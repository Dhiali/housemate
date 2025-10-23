import express from 'express';
import db from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import upload from './avatarUpload.js';

const app = express();
app.use(cors({ 
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Ensure bills and related tables exist
const createBillsTables = () => {
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
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
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
      FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
    )
  `;
  
  db.query(createBillsQuery, (err) => {
    if (err) {
      console.error('Error creating bills table:', err);
    } else {
      console.log('✅ Bills table ready');
      
      // Create bill_share table after bills table is ready
      db.query(createBillShareQuery, (err) => {
        if (err) {
          console.error('Error creating bill_share table:', err);
        } else {
          console.log('✅ Bill share table ready');
        }
      });

      // Create bill_history table
      db.query(createBillHistoryQuery, (err) => {
        if (err) {
          console.error('Error creating bill_history table:', err);
        } else {
          console.log('✅ Bill history table ready');
        }
      });
    }
  });
};

// Create tables on startup
createBillsTables();

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(401).json({ error: 'Invalid credentials' });
      const user = results[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      // Generate JWT
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'your_jwt_secret', { expiresIn: '7d' });
      // Update last_login
      db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);
      res.json({ token, user: { id: user.id, name: user.name, surname: user.surname, email: user.email, role: user.role, house_id: user.house_id } });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
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
  db.query("UPDATE houses SET ? WHERE id = ?", [req.body, req.params.id], (err, results) => {
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
        u.first_name,
        u.last_name,
        u.email
      FROM bill_share bs
      LEFT JOIN users u ON bs.user_id = u.id
      WHERE bs.bill_id = ?
      ORDER BY u.first_name
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
    house_id, 
    created_by, 
    due_date,
    shared_with // Array of user IDs to share with
  } = req.body;

  if (!title || !amount || !house_id || !created_by) {
    console.log('Missing required fields validation failed');
    return res.status(400).json({ 
      error: 'Missing required fields: title, amount, house_id, created_by' 
    });
  }
  
  console.log('Validation passed, creating bill...');

  // Insert bill
  const billQuery = `
    INSERT INTO bills (title, description, amount, category, house_id, created_by, due_date, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW())
  `;

  const billValues = [
    title,
    description || null,
    amount,
    category || 'utilities',
    house_id,
    created_by,
    due_date || null
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

    // For now, just return success for the basic bill creation
    // We'll add sharing functionality later once basic creation works
    console.log('Bill created successfully, returning response...');
    
    res.json({ 
      message: "Bill created successfully!", 
      data: { id: billId }
    });
  });
});

// Update bill payment status
app.put('/bills/:id/pay', (req, res) => {
  const billId = req.params.id;
  const { user_id, amount_paid } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  // Update bill_share status
  const updateQuery = `
    UPDATE bill_share 
    SET status = 'paid', amount_paid = ?, paid_at = NOW()
    WHERE bill_id = ? AND user_id = ?
  `;

  db.query(updateQuery, [amount_paid || null, billId, user_id], (err, results) => {
    if (err) {
      console.error('Error updating bill payment:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Bill share not found' });
    }

    // Log to bill_history
    const historyQuery = `
      INSERT INTO bill_history (bill_id, user_id, action, old_value, new_value, created_at)
      VALUES (?, ?, 'payment', 'pending', 'paid', NOW())
    `;

    db.query(historyQuery, [billId, user_id], (err2) => {
      if (err2) {
        console.error('Error logging payment history:', err2);
      }

      res.json({ message: "Payment recorded successfully!" });
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
// Schedule endpoints
app.get('/schedule', (req, res) => {
  db.query("SELECT * FROM schedule", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
app.get('/schedule/:id', (req, res) => {
  db.query("SELECT * FROM schedule WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || null);
  });
});
app.post('/schedule', (req, res) => {
  const { house_id, scheduled_date, scheduled_time, recurrence } = req.body;
  db.query("INSERT INTO schedule (house_id, scheduled_date, scheduled_time, recurrence) VALUES (?, ?, ?, ?)", [house_id, scheduled_date, scheduled_time, recurrence], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Schedule created!", id: results.insertId });
  });
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
// Avatar upload endpoint
app.put('/users/:id/avatar', upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Convert image buffer to base64 data URL
  const mimeType = req.file.mimetype;
  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64}`;
  db.query('UPDATE users SET avatar = ? WHERE id = ?', [dataUrl, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Avatar updated!', avatar: dataUrl });
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

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
