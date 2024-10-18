
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Fetch tasks from the database
async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks in the UI
function renderTasks(tasks) {
    taskList.innerHTML = ''; // Clear the existing list
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        // Append elements
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Add a new task
addButton.addEventListener('click', async () => {
    const taskDescription = todoInput.value.trim();
    if (taskDescription) {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskDescription }),
            });

            if (response.ok) {
                todoInput.value = ''; // Clear the input
                fetchTasks(); // Refresh the task list
            } else {
                console.error('Error adding task:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});

// Delete a task
async function deleteTask(taskId) {
    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        });
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Initial fetch of tasks when the page loads
fetchTasks();


