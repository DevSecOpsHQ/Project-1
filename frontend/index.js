// Function to fetch tasks from the backend
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks'); // Replace with your backend URL
        const tasks = await response.json();

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear the existing list

        tasks.forEach(task => {
            const newTaskItem = document.createElement("li");
            newTaskItem.className = "task-item";
            newTaskItem.innerHTML = `
                <span>${task}</span>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="removeTask(this)">Delete</button>
            `;
            taskList.appendChild(newTaskItem);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Function to add a new task
async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        try {
            await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskText }),
            });

            taskInput.value = ""; // Clear the input field
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
}

// Function to remove a task
async function removeTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span').innerText;

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: taskText }),
        });

        if (response.status === 200) {
            taskItem.remove(); // Remove the task from the DOM
        } else {
            console.error('Error deleting task:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}


// Function to edit a task
function editTask(span) {
    const taskText = span.parentElement.querySelector('span').innerText;
    const editedTaskInput = document.getElementById("editedTask");
    editedTaskInput.value = taskText;

    // Show the edit task modal
    const editTaskModal = document.getElementById("editTaskModal");
    editTaskModal.style.display = "block";

    // Handle save edited task
    const saveEditedTaskButton = document.getElementById("saveEditedTask");
    saveEditedTaskButton.onclick = async function () {
        const editedTask = editedTaskInput.value.trim();
        if (editedTask !== "") {
            const response = await fetch(`http://localhost:3000/tasks/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ editedTask: editedTask }),
            });

            if (response.status === 200) {
                span.innerText = editedTask;
                editTaskModal.style.display = "none";
            } else {
                console.error('Error editing task:', response.statusText);
            }
        }
    };

    // Handle cancel action
    const closeModal = document.getElementById("closeModal");
    closeModal.onclick = function () {
        editTaskModal.style.display = "none";
    };

    // Close the modal when clicking outside it
    window.onclick = function (event) {
        if (event.target === editTaskModal) {
            editTaskModal.style.display = "none";
        }
    };
}

// Add an event listener to fetch tasks when the page loads
window.addEventListener("load", fetchTasks);

// Add an event listener to add tasks
const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", addTask);
