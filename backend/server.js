const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path'); // Import the path module
const app = express();

const pool = new Pool({
    user: 'biraluu',  // Use your PostgreSQL username
    host: 'db',
    database: 'todo_db',  // Your database name
    password: 'Mnias@33', // Use your actual password
    port: 5432,
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,))); // Serve static files from the root directory

// API to fetch tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

// API to add a task
app.post('/api/tasks', async (req, res) => {
    const { task } = req.body;
    try {
        await pool.query('INSERT INTO tasks (description) VALUES ($1)', [task]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.redirect('http://localhost:8080');
});

// API to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


