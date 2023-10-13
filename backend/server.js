const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [];

// API endpoints
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
        res.status(201).send('Task added successfully');
    } else {
        res.status(400).send('Invalid task');
    }
});

// API endpoint to update a task (using PUT)
app.put('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body.editedTask;

    if (!updatedTask) {
        res.status(400).send('Invalid task update');
        return;
    }

    // Find the task by taskId and update it
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks[index].task = updatedTask;
        res.status(200).send('Task updated successfully');
    } else {
        res.status(404).send('Task not found');
    }
});

// API endpoint to update a task (using PUT)
app.put('/tasks/:taskText', (req, res) => {
    const taskText = req.params.taskText;
    const editedTask = req.body.editedTask;

    if (!editedTask) {
        res.status(400).send('Invalid task update');
        return;
    }

    const taskIndex = tasks.findIndex(task => task === taskText);

    if (taskIndex !== -1) {
        tasks[taskIndex] = editedTask;
        res.status(200).send('Task updated successfully');
    } else {
        res.status(404).send('Task not found');
    }
});


// API endpoint to delete a task
app.delete('/tasks', (req, res) => {
    const taskToDelete = req.body.task;

    if (!taskToDelete) {
        res.status(400).send('Invalid task');
        return;
    }

    // Find and remove the task from the tasks array
    const index = tasks.indexOf(taskToDelete);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(200).send('Task deleted successfully');
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
