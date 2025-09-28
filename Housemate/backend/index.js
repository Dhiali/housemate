const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Users route for updating house_id
const usersRouter = require('./users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
