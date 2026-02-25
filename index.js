const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve frontend

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)");
});

// GET all notes (API)
app.get('/api/notes', (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// POST new note (API)
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, title, content });
  });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => console.log('Notes app running on port 3000'));