const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tasks = require('./tasks');

app.get('/tasks', (req, res) => {
    res.json(tasks.getAllTasks());
});

app.post('/tasks', (req, res) => {
    const newTask = req.body.task;
    tasks.addTask(newTask);
    res.status(201).send('Task added successfully');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
