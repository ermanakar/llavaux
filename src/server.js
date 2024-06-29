const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('/Users/ermanakar/Desktop/llava/app.db');

app.get('/api/search', (req, res) => {
  const query = req.query.query;
  db.all(
    `SELECT * FROM iterations WHERE description LIKE ?`,
    [`%${query}%`],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
