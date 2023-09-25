// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const newTaskItem = document.createElement("li");
        newTaskItem.className = "task-item";
        newTaskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(newTaskItem);

        // Clear the input field
        taskInput.value = "";
    }
}

// Function to remove a task
function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}

// Function to edit a task
function editTask(span) {
    const taskText = span.innerText;
    const editedTaskInput = document.getElementById("editedTask");
    editedTaskInput.value = taskText;

    // Show the edit task modal
    const editTaskModal = document.getElementById("editTaskModal");
    editTaskModal.style.display = "block";

    // Handle save edited task
    const saveEditedTaskButton = document.getElementById("saveEditedTask");
    saveEditedTaskButton.onclick = function () {
        const editedTask = editedTaskInput.value.trim();
        if (editedTask !== "") {
            span.innerText = editedTask;
            editTaskModal.style.display = "none";
        }
    };

    // Close the modal
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

// Add a task when the "Add Task" button is clicked
const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", addTask);

// Add event listeners for editing and deleting tasks
document.addEventListener("click", function (event) {
    if (event.target.tagName === "SPAN") {
        editTask(event.target);
    } else if (event.target.tagName === "BUTTON" && event.target.innerText === "Delete") {
        removeTask(event.target);
    }
});
