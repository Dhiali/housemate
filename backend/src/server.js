import bcrypt from 'bcryptjs';
// Register endpoint
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role, house_id } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Check if user exists
    const [existing] = await new Promise((resolve, reject) => {
      db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Insert user
    db.query(
      'INSERT INTO users (name, email, password, role, house_id) VALUES (?, ?, ?, ?, ?)',
      [`${firstName} ${lastName}`, email, hashed, role || 'standard', house_id || null],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User registered!', id: results.insertId });
      }
    );
  } catch (err) {
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
  const { name, invite_code } = req.body;
  db.query("INSERT INTO houses (name, invite_code) VALUES (?, ?)", [name, invite_code], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "House created!", id: results.insertId });
  });
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
import cors from 'cors';
app.use(cors({ origin: "http://localhost:5173" }));
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
import express from 'express';
import db from './db.js';
const app = express();

app.use(express.json());

// Example: Get all users
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Example: Add a new user
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
