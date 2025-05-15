const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// let users = [
//   { id: 1, name: 'mengsi' },
//   { id: 2, name: 'Fulan' }
// ];


// app.post('/users', (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });
app.post('/users', (req, res) => {
  const query = 'INSERT INTO users SET ?';
  db.query(query, req.body, (err, results) => {
    if (err) {
      console.error('error inserting:', err);
      res.status(500).json({ message: 'Error inserting user' });
    } else {
      res.json(results);
    }
  });
});


// app.get('/users', (req, res) => {
//   res.json(users);
// });

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('error selecting:', err);
      res.status(500).json({ message: 'Error selecting users' });
    } else {
      res.json(results);
    }
  });
});


// app.get('/users/:id', (req, res) => {
//   const user = users.find(u => u.id == req.params.id);
//   if (user) res.json(user);
//   else res.status(404).json({ message: 'User not found' });
// });

app.get('/users/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, req.params.id, (err, results) => {
    if (err) {
      console.error('error selecting:', err);
      res.status(500).json({ message: 'Error selecting user' });
    } else {
      res.json(results[0]);
    }
  });
});


// app.put('/users/:id', (req, res) => {
//   const user = users.find(u => u.id == req.params.id);
//   if (user) {
//     user.name = req.body.name;
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

app.put('/users/:id', (req, res) => {
  const query = 'UPDATE users SET ? WHERE id = ?';
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      console.error('error updating:', err);
      res.status(500).json({ message: 'Error updating user' });
    } else {
      res.json(results);
    }
  });
});


// app.delete('/users/:id', (req, res) => {
//   users = users.filter(u => u.id != req.params.id);
//   res.json({ message: 'User deleted' });
// });

app.delete('/users/:id', (req, res) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, req.params.id, (err, results) => {
    if (err) {
      console.error('error deleting:', err);
      res.status(500).json({ message: 'Error deleting user' });
    } else {
      res.json({ message: 'User deleted' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
