



import express from 'express';
import db from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: '10mb' }));

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
    house_name = null // Expect house_name from frontend
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
    // Insert user only
    const userId = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, surname, email, password, bio, phone, preferred_contact, avatar, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'admin', 'active')`,
        [name, surname, email, hashed, bio, phone, preferred_contact, avatar],
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
app.get('/bills', (req, res) => {
  db.query("SELECT * FROM bills", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
app.get('/bills/:id', (req, res) => {
  db.query("SELECT * FROM bills WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || null);
  });
});
app.post('/bills', (req, res) => {
  const { title, amount, house_id, created_by, due_date } = req.body;
  db.query("INSERT INTO bills (title, amount, house_id, created_by, due_date) VALUES (?, ?, ?, ?, ?)", [title, amount, house_id, created_by, due_date], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bill created!", id: results.insertId });
  });
});
app.put('/bills/:id', (req, res) => {
  db.query("UPDATE bills SET ? WHERE id = ?", [req.body, req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bill updated!" });
  });
});
app.delete('/bills/:id', (req, res) => {
  db.query("DELETE FROM bills WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bill deleted!" });
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
// Example: Get all tasks
app.get('/tasks', (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Example: Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, due_date, assigned_to } = req.body;
  db.query(
    "INSERT INTO tasks (title, description, due_date, assigned_to) VALUES (?, ?, ?, ?)",
    [title, description, due_date, assigned_to],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task created!", id: results.insertId });
    }
  );
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

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
