let tasks = [];

function getAllTasks() {
    return tasks;
}

function addTask(task) {
    tasks.push(task);
}

module.exports = {
    getAllTasks,
    addTask,
};
