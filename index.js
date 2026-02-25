const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)");
});

// GET all notes
app.get('/notes', (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// POST new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, title, content });
  });
});

app.listen(3000, () => console.log('Notes app running on port 3000'));