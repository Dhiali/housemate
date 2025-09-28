const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // change as needed
  password: '', // change as needed
  database: 'housemate_db'
});

// Update user house_id
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { house_id } = req.body;
  if (!house_id) return res.status(400).json({ error: 'house_id required' });
  db.query('UPDATE users SET house_id = ? WHERE id = ?', [house_id, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, result });
  });
});

module.exports = router;
