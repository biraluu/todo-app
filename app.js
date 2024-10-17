// document.getElementById('task-form').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent default form submission

//     const taskInput = document.getElementById('task-input');
//     const task = taskInput.value; // Get the task input value

//     try {
//         const response = await fetch('/api/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ task }), // Send the task as JSON
//         });

//         if (response.ok) {
//             taskInput.value = ''; // Clear the input field
//             loadTasks(); // Refresh the task list
//         } else {
//             console.error('Error adding task:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

// // Function to load tasks from the server and display them
// async function loadTasks() {
//     try {
//         const response = await fetch('/api/tasks');
//         const tasks = await response.json();
//         const taskList = document.getElementById('task-list');
//         taskList.innerHTML = ''; // Clear current tasks

//         tasks.forEach(task => {
//             const li = document.createElement('li');
//             li.textContent = task.description; // Assuming the column is named 'description'
//             taskList.appendChild(li);
//         });
//     } catch (error) {
//         console.error('Error loading tasks:', error);
//     }
// }

// // Load tasks when the page is loaded
// loadTasks();

// document.getElementById('add-btn').addEventListener('click', function() {
//     const task = document.getElementById('todo-input').value;
//     if(task) {
//         fetch('/api/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ task: task })
//         }).then(response => response.json())
//           .then(data => {
//               // Update task list UI
//           });
//     }
// });
// document.getElementById('add-btn').addEventListener('click', function() {
//     const task = document.getElementById('todo-input').value;
//     if (task) {
//         fetch('/api/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ task: task })
//         }).then(response => response.json())
//           .then(data => {
//               // After adding the new task, fetch all tasks to update the UI
//               updateTaskList();
//               // Clear the input field
//               document.getElementById('todo-input').value = '';
//           });
//     }
// });

// // Function to fetch all tasks and update the UI
// function updateTaskList() {
//     fetch('/api/tasks') // Assuming this endpoint returns all tasks
//         .then(response => response.json())
//         .then(tasks => {
//             const taskList = document.getElementById('task-list');
//             // Clear the current list
//             taskList.innerHTML = '';
//             // Render each task
//             tasks.forEach(task => {
//                 const li = document.createElement('li');
//                 li.textContent = task.task; // Assuming task object has a 'task' property
//                 taskList.appendChild(li);
//             });
//         })
//         .catch(error => console.error('Error fetching tasks:', error));
// }
// Select the DOM elements
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


