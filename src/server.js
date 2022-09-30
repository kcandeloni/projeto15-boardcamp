import express from 'express';

import connection from './database/database.js';

const app = express();
app.use(express.json());

app.get('/categories/:id', async (req, res) => {
  try {
    const categoria = await connection.query(
      `SELECT * FROM categories WHERE categories.id = $1;`, [req.params.id]);
    res.send(categoria.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await connection.query(
      `SELECT * FROM categories;`
    );

    res.send(categories.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post('/categories', (req, res) => {
    const { name } = req.body;
    
    connection.query('INSERT INTO categories (name) VALUES ($1);', [name])
      .then(result => {
        res.sendStatus(201);
      });
  });

app.listen(4000, () => {
  console.log('Server is listening on port 4000.');
});